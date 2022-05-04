import axios from "axios";
import { apiEndpoints, apiHost } from "../config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DetaultState } from "../interfaces/DefaultState";
import { RegisterInput } from "../interfaces/RegisterInput";
import { RegisterResponse } from "../interfaces/RegisterResponse";

interface RegisterState extends DetaultState {
  isRegister: boolean;
}

const initialState: RegisterState = {
  loading: false,
  hasError: false,
  msgError: "",
  isRegister: false,
};

export const Register = createAsyncThunk(
  "User/Register",
  async (registerInput: RegisterInput) => {
    try {
      const response = await axios.post(
        `${apiHost.default}${apiEndpoints.section.auth.register}`,
        registerInput
      );
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  }
);

const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {
    setRegisterState(state, action: PayloadAction<boolean>) {
      state.isRegister = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Register.pending, (state) => {
        if (state.loading === false) {
          state.loading = true;
          state.hasError = false;
          state.msgError = "";
        }
      })
      .addCase(
        Register.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          console.log(action.payload);
          if (state.loading === true) {
            if (action.payload.status === "success") {
              state.isRegister = true;
            } else {
              state.loading = false;
              state.hasError = true;
              state.msgError = action.payload.message;
            }
            state.loading = false;
            state.hasError = false;
          }
        }
      )
      .addCase(Register.rejected, (state) => {
        console.log("haserror");
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { setRegisterState: setRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
