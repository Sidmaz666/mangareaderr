import React from 'react'

function Section({children, heading }){
  return (
    <>
      <br />
      
      <span 
	  className="text-3xl md:text-4xl flex p-5 md:justify-center
	  bg-gradient-to-r from-[#060e3d] to-[#132033] 
	  border-b-2 border-[#4DD0E1]/30
	  text-[#B2EBF298]
	  font-semibold
	  pt-10
	">
	{heading}
	</span>
      <div 
	className="flex flex-wrap justify-center 
	p-1 pt-8 md:p-3  
	bg-gradient-to-r from-[#060e3d] to-[#132033] 
	overflow-x-hidden
	min-h-screen
	">
	{children}
      </div>
    </>

  )
}

export default Section
