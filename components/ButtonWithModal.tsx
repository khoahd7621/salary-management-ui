import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { ButtonType } from 'antd/es/button';

interface Props {
  children?: React.ReactNode;
  modalTitle?: string;
  modalContent?: React.ReactNode;
  okText?: string;
  disabledCancel?: boolean;
  showCancel?: boolean;
  cancelText?: string;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
  modalHeaderIcon?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  isLink?: boolean;
  width?: number;
  okType?: 'primary' | 'danger' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  buttonType?: ButtonType;
  danger?: boolean;
  buttonColor?: string;
  buttonTextColor?: string;
}

export const ButtonWithModal = ({
  children,
  type = 'confirm',
  modalTitle = 'Model Title',
  modalContent = 'Model cotent',
  okText = 'Yes',
  disabledCancel = false,
  showCancel = true,
  cancelText = 'No',
  modalHeaderIcon = <ExclamationCircleFilled />,
  onOk = () => {},
  onCancel = () => {},
  isLink = false,
  width = 500,
  okType = 'danger',
  buttonType = 'primary',
  danger = true,
  buttonColor = '',
  buttonTextColor = '',
}: Props) => {
  const showModal = () => {
    Modal[type]({
      width: width,
      icon: modalHeaderIcon,
      title: modalTitle,
      content: modalContent,
      okText,
      okType: okType,
      cancelText,
      cancelButtonProps: {
        disabled: disabledCancel,
        hidden: !showCancel,
      },
      onOk: onOk,
      onCancel: onCancel,
    });
  };
  return (
    <>
      {isLink ? (
        <div style={{ cursor: 'pointer' }} onClick={showModal}>
          {children}
        </div>
      ) : (
        <Button
          onClick={showModal}
          type={buttonType}
          danger={danger}
          style={{ backgroundColor: buttonColor || '', color: buttonTextColor || '' }}
        >
          {children}
        </Button>
      )}
    </>
  );
};
