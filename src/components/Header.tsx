/**
 * @author: lxdll
 * Header
 */

import Download from "./Download.tsx";
import Share from "./Share.tsx";
import Theme from "./Theme.tsx";
import ReactLogoIcon from "@/assets/logo.svg?react";

export default function Header() {
  return (
    <div className="w-full h-[6vh] border-[0.5px] flex items-center px-2 justify-between">
      <div className="flex">
        <ReactLogoIcon className="w-[20px] h-[20px]" />
        <span className="mx-2">React Playground</span>
      </div>
      <div className="flex items-center">
        <Share />
        <Download />
        <Theme />
      </div>
    </div>
  );
}
