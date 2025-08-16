export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

export enum PostMessageTypeEnum {
  ERROR = 'error',
  COMPILED = 'compiled_code',
}
