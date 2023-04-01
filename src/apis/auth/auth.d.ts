type Login = {
  jwt_token: {
    access_token: string;
    refresh_token: string;
  };
};

type Reissue = {
  access_token: string;
};
