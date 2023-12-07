import { createSlice } from '@reduxjs/toolkit'
import { fetchSearchedItems } from './searchAPI';

const initialState = {
  searchedItems: {
    items:[],
    loading: false,
    error: false,
    page: 1,
    total_pages: 1,
    total_results: 1
  }
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    /*SEARCH PAGE */
    builder.addCase(fetchSearchedItems.fulfilled, (state, action) => {
      state.searchedItems.loading = false;
      const { results, page, total_pages, total_results } = action.payload.data;
  
      if(page > 1) { 
        state.searchedItems.items = state.searchedItems.items.concat(results);
      } else { 
        state.searchedItems.items = results
      }
      state.searchedItems.page = page;
      state.searchedItems.total_pages = total_pages;
      state.searchedItems.total_results = total_results;
    }),
    builder.addCase(fetchSearchedItems.pending, (state, action) => {
      state.searchedItems.loading = true;      
    }),
    builder.addCase(fetchSearchedItems.rejected, (state, action) => {
      state.searchedItems.loading = false;
      state.searchedItems.error = true; 
    })
  }
});

export const {} = searchSlice.actions

export default searchSlice.reducer