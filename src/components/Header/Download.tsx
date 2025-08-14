/**
 * @author: lxdll
 * 下载
 */
import { DownloadIcon } from "@/icons";
import { useContext } from "react";
import { Context } from "@/store/PlaygroundContext";

export default function Download() {
  const { downloadFiles } = useContext(Context);

  return (
    <DownloadIcon
      className="w-[20px] h-[20px] mx-3 cursor-pointer"
      onClick={downloadFiles}
    />
  );
}
