import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface globalState {
  seletedPage: string;
  username:string;
}

const initialState: globalState = {
  seletedPage: "",
  username: ""
};

const globalSlice = createSlice({
  name: "GlobalState",
  initialState,
  reducers: {
    setSeletedPage: (state, action: PayloadAction<string>) => {
      state.seletedPage = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    }
  },
});

export const { setSeletedPage,setUsername } = globalSlice.actions;

export default globalSlice.reducer;
