/**
 * @author: lxdll
 * 下载
 */
import DownloadIcon from "@/assets/download.svg?react";
import { useContext } from "react";
import { Context } from "../PlaygroundContext";

export default function Download() {
  const { downloadFiles } = useContext(Context);

  return (
    <DownloadIcon
      className="w-[20px] h-[20px] mx-3 cursor-pointer"
      onClick={downloadFiles}
    />
  );
}
