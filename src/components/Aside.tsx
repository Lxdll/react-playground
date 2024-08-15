/**
 * @author: lxdll
 * Aside
 */

import { useContext } from "react";
import Editor from "./Editor";
import FileList from "./FileList";
import { Context } from "../PlaygroundContext";

export default function Aside() {
  const { files, selectedFileName, setFiles } = useContext(Context);
  const currentFile = files[selectedFileName];

  const onCodeChange = (newCode: string | undefined) => {
    files[selectedFileName].value = newCode || "";
    setFiles({ ...files });
  };

  return (
    <>
      <FileList />
      <Editor file={currentFile} onChange={onCodeChange} />
    </>
  );
}
