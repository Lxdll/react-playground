/**
 * @author: lxdll
 * 错误提示
 */

import { useEffect, useState } from "react";
import CloseIcon from "@/assets/close.svg?react";

interface MessageProps {
  type: "error" | "warn";
  content: string;
}

export default function Message(props: MessageProps) {
  const { content } = props;
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(!!content);
  }, [content]);

  if (visible) {
    return (
      <div className="absolute bottom-3 left-1 right-1 border p-3 h-1/2 overflow-y-scroll bg-red-50 mx-1 pr-10">
        <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
        <CloseIcon
          className="absolute right-3 top-3 cursor-pointer hover:text-active w-[15px] h-[15px]"
          onClick={() => setVisible(false)}
        />
      </div>
    );
  }

  return null;
}
