/**
 * @author: Lxdll
 * FileList
 */

import { useContext } from "react";
import { Context } from "../PlaygroundContext";
import { makeFilename } from "../utils";
import FileListItem from "./FileListItem";

export default function FileList() {
  const { files, addFile, setSelectedFileName, setRenamingFilename } =
    useContext(Context);

  const filenameList = Object.keys(files);

  // 新增文件
  const onAddFile = () => {
    const newFilename = makeFilename(Object.keys(files));
    addFile(newFilename);
    setSelectedFileName(newFilename);
    setRenamingFilename(newFilename);
  };

  return (
    <div className="border-[0.5px] px-1 pt-2 flex mb-1 overflow-x-scroll custom-scrollbar-x">
      {filenameList.map((filename, index) => (
        <FileListItem key={index} filename={filename} />
      ))}
      <div
        className="px-2 cursor-pointer hover:text-sky-200"
        onClick={() => onAddFile()}
      >
        +
      </div>
    </div>
  );
}
