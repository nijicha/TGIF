import { ArrowUpOnSquareIcon as OutlineArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { PhotoIcon as SolidPhotoIcon } from '@heroicons/react/24/solid'

const CanvasBoardOld = () => {
  return (
    <>
      <div className="flex flex-col bg-base-200">
        <div className="glass relative m-2 mt-[64px] flex justify-between bg-base-100 p-2">
          <div className="btn-square btn">
            <SolidPhotoIcon className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="btn-square btn">
            <OutlineArrowUpOnSquareIcon className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  )
}

export default CanvasBoardOld
