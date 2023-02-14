import { Spin } from 'antd';

export const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#f2f2f2',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'inherit',
        }}
      >
        <Spin tip="Loading" size="large" />
      </div>
    </div>
  );
};
