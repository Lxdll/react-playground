/**
 * @author: lxdll
 * Header
 */

import Download from "./Download";
import Share from "./Share";
import Theme from "./Theme";
import { ReactLogoIcon } from "@/icons";

export default function Header() {
  return (
    <div className="w-full h-[6vh] border-b-[0.5px] flex items-center px-2 justify-between border-[#ccc]">
      <div className="flex items-center">
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
