type Login = TResponse & {
  result: {
    jwt_token: {
      access_token: string;
      refresh_token: string;
    };
  };
};

type Reissue = TResponse & {
  accessToken: string;
};
