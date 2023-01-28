import React, { useState, useEffect } from 'react'
import Section from '../components/Section.jsx'
import Card from '../components/Card.jsx'
import axios from 'axios'
import{TailSpin} from 'react-loader-spinner'
import ReactPaginate from "react-paginate"
import './styles/Paginate.css'
import  {FaAngleDoubleRight , FaAngleDoubleLeft } from 'react-icons/fa'


function List(){
 
 
  const [isPage,setPage] = useState(1)
  const [isLib,setLib] = useState(0)
  const [isLoad,setLoad] = useState()
  const [isSpin,setSpin] = useState(true)
  const [totalPages,setTotalPage] = useState(1)
  const options = "0123456789abcdefghijklmnopqrstuvwxyz"
		  const opt = []
		  for(let x=0; options.length > x; x++){
		    const title = options[x]
		    opt.push({
		    	title		
		    })
		  }


 
  useEffect(() => {   
      setSpin(true)
    axios.get(`https://manga-api-production-6ca6.up.railway.app/list?q=${isLib}&page=${isPage}`)
      .then((response) => {
	document.title = `Manga reader ~ List : Filter '${isLib == '' && isLib !== 0 ? 'All' : isLib}' ${isPage > 1 ?  ` ~ Page ${isPage}` : '' }`
	setLoad(response.data.data.list)
	setTotalPage(Math.ceil(Number(response.data.data.total_pages)))
	setSpin(false)
      })
    
  },[isPage,isLib])

function handlePageClick(event) {
    setSpin(true)
    let selected = event.selected + 1 
    setPage(selected)
    document.body.scrollTop = document.documentElement.scrollTop = 0
}

  return (
    <Section heading={`List : Filter '${isLib == '' && isLib !== 0 ? 'All' : isLib}' ${isPage > 1 ?  ` ~ Page ${isPage}` : '' }`}>
            { isSpin ? <><br/>
		<div
	      className="
	      p-2
	      flex
	      justify-center
	      items-center
	      "
		>
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
		{
		  opt.map(lib => {
		    return (
			<button
		    onClick={ () => {
				setLib(lib.title)
		      		setPage(1)
			} }
			key={lib.title}
			className={`
			bg-[#37474F90] text-white
			pl-5 pr-5 p-1 m-1 text-xl
			font-bold
			hover:text-[#84FFFF]	
			rounded-md
			${isLib == lib.title ?  'bg-[#01579B]' : ''}
			`}
			>
		      { lib.title.toUpperCase() }
		</button>

		    )
		})
		}
			<button
		    onClick={ () => {
				setLib("")
		      		setPage(1)
			} }
			key="0-9"
			className={`
			bg-[#37474F90]
			text-white
			pl-5 pr-5 p-1 m-1 text-xl
			font-bold
			hover:text-[#84FFFF]	
			rounded-md
			${isLib == '' && isLib !== 0 ? 'bg-[#01579B]' : ''}
			` }
			>
		      All
		</button>
	    </div>


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

	  isLoad && isLoad.map(data => {
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

	      <div className="p-2 mb-3 ">
		{
		  opt.map(lib => {
		    return (
			<button
		    onClick={ () => {
				setLib(lib.title)
		      		setPage(1)
			} }
			key={lib.title}
			className={`
			bg-[#37474F90] text-white
			pl-5 pr-5 p-1 m-1 text-xl
			font-bold
			hover:text-[#84FFFF]	
			rounded-md
			${isLib == lib.title ?  'bg-[#01579B]' : ''}
			`}
			>
		      { lib.title.toUpperCase() }
		</button>

		    )
		})
		}
			<button
		    onClick={ () => {
				setLib("")
		      		setPage(1)
			} }
			key="0-9"
			className={`
			bg-[#37474F90] text-white
			pl-5 pr-5 p-1 m-1 text-xl
			font-bold
			hover:text-[#84FFFF]	
			rounded-md
			${isLib.length < 0 ? 'bg-[#01579B]' : ''}
			` }
			>
		      All
		</button>
	    </div>

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
  )

}

export default List
