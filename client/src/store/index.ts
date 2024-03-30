import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { studentReducer } from "./reducers/students/students.slice";
import { studentApi } from "./reducers/students/students.api";

/* const rootReducer = combineReducers({
    student: studentReducer,
    [studentApi.reducerPath]: studentApi.reducer
}) */

export const store = configureStore({
  reducer: {
    student: studentReducer,
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    //getDefaultMiddleware().concat(studentApi.middleware),
    getDefaultMiddleware({ serializableCheck: false }),
  //devTools: { serialize: { options: true } },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
