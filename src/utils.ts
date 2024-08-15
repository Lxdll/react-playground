/**
 * @author: lxdll
 * 工具函数
 */

import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate";

enum Language {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  CSS = 'css',
  JSON = 'json',
}
/**
 * 按照文件名后缀判断文件类型
 * @param filename @type {string}
 * @returns @type {Language}
 */
export const filename2language = (filename: string): Language => {
  const suffix = filename.split(".").pop() || '';

  if (['js', 'jsx'].includes(suffix)) return Language.JAVASCRIPT;
  if (['ts', 'tsx'].includes(suffix)) return Language.TYPESCRIPT;
  if (['css'].includes(suffix)) return Language.CSS;
  if (['json'].includes(suffix)) return Language.JSON;

  return Language.JAVASCRIPT;
}

/**
 * make 一个新的文件名称
 * @param existFilenameList @type {string[]} 已经存在的文件名称列表
 * @returns @type {string} 新的文件名称
 */
export const makeFilename = (existFilenameList: string[]): string => {
  const filenameBase = 'Comp';
  let index = 1;

  while (existFilenameList.some(filename => filename.startsWith(`${filenameBase}${index}.`))) {
    index++
  }

  return `${filenameBase}${index}.tsx`;
}

// 压缩
export const compress = (data: string): string => {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  // 将二进制数据转为 base64 字符串
  return btoa(binary)
}

// 解压缩
export const uncompress = (base64: string): string => {
  const binary = atob(base64)
  const buffer = strToU8(binary, true)
  const unzipped = unzlibSync(buffer)
  return strFromU8(unzipped)
}

// 将 url 中的文件初始化数据解析出来
export const getInitFileFromUrl = () => {
  const hash = location.hash.slice(1);
  if (!hash) return;
  try {
    const files = JSON.parse(uncompress(hash));
    if (files) {
      return files;
    }
  } catch (e) {
    console.error(e);
  }
}