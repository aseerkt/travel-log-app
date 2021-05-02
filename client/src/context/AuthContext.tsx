import { createContext, useContext, useReducer } from 'react';
import { useQuery } from 'react-query';
import { loadUser } from '../services/users';
import { UserDoc } from '../types/User';

interface State {
  authenticated: boolean;
  user: UserDoc | null;
}

interface Action {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  authenticated: false,
  user: null,
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
    default:
      throw new Error(`Unknow action type: ${type}`);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
  });

  const dispatch = (type: string, payload?: any) =>
    defaultDispatch({ type, payload });

  const { isLoading } = useQuery('me', loadUser);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
