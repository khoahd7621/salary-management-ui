import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { uuidv4 } from '@firebase/util';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { useState } from 'react';

import { firebaseConfig } from '~/firebaseconfig';

interface UploadImageProps {
  imageUrl: string;
  setImageUrl: (_imageUrl: string) => void;
}

const UploadImage = ({ imageUrl, setImageUrl }: UploadImageProps) => {
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    setImageUrl('');
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false);
      setImageUrl(info.file.response);
    }
  };

  const customRequest = (options: UploadRequestOption) => {
    const { file, onError, onSuccess } = options;

    const app = initializeApp(firebaseConfig);

    console.log(firebaseConfig);

    const storage = getStorage(app);
    const imageRef = ref(storage, `images/${(file as RcFile).name + '-' + uuidv4()}`);

    uploadBytes(imageRef, file as RcFile)
      .then((response) => response)
      .then((response) => getDownloadURL(response.ref))
      .then((url) => {
        onSuccess?.(url);
      })
      .catch((error) => {
        onError?.(error);
      });
  };

  return (
    <ImgCrop rotate>
      <Upload
        disabled={loading}
        name="image"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customRequest}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="avatar" width={500} height={500} style={{ width: '100%', height: 'auto' }} />
        ) : (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </ImgCrop>
  );
};

export default UploadImage;
