import {React, useState, useEffect} from "react"
import {TailSpin} from "react-loader-spinner"
import Section from '../components/Section.jsx'
import Card from '../components/Card.jsx'
import axios from 'axios'
import ReactPaginate from "react-paginate"
import './styles/Paginate.css'
import  {FaAngleDoubleRight , FaAngleDoubleLeft } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

export default function Search(){

  const [isLoad,setLoad] = useState(true)
  const [isSearch,setSearch] = useState()
  const [isPage,setPage] = useState(1)
  const [totalPages,setTotalPage] = useState(1)
  let {query} = useParams()

function handlePageClick(event) {
    let selected = event.selected + 1 
    setPage(selected)
    document.body.scrollTop = document.documentElement.scrollTop = 0
}

    useEffect(() => {
	
        setLoad(true)
	axios.get(`https://fetch-manga.herokuapp.com/search?key=${query}&page=${isPage}`)
	.then(data => {

	const search_json = data.data.data.list

	setSearch(search_json)
	setTotalPage(Math.ceil(Number(data.data.data.total_pages)))
	setLoad(false)

	document.title = `Manga Reader ~ Search ${query} ~ Page ${isPage}`

      })


    },[isPage, query])

	let heading = "Searched For : " + query 
	if(isPage > 1){
	  heading = heading + " ~ Page : " + isPage
	}

	  if(window.location.pathname.split('/')[1] == "search"){
	  document.getElementById('searchInput').addEventListener("focus",function(){
		setPage(1)
	    })
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
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
	forcePage={isPage - 1}
      />

    	</div>


    {
      isSearch && isSearch.map(data => {
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

