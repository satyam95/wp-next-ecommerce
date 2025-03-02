import { useMutation } from "@apollo/client";
import { useAppDispatch } from "./hooks";
import { LOGIN_MUTATION } from "@/apollo/mutations/loginUser";
import {
  setCustomer,
  setSessionToken,
  logout as logoutAction,
} from "./sessionSlice";

export const useSessionActions = () => {
  const dispatch = useAppDispatch();
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const login = async (username: string, password: string) => {
    try {
      const response = await loginMutation({
        variables: {
          username,
          password,
        },
      });
      if (response?.data?.login?.authToken) {
        const { authToken, refreshToken, customer } = response.data.login;
        // Store tokens using environment variable keys.
        sessionStorage.setItem(
          process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY!,
          authToken
        );
        localStorage.setItem(
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY!,
          refreshToken
        );
        sessionStorage.setItem(
          process.env.NEXT_PUBLIC_SESSION_TOKEN_KEY!,
          customer.sessionToken
        );
        // Dispatch actions to update the Redux state.
        dispatch(setCustomer(customer));
        dispatch(setSessionToken(customer.sessionToken));
      } else {
        throw new Error("Invalid login response.");
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return { login, logout, loading, error };
};
