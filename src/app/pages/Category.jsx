import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Section from '../components/Section.jsx'
import Card from '../components/Card.jsx'
import { TailSpin } from 'react-loader-spinner'

function Category(){

	let {genre} = useParams()
  	
	const requested_category = window.location.href.split('?k=')[1]
  	const [isCatList,setCatList] = useState()
  	const [selGenre,setGenre] = useState(requested_category || "4-koma")
  	
  	

  	const [isList,setList] = useState()
	const [isLoad,setLoad] = useState(true)

  useEffect(() => {

    axios.get(`https://manga-api-production-6ca6.up.railway.app/category`)
      .then(response => {
		setCatList(response.data.data.list)
      })
	  	
  },[])

  useEffect(() => {
      setLoad(true)

    
    axios.get(`https://manga-api-production-6ca6.up.railway.app/category/${selGenre}`)
      .then(response => {
	document.title = `Manga Reader ~ Category ~  ${selGenre.charAt(0).toUpperCase() + selGenre.slice(1)} `
	setList(response.data.data.list)
		setLoad(false)
	})
    },[selGenre])

  	
	return (
	    <Section heading={`Select From Popular Categories : ${selGenre.charAt(0).toUpperCase() + selGenre.slice(1)
	      }`}>
	      
	{
	isLoad ? <><br/>
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
	</> : <>

	      <div className="p-2 mb-3 ">
    		{  isCatList && isCatList.map(genre => {
		return(
			<button
		  	onClick={ () => { setGenre(`${genre.genre_id}`) } }
			key={genre.genre_id}
			className={`
			bg-[#37474F90] text-white
			pl-2 pr-2 p-1 m-1 text-xl
			rounded-xl
			font-bold
			hover:text-[#84FFFF]
			${genre.genre_id === selGenre ? `bg-[#01579B90]` : ``}
		`}
			
			>
			{
			  genre.genre.charAt(0).toUpperCase() + genre.genre.slice(1)

		}</button>
		)
	      })  }
	    </div>
	      {
		isList && isList.map(media => {
	  return (
	  <Card thumb={media.thumb_id}
	        title={media.title}
      		desc={media.description}
	        key={media.title} rating={media.rating} 
	        views={media.views} 
	        category={media.category}
		manga_id={media.id}
	      />	 
	      )
	      })
	      }
	
	      <div className="p-2 mb-3 ">
    		{  isCatList && isCatList.map(genre => {
		return(
			<button
		  	onClick={ () => { setGenre(`${genre.genre_id}`) } }
			key={genre.genre_id}
			className={`
			bg-[#37474F90] text-white
			pl-2 pr-2 p-1 m-1 text-xl
			rounded-xl
			font-bold
			hover:text-[#84FFFF]
			${genre.genre_id === selGenre ? `bg-[#01579B90]` : ``}
		`}
			
			>
			{
			  genre.genre.charAt(0).toUpperCase() + genre.genre.slice(1)

		}</button>
		)
	      })  }
	    </div>

	  </>
	}
	    </Section>

	)

}

export default Category
