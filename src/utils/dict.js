import { isEmpty, isObject, cloneDeep } from 'lodash';

const globalAllDicts = JSON.parse(sessionStorage.getItem('normalizeAllDicts') || '{}');

/**
 * 获取某一个字典列表
 * @param {Object} dicts
 * @param {Array | String} attributionCode
 * @returns {Array}
 */
export const getDictList = attributionCode => {
  const allDicts = isEmpty(globalAllDicts)
    ? JSON.parse(sessionStorage.getItem('normalizeAllDicts') || '{}')
    : globalAllDicts;
  if (Array.isArray(attributionCode)) {
    const tmpData = {};
    Object.keys(allDicts).forEach(key => {
      if (attributionCode.includes(key)) {
        const tmpItem = {
          [key]: allDicts[key] || [],
        };
        Object.assign(tmpData, tmpItem);
      }
    });
    return tmpData;
  }
  if (!isObject(allDicts)) return [];
  return allDicts[attributionCode] || [];
};

/**
 * 获取某一个字典值的中文名称
 * @param {Array | String } dicts 字典key或字典值集
 * @param {String} dictCode
 * @returns {Array}
 */
export const getDictLabel = (dicts, dictCode) => {
  let nextDicts = cloneDeep(dicts);
  if (!nextDicts) return '';
  if (!Array.isArray(nextDicts)) {
    nextDicts = getDictList(nextDicts);
  }
  const dict = nextDicts.find(dictObj => dictObj.value === dictCode);
  return dict ? dict.text : '';
};

/**
 * 获取某一个字典值的code
 * @param {Array | String } dicts 字典key或字典值集
 * @param {String} dictName
 * @returns {Array}
 */
export const getDictValue = (dicts, dictName) => {
  let nextDicts = cloneDeep(dicts);
  if (!nextDicts) return '';
  if (!Array.isArray(nextDicts)) {
    nextDicts = getDictList(nextDicts);
  }
  const dict = nextDicts.find(dictObj => dictObj.text === dictName);
  return dict ? dict.value : '';
};
