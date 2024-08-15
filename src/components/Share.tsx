/**
 * @author: lxdll
 * 分享组件
 */
import ShareIcon from "@/assets/share.svg?react";
import copy from "copy-to-clipboard";

export default function Share() {
  // 复制
  const copyOperation = () => {
    const isSuccess = copy(window.location.href);
    if (isSuccess) {
      alert("链接已复制到剪贴板");
    }
  };

  return (
    <ShareIcon
      className="w-[20px] h-[20px] cursor-pointer"
      onClick={copyOperation}
    />
  );
}
