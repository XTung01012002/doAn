import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import SummaryApi from '../../../common';

export const fetchDataWarehouse = createAsyncThunk('data/fetchData', async () => {
    const response = await axios.get(`${SummaryApi.allProducts.url}`);
    return response.data;
});

const WarahouseSlice = createSlice({
    name: 'api',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataWarehouse.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDataWarehouse.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchDataWarehouse.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default WarahouseSlice.reducer;
