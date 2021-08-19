export const formatDateToLastHours = (date: string) => {
  let queryDate = date.split('T')[0];
  let endTime = '23:59:58';
  return queryDate + 'T' + endTime + date.slice(-6);
};
