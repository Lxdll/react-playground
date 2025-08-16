/**
 * @author: Lxdll
 * FileList
 */

import { useContext } from 'react';
import { Context } from '@/store/PlaygroundContext';
import { makeFilename } from '@/utils';
import FileListItem from './FileListItem';
import RenamingFileItem from './RenamingFileItem';

export default function FileList() {
  const { files, setRenamingFilename, renamingFilename } = useContext(Context);

  const filenameList = Object.keys(files);

  // 新增文件
  const onAddFile = () => {
    const newFilename = makeFilename(Object.keys(files));
    setRenamingFilename(newFilename);
  };

  return (
    <div className="custom-scrollbar-x mb-1 flex shrink-0 overflow-x-scroll px-1 pt-2">
      {filenameList.map((filename, index) => (
        <FileListItem key={index} filename={filename} />
      ))}

      {renamingFilename && <RenamingFileItem />}

      <div
        className="cursor-pointer px-2 hover:text-sky-200"
        onClick={() => onAddFile()}
      >
        +
      </div>
    </div>
  );
}
