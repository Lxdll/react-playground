/**
 * @author: lxdll
 * 错误提示
 */

import { useEffect, useState } from 'react';
import { CloseIcon } from '@/icons';

interface MessageProps {
  content: string;
}

export default function Message(props: MessageProps) {
  const { content } = props;
  const [visible, setVisible] = useState<boolean>(!!content);

  useEffect(() => {
    setVisible(!!content);
  }, [content]);

  if (visible) {
    return (
      <div className="absolute right-1 bottom-3 left-1 mx-1 h-1/2 overflow-y-scroll border bg-red-50 p-3 pr-10">
        <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
        <CloseIcon
          className="hover:text-active absolute top-3 right-3 h-[15px] w-[15px] cursor-pointer"
          onClick={() => setVisible(false)}
        />
      </div>
    );
  }

  return null;
}
