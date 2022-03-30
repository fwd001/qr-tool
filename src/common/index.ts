/* eslint-disable @typescript-eslint/no-explicit-any */

// 吐出一个不存在于 compareStr 中的标识字符串
export const pickTagStr = (compareStr: any) => {
  let tag = '@rr_';
  let index = 0;
  while (compareStr.indexOf(tag) !== -1) {
    tag += index++;
  }
  return tag;
};
// 处理文本中超长的数字变量，通过正则将其转为字符串
export const changeLongToString = (str: any) => {
  const tag = pickTagStr(str);
  return str
    .replace(/:\d{17,}/g, (item: any) => `:"${tag}_r_${item.substr(1)}"`)
    .replace(new RegExp(`${tag}_r_\\s`, 'g'), '')
    .replace(new RegExp(`${tag}_r_`, 'g'), '');
};
// 能否被JSON.parse，可能是字符串 不一定是JSON
export const canJsonParse = (str: any) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
// 解析接口响应返回的text类型的response
export const parseResponse = (str: any) => {
  if (!str || typeof str !== 'string') {
    return str;
  }
  try {
    // 先用最简单的方式处理(异常情况：用户输入字段(如：备注等)匹配到替换规则，导致JSON错位，需特殊处理)
    const response = JSON.parse(changeLongToString(str));
    return response;
  } catch (e) {
    const reg = /:\d{17,}/;
    const tag = pickTagStr(str);
    // 直接对整个str遍历，逐个处理超长的数据类型
    while (reg.test(str)) {
      const strBack = str;
      str = str.replace(reg, (item: any) => `:"${tag}_r_${item.substr(1)}"`); // 需转换 _r_ 占位并添加""
      // 变化后解析失败，判定为无需转换的内容。回退并添加无需转换标识
      if (!canJsonParse(str)) {
        str = strBack.replace(reg, (item: any) => `:${tag}_n_${item.substr(1)}`); // 不需要转换 _n_ 占位
      }
    }
    const result = str
      .replace(new RegExp(`${tag}_r_\\s`, 'g'), '')
      .replace(new RegExp(`${tag}_r_`, 'g'), '')
      .replace(new RegExp(`${tag}_n_\\s`, 'g'), '')
      .replace(new RegExp(`${tag}_n_`, 'g'), '');

    // 仍有错就抛出去吧，方便排查
    return JSON.parse(result);
  }
};

// 解决ts解析key值报错
export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}

export function getAllUrlParams(url = '') {
  // 用JS拿到URL，如果函数接收了URL，那就用函数的参数。如果没传参，就使用当前页面的URL
  const splitIndex = url.indexOf('?');
  let queryString = url.substring(splitIndex + 1) || '';
  // 用来存储我们所有的参数
  const obj: any = {};
  // 如果没有传参，返回一个空对象
  if (splitIndex === -1 || !queryString) {
    return obj;
  }
  // stuff after # is not part of query string, so get rid of it
  queryString = queryString.split('#')[0];
  // 将参数分成数组
  const arr = queryString.split('&');
  for (let i = 0; i < arr.length; i++) {
    // 分离成key:value的形式
    const a = arr[i].split('=');
    // 将undefined标记为true
    const paramName = a[0];
    const paramValue = typeof a[1] === 'undefined' ? true : a[1];
    // 如果paramName以方括号结束, e.g. colors[] or colors[2]
    if (paramName.match(/\[(\d+)?\]$/)) {
      // 如果paramName不存在，则创建key
      const key = paramName.replace(/\[(\d+)?\]/, '');
      if (!obj[key]) obj[key] = [];
      // 如果是索引数组 e.g. colors[2]
      if (paramName.match(/\[\d+\]$/)) {
        // 获取索引值并在对应的位置添加值
        const index = /\[(\d+)\]/.exec(paramName)?.[1];
        obj[key][index || 0] = paramValue;
      } else {
        // 如果是其它的类型，也放到数组中
        obj[key].push(paramValue);
      }
    } else {
      // 处理字符串类型
      if (!obj[paramName]) {
        // 如果如果paramName不存在，则创建对象的属性
        obj[paramName] = paramValue;
      } else if (obj[paramName] && typeof obj[paramName] === 'string') {
        // 如果属性存在，并且是个字符串，那么就转换为数组
        obj[paramName] = [obj[paramName]];
        obj[paramName].push(paramValue);
      } else {
        // 如果是其它的类型，还是往数组里丢
        obj[paramName].push(paramValue);
      }
    }
  }
  return obj;
}

// 拼接query参数
export const setUrlQuery = (options: any) => {
  const { query = [] } = options;
  let { url } = options;
  if (!url) return '';
  if (query) {
    const queryArr = query.map(
      (v: any) => `${v.key}=${encodeURIComponent(encodeURIComponent(v.value))}`
    );
    if (queryArr.length) {
      if (url.indexOf('?') !== -1) {
        url = `${url}&${queryArr.join('&')}`;
      } else {
        url = `${url}?${queryArr.join('&')}`;
      }
    }
  }
  return url;
};

export function imagedata_to_image(imagedata: ImageData) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imagedata.width;
  canvas.height = imagedata.height;
  ctx?.putImageData(imagedata, 0, 0);

  return canvas.toDataURL('image/jpeg', 0.2);
}
