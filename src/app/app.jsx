import { BrowserRouter , Routes, Route } from 'react-router-dom';

import Nav from './components/Nav.jsx'
import Contain from './components/Container.jsx'

import Home from './pages/Home.jsx'
import Popular from './pages/Popular.jsx'
import Latest from './pages/Latest.jsx'
import Category from './pages/Category.jsx'
import Search from './pages/Search.jsx'
import List from './pages/List.jsx'
import Chapter from './pages/Chapter.jsx'
import View from './pages/View.jsx'
import Error from './pages/Error.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <BrowserRouter>
	<Nav/>
      	<Contain>
	  <Routes>

	  <Route exact path="/" element={<Home/>}/>
	  <Route exact path="/popular" element={<Popular/>}/>
	  <Route exact path="/latest" element={<Latest/>}/>
	  <Route exact path="/category" element={<Category/>}/>
	  <Route exact path="/search/:query" element={<Search/>}/>
	  <Route exact path="/list" element={<List/>}/>
	  <Route exact path="/chapter/:manga_id" element={<Chapter/>}/>
	  <Route exact path="/view/:chapter_id" element={<View/>}/>
	  <Route exact path="*" element={<Error/>}/>

	  </Routes>
      	</Contain>
	<Footer/>
    </BrowserRouter>
  );
}

export default App;
