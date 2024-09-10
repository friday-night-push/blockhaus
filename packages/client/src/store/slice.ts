import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  gameType: number;
}

const initialState: InitialState = {
  gameType: 0,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setGameType: (state, action: PayloadAction<number>) => {
      state.gameType = action.payload;
    },
    clearGameType: state => {
      state.gameType = 0;
    },
  },
});

export const { setGameType, clearGameType } = exampleSlice.actions;

export default exampleSlice.reducer;
