import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTags , FaRedo, FaList , FaBookOpen, FaSearch, FaStarHalfAlt } from 'react-icons/fa'


function Nav(){

  const [isMenu,setMenu] = useState(false)
  
  const ToggleMenu = () => {
	setMenu(!isMenu)
  };

  let redirect = useNavigate()

  const submitSearch = (e) => {

    e.preventDefault()

    if(document.getElementById('searchInput').value.length > 2 ){
    
    redirect(`/search/${document.getElementById('searchInput').value}`)
    document.getElementById('searchInput').value = ""


    }

    ToggleMenu()
    	
  };




  return (
    <header className="fixed w-screen z-50">
	<nav 
	  className="bg-[#07092b] bg-opacity-95 backdrop-blur-sm 
	  text-[#B2EBF2] font-semibold
	  items-center 
	  md:flex md:justify-between 
	  md:pl-5 p-2 md:pr-5"
		>
	  <div className="flex justify-between  p-1">
	    <Link
	      onClick={() => setMenu(false)}
	      to="/">
	    <span>
	      <FaBookOpen
	      className="
	      text-[#d0ebf5]
	      transition ease-out duration-200
	      hover:text-[#a6d1e0]
	      "/>
	    </span>
	    </Link>
	    <button 
	      className="md:hidden
	      focus:outline-none"
	      onClick={ToggleMenu}>
	      <FaBars 
	      className="
	      transition ease-out duration-300
	      hover:text-[#a6d1e0] text-[#EEEEEE]"/>
	    </button>
	  </div>
	  <ul 
	    className={`text-center text-xl space-y-3
	    md:flex md:items-center  md:space-y-0 md:mr-1 
	    md:space-x-5 xl:text-2xl
	    ${isMenu ? 'block' : 'hidden' }`}>
	  <li>
	      <form action=""
	      className="flex items-center justify-center"
		onSubmit={submitSearch}
	      	>
		<input
		id="searchInput"
	      	type="text"
		  minLength="3"
		  className="pl-1 font-semibold 
		  rounded-l-md
		  w-32 md:w-full text-[#B2EBF2] placeholder-[#B2EBF2]
		  transition ease-in-out duration-500 focus:bg-[#607D8B50]
		  focus:text-[#F4FF81]
		  focus:outline-none bg-[#37474F80]"
		  placeholder="...Search"
		  required
	      	/>
	      <button 
	      name="searchBtn"
	      className=" p-1
		  rounded-r-md
		bg-[#455A6490]
		focus:outline-none hover:bg-[#546E7A90]
		hover:text-[#F4FF81]
		">
	      <FaSearch/>
	      </button>

	      </form>
	  </li>
	    <li>
	    <Link
	      onClick={ToggleMenu}
	      className="
	      bg-[#22233d] p-1 rounded flex justify-center  items-center 
	      space-x-3 md:space-x-2 
	      hover:bg-transparent hover:text-[#F4FF81]" 
	      to="/popular">
	    <FaStarHalfAlt/>
	      <span className="whitespace-nowrap">
		Popular
	    </span>
	    </Link>
	    </li>
	    <li>
	      <Link
	      onClick={ToggleMenu}
		className="
	      bg-[#22233d] p-1 rounded flex justify-center  items-center 
	      space-x-3 md:space-x-2 
	      hover:bg-transparent hover:text-[#F4FF81]" 
	       to="/latest">
	    <FaRedo/> 
		<span  className="whitespace-nowrap">
		  Recent
		</span>
	    </Link>
	    </li>
	    <li>
	    <Link
	      onClick={ToggleMenu}
	      className="
	      bg-[#22233d] p-1 rounded flex justify-center  items-center 
	      space-x-3 md:space-x-2 
	      hover:bg-transparent hover:text-[#F4FF81]" 
	    to="/category">
	    <FaTags/>
	      <span>
	      Genre
	      </span> 
	    </Link>
	    </li>
	    <li>
	    <Link
	      onClick={ToggleMenu}
	      className="
	      bg-[#22233d] p-1 rounded flex justify-center  items-center 
	      space-x-3 md:space-x-2 
	      hover:bg-transparent hover:text-[#F4FF81]" 
	      to="/list">
	    <FaList/>
	      <span style={{whiteSpace : "nowrap" }}>
	    A-Z
	      </span>
	    </Link>
	    </li>
	</ul>

	</nav>
    </header>
  )


}

export default Nav
