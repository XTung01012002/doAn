import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";


export const GetCategoryHome = createAsyncThunk(
    'GetCategoryHome', async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SummaryApi.getCategory.url}`, {
                withCredentials: true
            })

            return res.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)


const initialState = {
    data: [],
    loading: false,
    error: null
}

const GetCategoryHomeReducer = createSlice({
    name: 'getCategoryHomeReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetCategoryHome.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(GetCategoryHome.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(GetCategoryHome.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default GetCategoryHomeReducer.reducer
