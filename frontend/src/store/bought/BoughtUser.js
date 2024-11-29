import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import SummaryApi from '../../common/index';


export const fetchDataBoughtUser = createAsyncThunk('data/fetchDataBoughtUser', async () => {

    try {

        const response = await axios.get(`${SummaryApi.getAllNotConfirm.url}`,
            {
                withCredentials: true
            })

        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error fetching data");
    }
});



export const putCancelOrder = createAsyncThunk(
    'put1CancelOrder', async (id, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${SummaryApi.putCancelOrder.url}/${id}`,
                {
                    withCredentials: true
                })
            return res
        } catch (error) {
            return rejectWithValue(error.res.data)
        }
    }
)



const BoughtUser = createSlice({
    name: 'fetchDataBoughtUser',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        loadingPut: false,
        subPut: false,
        errorPut: null
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
            .addCase(putCancelOrder.pending, (state) => {
                state.loadingPut = true
                state.subPut = false
                state.errorPut = null
            })
            .addCase(putCancelOrder.fulfilled, (state) => {
                state.loadingPut = false
                state.subPut = true
                state.errorPut = null
            })
            .addCase(putCancelOrder.rejected, (state, action) => {
                state.loadingPut = false
                state.subPut = false
                state.errorPut = action.payload
            });
    },
});

export default BoughtUser.reducer;
