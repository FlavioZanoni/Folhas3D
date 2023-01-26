import React, { useState } from "react"
import { DropFile, View3d } from "../components"
import { CotacaoForm } from "../components/CotacaoForm"
var CANVAS_WIDTH = 600
var CANVAS_HEIGHT = 800
const Cotacao: React.FC = () => {
  const [files, setFiles] = useState<Array<File>>([])
  const [volume, setVolume] = useState<string>("")

  return (
    <div className="flex flex-row m-14 gap-8">
      <div className="relative">
        <View3d
          setVolume={setVolume}
          files={files}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <div className="absolute top-[400px] left-[150px]">
          {files.length === 0 && <DropFile files={files} setFiles={setFiles} />}
        </div>
      </div>
      <div>
        <CotacaoForm volume={volume} />
      </div>
    </div>
  )
}

export default Cotacao
