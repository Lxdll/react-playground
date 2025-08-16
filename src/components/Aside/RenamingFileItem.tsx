/**
 * @author: luxudongg@gmail.com
 * 新增正在命名的文件 item
 */

import { Context } from '@/store/PlaygroundContext';
import { useContext, useRef, useState } from 'react';

export default function RenamingFileItem() {
  const {
    files,
    renamingFilename,
    setRenamingFilename,
    setSelectedFileName,
    addFile,
  } = useContext(Context);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState(renamingFilename);

  const onBlur = () => {
    const newFilename = inputRef.current?.value || '';

    const names = Object.values(files).map((i) => i.name);
    const hasRepeat = names.includes(newFilename);

    // 空
    if (!newFilename) {
      setRenamingFilename('');
      return;
    }
    // 有重复
    if (hasRepeat) {
      setRenamingFilename(newFilename);
      return;
    }

    // success
    addFile(newFilename);
    setSelectedFileName(newFilename);
    setRenamingFilename('');
  };

  return (
    <div className="relative box-border flex h-full flex-shrink-0 items-center text-xs">
      <span className="min-w-[100px] pr-[36px] text-transparent">
        {inputVal || ''}
      </span>

      <input
        ref={inputRef}
        defaultValue={renamingFilename}
        autoFocus
        type="text"
        onBlur={onBlur}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        className="bg-transport absolute min-w-[1px] border-none p-[0px_3px] text-inherit outline-none"
      />
    </div>
  );
}
