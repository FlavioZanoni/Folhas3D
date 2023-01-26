import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { DropFilesTypes } from "./types"
export const DropFile = ({ files, setFiles }: DropFilesTypes) => {
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      acceptedFiles.map((file) => {
        setFiles([...files, file])
      })
    },
    [files, setFiles]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  return (
    <div
      {...getRootProps()}
      className="flex flex-col bg-slate-200 rounded-lg p-5 justify-center items-center text-slate-80000"
    >
      <input {...getInputProps()} />
      <p className="m-2 p-2  rounded-md">Arraste ou selecione um arquivo</p>
    </div>
  )
}
