import { createContext, useContext, useEffect, useReducer } from 'react';
import { API_URL } from '../config';
import { UserDoc } from '../types/User';

interface State {
  authenticated: boolean;
  user: UserDoc | null;
  loading: boolean;
}

interface Action {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  authenticated: false,
  user: null,
  loading: true,
});

const DispatchContext = createContext((type: string, payload: any) => {});

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        authenticated: true,
        user: payload,
      };
    case 'LOGOUT':
      return { ...state, authenticated: false, user: null };
    case 'STOP_LOADING':
      return { ...state, loading: false };
    default:
      throw new Error(`Unknow action type: ${type}`);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  const dispatch = (type: string, payload?: any) =>
    defaultDispatch({ type, payload });

  useEffect(() => {
    async function loadUser() {
      try {
        const jwt = localStorage.getItem('jwt');
        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        }).then((result) => result.json());
        if (!res.ok) {
          throw Error(res.message);
        }
        dispatch('LOGIN', res.user);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch('STOP_LOADING');
      }
    }
    loadUser();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
