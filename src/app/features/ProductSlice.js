import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk('products/fetchCategories', async()=>{
    const response = await fetch('https://dummyjson.com/products/categories');
  return response.json();
})

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, search, page = 1, limit = 10 }) => {
    let url = 'https://dummyjson.com/products';

    const skip = (page - 1) * limit;
    
    if (category && !search) {
      url += `/category/${category}?skip=${skip}&limit=${limit}`;
    }

    else if (search) {
      url += `/search?q=${search}&skip=${skip}&limit=${limit}`;
    }

    else {
      url += `?skip=${skip}&limit=${limit}`;
    }

    console.log(`Fetching products: ${url}`);

    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);
  

const productSlice = createSlice({
    name:"products",
    initialState:{
        categories:[],
        products:[],
        status:'idle',
        error:null
    },
    reducers: {},
    extraReducers(builder) {
      builder

        .addCase(fetchCategories.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })



        .addCase(fetchProducts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload.products;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
});
  
export default productSlice.reducer;

