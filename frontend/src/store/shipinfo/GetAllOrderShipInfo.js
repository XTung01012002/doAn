import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";


export const GetAllInfoShipOrder = createAsyncThunk(
    'get/GetAllInfoShipOrder', async (_, { rejectWithValue }) => {
        console.log('GetAllInfoShipOrder');
        try {
            const res = await axios.get(`${SummaryApi.getAllOrderShipInfor.url}`, {
                withCredentials: true
            })
            console.log('resresres', res);

            return res.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)


const GetAllInfoShipOrderSlice = createSlice({
    name: 'GetAllInfoShipOrder',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllInfoShipOrder.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(GetAllInfoShipOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload
            })
            .addCase(GetAllInfoShipOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default GetAllInfoShipOrderSlice.reducer;