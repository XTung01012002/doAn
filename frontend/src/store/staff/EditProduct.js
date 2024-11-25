import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";



export const PutProductStaff = createAsyncThunk(
    'putProductStaff', async ({ id, data }, { rejectWithValue }) => {

        try {
            console.log(SummaryApi.putProductStaff);

            const res = await axios.put(`${SummaryApi.putProductStaff.url}/${id}`, data, {
                withCredentials: true
            });
            console.log(SummaryApi.putProductStaff);

            console.log('asdasd: ', res);

            return res
        } catch (error) {
            console.log(rejectWithValue(error.res.data));
            return rejectWithValue(error.res.data)
        }
    }
)