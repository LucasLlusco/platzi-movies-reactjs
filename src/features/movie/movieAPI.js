import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../API/apiClient";

export const fetchMovies = createAsyncThunk("movie/fetchMovies", async(arg) => {
  let { params } = arg; 
  //para obtener mismos results que top_rated movies en themoviedb

  if(params.sort_by === "vote_average.desc" || params.sort_by === "vote_average.asc") {
    params = { ...params, 
      "without_genres": "99,10755",
      "vote_count.gte":"200"
    }    
  }

  const res = await apiClient.get(`discover/movie`, {params});  
  return res;
});

export const fetchMovieDetails = createAsyncThunk("movie/fetchMovieDetails", async(arg) => {
  const { pathParam } = arg;

  const res = await apiClient.get(`movie/${pathParam}`);
  return res;
});

export const fetchMovieRecommendations = createAsyncThunk("movie/fetchMovieRecommendations", async(arg) => {
  const { pathParam } = arg; 

  const res = await apiClient.get(`movie/${pathParam}/recommendations`);
  return res;
});

export const fetchAvailableRegions = createAsyncThunk("movie/fetchAvailableRegions", async() => {
  const res = await apiClient.get("watch/providers/regions");
  return res;
});

export const fetchMovieProviders = createAsyncThunk("movie/fetchMovieProviders", async(arg) => {
  const { params } = arg; 

  const res = await apiClient.get(`watch/providers/movie`, {params});
  return res;
});

export const fetchMovieGenres = createAsyncThunk("movie/fetchMovieGenres", async() => {
  const res = await apiClient.get("genre/movie/list");
  return res;
});

export const fetchMovieCredits = createAsyncThunk("movie/fetchMovieCredits", async(arg) => {
  const { pathParam } = arg; 

  const res = await apiClient.get(`movie/${pathParam}/credits`);
  return res;
});

export const fetchMovieVideos = createAsyncThunk("movie/fetchMovieVideos", async(arg) => {
  const { pathParam } = arg; 

  const res = await apiClient.get(`movie/${pathParam}/videos`);
  return res;
});

export const fetchMovieImages = createAsyncThunk("movie/fetchMovieImages", async(arg) => {
  const { pathParam } = arg; 

  const res = await apiClient.get(`movie/${pathParam}/images`);
  return res;
});