import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { useState } from 'react';

export function UploadFiles({ file, setFile }: { file: any; setFile: (_file: any) => void }) {
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: RcFile) => {
    const isPdfOrDocoOrDocx = file.type === 'application/pdf';
    if (!isPdfOrDocoOrDocx) {
      message.error('You can only upload PDF file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('File must smaller than 2MB!');
    }
    return (isPdfOrDocoOrDocx && isLt2M) || Upload.LIST_IGNORE;
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      setFile(info.file.originFileObj);
      setLoading(false);
    }
    if (info.file.status === 'removed') {
      setFile(null);
    }
  };

  const customRequest = ({ file, onSuccess }: UploadRequestOption) => onSuccess?.(file);

  return (
    <Upload
      disabled={loading}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={customRequest}
      listType="text"
      maxCount={1}
      defaultFileList={file ? [file] : []}
    >
      <Button disabled={loading} icon={<UploadOutlined />}>
        Upload PDF file
      </Button>
    </Upload>
  );
}
