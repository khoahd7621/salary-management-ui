import Cookies from 'cookies';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import { Response } from '~/models/modules/login';
import { User } from '~/models/modules/User';

type Data =
  | {
      message: string;
    }
  | User;

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

const { serverRuntimeConfig } = getConfig();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  return new Promise((resolve) => {
    req.headers.cookie = '';

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';

      // Concatenate the chunks of data received in the response
      proxyRes.on('data', function (chunk) {
        body += chunk;
      });

      proxyRes.on('end', function () {
        try {
          // Check if the status code indicates success
          const isSuccess = proxyRes.statusCode && proxyRes.statusCode >= 200 && proxyRes.statusCode < 300;
          if (!isSuccess) {
            return (res as NextApiResponse)
              .status(proxyRes.statusCode || 500)
              .json({ message: 'Username or password is invalid' });
          }

          const responseData: Response = JSON.parse(body);

          const tokenDecoded: JwtPayload = jwt_decode(responseData.token);

          // convert token to cookies
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
          cookies.set('access_token', responseData.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(1000 * (tokenDecoded.exp || Date.now())),
          });

          (res as NextApiResponse).status(200).json({
            id: responseData.id,
            name: responseData.name,
            phoneNumber: responseData.phoneNumber,
            userName: responseData.userName,
          });
        } catch (error) {
          (res as NextApiResponse).status(500).json({ message: 'Something went wrong' });
        } finally {
          resolve(true);
        }
      });
    };

    // Add the proxy response handler
    proxy.once('proxyRes', handleLoginResponse);

    // Forward the request to the target API
    proxy.web(req, res, {
      target: serverRuntimeConfig.API_HOST_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
