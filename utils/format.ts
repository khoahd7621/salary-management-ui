export const formatMoney = {
  VietnamDong: new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }),
};

export const formatFileName = {
  splitFileName: (fileName: string) => {
    const firstIndex = fileName.indexOf('files%2F') + 8;
    const lastIndex = fileName.indexOf('-salt-');
    return fileName.slice(firstIndex, lastIndex);
  },
};
