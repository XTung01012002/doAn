import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";


export const PaymentOrder = createAsyncThunk(
    'paymentOrder', async (id, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${SummaryApi.paymentOrder.url}/${id}`, {}, {
                withCredentials: true
            })

            return res.data.data

        } catch (error) {
            return rejectWithValue(error?.res?.data?.message)

        }
    }
)


const initialState = {
    sub: false,
    loading: false,
    error: null
}



const PaymentOrderReducer = createSlice({
    name: 'PaymentOrderReducer',
    initialState,
    reducers: {
        setErrorNhanhang(state) {
            state.error = null
        },
        setSubNhanhang(state) {
            state.sub = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(PaymentOrder.pending, state => {

                state.loading = true
                state.error = null
                state.sub = false
            })
            .addCase(PaymentOrder.fulfilled, state => {

                state.loading = false
                state.error = null
                state.sub = true
            })
            .addCase(PaymentOrder.rejected, (state, action) => {

                state.loading = false
                state.error = action.payload
                state.sub = false
            })
    }
})

export const { setSubNhanhang, setErrorNhanhang } = PaymentOrderReducer.actions
export default PaymentOrderReducer.reducer