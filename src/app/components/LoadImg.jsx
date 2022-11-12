import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Img from './img/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'
import {TailSpin} from 'react-loader-spinner'

function LoadImg(props){

  const [isImg,setImg] = useState()
  const [isLoad,setLoad] = useState(true)

  useEffect(() => {
    
    axios.get(`https://manga-api-swrz.onrender.com/uri/${props.img}`)
    .then((res) => {
      setImg(res.data.image_uri)
      setLoad(false)
    })

  },[])

  return (
    <>
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
	  </>:<>

	<div 
	key={props.title}>
        <img src={isImg || Img}
	  className="
	  w-full
	  "
	  alt={props.title}
	/>
	      </div>


	  </>
      }
    </>

  )
}

export default LoadImg

