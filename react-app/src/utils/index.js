/**
 * 公用事件封装文件
 */
import moment from 'moment';
// import ExportJsonExcel from 'js-export-excel';
import { timeFormatUpdata, timeFormat } from './config';

/**下载文件*/
export function download(param) {
  // 文件类型是否为pdf
  let type = param.slice(-3);
  if (type === 'pdf') {
    var saveAs = function (blob, filename) {
      var URL = window.URL || window.webkitURL;
      var type = blob.type;
      var force_saveable_type = 'application/octet-stream';
      if (type && type !== force_saveable_type) {
        // 强制下载，而非在浏览器中打开
        var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
        blob = slice.call(blob, 0, blob.size, force_saveable_type);
      }
      var url = URL.createObjectURL(blob);
      var save_link = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'a'
      );
      save_link.href = url;
      save_link.download = filename;

      var event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      save_link.dispatchEvent(event);
      URL.revokeObjectURL(url);
    };
    var oReq = new XMLHttpRequest();
    var URLToPDF = param;
    oReq.open('GET', URLToPDF, true);
    oReq.responseType = 'blob';
    oReq.onload = function () {
      var file = new Blob([oReq.response], { type: 'application/pdf' });
      saveAs(file, '我的策划案.pdf');
    };
    oReq.send();
    return;
  }
  // let elemIF = document.createElement('iframe');
  // elemIF.src = param;
  // elemIF.style.display = "none";
  // document.body.appendChild(elemIF);
}

/**
 * 浏览器下载文件
 * downLoad('XXXX' ,'test.xlxs')
 * @param href
 * @param fileName
 * @param isBlock 是否文件流
 */
export function downLoad2(href, fileName, isBlock = false) {
  let aEle = document.createElement('a'); // 创建a标签

  if (isBlock) {
    let blob = new Blob([href]);
    aEle.download = fileName; // 设置下载文件的文件名
    aEle.href = window.URL.createObjectURL(blob);
  } else {
    aEle.download = fileName; // 设置下载文件的文件名
    aEle.href = href; // content为后台返回的下载地址
  }
  // 绑定点击时间
  document.body.appendChild(aEle);
  aEle.click(); // 设置点击事件
  // 然后移除
  document.body.removeChild(aEle);
}

/***
 * 解决js精度问题
 *  method **
 *  add / subtract / multiply /divide
 * floatObj.add(0.1, 0.2) >> 0.3
 * floatObj.multiply(19.9, 100) >> 1990
 *
 */
export var FloatObj = (function () {
  function decNum(a) {
    /*获取小数位数*/
    var r = 0;
    a = a.toString();
    if (a.indexOf('.') !== -1) r = a.split('.')[1].length;
    return r;
  }

  function int(a) {
    /*去除小数点并转成数值*/
    return parseInt(a.toString().replace('.', ''));
  }

  function calc(a, b, type) {
    //加减乘除
    var r,
      da = decNum(a),
      db = decNum(b),
      dsum = da + db,
      dmin = Math.min(da, db),
      dmax = Math.max(da, db);
    dsum += dmax - dmin;
    dsum = Math.pow(10, dsum);
    dmax = Math.pow(10, dmax);
    a = int(a);
    b = int(b);
    if (da > db) {
      b *= Math.pow(10, da - db);
    } else {
      a *= Math.pow(10, db - da);
    }
    switch (type) {
      case 'add':
        r = (a + b) / dmax;
        break;
      case 'subtract':
        r = (a - b) / dmax;
        break;
      case 'multiply':
        r = (a * b) / dsum;
        break;
      case 'divide':
        r = a / b;
        break;
      case 'mod':
        r = (multiply(a, dmax) % multiply(b, dmax)) / dmax;
        break;
      default:
        break;
    }
    return r;
  }

  // 加减乘除的四个接口
  // 加
  function add(a, b, type) {
    return calc(a, b, 'add');
  }

  // 减
  function subtract(a, b, type) {
    return calc(a, b, 'subtract');
  }

  // 乘
  function multiply(a, b, type) {
    return calc(a, b, 'multiply');
  }

  // 除
  function divide(a, b, type) {
    return calc(a, b, 'divide');
  }

  // 取余
  function mod(a, b, type) {
    return calc(a, b, 'mod');
  }

  // exports
  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    mod: mod,
    formatNum,
  };
})();

/**带小数的千分位转化*/
export function formatNum(num = 0, n = 0) {
  try {
    if (!num || isNaN(num)) {
      return num;
    }
    num = String(Number(num).toFixed(n));
    var re = /(-?\d+)(\d{3})/;
    while (re.test(num)) {
      num = num.replace(re, '$1,$2');
    }
    return num;
  } catch (e) {
    // debugger
  }
}

/** 两个数组取差值 */
export const diffArr = (arr1, arr2, key) => {
  for (let i = 0; i < arr1.length; i++) {
    for (let a = arr2.length - 1; a >= 0; a--) {
      if (arr1[i][key] === arr2[a][key]) arr2.splice(a, 1);
    }
  }
  return arr2;
};

