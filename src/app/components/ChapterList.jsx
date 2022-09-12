import React from "react"
import { useNavigate } from 'react-router-dom'
import { FaArrowsAltV } from 'react-icons/fa'

export default function ChapterList(props){

  const isChapter = props.chapterList

  const goTo = useNavigate()

  let isReverse = false
  function reverseChapterList(parent){
	  const arr = Array.from(parent.childNodes)
	  arr.reverse()
	  parent.append(...arr)
    	  isReverse = isReverse ? false : true
  }

  const scrollToTarget = (childElement, parentElement) => {
      parentElement.scrollTop = childElement.offsetTop - parentElement.offsetTop;
}
  
  return (
    <>
		<div
		className="
		  flex
		  w-full
		  justify-between
		  items-center
		  pt-8
		  pb-5
	          p-2
		  md:pb-2
		  md:pt-2
		  "
		>

		  <div className="w-full md:w-auto">
	
		    <input type="number"
		      className="
		      w-[95%]
		      md:w-auto
		      p-2
		      rounded-md
		      bg-[#424242]
		      text-[#90CAF9]
		      font-semibold
		      placeholder-[#90CAF9]
		      outline-none
		      "
		      placeholder="Jump To Chapter . . ."
		      onChange={(e) => {

				const search_for = "chapter_" +  e.target.value
				  let select_elm 
					
				if(isReverse){
			      		reverseChapterList(document.querySelector('.scrollbar'))
		      		}
					
				    Array.from(document.querySelectorAll('.scrollbar > button')).reverse().forEach(e =>{
				    
				if(search_for == "chapter_"){
				  scrollToTarget(document.querySelectorAll('.scrollbar > button')[0],
					    document.querySelector('.scrollbar'))
					e.style.background = "#1a1f3d"
					return
		      		}
				      if(e.id.includes(search_for)){
						select_elm = e
						select_elm.style.background = "#2962FF"
		      			} else {
						e.style.background = "#1a1f3d"
		      			}
					
		      		})

				  if(select_elm){
		      			  scrollToTarget(select_elm,
		      				document.querySelector('.scrollbar'))
		     			 }
					
		      }}
		    />

		  </div>

			<button
			  className="
			  text-[#81D4FA]
			  hover:text-[#E3F2FD]
			  outline-none
			  "
			  onClick={
			    () => {
			      		reverseChapterList(document.querySelector('.scrollbar'))
			  	}
			  }
			>
			  <FaArrowsAltV/>
			</button>




		</div>

	<div
	  className={`
		flex
		flex-col
	  	w-full
	  	items-center
	  	p-3
	  	md:items-start
	  	space-y-3
	  	h-80
	  	overflow-x-hidden
	  	overflow-y-scroll
	  	scrollbar
	  	scrollbar-track-[#263238]
	  	scrollbar-thumb-[#455A64]
		mb-5
	  `}
	>
	{
	  isChapter && isChapter.map((chapter) => {
	    return (
	    	<button
	    className="
	    	flex
	        flex-row
	    	w-full
	    	justify-center
	    	md:justify-start
	    	bg-[#1a1f3d]
	    	text-white
	    	p-2
	    	rounded-md
	    "
	    onClick ={() => {
		      goTo(`/view/${chapter && chapter.chapter_id}`,{
			state : {

				chapters : isChapter,
				title : chapter.chapter_title
	  		
	  			}
		  	})
	  	}}
	    	id={chapter.chapter_title.toLocaleLowerCase().replaceAll(' ','_')}
	    	title={chapter.chapter_title}
	  	key={chapter.chapter_id}>
		{chapter.chapter_title}
	</button>
	    )
	})
	}

	</div>
    </>

  )
}

