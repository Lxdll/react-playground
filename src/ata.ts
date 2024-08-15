import { setupTypeAcquisition } from "@typescript/ata"
import typescript from 'typescript'

export const createATA = (onDownloadFile: (code: string, path: string) => void) => {
  const ata = setupTypeAcquisition({
    projectName: 'react-playground-ata',
    typescript: typescript,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        console.log('receivedFile', code, path)
        onDownloadFile(code, path)
      },
    }
  })

  return ata
}