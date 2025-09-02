import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  compress,
  filename2language,
  getDefaultCode,
  getInitFileFromUrl,
} from '@/utils';
import { initFiles } from '@/files';
import { Files, File, PostMessageTypeEnum } from '@/types';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import CompilerWorker from '@/worker/compiler.worker?worker';

interface PlaygroundContext {
  files: Files;
  iframeError: string;
  compiledCode: string;
  selectedFileName: string;
  renamingFilename: string;

  setRenamingFilename: (filename: string) => void;
  setSelectedFileName: (name: string) => void;
  setFiles: (files: Files) => void;
  addFile: (filename: string) => void;
  removeFile: (name: string) => void;
  downloadFiles: () => void;
  updateFileName: (oldName: string, newName: string) => void;
}

export const Context = createContext<PlaygroundContext>({
  selectedFileName: 'App.tsx',
} as PlaygroundContext);

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const compilerWorkerRef = useRef<Worker>(null);
  const [files, setFiles] = useState<Files>(getInitFileFromUrl() || initFiles);
  const [renamingFilename, setRenamingFilename] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('App.tsx');
  const [compiledCode, setCompiledCode] = useState<string>('');
  const [iframeError, setIframeError] = useState<string>('');
  console.log(
    '%c [ iframeError ]',
    'font-size:13px; background:pink; color:#bf2c9f;',
    iframeError,
  );

  function init() {
    if (compilerWorkerRef.current) return;

    compilerWorkerRef.current = new CompilerWorker();
    compilerWorkerRef.current.addEventListener('message', (event) => {
      if (event.data.type === PostMessageTypeEnum.COMPILED) {
        setCompiledCode(event.data.data);
        setIframeError('');
      }
    });
  }

  useEffect(() => {
    init();
  }, []);

  // 监听来自 iframe 的错误信息
  useEffect(() => {
    function handleErrorMessage(
      msg: MessageEvent<{ type: string; message: string }>,
    ) {
      if (msg.data.type == 'ERROR') {
        setIframeError(msg.data.message);
      }
    }
    window.addEventListener('message', handleErrorMessage);

    return () => {
      window.removeEventListener('message', handleErrorMessage);
    };
  }, []);

  useEffect(() => {
    const compressData = compress(JSON.stringify(files));
    // 将压缩过的数据放入 url hash 中
    history.replaceState({}, '', `#${compressData}`);

    // 触发重新编译
    compilerWorkerRef.current?.postMessage(files);
  }, [files]);

  // 新增文件
  const addFile = (filename: string) => {
    const newFile: File = {
      name: filename,
      value: getDefaultCode(filename),
      language: filename2language(filename),
    };
    setFiles({
      ...files,
      [filename]: newFile,
    });
  };

  // 删除文件
  const removeFile = (name: string) => {
    const newFiles = { ...files };
    const filenames = Object.keys(newFiles);
    const index = filenames.findIndex((filename) => filename === name);
    const len = filenames.length;
    delete newFiles[name];
    setFiles(newFiles);
    setSelectedFileName(filenames[(index - 1 + len) % len]);
  };

  // 更新文件名
  const updateFileName = (oldName: string, newName: string) => {
    const newFiles = { ...files };
    newFiles[newName] = {
      ...newFiles[oldName],
      language: filename2language(newName),
    };
    delete newFiles[oldName];
    setFiles(newFiles);
  };

  // 下载文件
  const downloadFiles = async () => {
    const zip = new JSZip();

    Object.keys(files).forEach((filename) => {
      zip.file(filename, files[filename].value);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'playground.zip');
  };

  return (
    <Context.Provider
      value={{
        files,
        selectedFileName,
        renamingFilename,
        compiledCode,
        iframeError,
        setRenamingFilename,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        downloadFiles,
        updateFileName,
      }}
    >
      {children}
    </Context.Provider>
  );
};
