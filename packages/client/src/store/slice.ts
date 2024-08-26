import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ExampleState {
  name: string;
}

const initialState: ExampleState = {
  name: '',
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setExample: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    clearExample: state => {
      state.name = '';
    },
  },
});

export const { setExample, clearExample } = exampleSlice.actions;

export default exampleSlice.reducer;
