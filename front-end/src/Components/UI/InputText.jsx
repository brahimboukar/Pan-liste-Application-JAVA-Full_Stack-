import React, { forwardRef } from "react";

const InputText = forwardRef(
  ({ label, value, onChange, placeholder, type, error }, ref) => {
    return (
      <div className="w-full">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          {label}
        </label>

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`h-11 w-full rounded-lg border bg-transparent px-4 text-sm focus:outline-none
            ${error ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 dark:border-gray-700"}
            dark:text-white
          `}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

export default InputText;
