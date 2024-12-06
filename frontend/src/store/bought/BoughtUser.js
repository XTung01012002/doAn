import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import SummaryApi from '../../common/index';


export const fetchDataBoughtUser = createAsyncThunk('data/fetchDataBoughtUser', async (_,{rejectWithValue}) => {

    try {

        const response = await axios.get(`${SummaryApi.getAllNotConfirm.url}`,
            {
                withCredentials: true
            })

        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
});





const BoughtUser = createSlice({
    name: 'fetchDataBoughtUser',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataBoughtUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDataBoughtUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchDataBoughtUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
           
    },
});

export default BoughtUser.reducer;
