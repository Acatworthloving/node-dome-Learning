// 时间列表
export const timeList = [
  { key: 'day', name: '日' },
  { key: 'minute', name: '分' },
  { key: 'hour', name: '时' },
  { key: 'week', name: '周' },
  { key: 'month', name: '月' },
  { key: 'quarter', name: '季' },
  { key: 'year', name: '年' },
];

// 时间格式
export const timeFormat = {
  day: 'YYYY-MM-DD',
  minute: 'YYYY-MM-DD HH:mm',
  hour: 'YYYY-MM-DD HH',
  week: 'YYYY-wo',
  month: 'YYYY-MM',
  quarter: 'YYYY-Q',
  year: 'YYYY',
};

// 周列表
export const weekList = [
  { key: '1', name: '周一' },
  { key: '2', name: '周二' },
  { key: '3', name: '周三' },
  { key: '4', name: '周四' },
  { key: '5', name: '周五' },
  { key: '6', name: '周六' },
  { key: '7', name: '周日' },
];

// 上传到api时间格式
export const timeFormatUpdata = {
  day: 'YYYYMMDD',
  minute: 'YYYYMMDDHHmm',
  hour: 'YYYYMMDDHH',
  week: 'YYYYOWW',
  month: 'YYYYMM',
  quarter: 'YYYYQ',
  year: 'YYYY',
};
