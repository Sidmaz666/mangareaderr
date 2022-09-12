import {React , useEffect, useState} from "react"
import Section from '../components/Section.jsx'
import { TailSpin } from "react-loader-spinner"
import Card from '../components/Card.jsx'

import axios from 'axios'


export default function Home(){

const [isPopular,setPopular] =  useState()
const [isRecent,setRecent] =  useState()
const [isLoad,setLoad] =  useState(true)


    useEffect(() => {
	
      axios.all([
	axios.get('https://fetch-manga.herokuapp.com/'),
	axios.get('https://fetch-manga.herokuapp.com/recent')
      ]).then(data => {

	  const popular_json = data[0].data.data.list
	  const recent_json = data[1].data.data.list
		
	setPopular(popular_json)
	setRecent(recent_json)
	setLoad(false)

	document.title = "Manga Reader ~ Home"


      })

    },[])


  return (
    <>
      <Section heading="List of Popular Manga">

	{ isLoad ? <><br/>
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

    {
      isPopular && isPopular.map(data => {
	const title = data.title
	const thumb = data.thumb_id
	const desc = data.description
	const rate = data.rating
	const views = data.views
	const category = data.category
	const manga_id = data.id

	return (
	  <Card thumb={thumb} title={title}
      		desc={desc} key={title} rating={rate} 
	  	views={views} category={category}
		manga_id={manga_id}
      	 />
	)


	})
      }


	</>

      }


      </Section>

      <Section heading="Recently Released Manga">

	{ isLoad ? <><br/>
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

    {
      isRecent && isRecent.map(data => {
	const title = data.title
	const thumb = data.thumb_id
	const desc = data.description
	const rate = data.rating
	const views = data.views
	const category = data.category
	const manga_id = data.id

	return (
	  <Card thumb={thumb} title={title}
      		desc={desc} key={title} rating={rate} 
	  	views={views} category={category}
		manga_id={manga_id}
      	 />
	)


	})
      }


	</>

      }

      </Section>
    </>
  )
}
