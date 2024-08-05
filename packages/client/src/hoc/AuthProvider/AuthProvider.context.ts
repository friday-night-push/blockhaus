import { createContext, Dispatch, SetStateAction } from 'react';

import { Nullable } from 'src/shared/types/global';
import { TUser } from 'src/shared/types/user';

export interface AuthContextType {
  user: Nullable<TUser>;
  setUser?: Dispatch<SetStateAction<Nullable<TUser>>>;
  userIsLoading?: boolean;
  setUserIsLoading?: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: undefined,
  userIsLoading: false,
  setUserIsLoading: undefined,
});
