/**
 * @author: lxdll
 * Preview
 */

import { useContext, useEffect, useState } from 'react';
import { Context } from '@/store/PlaygroundContext';
import { InitFileNameEnum } from '@/files';
import Message from '@/components/Message';
import { getIframeUrl } from '@/utils';
import Iframe from './Iframe';

export default function Preview() {
  const { files, compiledCode, iframeError } = useContext(Context);
  const importMap = files[InitFileNameEnum.IMPORT_MAP_FILE].value;

  const [iframeUrl, setIframeUrl] = useState<string>(
    getIframeUrl(importMap, compiledCode),
  );

  useEffect(() => {
    setIframeUrl(getIframeUrl(importMap, compiledCode));
  }, [importMap, compiledCode]);

  return (
    <>
      <Iframe url={iframeUrl} />
      <Message content={iframeError} />
    </>
  );
}
