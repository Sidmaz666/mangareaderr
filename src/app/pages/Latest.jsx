import {React, useState, useEffect} from "react"
import {TailSpin} from "react-loader-spinner"
import Section from '../components/Section.jsx'
import Card from '../components/Card.jsx'
import axios from 'axios'
import ReactPaginate from "react-paginate"
import './styles/Paginate.css'
import  {FaAngleDoubleRight , FaAngleDoubleLeft } from 'react-icons/fa'

export default function Latest(){

  const [isLoad,setLoad] = useState(true)
  const [isLatest,setLatest] = useState()
  const [isPage,setPage] = useState(1)
  const [totalPages,setTotalPage] = useState(1)

function handlePageClick(event) {
    setLoad(true)
    let selected = event.selected + 1 
    setPage(selected)
    document.body.scrollTop = document.documentElement.scrollTop = 0
}

    useEffect(() => {
	
	axios.get(`https://manga-api-production-6ca6.up.railway.app/recent/?page=${isPage}`)
	.then(data => {

	  const recent_json = data.data.data.list

	setLatest(recent_json)
	setTotalPage(Math.ceil(Number(data.data.data.total_pages)))
	setLoad(false)

	document.title = `Manga Reader ~ Latest ~ Page ${isPage}`


      })

    },[isPage])

	let heading = "List of Latest Manga"
	if(isPage > 1){
		heading = "List of Latest Manga ~ Page " + isPage
	}

  return (
    <>
      <Section heading={heading}>

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

    	<div
	  className="
	  overflow-hidden
	  flex
	  w-full
	  justify-center
	  "
	>
      <ReactPaginate
	previousLabel={<FaAngleDoubleLeft/>}
	nextLabel={<FaAngleDoubleRight/>}
        pageCount={totalPages}
        onPageChange={handlePageClick}
	forcePage={isPage - 1}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />

    	</div>


    {
      isLatest && isLatest.map(data => {
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

    	<div
	  className="
	  overflow-hidden
	  flex
	  w-full
	  justify-center
	  "
	>
      <ReactPaginate
	previousLabel={<FaAngleDoubleLeft/>}
	nextLabel={<FaAngleDoubleRight/>}
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
	forcePage={isPage - 1}
      />

    	</div>

	</>


      }

      </Section>
    </>
  )
}

