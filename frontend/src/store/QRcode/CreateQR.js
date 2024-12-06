import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";


export const CreateQR = createAsyncThunk(
    'CreateQR', async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SummaryApi.createQr.url}`, data, {
                withCredentials: true
            })
            return res.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)


const initialState = {
    data: [],
    loading: false,
    error: null
}


const CreateQRReducer = createSlice({
    name: 'CreateQRReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateQR.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(CreateQR.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(CreateQR.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default CreateQRReducer.reducer