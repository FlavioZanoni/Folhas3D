import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { DropFilesTypes } from "./types"

export const DropFile = ({ files, setFiles }: DropFilesTypes) => {

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      const stlFiles = acceptedFiles.filter(file => file.name.endsWith('.stl'));

      if (stlFiles.length > 0) {
        setFiles([...files, ...stlFiles]);
      }
    },
    [files, setFiles]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'model/stl': ['.stl'],
    },
  })

  return (
    <div
      {...getRootProps()}
      className="flex flex-col bg-slate-200 rounded-lg p-5 justify-center items-center text-slate-80000"
    >
      <input {...getInputProps()} />
      <p className="m-2 p-2  rounded-md">Arraste ou selecione um arquivo .stl</p>
    </div>
  )
}
