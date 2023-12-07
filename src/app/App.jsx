import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import MovieDetailPage from '../pages/MovieDetailPage/MovieDetailPage'
import SearchPage from '../pages/SearchPage/SearchPage'
import MoviePage from '../pages/MoviePage/MoviePage'
import Header from '../components/Header/Header'
import TvPage from '../pages/TvPage/TvPage'
import TvDetailPage from '../pages/TvDetailPage/TvDetailPage'
import Footer from '../components/Footer/Footer'

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/search' element={<SearchPage/>} />
      <Route path='*' element={<>not found</>} />

      <Route path='/movie/discover' element={<MoviePage/>} />
      <Route path='/tv/discover' element={<TvPage/>} />

      <Route path='/movie/detail/:id' element={<MovieDetailPage/>} />
      <Route path='/tv/detail/:id' element={<TvDetailPage/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App