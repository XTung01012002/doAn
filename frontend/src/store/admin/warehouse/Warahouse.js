import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import SummaryApi from '../../../common/index';

export const fetchDataWarehouse = createAsyncThunk('data/fetchDataWarehouse', async () => {
    // const response = await axios.get(`${SummaryApi.allProducts.url}`);
    // return response.data;

    try {
        const response = await axios.get(`${SummaryApi.allProducts.url}`)
        console.log('apiresponse:', response.data.data);

        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error fetching data");
    }
});

const WarahouseSlice = createSlice({
    name: 'fetchDataWarehouseAdmin',
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
