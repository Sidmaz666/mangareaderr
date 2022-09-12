import React, { useEffect, useState } from 'react'
import Section from '../components/Section.jsx'
import Card from '../components/Card.jsx'
import axios from 'axios'


function Error(){
  const [isImg,setImg] = useState()
  useEffect(() => {
	axios.get("https://api.waifu.pics/sfw/waifu")
	.then((response) =>{
		document.title = "Error!! Page Not Found!"
		setImg(response.data.url)
      })
  },[])


  return (
    <>
    <Section heading="Error 404">
      {
	isImg &&
	  <>
      <Card title="Page Doesn't Exist!"
	desc="The Page Doesn't Exist But Your Waifu Does 😁"
	rating="0" views="Unknown" category="Error Page"
	from="error_page"
	thumb={isImg}
      /> 
	  </>
      } 
    </Section>
    </>
  )


}

export default Error

