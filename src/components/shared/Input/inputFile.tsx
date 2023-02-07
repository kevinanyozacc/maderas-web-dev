import { ChangeEvent, useState } from 'react'

interface IPros {
  label?: string
  id: string
}
const InputFile = ({ label = 'Adjuntar', id }: IPros) => {
  const [selectedFile, setSelectedFile] = useState<File>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0])
  }

  return (
    <div className="flex items-center gap-x-2 py-1 px-2  bg-gray-200 dark:bg-slate-700 bg-opacity-50 h-[60px] rounded shadow w-full">
      <input
        type="file"
        className="hidden"
        onChange={handleChange}
        id={`file-${id}`}
      />

      <label
        htmlFor={`file-${id}`}
        className="btn btn-solid-primary px-5 text-xs  md:text-base"
      >
        {label}
      </label>

      <p className="text-sm text-slate-500 ">{selectedFile?.name}</p>
    </div>
  )
}

export default InputFile
