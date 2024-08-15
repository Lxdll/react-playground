import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { compress, filename2language, getInitFileFromUrl } from "./utils";
import { initFiles } from "./files";
import { Files, File } from "./type";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface PlaygroundContext {
  files: Files;
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
  selectedFileName: "App.tsx",
} as PlaygroundContext);

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(getInitFileFromUrl() || initFiles);
  const [renamingFilename, setRenamingFilename] = useState<string>("");
  const [selectedFileName, setSelectedFileName] = useState<string>("App.tsx");

  useEffect(() => {
    const compressData = compress(JSON.stringify(files));
    // 将压缩过的数据放入 url hash 中
    history.replaceState({}, "", `#${compressData}`);
  }, [files]);

  // 新增文件
  const addFile = (filename: string) => {
    const newFile: File = {
      name: filename,
      value: "",
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
    delete newFiles[name];
    setFiles(newFiles);
    setSelectedFileName(filenames[index - 1]);
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

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "playground.zip");
  };

  return (
    <Context.Provider
      value={{
        files,
        selectedFileName,
        renamingFilename,
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
