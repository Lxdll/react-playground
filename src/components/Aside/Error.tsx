/**
 * @author: luxudongg@gmail.com
 * 错误显示
 *    - 重复
 */

import { Context } from '@/store/PlaygroundContext';
import { useContext } from 'react';

export default function Error() {
  const { renamingFilename, files } = useContext(Context);

  if (!renamingFilename) return null;

  const existNames = Object.values(files).map((i) => i.name);
  const hasRepeatError = existNames.includes(renamingFilename);

  if (hasRepeatError) {
    return (
      <div className="absolute inset-x-2 bottom-1 rounded-md border-2 bg-[#fcf0f0] p-2 text-sm text-red-400">
        File "{renamingFilename}" already exists.
      </div>
    );
  }

  return null;
}
