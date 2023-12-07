import { createSlice } from '@reduxjs/toolkit'
import { fetchPopular, fetchTrending } from './homeAPI';

const initialState = {
  trending: { 
    items:[],
    loading: false,
    error: false,
  },
  popular: { 
    items:[],
    loading: false,
    error: false,
  }
}

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    /*HOME PAGE */
    builder.addCase(fetchTrending.fulfilled, (state, action) => {
      state.trending.loading = false;
      const { results } = action.payload.data;
      state.trending.items = results
    }),
    builder.addCase(fetchTrending.pending, (state, action) => {
      state.trending.loading = true;
    }),
    builder.addCase(fetchTrending.rejected, (state, action) => {
      state.trending.loading = false;
      state.trending.error = true; 
    }),

    /*HOME PAGE */
    builder.addCase(fetchPopular.fulfilled, (state, action) => {
      state.popular.loading = false;
      const { results } = action.payload.data;
      state.popular.items = results
    }),
    builder.addCase(fetchPopular.pending, (state, action) => {
      state.popular.loading = true;
    }),
    builder.addCase(fetchPopular.rejected, (state, action) => {
      state.popular.loading = false;
      state.popular.error = true; 
    })
  }
});

export const {} = homeSlice.actions

export default homeSlice.reducer

