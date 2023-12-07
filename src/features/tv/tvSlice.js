import { createSlice } from '@reduxjs/toolkit'
import { fetchAvailableRegions, fetchTvCredits, fetchTvDetails, fetchTvGenres, fetchTvImages, fetchTvProviders, 
  fetchTvRecommendations, fetchTvSeries, fetchTvVideos } from './tvAPI';
import { isInLocal } from '../../helpers/helpers';

const favoriteTvSeries = JSON.parse(localStorage.getItem('favorite_tvSeries')) || [];

const saveLocal = (arrayMovies) => {
  const stringifiedItem = JSON.stringify(arrayMovies);
  localStorage.setItem('favorite_tvSeries', stringifiedItem);
}

const initialState = {
  tvSeries:{ 
    items:[],
    loading: false,
    error: false,
    page: 1,
    total_pages: 1,
    total_results: 1
  },
  tvDetails: {
    item:{},
    loading: false,
    error: false,
  },
  recommendedTv: {
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
  tvProviders: {
    items: [],
    loading: false,
    error: false,
  },
  tvGenres: {
    items: [],
    loading: false,
    error: false,
  },
  tvCredits: {
    item: {},
    loading: false,
    error: false,
  },
  tvVideos: {
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
  tvImages: {
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
  favoriteTvSeries: favoriteTvSeries
}

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    addFavoriteTvSerie: (state, action) => {
      const tvSerie = action.payload;

      if(isInLocal(state.favoriteTvSeries, tvSerie.id)) {
        const newFavoriteTvSeries = state.favoriteTvSeries.filter(tv => tv.id !== tvSerie.id);
        state.favoriteTvSeries = newFavoriteTvSeries;
        saveLocal(state.favoriteTvSeries);
      } else { 
        state.favoriteTvSeries.push(tvSerie);
        saveLocal(state.favoriteTvSeries);
      }
    }
  },
  extraReducers: (builder) => {
    /*TV PAGE */
    builder.addCase(fetchTvSeries.fulfilled, (state, action) => {
      state.tvSeries.loading = false;
      const { results, page, total_pages, total_results } = action.payload.data;
      if(page > 1) {
        state.tvSeries.items = state.tvSeries.items.concat(results);
      } else {
        state.tvSeries.items = results
      }
      state.tvSeries.page = page;
      state.tvSeries.total_pages = total_pages;
      state.tvSeries.total_results = total_results;
    }),
    builder.addCase(fetchTvSeries.pending, (state, action) => {
      state.tvSeries.loading = true;      
    }),
    builder.addCase(fetchTvSeries.rejected, (state, action) => {
      state.tvSeries.loading = false;
      state.tvSeries.error = true; 
    }),

    /*DETAILS PAGE */
    builder.addCase(fetchTvDetails.fulfilled, (state, action) => {
      state.tvDetails.loading = false;

      state.tvDetails.item = action.payload.data;
    }),
    builder.addCase(fetchTvDetails.pending, (state, action) => {
      state.tvDetails.loading = true;      
    }),
    builder.addCase(fetchTvDetails.rejected, (state, action) => {
      state.tvDetails.loading = false;
      state.tvDetails.error = true; 
    }),

    /*DETAILS PAGE*/ 
    builder.addCase(fetchTvRecommendations.fulfilled, (state, action) => {
      state.recommendedTv.loading = false;

      const { results, page, total_pages, total_results } = action.payload.data;

      state.recommendedTv.items = results;
      state.recommendedTv.page = page;
      state.recommendedTv.total_pages = total_pages;
      state.recommendedTv.total_results = total_results;
    }),
    builder.addCase(fetchTvRecommendations.pending, (state, action) => {
      state.recommendedTv.loading = true;      
    }),
    builder.addCase(fetchTvRecommendations.rejected, (state, action) => {
      state.recommendedTv.loading = false;
      state.recommendedTv.error = true; 
    }),

    /*TV PAGE*/
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

    /*TV PAGE*/
    builder.addCase(fetchTvProviders.fulfilled, (state, action) => {
      state.tvProviders.loading = false;
      const { results } = action.payload.data;
      state.tvProviders.items = results;
    }),
    builder.addCase(fetchTvProviders.pending, (state, action) => {
      state.tvProviders.loading = true;      
    }),
    builder.addCase(fetchTvProviders.rejected, (state, action) => {
      state.tvProviders.loading = false;
      state.tvProviders.error = true; 
    }),
    
    /*TV PAGE*/
    builder.addCase(fetchTvGenres.fulfilled, (state, action) => {
      state.tvGenres.loading = false;
      state.tvGenres.items = action.payload.data.genres
    }),
    builder.addCase(fetchTvGenres.pending, (state, action) => {
      state.tvGenres.loading = true;      
    }),
    builder.addCase(fetchTvGenres.rejected, (state, action) => {
      state.tvGenres.loading = false;
      state.tvGenres.error = true; 
    }),

    /*DETAILS PAGE*/
    builder.addCase(fetchTvCredits.fulfilled, (state, action) => {
      state.tvCredits.loading = false;
      state.tvCredits.item = action.payload.data;
    }),
    builder.addCase(fetchTvCredits.pending, (state, action) => {
      state.tvCredits.loading = true;      
    }),
    builder.addCase(fetchTvCredits.rejected, (state, action) => {
      state.tvCredits.loading = false;
      state.tvCredits.error = true; 
    }),

    /*DETAILS PAGE*/
    builder.addCase(fetchTvVideos.fulfilled, (state, action) => {
      state.tvVideos.loading = false;
      const videos = action.payload.data.results;
      const trailers = videos.filter((video => video.type === "Trailer"));

      state.tvVideos.videos.items = videos;
      state.tvVideos.videos.itemsLength = videos.length;

      state.tvVideos.trailers.items = trailers
      state.tvVideos.trailers.itemsLength = trailers.length
    }),
    builder.addCase(fetchTvVideos.pending, (state, action) => {
      state.tvVideos.loading = true;      
    }),
    builder.addCase(fetchTvVideos.rejected, (state, action) => {
      state.tvVideos.loading = false;
      state.tvVideos.error = true; 
    })

    /*DETAILS PAGE*/
    builder.addCase(fetchTvImages.fulfilled, (state, action) => {
      state.tvImages.loading = false;
      const backdrops = action.payload.data.backdrops;
      const posters = action.payload.data.posters;

      state.tvImages.backdrops.items = backdrops;
      state.tvImages.backdrops.itemsPreview = backdrops.slice(0, 5);
      state.tvImages.backdrops.itemsLength = backdrops.length;

      state.tvImages.posters.items = posters;
      state.tvImages.posters.itemsPreview = posters.slice(0, 7);
      state.tvImages.posters.itemsLength = posters.length;
    }),
    builder.addCase(fetchTvImages.pending, (state, action) => {
      state.tvImages.loading = true;      
    }),
    builder.addCase(fetchTvImages.rejected, (state, action) => {
      state.tvImages.loading = false;
      state.tvImages.error = true; 
    })

  }
});

export const {addFavoriteTvSerie} = tvSlice.actions

export default tvSlice.reducer