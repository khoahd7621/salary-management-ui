export const Regex = {
  VIETNAM_PHONE_NUMBER: /(03|05|07|08|09|01[2689])+(\d{8})\b/,
  VIETNAM_IDENTIFY_NUMBER: /(^\d{9}$)|(^\d{12}$)/,
  COMMAS_SEPARATED_NUMBER: /\B(?=(\d{3})+(?!\d))/g,
};
