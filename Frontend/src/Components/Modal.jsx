import React from 'react'


export default function Modal({children,onClose}) {
  return (
    <>
    <div className='fixed top-0 left-0 w-full h-screen bg-black/75 z-10' onClick={onClose}>
      <div className="fixed top-[34%] left-[30%] z-10 p-8 rounded-md w-[40%] border-none bg-white" onClick={(e)=>e.stopPropagation()}>
       {children}
      </div>
    </div>
    </>
  )
}
