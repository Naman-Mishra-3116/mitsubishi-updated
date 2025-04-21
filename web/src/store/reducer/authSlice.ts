import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    managerId: string;
    managerName: string;
    managerEmail: string;
    phoneNumber: string;
    atcId: string;
    atcName: string;
  };
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {
    managerId: "",
    managerName: "",
    managerEmail: "",
    atcId: "",
    phoneNumber: "",
    atcName: "",
  },

  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "Auth slice",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },

    logoutUser(state) {
      state.user = {
        atcId: "",
        managerEmail: "",
        managerId: "",
        managerName: "",
        atcName: "",
        phoneNumber: "",
      };
      state.isAuthenticated = false;
    },
  },
});

export const { setUserData, logoutUser } = authSlice.actions;
export default authSlice.reducer;
