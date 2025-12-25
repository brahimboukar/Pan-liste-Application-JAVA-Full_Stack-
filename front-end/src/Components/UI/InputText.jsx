import React, { forwardRef } from 'react'

const InputText = forwardRef(({ label,value,onChange,placeholder,type }, ref) => {
  return (
    <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder} ref={ref} value={value} onChange={onChange}
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:text-white"
        />
        </div>
  )
})

export default InputText

