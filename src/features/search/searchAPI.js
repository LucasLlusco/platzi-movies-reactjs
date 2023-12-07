import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const fetchSearchedItems = createAsyncThunk("search/fetchSearchedItems", async(arg) => {
  const { pathParam, params } = arg;

  const res = await apiClient.get(`search/${pathParam}`, {params});
  return res;
});