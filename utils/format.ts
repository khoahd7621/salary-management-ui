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

export const addCommasToNumber = (number: number | undefined) => {
  let formatted = '';
  if (number !== undefined) {
    const str = number.toString();
    for (let i = 0; i < str.length; i++) {
      if (i > 0 && (str.length - i) % 3 === 0) {
        formatted += ',';
      }
      formatted += str[i];
    }
  }
  return formatted;
};
