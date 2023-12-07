import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../API/apiClient";

export const fetchTrending = createAsyncThunk("home/fetchTrending", async(arg) => {
  const { pathParam } = arg;

  const res = await apiClient.get(`trending/all/${pathParam}`);
  return res;
});

export const fetchPopular = createAsyncThunk("home/fetchPopular", async(arg) => {
  let { pathParam, params } = arg; 

  //para obtener mismos results que popular tv en themoviedb
  if(pathParam === "tv") {
    params = { ...params, 
      "sort_by": "popularity.desc",
      "watch_region": "AR" ,
      "with_watch_monetization_types": "flatrate|free|ads|rent|buy" 
    }  
  }

  //para obtener mismos results que popular movies en themoviedb
  if(pathParam === "movie") {
    params = { ...params, 
      "sort_by": "popularity.desc",
    } 
  }

  const res = await apiClient.get(`discover/${pathParam}`, {params});
  return res;
});