import React from 'react'

const AlertDanger = ({text}) => {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-lg border border-red-300 bg-red-100 px-4 py-3 text-red-700">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01M5.07 18h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 15c-.77 1.33.19 3 1.73 3z"
    />
  </svg>

  <span className="text-sm font-medium">
    {text}
  </span>
</div>
  )
}

export default AlertDanger
