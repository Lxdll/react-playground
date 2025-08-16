/**
 * @author: luxudong@thinredline.com.cn
 * description
 */

import { useContext } from 'react';
import { validateFileCanRemove } from '@/files';
import { Context } from '@/store/PlaygroundContext';
import cn from 'classnames';

interface FileListItemProps {
  filename: string;
}

export default function FileListItem(props: FileListItemProps) {
  const { filename } = props;

  const { removeFile, setSelectedFileName, selectedFileName } =
    useContext(Context);

  // 判断文件是否可以删除
  const canRemove = validateFileCanRemove(filename);
  const isActive = filename === selectedFileName;

  // 删除 operation
  const removeOperation = (
    <span
      className="mx-2 cursor-pointer text-xs text-gray-400 hover:text-red-400"
      onClick={() => {
        removeFile(filename);
      }}
    >
      x
    </span>
  );

  return (
    <span
      key={filename}
      className={cn(
        'mx-1 box-border flex flex-shrink-0 cursor-pointer items-center px-1 text-xs',
        isActive && 'active-file',
      )}
    >
      <span onClick={() => setSelectedFileName(filename)}>{filename}</span>
      {canRemove && removeOperation}
    </span>
  );
}
