import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "@/app/features";

export function makeStore() {
  return configureStore({
    reducer: {
      global: globalReducer,
    },
  });
}

const store = makeStore();
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
