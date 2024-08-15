import { transform } from "@babel/standalone";
import { Files, File } from "./type";
import { InitFileNameEnum } from "./files";
import { PluginObj } from '@babel/core'

const beforeTransform = (filename: string, code: string) => {
  // 检查是否有 React 导入语句
  const validateReactImportRegex = /import\s+React/g;
  // 是否需要引入 React
  const needReactImport = (filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !validateReactImportRegex.test(code);

  return needReactImport ? `import React from 'react';\n${code}` : code;
}

export const babelTransform = (filename: string, code: string, files: Files) => {
  const _code = beforeTransform(filename, code)
  let result = ''

  try {
    result = transform(_code, {
      filename,
      presets: ['react', 'typescript'],
      plugins: [customResolver(files)],
      retainLines: true,
    }).code || ''
  } catch (error) {
    console.error('编译出错', error)
  }

  return result;
}

const customResolver = (files: Files): PluginObj => {
  const getModuleFile = (files: Files, modulePath: string): File => {
    let moduleName = modulePath.split('./').pop() || ''
    if (!moduleName.includes('.')) {
      const realModuleName = Object.keys(files).find(filename => {
        return filename.split('.').includes(moduleName)
          && (filename.endsWith('.ts') || filename.endsWith('.tsx') || filename.endsWith('.js') || filename.endsWith('.jsx'))
      })

      if (realModuleName) {
        moduleName = realModuleName
      }
    }

    return files[moduleName]
  }

  // 处理 JSON 文件
  const json2Js = (file: File) => {
    const js = `export default ${file.value}`
    return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
  }

  // 处理 css 文件
  const css2Js = (file: File) => {
    const randomId = new Date().getTime()
    const js = `
      const stylesheet = document.createElement('style')
      stylesheet.setAttribute('id, 'style_${randomId}_${file.name}')
      document.head.appendChild(stylesheet)

      const style = document.createTextNode(\`${file.value}\`)
      stylesheet.innerHTML = ''
      stylesheet.appendChild(style)
    `
    return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
  }

  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value
        if (modulePath.startsWith('.')) {
          const file = getModuleFile(files, modulePath)

          if (!file) return

          // css
          if (file.name.endsWith('.css')) {
            path.node.source.value = css2Js(file)
          } else if (file.name.endsWith('.json')) { // JSON
            path.node.source.value = json2Js(file)
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                type: 'application/javascript'
              })
            )
          }

        }
      }
    }
  }
}

export const compile = (files: Files) => {
  const main = files[InitFileNameEnum.ENTRY_FILE]
  return babelTransform(main.name, main.value, files)
}

self.addEventListener('message', (event) => {
  try {
    self.postMessage({
      type: 'COMPILED_CODE',
      data: compile(event.data)
    })
  } catch (error) {
    self.postMessage({
      type: 'ERROR',
      error
    })
  }
})
