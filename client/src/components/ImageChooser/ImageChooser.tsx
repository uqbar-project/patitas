import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { FaImage as ImageIcon } from 'react-icons/fa'
import ReactCrop, { Crop } from 'react-image-crop'
import { $t } from '../../services/i18n'
import $ from './ImageChooser.module.scss'


type Props = {
  onImageSelected: (blob: Blob) => void
}

export default ({ onImageSelected }: Props) => {
  const [imageData, setImageData] = useState()
  const [imageElement, setImageElement] = useState()
  const [croppedImageURL, setCroppedImageURL] = useState()
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    x: 25,
    aspect: 1,
  })

  const getCroppedImg = async (image: HTMLImageElement) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width!
    canvas.height = crop.height!
    const ctx = canvas.getContext('2d')!

    ctx.drawImage(image, crop.x! * scaleX, crop.y! * scaleY, crop.width! * scaleX, crop.height! * scaleY, 0, 0, crop.width!, crop.height!)

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) return reject(new Error('Canvas is empty'))
        // TODO:
        // window.URL.revokeObjectURL(this.fileUrl)
        // this.fileUrl = window.URL.createObjectURL(blob)
        onImageSelected(blob)
        const fileUrl = window.URL.createObjectURL(blob)
        resolve(fileUrl)
      }, 'image/jpeg')
    })
  }

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setImageData(reader.result))
      reader.readAsDataURL(event.target.files[0])
    }
  }

  const onCancel = (event: MouseEvent) => {
    event.preventDefault()
    setImageData(null)
  }

  const onAccept = async (event: MouseEvent) => {
    event.preventDefault()
    if (imageElement && crop.width && crop.height) {
      const cropped = await getCroppedImg(imageElement)
      setCroppedImageURL(cropped)
    }
    setImageData(null)
  }

  return (
    <div className={$.container}>
      {imageData
        ? (
          <>
            <div className={$.cropContainer}>
              <ReactCrop
                src={imageData}
                crop={crop}
                ruleOfThirds
                onImageLoaded={setImageElement}
                onChange={setCrop}
              />
            </div>
            <div className={$.cropActions}>
              <button onClick={onCancel}>{$t('actions.cancel')}</button>
              <button type='submit' onClick={onAccept}>{$t('actions.accept')}</button>
            </div>
          </>
        ) : (
          <label className={$.input}>
            {croppedImageURL
              ? <img alt='image' src={croppedImageURL} />
              : <ImageIcon />
            }
            <input type='file' accept='image/*' onChange={onSelectFile} />
          </label>
        )}
    </div>
  )
}