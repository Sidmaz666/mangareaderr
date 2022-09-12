import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Img from './img/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'

function Card(props){
  const [isImg,setImg] = useState()
  let view = useNavigate()

  useEffect(() => {

    if(props.from === "error_page"){
      setImg(props.thumb)
    } else {
    axios.get(`https://fetch-manga.herokuapp.com/thumb/${props.thumb}`)
    .then((res) => {
      setImg(res.data.image_uri)
    })
    } 

  },[])

  return (
    <>
	<div 
	  onClick={() => {
	   if(props.from !== "error_page"){
	     view(`/chapter/${props.manga_id}`, {
	       state : {
			title : props.title,
		   	thumb: props.thumb,
			manga_id : props.manga_id,
			rating : props.rating,
		        views : props.views,
		        description : props.desc,
		   	category : props.category
	 	 }
	  })
	    } else {
		view(`/`)
	    }
	  }  
	  }
	className="bg-[#0b1724] max-w-xs m-1 mb-5 rounded overflow-hidden cursor-pointer hover:bg-[#0b172480] hover:shadow-xl group md:hover:transition ease-in duration-100 ease-out md:hover:max-w-[22rem] "
	key={props.title}>
        <img src={isImg || Img}
	  alt={props.title}
	  className="w-[400px] h-[300px] md:h-min "/>
	<div className="px-4 py-2">
	      <div className="font-bold text-xl text-[#B2EBF2] mb-1">
		{props.title}
	      </div>
	      <div className="font-bold text-lg text-[#C6FF00] mb-1">
		<span className="text-[#78909C]">
		Rating: </span>
		{props.rating || 0 }
	      </div>
		

	      <div className="font-bold text-lg group-hover:flex  hidden md:flex  text-[#00C853] mb-1">
		<span className="text-[#78909C]">
		Views: </span>
		<span className="pl-1">
		{props.views || 0 }
		</span>
	      </div>
	  <div className="font-bold group-hover:flex  hidden md:flex text-lg  text-[#4DD0E1] mb-1">
		<span className="text-[#78909C]">
		Category: </span>
	    <span className="pl-1 flex">
	      {props.category || 'None'}
	    </span>
	      </div>
	<p className="text-[#B2EBF270] text-base 
	  overflow-hidden 
	  overflow-ellipsis
	  whitespace-nowrap
	  md:whitespace-normal
	  ">
	  { props.desc || 'Not Available!' }
	</p>
	</div>
      </div>

    </>

  )
}


export default Card
