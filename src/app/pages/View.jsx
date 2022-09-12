import React, {useState,useEffect} from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import Section from '../components/Section.jsx'
import ChapterList from "../components/ChapterList.jsx"
import LoadImg from '../components/LoadImg.jsx'
import axios from "axios"
import { TailSpin } from "react-loader-spinner"


export default function View(){

const {chapter_id} = useParams()
const {state} = useLocation()

const goTo = useNavigate()

const [isDetail,setDetails] = useState()
const [isImgId,setImgId] = useState() 
const [isLoad,setLoad] = useState(true)
const [isCurrent,setCurrent] = useState()
const [isHide,setHide] =  useState(true)

  useEffect(() => {
    setLoad(true)
    axios.get(`https://fetch-manga.herokuapp.com/view/${chapter_id}`)
      .then((data) => {
	setDetails(data.data.data)
	setImgId(data.data.data.image_id)
	setLoad(false)
      })

    Array.from(state.chapters).forEach((e,i) => {
      if(e.chapter_id == chapter_id){
	
	const currentIndex = i
	const currentObj = e

	const nextIndex = i + 1
	const nextObj = state.chapters[nextIndex]


	const prevIndex = i - 1
	const prevObj = state.chapters[prevIndex]

	setCurrent({
		currentIndex,
	  	currentObj,
	  	nextIndex,
	  	nextObj,
	  	prevIndex,
	  	prevObj
	})

      }
    })

    document.title = state.title

  },[chapter_id])

  return (
	<Section heading={`${state.title}`}>

	  {
	    isLoad ? <>
	  	  <div className="
	flex
	p-2
	justify-center
	items-center
	">
	<TailSpin
 	 ariaLabel="loading-indicator"
	  height={100}
	  width={1000}
	  color="#B2EBF2"
	/>
	  </div>
	  <br/>
	    </> :<>

	      <div
		className="
		flex
		p-2
		pb-8
		flex-col
		space-y-2
		text-xl
		font-semibold
		text-[#64B5F690]
		"
	      >
		

		<span>Other Names :
		<span>{` ${isDetail.alt_title}`}</span>
		</span> 
		<span>Status :
		<span>{` ${isDetail._status}`}</span>
		</span> 
		<span>Last Updated :
		<span>{` ${isDetail.last_updated}`}</span>
		</span> 
		<span>Rating :
		<span>{` ${isDetail.rating}`}</span>
		</span> 
		<span className=" flex flex-wrap space-x-2">
	    {
	      isDetail.category == 'Not Mentioned' ? 'Unknown Category' :
	      isDetail.category.split(',').map((cat,index) => {
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

		<span>Description :
		<span>{` ${isDetail.description}`}</span>
		</span> 
		<span>Authors :
		<span>{` ${isDetail.authors.replace(/([A-Z])/g, " $1").trim()}`}</span>
		</span> 

	      </div>
	      
	      <button
		className="
		flex
		w-[80%]
		p-2
		text-xl
		rounded-md
		bg-[#0D47A1]
		text-white
		justify-center
		mb-5
		"
		onClick={() => {
			setHide(!isHide)
		}}
	      > {
		isHide ?  'Jump To Chapter' : "Close"
	      }</button>

	      <div
		className={`
			w-full
			${isHide ? 'hidden' : ''}
		`}
	      >
	      <ChapterList  chapterList={state.chapters} />


	      </div>
	      


		<div
		  className="
		  flex
		  w-full
		  p-2
		  mb-5
		  justify-between
		  "
		>
		

		  {
		    isCurrent.prevObj && isCurrent.prevIndex !== -1 ? <>
		  <button
		    className="
		    p-2
		    text-lg
		    text-white
		    font-semibold
		    bg-[#AB47BC]
		    rounded-md
		    "
		    onClick={() => {
		      goTo(`/view/${isCurrent.prevObj.chapter_id}`, {
			state : {

			  chapters : state.chapters,
	      		  title : isCurrent.prevObj.chapter_title
		  }
		  })
		  }}
		  >Previous</button>
		      </> : ''
		  }


		  {
		    isCurrent.nextObj && isCurrent.nextIndex <= state.chapters.length ? <>
		  <button
		    className="
		    p-2
		    text-lg
		    text-white
		    font-semibold
		    bg-[#AB47BC]
		    rounded-md
		    "
		    onClick={() => {

		      goTo(`/view/${isCurrent.nextObj.chapter_id}`, {
			state : {
		
			  chapters : state.chapters,
	      		  title : isCurrent.nextObj.chapter_title

		    }
		  })
		  }}
		  >Next</button>
		      </> : ''
		  }


		</div>


	      <div
		className="
			flex
			flex-col
			justify-center
			items-center
			w-full
			pl-2 pr-2
		"
	      >
	      {
	    isImgId && isImgId.map(e => {
	      return (
		<LoadImg img={e} key={e} title={`${state.title}-${e}`} />
	      )
	  })
	      }
	      </div>
	  
		<div
		  className="
		  flex
		  w-full
		  p-2
		  mb-5
		  mt-5
		  justify-between
		  "
		>
		

		  {
		    isCurrent.prevObj && isCurrent.prevIndex !== -1 ? <>
		  <button
		    className="
		    p-2
		    text-lg
		    text-white
		    font-semibold
		    bg-[#AB47BC]
		    rounded-md
		    "
		    onClick={() => {
		      goTo(`/view/${isCurrent.prevObj.chapter_id}`, {
			state : {

			  chapters : state.chapters,
	      		  title : isCurrent.prevObj.chapter_title
		  }
		  })
		  }}
		  >Previous</button>
		      </> : ''
		  }


		  {
		    isCurrent.nextObj && isCurrent.nextIndex <= state.chapters.length ? <>
		  <button
		    className="
		    p-2
		    text-lg
		    text-white
		    font-semibold
		    bg-[#AB47BC]
		    rounded-md
		    "
		    onClick={() => {

		      goTo(`/view/${isCurrent.nextObj.chapter_id}`, {
			state : {
		
			  chapters : state.chapters,
	      		  title : isCurrent.nextObj.chapter_title

		    }
		  })
		  }}
		  >Next</button>
		      </> : ''
		  }


		</div>



	    </>

	  }


	
    </Section>
  )
}
