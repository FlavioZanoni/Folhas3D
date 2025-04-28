import React, { useState } from "react"
import { DropFile, View3d } from "../components"
import { PriceForm } from "../components/PriceForm"

var CANVAS_WIDTH = 700
var CANVAS_HEIGHT = 900

const Price: React.FC = () => {
  const [files, setFiles] = useState<Array<File>>([])
  const [volume, setVolume] = useState(0)

  const addVolume = (newVolume: number) => {
    setVolume((prevVolume) => prevVolume + newVolume)
  }

  return (
    <div className="flex flex-col md:flex-row m-14 gap-8">
      <div className="relative">
        <View3d
          setVolume={addVolume}
          files={files}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <div className="absolute top-[420px] left-[200px]">
          {files.length === 0 && <DropFile files={files} setFiles={setFiles} />}
        </div>
      </div>
      <div>
        <PriceForm volume={volume} />
      </div>
    </div>
  )
}

export default Price
