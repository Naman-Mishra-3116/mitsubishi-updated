import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    id: string;
    fullName: string;
    email: string;
    permission: string;
    role: string;
  };
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {
    id: "",
    fullName: "",
    email: "",
    permission: "",
    role: "",
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
        id: "",
        fullName: "",
        email: "",
        permission: "",
        role: "",
      };
      state.isAuthenticated = false;
    },
  },
});

export const { setUserData, logoutUser } = authSlice.actions;
export default authSlice.reducer;
