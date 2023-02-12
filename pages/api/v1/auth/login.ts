import Cookies from 'cookies';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt_decode, { JwtPayload } from 'jwt-decode';

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

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

          const { data, _statusCode, _message } = JSON.parse(body);

          const _tokenDecoded: JwtPayload = jwt_decode(data.token);

          // convert token to cookies
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
          cookies.set('access_token', data.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            // expires: new Date(_tokenDecoded.exp || Date.now() + 1000 * 60 * 60 * 24 * 7),
          });

          (res as NextApiResponse).status(200).json({ message: 'Login successfully' });
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
      target: process.env.API_HOST_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
