import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import SummaryApi from '../../common/index';




export const CreateShipInfo = createAsyncThunk('data/createShipInfo', async ({ id, values }, { rejectWithValue }) => {
    console.log('Dữ liệu truyền vào API:', values);

    try {
        const response = await axios.post(`${SummaryApi.postShipInfo.url}/${id}`, values,
            {
                withCredentials: true
            })
        console.log('Dữ liệu trả về từ server:', response.data.data);
        return response.data.data;
    } catch (error) {
        //    console.error('Lỗi từ server:', error.response?.data);
        //    throw new Error(error.response?.data?.message || "Error fetching data");
        return rejectWithValue(error.response.data)
    }
});



const CreateShipInfoSlice = createSlice({
    name: 'createShipInfo',
    initialState: {
        loading: false,
        sub: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateShipInfo.pending, (state) => {
                state.loading = true;
                state.sub = false;
                state.error = null
            })
            .addCase(CreateShipInfo.fulfilled, (state) => {
                state.loading = false;
                state.sub = true;
                state.error = null
            })
            .addCase(CreateShipInfo.rejected, (state, action) => {
                state.loading = false;
                state.sub = false;
                state.error = action.error.message;
            });
    },
});

export default CreateShipInfoSlice.reducer;