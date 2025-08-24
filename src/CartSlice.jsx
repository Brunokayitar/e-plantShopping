import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If new item, add to cart with quantity 1
        state.items.push({ 
          ...newItem, 
          quantity: 1 
        });
      }
    },
    removeItem: (state, action) => {
      const itemName = action.payload;
      // Remove item by filtering out the item with matching name
      state.items = state.items.filter(item => item.name !== itemName);
    },
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        if (amount <= 0) {
          // If quantity is 0 or less, remove the item
          state.items = state.items.filter(item => item.name !== name);
        } else {
          // Update the quantity to the new amount
          existingItem.quantity = amount;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;