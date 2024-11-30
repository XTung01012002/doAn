import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SummaryApi from "../../common";
import axios from "axios";



export const putCancelOrder = createAsyncThunk(
    'put1CancelOrder', async (id, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${SummaryApi.putCancelOrder.url}/${id}`,
                {},{
                    withCredentials: true
                })
            return res
        } catch (error) {
            return rejectWithValue(error.res.data)
        }
    }
)

const PutCancelOrderReducer = createSlice({
    name: 'fetchDataBoughtUser',
    initialState: {
        loadingPut: false,
        subPut: false,
        errorPut: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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

export default PutCancelOrderReducer.reducer;
