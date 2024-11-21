import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import SummaryApi from '../../common/index';




export const CreateShipInfo = createAsyncThunk('data/createShipInfo', async (id, data) => {

    try {
        const response = await axios.post(`${SummaryApi.postShipInfo.url}/${id}`, data,
            {
                withCredentials: true
            })
        console.log('resultData: ', response.data.data);

        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error fetching data");
    }
});



const CreateShipInfoSlice = createSlice({
    name: 'createShipInfo',
    initialState: {
        loading: false,
        sub: true,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateShipInfo.pending, (state) => {
                state.loading = true;
                state.sub = true;
                state.error = null
            })
            .addCase(CreateShipInfo.fulfilled, (state) => {
                state.loading = false;
                state.sub = false;
                state.error = null
            })
            .addCase(CreateShipInfo.rejected, (state, action) => {
                state.loading = false;
                state.sub = true;
                state.error = action.error.message;
            });
    },
});

export default CreateShipInfoSlice.reducer;