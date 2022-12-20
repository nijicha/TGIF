import { useCallback, useEffect, useState } from 'react'

import { fabric } from 'fabric'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useEventListener, useUpdateEffect, useWindowSize } from 'usehooks-ts'

import { Transition } from '@headlessui/react'
import {
  ArrowUpLeftIcon as ArrowUpLeftSolid,
  DocumentArrowDownIcon as DocumentArrowDownIconSolid,
  MagnifyingGlassPlusIcon as MagnifyingGlassPlusIconSolid,
  MagnifyingGlassMinusIcon as MagnifyingGlassMinusIconSolid,
} from '@heroicons/react/24/solid'

import { Image, Text, TickCircle } from 'iconsax-react'

import CandyCane from '../../assets/images/sprites/xmas/candy-cane.png'
import LightWire from '../../assets/images/sprites/xmas/lights.png'
import ChristmasTree from '../../assets/images/sprites/xmas/christmas-tree.png'
import Snowman from '../../assets/images/sprites/xmas/snowman.png'
import SantaClaus from '../../assets/images/sprites/xmas/santa-claus.png'

import Human from '../../assets/images/sprites/human/human.svg'

type TMenuState = 'select' | 'addImage' | 'addCircle' | 'addSquare'
type TSaveState = 'editing' | 'saving' | 'saved'

const CanvasBoardContainer = () => {
  const keysPressed: { [key: string]: boolean } = {}

  const [isLoading, setIsLoading] = useState(false)
  const [saveState, setSaveState] = useState<TSaveState>('editing')
  const [menuState, _setMenuState] = useState<TMenuState>('select')

  const { editor, onReady } = useFabricJSEditor()
  const { height } = useWindowSize()

  const loadSavedCanvas = useCallback(() => {
    setSaveState('editing')

    if (localStorage.myFabricJSCanvas) {
      editor?.canvas.loadFromJSON(
        JSON.parse(localStorage.myFabricJSCanvas),
        editor?.canvas.renderAll.bind(editor?.canvas)
      )
    }
  }, [editor?.canvas])

  const saveCanvasToLocalStorage = useCallback(() => {
    setSaveState('saving')

    localStorage.myFabricJSCanvas = JSON.stringify(editor?.canvas.toJSON())

    setSaveState('saved')

    setTimeout(() => {
      setSaveState('editing')
    }, 2000)
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

  const onKeyDownEvent = (event: KeyboardEvent) => {
    event.stopImmediatePropagation()

    keysPressed[event.key] = true

    if (
      keysPressed['z'] &&
      (keysPressed['Ctrl'] || keysPressed['Meta']) &&
      keysPressed['Shift']
    ) {
      console.log('redo')
      console.log(keysPressed)
    } else if (keysPressed['z'] && (keysPressed['Ctrl'] || keysPressed['Meta'])) {
      console.log('undo')
      console.log(keysPressed)
    } else if (keysPressed['s'] && (keysPressed['Ctrl'] || keysPressed['Meta'])) {
      saveCanvasToLocalStorage()
    }
  }

  const onOnKeyUpEvent = (event: KeyboardEvent) => {
    event.stopImmediatePropagation()

    delete keysPressed[event.key]
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
  }, [loadSavedCanvas, updateCanvasSize])

  useUpdateEffect(() => {
    updateCanvasSize()
  }, [updateCanvasSize])

  // Document event Listener
  useEventListener('keydown', onKeyDownEvent)
  useEventListener('keyup', onOnKeyUpEvent)

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-base-200 p-2">
        <FabricJSCanvas
          className="flex rounded-lg border border-amber-500"
          onReady={onReady}
        />
        <div className="absolute flex flex-row justify-between rounded-lg bg-transparent">
          <div className="btn-group m-2.5">
            <div
              className={menuState === 'select' ? 'btn-active btn' : 'btn'}
              role="button"
              tabIndex={0}
              onClick={() => {
                addRect()
              }}
              onKeyDown={(event) => {
                // TODO: Add check from kbd focus event is this button
                if (event.key === 'Enter') {
                  addRect()
                }
              }}
            >
              <ArrowUpLeftSolid className="h-6 w-6" aria-hidden="true" />
            </div>
            <div
              className="btn"
              role="button"
              tabIndex={0}
              onClick={() => {
                addImage()
              }}
              onKeyDown={(event) => {
                // TODO: Add check from kbd focus event is this button
                if (event.key === 'Enter') {
                  addImage()
                }
              }}
            >
              <Image
                className="border-neutral-900 rounded border p-1"
                size={24}
                color={'#ffffff'}
                variant="Broken"
              />
            </div>
            <div
              className="btn"
              role="button"
              tabIndex={0}
              onClick={() => {
                addImage()
              }}
              onKeyDown={(event) => {
                // TODO: Add check from kbd focus event is this button
                if (event.key === 'Enter') {
                  addImage()
                }
              }}
            >
              <Text size={24} color={'#ffffff'} variant="Broken" />
            </div>
            <div
              className="btn"
              role="button"
              tabIndex={0}
              onClick={() => {
                saveCanvasToLocalStorage()
              }}
              onKeyDown={(event) => {
                // TODO: Add check from kbd focus event is this button
                if (event.key === 'Enter') {
                  saveCanvasToLocalStorage()
                }
              }}
            >
              <DocumentArrowDownIconSolid className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
          <div className="input-group-sm input-group m-2.5">
            <div
              className="btn"
              role="button"
              tabIndex={0}
              onClick={(event) => {
                event.preventDefault()

                editor?.zoomOut()
              }}
              onKeyDown={(event) => {
                if (keysPressed['-'] && (keysPressed['Ctrl'] || keysPressed['Meta'])) {
                  editor?.zoomOut()
                }
              }}
            >
              <MagnifyingGlassMinusIconSolid className="h-4 w-4" aria-hidden="true" />
            </div>
            <input type="number" placeholder="100%" className="input" />
            <div
              className="btn"
              role="button"
              tabIndex={0}
              onClick={(event) => {
                event.preventDefault()

                editor?.zoomIn()
              }}
              onKeyDown={(event) => {
                if (keysPressed['+'] && (keysPressed['Ctrl'] || keysPressed['Meta'])) {
                  editor?.zoomIn()
                }
              }}
            >
              <MagnifyingGlassPlusIconSolid className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <Transition
        show={saveState === 'saved'}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="toast-center toast toast-top">
          <div className="alert alert-success">
            <div>
              <TickCircle size={24} fill={'#ffffff'} variant="Broken" />
              <span>Saved!</span>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default CanvasBoardContainer
