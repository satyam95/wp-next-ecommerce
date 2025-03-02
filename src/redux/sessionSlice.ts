import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Customer {
  sessionToken: string;
  databaseId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface SessionState {
  customer: Customer | null;
  sessionToken: string | null;
}

const initialState: SessionState = {
  customer: null,
  sessionToken: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // Sets the customer data.
    setCustomer(state, action: PayloadAction<Customer | null>) {
      state.customer = action.payload;
    },
    // Sets the session token.
    setSessionToken(state, action: PayloadAction<string | null>) {
      state.sessionToken = action.payload;
    },
    // Clears tokens and resets session state.
    logout(state) {
      sessionStorage.removeItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY!);
      localStorage.removeItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY!);
      sessionStorage.removeItem(process.env.NEXT_PUBLIC_SESSION_TOKEN_KEY!);
      state.customer = null;
      state.sessionToken = null;
    },
  },
});

export const { setCustomer, setSessionToken, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
