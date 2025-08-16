/**
 * @author: lxdll
 * Header
 */

import Download from './Download';
import Github from './Github';
import Share from './Share';
import Theme from './Theme';
import { ReactLogoIcon } from '@/icons';

export default function Header() {
  return (
    <div className="flex h-[6vh] w-full items-center justify-between border-b-[0.5px] border-[#ccc] px-2">
      <div className="flex items-center">
        <ReactLogoIcon className="h-[20px] w-[20px]" />
        <span className="mx-2">React Playground</span>
      </div>
      <div className="flex items-center gap-3">
        <Github />
        <Share />
        <Download />
        <Theme />
      </div>
    </div>
  );
}
