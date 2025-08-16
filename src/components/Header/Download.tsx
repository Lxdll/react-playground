/**
 * @author: lxdll
 * 下载
 */
import { DownloadIcon } from '@/icons';
import { useContext } from 'react';
import { Context } from '@/store/PlaygroundContext';

export default function Download() {
  const { downloadFiles } = useContext(Context);

  return (
    <DownloadIcon
      className="h-[20px] w-[20px] cursor-pointer"
      onClick={downloadFiles}
    />
  );
}
