import { useDispatch, useSelector } from "react-redux";
import { addFavoriteMovie } from "../features/movie/movieSlice";
import { addFavoriteTvSerie } from "../features/tv/tvSlice";
import { isInLocal } from "../helpers/helpers";

const usePlatziMovies = () => {
  const favoriteMovies = useSelector(state => state.movie.favoriteMovies);
  const favoriteTvSeries = useSelector(state => state.tv.favoriteTvSeries);
  const dispatch = useDispatch();

  const handleAddFavoriteMovie = (movie) => {
    dispatch(addFavoriteMovie(movie));
  }
  const handleAddFavoriteTvSerie = (tv) => {
    dispatch(addFavoriteTvSerie(tv));
  }

  const handleIsMovieInLocal = (id) => {
    return isInLocal(favoriteMovies, id)    
  }

  const handleIsTvInLocal = (id) => {
    return isInLocal(favoriteTvSeries, id)    
  }


  return {
    favoriteMovies,
    favoriteTvSeries,
    addFavoriteMovie: handleAddFavoriteMovie,
    addFavoriteTvSerie: handleAddFavoriteTvSerie,
    isMovieInLocal: handleIsMovieInLocal,
    isTvInLocal: handleIsTvInLocal, 
  }
}

export default usePlatziMovies