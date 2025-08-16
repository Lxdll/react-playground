/**
 * @author: lxdll
 * 切换主题
 */
import { MoonIcon } from '@/icons';
import { SunIcon } from '@/icons';
import { useState } from 'react';

enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export default function Theme() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme'),
  );
  // 获取当前主题
  const currentTheme = document.documentElement.getAttribute('data-theme');

  const changeTheme = () => {
    const newTheme =
      theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return currentTheme === ThemeEnum.LIGHT ? (
    <SunIcon
      className="h-[20px] w-[20px] cursor-pointer"
      onClick={changeTheme}
    />
  ) : (
    <MoonIcon
      className="h-[20px] w-[20px] cursor-pointer"
      onClick={changeTheme}
    />
  );
}
