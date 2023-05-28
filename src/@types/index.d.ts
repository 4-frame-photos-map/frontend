type TResponse = {
  success: boolean;
  message: string;
};

type Position = {
  lat: number;
  lng: number;
};

type Bound = {
  ha: number;
  oa: number;
  pa: number;
  qa: number;
};

type FaqListProps = {
  id: number;
  title: string;
  content: string;
};
