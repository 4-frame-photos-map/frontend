import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@utils/localStorage';

export interface Token {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

const TOKEN_KEY = '@token';

export const getToken = (): Token => {
  const token = getLocalStorage<Token>(TOKEN_KEY, {
    accessToken: undefined,
    refreshToken: undefined,
  });
  return token;
};

export const setToken = (token: Token) => {
  setLocalStorage(TOKEN_KEY, token);
};

export const deleteToken = () => {
  removeLocalStorage(TOKEN_KEY);
  removeLocalStorage('isLogin');
};
