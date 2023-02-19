import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Image from 'next/image';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { useState } from 'react';

interface UploadImageProps {
  image: any;
  setImage: (_image: any) => void;
}

const UploadImage = ({ image, setImage }: UploadImageProps) => {
  const [loading, setLoading] = useState(false);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

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

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    setImage(null);
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      info.file.preview = await getBase64(info.file.originFileObj as RcFile);
      setLoading(false);
      setImage(info.file);
    }
  };

  const customRequest = (options: UploadRequestOption) => {
    const { file, onSuccess } = options;
    onSuccess?.(file);
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
        {image?.preview ? (
          <Image src={image?.preview} alt="avatar" width={500} height={500} style={{ width: '100%', height: 'auto' }} />
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
