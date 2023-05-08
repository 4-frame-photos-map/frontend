type TResponse = {
  success: boolean;
  message: string;
};

type Position = {
  lat: number | undefined;
  lng: number | undefined;
};

type Bound = {
  ha: number;
  oa: number;
  pa: number;
  qa: number;
};
