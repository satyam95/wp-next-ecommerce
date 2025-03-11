import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contents: {
    itemCount: 0,
    productCount: 0,
    nodes: [],
  },
  appliedCoupons: [],
  subtotal: "0",
  subtotalTax: "0",
  shippingTax: "0",
  shippingTotal: "0",
  total: "0",
  totalTax: "0",
  feeTax: "0",
  feeTotal: "0",
  discountTax: "0",
  discountTotal: "0",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => action.payload,
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;