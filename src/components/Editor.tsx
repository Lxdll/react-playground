/**
 * @author: lxdll
 * Code Editor
 */
import MonacoEditor, { EditorProps, type OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { createATA } from "../ata";
import { File } from "../type";

interface Props {
  file: File;
  onChange: EditorProps["onChange"];
  options?: editor.IStandaloneDiffEditorConstructionOptions;
}

export default function Editor(props: Props) {
  const { file, onChange, options } = props;
  const { name: filename, value: code, language } = file;

  // 在代码编辑器初始化时，do something
  const onEditorMount: OnMount = (editor, monaco) => {
    // 类型自动推导
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`,
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(editor.getValue());

    // 快捷键 Ctrl + J 格式化代码
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });

    // 设置编辑器的 typescript 编译选项
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });
  };

  return (
    <MonacoEditor
      onMount={onEditorMount}
      height="100%"
      path={filename}
      language={language}
      value={code}
      onChange={onChange}
      options={{
        // 字体大小
        fontSize: 14,
        // 最后一行的话就不能滚动了
        scrollBeyondLastLine: false,
        // 缩略图
        minimap: {
          enabled: false,
        },
        // scrollbar 的大小
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  );
}
