import React from 'react';

const Loader = () => {
  return (
      <div
      className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
  </div>

        
      
  );
}

export default Loader;
