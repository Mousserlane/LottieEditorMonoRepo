import React, { useState, useCallback, useEffect } from 'react'
import ReactDropzone from 'react-dropzone';

interface IDropzoneProps {
  onDrop: (acceptedFiles: string) => void;
  onPickFromLottie?: () => void;
}
export const Dropzone: React.FC<IDropzoneProps> = ({ onDrop, onPickFromLottie }) => {

  const [isDomLoaded, setIsDomLoaded] = useState(false);

  useEffect(() => {
    setIsDomLoaded(true)
  }, [])

  const onFileDropped = useCallback((files: File[]) => {
    const blob = new Blob([files[0]], { type: 'application/json' });

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const content = fileReader.result
      if (content)
        onDrop(content as string)
    }

    fileReader.readAsText(blob)

  }, [])

  return (
    <div className='flex flex-1 justify-center items-center h-full flex-col'>
      {isDomLoaded && (
        <ReactDropzone onDrop={onFileDropped} accept={{ 'application/json': [] }}>
          {({ getInputProps, getRootProps }) => (
            <div {...getRootProps()} className=''>
              <input {...getInputProps()} />
              <p>Drag and drop file here or click to select</p>
            </div>
          )}
        </ReactDropzone>
      )}
      <p>Or</p>
      <button onClick={onPickFromLottie} className='bg-transparent'>
        <p>Click here to select from lottie</p>
      </button>
    </div>
  )
}