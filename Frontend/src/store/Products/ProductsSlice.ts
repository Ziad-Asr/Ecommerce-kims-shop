import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import { isString, TLoading, TProduct } from "@types";

interface ICategoriesState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // A fuction to clear data on leaving products page
    cleanUpProductsRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
      // Important note: Any time you see a error in typescript about variable type => {{{ Put a guard }}}(if statement)
      // or use (casting) [not recommended] => state.error = action.payload as string;
    });
  },
});

export const { cleanUpProductsRecords } = ProductsSlice.actions;
export { actGetProductsByCatPrefix }; // I exported it from here, To import the slice and extract all data from it one time
export default ProductsSlice.reducer;
