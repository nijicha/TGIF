import { useCallback, useEffect, useState } from 'react'

import { fabric } from 'fabric'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useUpdateEffect, useWindowSize } from 'usehooks-ts'

import {
  RectangleStackIcon as RectangleStackIconSolid,
  PhotoIcon as PhotoIconSolid,
  DocumentArrowDownIcon as DocumentArrowDownIconSolid,
} from '@heroicons/react/24/solid'

import CandyCane from '../../assets/images/sprites/xmas/candy-cane.png'
import LightWire from '../../assets/images/sprites/xmas/lights.png'
import ChristmasTree from '../../assets/images/sprites/xmas/christmas-tree.png'
import Snowman from '../../assets/images/sprites/xmas/snowman.png'
import SantaClaus from '../../assets/images/sprites/xmas/santa-claus.png'

import Human from '../../assets/images/sprites/human/human.svg'

// interface IFabricCanvasOptions {
//   showGrid: boolean
//   gridSize?: number
// }

const CanvasBoardContainer = () => {
  const { editor, onReady } = useFabricJSEditor()
  const { height } = useWindowSize()
  const [isLoading, setIsLoading] = useState(false)

  const loadSavedCanvas = useCallback(() => {
    editor?.canvas.loadFromJSON(
      JSON.parse(localStorage.myFabricJSCanvas),
      editor?.canvas.renderAll.bind(editor?.canvas)
    )
  }, [editor?.canvas])

  const updateCanvasSize = useCallback(() => {
    setIsLoading(true)

    // NOTE: monkey patch
    editor?.canvas.setHeight(height - 18)

    setIsLoading(false)
  }, [editor?.canvas, height])

  const addRect = () => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: 'white',
    })
    editor?.canvas.add(rect)
    editor?.canvas.renderAll()
  }

  const addImage = () => {
    const randomImage = [CandyCane, LightWire, ChristmasTree, Snowman, SantaClaus, Human]

    fabric.Image.fromURL(randomImage[Math.floor(Math.random() * 6)], (image) => {
      image.scale(0.75)
      editor?.canvas.add(image)
      editor?.canvas.renderAll()
    })
    return
  }

  const saveToLocalStorage = () => {
    localStorage.myFabricJSCanvas = JSON.stringify(editor?.canvas.toJSON())
  }

  useEffect(() => {
    updateCanvasSize()
    loadSavedCanvas()

    // if (options.showGrid) {
    //   const canvasBoardSize = editor?.canvas?.width || window.innerWidth
    //   const gridSize = options.gridSize || 5
    //   for (let x = 1; x < canvasBoardSize / gridSize; x++) {
    //     editor?.canvas.add(
    //       new fabric.Line([100 * x, 0, 100 * x, height], {
    //         stroke: '#000000',
    //         strokeWidth: 1,
    //         selectable: false,
    //         strokeDashArray: [gridSize, gridSize],
    //       })
    //     )
    //     editor?.canvas.add(
    //       new fabric.Line([0, 100 * x, width, 100 * x], {
    //         stroke: '#000000',
    //         strokeWidth: 1,
    //         selectable: false,
    //         strokeDashArray: [gridSize, gridSize],
    //       })
    //     )
    //   }
    //   editor?.canvas.renderAll()
    // }
  }, [updateCanvasSize])

  useUpdateEffect(() => {
    updateCanvasSize()
  }, [updateCanvasSize])

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div className="flex flex-col overflow-hidden bg-base-200">
      <FabricJSCanvas
        className={`m-2 flex rounded-lg border border-amber-500`}
        onReady={onReady}
      />
      <div className="btn-group absolute m-2">
        <div
          className="btn"
          role="button"
          tabIndex={0}
          onClick={() => {
            addRect()
          }}
          onKeyDown={() => {
            addRect()
          }}
        >
          <RectangleStackIconSolid className="h-4 w-4" aria-hidden="true" />
        </div>
        <div
          className="btn"
          role="button"
          tabIndex={0}
          onClick={() => {
            addImage()
          }}
          onKeyDown={() => {
            addImage()
          }}
        >
          <PhotoIconSolid className="h-4 w-4" aria-hidden="true" />
        </div>
        <div
          className="btn"
          role="button"
          tabIndex={0}
          onClick={() => {
            addRect()
          }}
          onKeyDown={() => {
            addRect()
          }}
        >
          <RectangleStackIconSolid className="h-4 w-4" aria-hidden="true" />
        </div>
        <div
          className="btn"
          role="button"
          tabIndex={0}
          onClick={() => {
            addRect()
          }}
          onKeyDown={() => {
            addRect()
          }}
        >
          <RectangleStackIconSolid className="h-4 w-4" aria-hidden="true" />
        </div>
        <div
          className="btn"
          role="button"
          tabIndex={0}
          onClick={() => {
            saveToLocalStorage()
          }}
          onKeyDown={() => {
            saveToLocalStorage()
          }}
        >
          <DocumentArrowDownIconSolid className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

export default CanvasBoardContainer
