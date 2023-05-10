import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    setOrder: {},
    getOrder: {},
  },
  reducers: {
    setCreateOrder: (state, { payload }) => {
      state.setOrder = payload
    },
    getOrderResponse: (state, { payload }) => {
      state.getOrder = payload
    },
  },
})

export default orderSlice.reducer
export const {
  setCreateOrder,
  getOrderResponse

} = orderSlice.actions

export const selectOrder = (state) => state.order