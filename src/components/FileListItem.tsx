/**
 * @author: luxudong@thinredline.com.cn
 * description
 */

import { useContext, useRef, useState } from "react";
import { validateFileCanRemove } from "../files";
import { Context } from "../PlaygroundContext";
import cn from "classnames";

interface FileListItemProps {
  filename: string;
}

export default function FileListItem(props: FileListItemProps) {
  const { filename } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState(filename);

  const {
    removeFile,
    setSelectedFileName,
    selectedFileName,
    renamingFilename,
    updateFileName,
  } = useContext(Context);

  // 判断文件是否可以删除
  const canRemove = validateFileCanRemove(filename);
  const isActive = filename === selectedFileName;
  const isRenaming = renamingFilename === filename;

  // 删除 operation
  const removeOperation = (
    <span
      className="mx-2 text-xs cursor-pointer"
      onClick={() => {
        removeFile(filename);
      }}
    >
      x
    </span>
  );

  const onBlur = () => {
    const newFilename = inputRef.current?.value || "";
    // newFilename 为空
    if (!newFilename) {
      // TODO：message提示
      return;
    }
    // 重名
    if (newFilename === filename) {
      // TODO：message提示
      return;
    }

    updateFileName(filename, newFilename);
    setSelectedFileName(newFilename);
  };

  if (isRenaming) {
    return (
      <div className="relative inline-block box-border flex-shrink-0">
        <span className="text-transparent pr-[36px] min-w-[100px]">
          {inputVal || ""}
        </span>
        <input
          ref={inputRef}
          defaultValue={filename}
          type="text"
          onBlur={onBlur}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="border-none bg-transport absolute inset-[0px_0px_auto] min-w-[1px] outline-none text-inherit p-[0px_3px]"
        />
      </div>
    );
  }

  return (
    <span
      key={filename}
      className={cn(
        "mx-1 flex items-center px-1 cursor-pointer flex-shrink-0",
        isActive && "active-file",
      )}
    >
      <span onClick={() => setSelectedFileName(filename)}>{filename}</span>
      {canRemove && removeOperation}
    </span>
  );
}
