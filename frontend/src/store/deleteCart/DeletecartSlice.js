import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";



export const DeleteCartAPI = createAsyncThunk(
    'deleteCartSlice', async (_, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${SummaryApi.deleteInCart.url}`, {
                withCredentials: true
            })
            return res
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)