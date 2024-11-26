import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";



export const PutProductStaff = createAsyncThunk(
    'putProductStaff', async ({ id, data }, { rejectWithValue }) => {

        try {

            const res = await axios.put(`${SummaryApi.putProductStaff.url}/${id}`, data, {
                withCredentials: true
            });


            return res
        } catch (error) {
            console.log(rejectWithValue(error.res.data));
            return rejectWithValue(error.res.data)
        }
    }
)

export const PutUpdateActive = createAsyncThunk(
    'PutUpdateActive', async ({ id, data }, { rejectWithValue }) => {

        try {

            const res = await axios.put(`${SummaryApi.putUpdateActive.url}/${id}`, data, {
                withCredentials: true
            });

            return res
        } catch (error) {
            console.log(rejectWithValue(error.res.data));
            return rejectWithValue(error.res.data)
        }
    }
)



const initialState = {
    sub: false,
    loading: false,
    error: null,
    sub1: false,
    loading1: false,
    error1: null
}

const PutProductStaffReducer = createSlice({
    name: 'PutProductStaffReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(PutProductStaff.pending, (state) => {
                state.error = null
                state.loading = true
                state.sub = false
            })
            .addCase(PutProductStaff.fulfilled, (state) => {
                state.error = null
                state.loading = false
                state.sub = true
            })
            .addCase(PutProductStaff.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
                state.sub = false
            })
            .addCase(PutUpdateActive.pending, (state) => {
                state.error1 = null
                state.loading1 = true
                state.sub1 = false
            })
            .addCase(PutUpdateActive.fulfilled, (state) => {
                state.error1 = null
                state.loading = false
                state.sub1 = true
            })
            .addCase(PutUpdateActive.rejected, (state, action) => {
                state.error1 = action.payload
                state.loading = false
                state.sub1 = false
            })
    }
})


export default PutProductStaffReducer.reducer