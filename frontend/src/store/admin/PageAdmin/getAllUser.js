import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../../common";


export const GetAllUserAdmin = createAsyncThunk(
    'getAllUserAdmin', async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SummaryApi.allUsers.url}`, {
                withCredentials: true
            })
            return res.data.data
        } catch (error) {
            return rejectWithValue(error.res.data)
        }
    }
)


const initialState = {
    data: [],
    loading: false,
    error: null
}


const GetAllUserAdminReducer = createSlice({
    name: 'getAllUserAdminReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllUserAdmin.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(GetAllUserAdmin.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(GetAllUserAdmin.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default GetAllUserAdminReducer.reducer