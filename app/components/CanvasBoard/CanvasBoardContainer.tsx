import { useCallback, useEffect, useState } from 'react'

import { fabric } from 'fabric'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useEventListener, useUpdateEffect, useWindowSize } from 'usehooks-ts'

import { Transition } from '@headlessui/react'
import {
  MagnifyingGlassPlusIcon as MagnifyingGlassPlusIconSolid,
  MagnifyingGlassMinusIcon as MagnifyingGlassMinusIconSolid,
} from '@heroicons/react/24/solid'

import {
  ArrowUpLeftIcon as ArrowUpLeftOutline,
  PhotoIcon as PhotoIconOutline,
} from '@heroicons/react/24/outline'

import { ElementPlus, Text, TickCircle } from 'iconsax-react'

import CandyCane from '../../assets/images/sprites/xmas/candy-cane.png'
import LightWire from '../../assets/images/sprites/xmas/lights.png'
import ChristmasTree from '../../assets/images/sprites/xmas/christmas-tree.png'
import Snowman from '../../assets/images/sprites/xmas/snowman.png'
import SantaClaus from '../../assets/images/sprites/xmas/santa-claus.png'

import Human from '../../assets/images/sprites/human/human.svg'

type TActionState = 'select' | 'addImage' | 'addText' | 'addCircle' | 'addSquare'
type TSaveState = 'editing' | 'saving' | 'saved'

const CanvasBoardContainer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [saveState, setSaveState] = useState<TSaveState>('editing')
  const [actionState, setActionState] = useState<TActionState>('select')

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

  const addImage = (x: number, y: number) => {
    const randomImage = [CandyCane, LightWire, ChristmasTree, Snowman, SantaClaus, Human]

    fabric.Image.fromURL(randomImage[Math.floor(Math.random() * 6)], (image) => {
      image.scale(0.75)
      image.top = y
      image.left = x
      editor?.canvas.add(image)
      editor?.canvas.renderAll()
    })
    return
  }

  const addSquare = (x: number, y: number) => {
    const rect = new fabric.Rect({
      top: y,
      left: x,
      height: 200,
      width: 200,
      fill: 'white',
      borderColor: '#000000',
      borderScaleFactor: 1,
      hasBorders: true,
    })
    editor?.canvas.add(rect)
    editor?.canvas.renderAll()
  }

  useEffect(() => {
    updateCanvasSize()
    loadSavedCanvas()
  }, [loadSavedCanvas, updateCanvasSize])

  useUpdateEffect(() => {
    updateCanvasSize()
  }, [updateCanvasSize])

  useEventListener('keydown', (event: KeyboardEvent) => {
    event.stopImmediatePropagation()

    if (event.key === 'e' && (event.ctrlKey || event.metaKey)) {
      console.log('export')
    } else if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
      saveCanvasToLocalStorage()
    } else if (event.key === 'z' && (event.ctrlKey || event.metaKey) && event.shiftKey) {
      console.log('redo')
    } else if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
      console.log('undo')
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      console.log('delete object')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      editor?.canvas.remove(editor?.canvas.getActiveObject())
      editor?.canvas.renderAll()
    }
  })

  useEventListener('mousedown', (event: MouseEvent) => {
    if (actionState !== 'select' && isNoActiveObject()) {
      switch (actionState) {
        case 'addImage':
          addImage(event.clientX, event.clientY)
          break
        case 'addText':
          break
        case 'addCircle':
          break
        case 'addSquare':
          addSquare(event.clientX, event.clientY)
          break
      }

      setActionState('select')
    }
  })

  function isActiveObject() {
    return !!editor?.canvas.getActiveObject()
  }

  function isNoActiveObject() {
    return !isActiveObject()
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <>
      <div className="relative box-border flex flex-col overflow-hidden bg-base-200 p-2">
        <FabricJSCanvas
          className="flex rounded-lg border border-amber-500"
          onReady={onReady}
        />
        <div className="absolute w-full">
          <div className="flex flex-row justify-between bg-transparent p-4">
            <div className="btn-group">
              <div
                className={
                  actionState === 'select' ? 'btn-active btn-sm btn' : 'btn-sm btn'
                }
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActionState('select')
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setActionState('select')
                  }
                }}
              >
                <ArrowUpLeftOutline className="h-4 w-4" aria-hidden="true" />
              </div>
              <div
                className={
                  actionState === 'addImage' ? 'btn-active btn-sm btn' : 'btn-sm btn'
                }
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActionState('addImage')
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setActionState('addImage')
                  }
                }}
              >
                <PhotoIconOutline className="h-4 w-4" aria-hidden="true" />
              </div>
              <div
                className={
                  actionState === 'addText' ? 'btn-active btn-sm btn' : 'btn-sm btn'
                }
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActionState('addText')
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setActionState('addText')
                  }
                }}
              >
                <Text size={16} color={'#ffffff'} variant="Broken" />
              </div>
              <div
                className={
                  actionState === 'addCircle' ? 'btn-active btn-sm btn' : 'btn-sm btn'
                }
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActionState('addCircle')
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setActionState('addCircle')
                  }
                }}
              >
                <ElementPlus size={16} color={'#ffffff'} variant="Broken" />
              </div>
              <div
                className={
                  actionState === 'addSquare' ? 'btn-active btn-sm btn' : 'btn-sm btn'
                }
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActionState('addSquare')
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setActionState('addSquare')
                  }
                }}
              >
                <ElementPlus size={16} color={'#ffffff'} variant="Broken" />
              </div>
            </div>
            <div className="btn-group">
              <div
                className="btn-sm btn"
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.preventDefault()

                  editor?.zoomOut()
                }}
                onKeyDown={(event) => {
                  if (event.key === '-' && (event.ctrlKey || event.metaKey)) {
                    editor?.zoomOut()
                  }
                }}
              >
                <MagnifyingGlassMinusIconSolid className="h-4 w-4" aria-hidden="true" />
              </div>
              <div
                className="btn-sm btn"
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.preventDefault()

                  editor?.zoomIn()
                }}
                onKeyDown={(event) => {
                  if (event.key === '+' && (event.ctrlKey || event.metaKey)) {
                    editor?.zoomIn()
                  }
                }}
              >
                <MagnifyingGlassPlusIconSolid className="h-4 w-4" aria-hidden="true" />
              </div>
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
              <TickCircle size={16} fill={'#ffffff'} variant="Broken" />
              <span>Saved!</span>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default CanvasBoardContainer
