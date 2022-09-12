import React, { useState,useEffect } from "react"
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Section from '../components/Section.jsx'
import defaultImg from '../components/img/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'
import ChapterList from '../components/ChapterList.jsx'

export default function Chapter(){
  
  const {state} = useLocation()
  const {manga_id} = useParams()

  const [isChapter,setChapter] = useState()
  const [isImg,setImg] = useState(defaultImg)

  const goTo = useNavigate()

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    axios.get(`https://fetch-manga.herokuapp.com/chapter/${manga_id}`)
      .then(data => {
		setChapter(data.data.data.list.reverse())
      })

      axios.get(`https://fetch-manga.herokuapp.com/thumb/${state.thumb}`)
      .then(data => {
		setImg(data.data.image_uri)
      })

    document.title = `Manga Reader ~ ${state.title}`

  },[])


  return (
      <Section heading={state.title}>
	<div
	  className="
	  flex
	  flex-col
	  w-full
	  items-center
	  md:items-start
	  md:p-2
	  md:flex-row
	  md:justify-between
	  "
	>
	  <img src={isImg} 
	  className="w-[300px] md:h-[450px] rounded-lg h-[300px]"
	  title={state.title}
	  alt={state.title} />

	  <div
	    className="
	    flex
	    md:flex
	    md:items-start
	    md:w-full
	    md:p-3
	    p-2
	    flex-col
	    w-[300px]
	    md:w-auto
	    pt-5
	    font-sans
	    text-xl
	    text-[#42A5F5]
	    md:mr-5
	    space-y-3
	    md:space-y-5
	    md:pl-8
	    font-semibold
	    "
	  >
		<span>
		  Rating : <span className="font-bold text-[#EEFF41]">{state.rating}</span>
		</span> 	
	 
	    <span className=" flex flex-wrap space-x-2"> 
	    {
	      state.category == 'Not Mentioned' ? 'Unknown Category' :
	      state.category.split(',').map((cat,index) => {
		return (
		<a 
		    key={cat+index}
		    className="capitalize hover:text-[#1565C0]"
	 	     href={`/category?k=${cat}`}>
		      {`${cat}`}
		</a>
		)
	      })
	    }
	    </span>

		<span>
		  Views : <span className="font-bold text-[#00E676]">{state.views}</span>
		</span> 	

		<span>
		  Details : <span className="font-bold text-[#FFB74D]">{`${state.description}...`}</span>
		</span> 	

		<button
		  onClick={
		    () => {
		      goTo(`/view/${isChapter && isChapter[0].chapter_id}`,{
			state :{
				chapters : isChapter,
				title : isChapter[0].chapter_title

		  }
		  	}
		  )
		  }
		  }
		  className="
		  p-2
		  rounded-md
		  hover:bg-[#1565C0]
		  bg-[#1565C080]
		  text-[#BBDEFB]
		  "
		  title={isChapter && isChapter[0].chapter_title }
		>
		Start Reading
		</button>

	  </div>
	</div>

		<ChapterList chapterList={isChapter && isChapter} />

      </Section>
  )
}
