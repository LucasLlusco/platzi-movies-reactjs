import { combineReducers } from "redux";
import movieSlice from "../features/movie/movieSlice";
import homeSlice from "../features/home/homeSlice";
import tvSlice from "../features/tv/tvSlice";
import searchSlice from "../features/search/searchSlice";

const rootReducer = combineReducers({
  home: homeSlice,
  movie: movieSlice,
  tv: tvSlice,
  search: searchSlice
});

export default rootReducer;