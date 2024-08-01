import { createContext } from 'react';

import { TUser } from 'src/shared/types/user';

export type AppContextType = {
  user?: TUser;
};

export const AppContext = createContext<AppContextType>({});
