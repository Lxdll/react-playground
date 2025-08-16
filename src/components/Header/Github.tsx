/**
 * @author: luxudongg@gmail.com
 * Github
 */

import { GithubIcon } from '@/icons';

export default function Github() {
  return (
    <GithubIcon
      className="cursor-pointer"
      onClick={() => window.open('https://github.com/Lxdll')}
    />
  );
}