/** 合并两个数组去重 */
export const mergeArr = (arr1, arr2) => {
  var _arr = [];
  for (var a = 0; a < arr1.length; a++) {
    _arr.push(arr1[a]);
  }
  for (var i = 0; i < arr2.length; i++) {
    var flag = true;
    for (var j = 0; j < arr1.length; j++) {
      if (arr2[i] === arr1[j]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      _arr.push(arr2[i]);
    }
  }
  return _arr;
};

/** 排序数据 */
export const sortDate = (arr, key) => {
  // const data = arr.sort(function (a, b) { return b[key] - a[key] })
  const data = arr.sort(function (a, b) {
    return b[key] - a[key];
  });
  return data;
};

/**两个日期之间所有日期
 * @param type 日期类型
 * @param maxNum 最大数量
 */
export const getBetweenDate = (dateList, type = 'day', maxNum) => {
  const dates = [];
  let startDate = dateList[0];
  const endDate = dateList[1];
  while (
    startDate.format(timeFormat[type]) !== endDate.format(timeFormat[type])
  ) {
    dates.push(startDate.format(timeFormatUpdata[type]));
    startDate = startDate.add(1, `${type}s`);
    //定义最大数量
    if (maxNum && dates.length >= maxNum - 1) {
      break;
    }
    //小时与分钟只提交10条数据到api
    if ((type === 'minute' || type !== 'hour') && dates.length >= 10) {
      break;
    }
  }
  if (type !== 'minute' || type !== 'hour') {
    dates.push(endDate.format(timeFormatUpdata[type]));
  }
  return dates;
};

/**两个日期之间所有日期
 * @param type 类型
 */
export const formatDate = (time, type = 'date') => {
  let format = '';
  switch (type) {
    case 'date':
      format = 'YYYY年MM月DD日';
      break;
    case 'datetime':
      format = 'YYYY年MM月DD日 HH时mm分';
      break;
    default:
      format = type;
      break;
  }
  return moment(new Date(time), format);
};

/**
 * thisIsFunction
 * 存储本地缓存
 */
export const setStorageKey = (key, data, type) => {
  if (type === 'local') {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

/**
 * thisIsFunction
 * 读取本地缓存
 * @param type =local/session 存储类型
 */
export const getStorageKey = (key, type) => {
  let data;
  if (type === 'local') {
    data = localStorage.getItem(key);
  } else {
    data = sessionStorage.getItem(key);
  }
  if (data) {
    return JSON.parse(data);
  }
  return {};
};

/**
 * thisIsFunction
 * 根据key 求list item
 * @param arr 数组
 * @param key 匹配的key
 * @param keyData 匹配的key对应数据
 */
export const getListItem = (arr, key, keyData) => {
  if (arr.length) {
    let obj = {};
    arr.forEach((item) => {
      if (String(item[key]) === String(keyData)) {
        obj = item;
      }
    });
    return obj;
  }
  return {};
};

/**
 * thisIsFunction
 * 导出xlsx
 * 目前导出由后台处理，不需要此功能
 * @param data array 表格数据
 * @param columns array 表头数据
 * @param fileName 表名字
 * @param columnWidth array //列宽 需与列顺序对应
 * @param sheetFilter array //列过滤
 * https://github.com/cuikangjie/js-export-excel#readme
 *
 * @author Jessie
 */
export const onExportExcel = async (
  data,
  columns,
  fileName,
  columnWidth,
  sheetFilter
) => {
  let option = {};
  const dataTable = [];
  const dataHeader = [];
  const dataWidths = [];
  if (columns) {
    for (let c of columns) {
      if (c['dataIndex'] !== 'operate') {
        dataHeader.push(c['title']);
        dataWidths.push(Number(c['width']) / 6 || 10);
      }
    }
  }
  if (data) {
    for (let d of data) {
      const obj = {};
      for (let c of columns) {
        if (c['dataIndex'] !== 'operate') {
          obj[c['title']] = d[c['dataIndex']];
        }
      }
      // if (statusObj && d['Status']) {
      //   obj['Status'] = statusObj[d['Status']].name;
      // }
      dataTable.push(obj);
    }
  }

  option.fileName =
    `${fileName}_${moment(new Date()).format('YYYYMMDD')}` || '工作簿1';
  option.datas = [
    {
      sheetData: dataTable,
      sheetName: 'sheet',
      sheetHeader: dataHeader,
      columnWidths: columnWidth || dataWidths,
      sheetFilter: sheetFilter || null,
    },
  ];
  // const toExcel = new ExportJsonExcel(option);
  // await toExcel.saveExcel();
  return false;
};

/**深拷贝 */
export const deepCopy = (data) => {
  const val = JSON.stringify(data);
  return JSON.parse(val);
};
