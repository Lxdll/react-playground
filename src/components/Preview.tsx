/**
 * @author: lxdll
 * Preview
 */

import { useContext, useEffect, useRef, useState } from "react";
import CompilerWorker from "../compiler.worker?worker";
import { Context } from "../PlaygroundContext";
import iframeRaw from "../iframe.html?raw";
import { InitFileNameEnum } from "../files";
import Message from "./Message";

export default function Preview() {
  const { files } = useContext(Context);
  const [compiledCode, setCompiledCode] = useState<string>("");
  console.log(
    "%c [ compiledCode ]",
    "font-size:13px; background:pink; color:#bf2c9f;",
    compiledCode,
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const compilerWorkerRef = useRef<Worker>();

  function getIframeUrl() {
    const iframeHtmlStr = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[InitFileNameEnum.IMPORT_MAP_FILE].value}</script>`,
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`,
      );

    return URL.createObjectURL(
      new Blob([iframeHtmlStr], { type: "text/html" }),
    );
  }

  useEffect(() => {
    compilerWorkerRef.current?.postMessage(files);
  }, [files]);

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker();
      compilerWorkerRef.current.addEventListener("message", (event) => {
        console.log("接受到的data：", event.data);

        if (event.data.type === "COMPILED_CODE") {
          setCompiledCode(event.data.data);
        } else if (event.type === "ERROR") {
          console.error(event.data.data);
        }
      });
    }
  }, []);

  // 监听来自 iframe 的错误信息
  useEffect(() => {
    function handleErrorMessage(
      msg: MessageEvent<{ type: string; message: string }>,
    ) {
      console.log(
        "%c [ msg ]",
        "font-size:13px; background:pink; color:#bf2c9f;",
        msg,
      );
      if (msg.data.type !== "ERROR") return;
      setErrorMsg(msg.data.message);
    }
    window.addEventListener("message", handleErrorMessage);

    return () => {
      window.removeEventListener("message", handleErrorMessage);
    };
  }, []);

  const [iframeUrl, setIframeUrl] = useState<string>(getIframeUrl());

  useEffect(() => {
    setIframeUrl(getIframeUrl());
  }, [files[InitFileNameEnum.IMPORT_MAP_FILE].value, compiledCode]);

  return (
    <>
      <iframe src={iframeUrl} style={{ width: "100%", height: "100%" }} />
      <Message type="error" content={errorMsg} />
    </>
  );
}
