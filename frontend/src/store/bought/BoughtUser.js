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
        sub: false
    },
    reducers: {
        setSubFet(state) {
            state.sub = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataBoughtUser.pending, (state) => {
                state.status = 'loading'
                state.sub = false
            })
            .addCase(fetchDataBoughtUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
                state.sub = true
            })
            .addCase(fetchDataBoughtUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                state.sub = false
            })
           
    },
});
export const { setSubFet } = BoughtUser.actions
export default BoughtUser.reducer;
