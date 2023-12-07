import { createSlice } from '@reduxjs/toolkit'
import { fetchAvailableRegions, fetchMovieCredits, fetchMovieDetails, fetchMovieGenres, 
  fetchMovieImages, fetchMovieProviders, fetchMovieRecommendations, 
  fetchMovieVideos, fetchMovies} from './movieAPI';
import { isInLocal } from '../../helpers/helpers';

const favoriteMovies = JSON.parse(localStorage.getItem('favorite_movies')) || [];

const saveLocal = (arrayMovies) => {
  const stringifiedItem = JSON.stringify(arrayMovies);
  localStorage.setItem('favorite_movies', stringifiedItem);
}


const initialState = {
  movies: {
    items:[],
    loading: false,
    error: false,
    page: 1,
    total_pages: 1,
    total_results: 1
  },
  movieDetails: {
    item: {},
    loading: false,
    error: false,
  },
  recommendedMovies: {
    items:[],
    loading: false,
    error: false,
    page: 1,
    total_pages: 1,
    total_results: 1
  },  
  availableRegions: {
    items: [],
    loading: false,
    error: false,
  },
  movieProviders: {
    items: [],
    loading: false,
    error: false,
  },
  movieGenres: {
    items: [],
    loading: false,
    error: false,
  },
  movieCredits: {
    item: {},
    loading: false,
    error: false,
  },
  movieVideos: {
    videos: {
      items: [],
      itemsLength: 0
    },
    trailers: {
      items: [],
      itemsLength: 0
    },
    loading: false,
    error: false,
  },
  movieImages: {
    backdrops: {
      items: [],
      itemsPreview: [],
      itemsLength: 0
    },
    posters: {
      items: [],
      itemsPreview: [],
      itemsLength: 0
    },
    loading: false,
    error: false,
  },
  
  favoriteMovies: favoriteMovies,
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addFavoriteMovie: (state, action) => {
      const movie = action.payload;

      if(isInLocal(state.favoriteMovies, movie.id)) {
        const newFavoriteMovies = state.favoriteMovies.filter(mov => mov.id !== movie.id);
        state.favoriteMovies = newFavoriteMovies;
        saveLocal(state.favoriteMovies);
      } else {
        state.favoriteMovies.push(movie);
        saveLocal(state.favoriteMovies);
      }
    }
  },
  extraReducers: (builder) => {
    /*MOVIE PAGE*/
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies.loading = false;

      const { results, page, total_pages, total_results } = action.payload.data;
      if(page > 1) {
        state.movies.items = state.movies.items.concat(results);
      } else {
        state.movies.items = results
      }
      state.movies.page = page;
      state.movies.total_pages = total_pages;
      state.movies.total_results = total_results;
    }),
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.movies.loading = true;      
    }),
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.movies.loading = false;
      state.movies.error = true; 
    }),

    /*DETAILS PAGE */
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.movieDetails.loading = false;

      state.movieDetails.item = action.payload.data;
    }),
    builder.addCase(fetchMovieDetails.pending, (state, action) => {
      state.movieDetails.loading = true;      
    }),
    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.movieDetails.loading = false;
      state.movieDetails.error = true; 
    }),
    /*DETAILS PAGE */ 
    builder.addCase(fetchMovieRecommendations.fulfilled, (state, action) => {
      state.recommendedMovies.loading = false;

      const { results, page, total_pages, total_results } = action.payload.data;

      state.recommendedMovies.items = results;
      state.recommendedMovies.page = page;
      state.recommendedMovies.total_pages = total_pages;
      state.recommendedMovies.total_results = total_results;
    }),
    builder.addCase(fetchMovieRecommendations.pending, (state, action) => {
      state.recommendedMovies.loading = true;      
    }),
    builder.addCase(fetchMovieRecommendations.rejected, (state, action) => {
      state.recommendedMovies.loading = false;
      state.recommendedMovies.error = true; 
    }),

    /*MOVIE PAGE*/
    builder.addCase(fetchAvailableRegions.fulfilled, (state, action) => {
      state.availableRegions.loading = false;
      const { results } = action.payload.data;
      state.availableRegions.items = results;
    }),
    builder.addCase(fetchAvailableRegions.pending, (state, action) => {
      state.availableRegions.loading = true;      
    }),
    builder.addCase(fetchAvailableRegions.rejected, (state, action) => {
      state.availableRegions.loading = false;
      state.availableRegions.error = true; 
    }),

    /*MOVIE PAGE*/
    builder.addCase(fetchMovieProviders.fulfilled, (state, action) => {
      state.movieProviders.loading = false;
      const { results } = action.payload.data;
      state.movieProviders.items = results;
    }),
    builder.addCase(fetchMovieProviders.pending, (state, action) => {
      state.movieProviders.loading = true;      
    }),
    builder.addCase(fetchMovieProviders.rejected, (state, action) => {
      state.movieProviders.loading = false;
      state.movieProviders.error = true; 
    }),
    
    /*MOVIE PAGE*/
    builder.addCase(fetchMovieGenres.fulfilled, (state, action) => {
      state.movieGenres.loading = false;
      state.movieGenres.items = action.payload.data.genres
    }),
    builder.addCase(fetchMovieGenres.pending, (state, action) => {
      state.movieGenres.loading = true;      
    }),
    builder.addCase(fetchMovieGenres.rejected, (state, action) => {
      state.movieGenres.loading = false;
      state.movieGenres.error = true; 
    }),

    /*DETAILS PAGE*/
    builder.addCase(fetchMovieCredits.fulfilled, (state, action) => {
      state.movieCredits.loading = false;
      state.movieCredits.item = action.payload.data;
    }),
    builder.addCase(fetchMovieCredits.pending, (state, action) => {
      state.movieCredits.loading = true;      
    }),
    builder.addCase(fetchMovieCredits.rejected, (state, action) => {
      state.movieCredits.loading = false;
      state.movieCredits.error = true; 
    }),

    /*DETAILS PAGE*/
    builder.addCase(fetchMovieVideos.fulfilled, (state, action) => {
      state.movieVideos.loading = false;
      const videos = action.payload.data.results;
      const trailers = videos.filter((video => video.type === "Trailer"));

      state.movieVideos.videos.items = videos;
      state.movieVideos.videos.itemsLength = videos.length;

      state.movieVideos.trailers.items = trailers
      state.movieVideos.trailers.itemsLength = trailers.length
    }),
    builder.addCase(fetchMovieVideos.pending, (state, action) => {
      state.movieVideos.loading = true;      
    }),
    builder.addCase(fetchMovieVideos.rejected, (state, action) => {
      state.movieVideos.loading = false;
      state.movieVideos.error = true; 
    }),

    /*DETAILS PAGE*/
    builder.addCase(fetchMovieImages.fulfilled, (state, action) => {
      state.movieImages.loading = false;
      const backdrops = action.payload.data.backdrops;
      const posters = action.payload.data.posters;

      state.movieImages.backdrops.items = backdrops;
      state.movieImages.backdrops.itemsPreview = backdrops.slice(0, 5);
      state.movieImages.backdrops.itemsLength = backdrops.length;

      state.movieImages.posters.items = posters;
      state.movieImages.posters.itemsPreview = posters.slice(0, 7);
      state.movieImages.posters.itemsLength = posters.length;
    }),
    builder.addCase(fetchMovieImages.pending, (state, action) => {
      state.movieImages.loading = true;      
    }),
    builder.addCase(fetchMovieImages.rejected, (state, action) => {
      state.movieImages.loading = false;
      state.movieImages.error = true; 
    })
  }
});

export const {addFavoriteMovie} = movieSlice.actions

export default movieSlice.reducer
