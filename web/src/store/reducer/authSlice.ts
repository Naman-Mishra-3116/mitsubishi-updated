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
  profileCompleted: boolean;
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
  profileCompleted: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "Auth slice",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.profileCompleted = action.payload.profileCompleted;
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
      state.profileCompleted = false;
    },
  },
});

export const { setUserData, logoutUser } = authSlice.actions;
export default authSlice.reducer;
