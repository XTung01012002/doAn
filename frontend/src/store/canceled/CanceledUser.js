import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import SummaryApi from '../../common/index';

export const fetchDataCanceledUser = createAsyncThunk('data/fetchDataCanceledUser', async (_,{rejectWithValue}) => {

    try {
        const response = await axios.get(`${SummaryApi.getAllProductCanceledOrder.url}`,
            {
                withCredentials: true
            })

        return response.data.data;
    } catch (error) {

        return rejectWithValue(error.response?.data?.message);
    }
});

const CanceledSlice = createSlice({
    name: 'fetchDataCanceledUser',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataCanceledUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDataCanceledUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchDataCanceledUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default CanceledSlice.reducer;
