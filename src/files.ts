import { Files } from "./type";
import { filename2language } from "./utils";
import App from './template/App.tsx?raw';
import AppCss from './template/App.css?raw';
import Main from './template/main.tsx?raw';
import ImportMap from './template/import-map.json?raw';

export enum InitFileNameEnum {
  APP_COMPONENT = 'App.tsx',
  APP_STYLE = 'App.css',
  ENTRY_FILE = 'main.tsx',
  IMPORT_MAP_FILE = 'import-map.json',
}

// 初始化文件
export const initFiles: Files = {
  // App.tsx
  [InitFileNameEnum.APP_COMPONENT]: {
    name: InitFileNameEnum.APP_COMPONENT,
    value: App,
    language: filename2language(InitFileNameEnum.APP_COMPONENT)
  },
  // App.css
  [InitFileNameEnum.APP_STYLE]: {
    name: InitFileNameEnum.APP_STYLE,
    value: AppCss,
    language: filename2language(InitFileNameEnum.APP_STYLE)
  },
  // main.ts
  [InitFileNameEnum.ENTRY_FILE]: {
    name: InitFileNameEnum.ENTRY_FILE,
    value: Main,
    language: filename2language(InitFileNameEnum.ENTRY_FILE),
  },
  // import-map.json
  [InitFileNameEnum.IMPORT_MAP_FILE]: {
    name: InitFileNameEnum.IMPORT_MAP_FILE,
    value: ImportMap,
    language: filename2language(InitFileNameEnum.IMPORT_MAP_FILE),
  }
}

// 判断文件是否可以删除
export const validateFileCanRemove = (filename: string): boolean => {
  return !(Object.values(InitFileNameEnum) as string[]).includes(filename);
}