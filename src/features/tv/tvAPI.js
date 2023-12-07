import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../API/apiClient";

export const fetchTvSeries = createAsyncThunk("tv/fetchTvSeries", async(arg) => {
  let { params } = arg; 
  
  //para obtener mismos results que popular tv en themoviedb
  if(params.sort_by === "popularity.desc" || params.sort_by === "popularity.asc") {
    params = { ...params, 
      "with_watch_monetization_types": "flatrate|free|ads|rent|buy" 
    }  
  }

  //para obtener mismos results que top_rated tv en themoviedb
  if(params.sort_by === "vote_average.desc" || params.sort_by === "vote_average.asc") {
    params = { ...params, 
      "vote_count.gte":"200"
    }    
  }
  const res = await apiClient.get(`discover/tv`, {params});
  return res;
});


export const fetchTvDetails = createAsyncThunk("tv/fetchMovieDetails", async(arg) => {
  const { pathParam } = arg;

  const res = await apiClient.get(`tv/${pathParam}`);
  return res;
});

export const fetchTvRecommendations = createAsyncThunk("tv/fetchTvRecommendations", async(arg) => {
  const { pathParam } = arg;

  const res = await apiClient.get(`tv/${pathParam}/recommendations` );
  return res;
});

export const fetchAvailableRegions = createAsyncThunk("tv/fetchAvailableRegions", async() => {
  const res = await apiClient.get("watch/providers/regions");
  return res;
});

export const fetchTvProviders = createAsyncThunk("tv/fetchTvProviders", async(arg) => {
  const { params } = arg; 

  const res = await apiClient.get(`watch/providers/tv`, {params});
  return res;
});

export const fetchTvGenres = createAsyncThunk("tv/fetchTvGenres", async() => {
  const res = await apiClient.get("genre/tv/list");
  return res;
});

export const fetchTvCredits = createAsyncThunk("tv/fetchTvCredits", async(arg) => {
  const { pathParam } = arg; 

  const res = await apiClient.get(`tv/${pathParam}/credits`);
  return res;
});

export const fetchTvVideos = createAsyncThunk("tv/fetchTvVideos", async(arg) => {
  const { pathParam } = arg; 

  const res = await apiClient.get(`tv/${pathParam}/videos`);
  return res;
});

export const fetchTvImages = createAsyncThunk("tv/fetchTvImages", async(arg) => {
  const { pathParam } = arg; 

  const res = await apiClient.get(`tv/${pathParam}/images`);
  return res;
});