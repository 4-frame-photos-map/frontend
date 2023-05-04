import { atom } from 'recoil';

export const boundState = atom<{
  ha: number;
  oa: number;
  pa: number;
  qa: number;
}>({
  key: 'boundState',
  default: {
    ha: 0,
    oa: 0,
    pa: 0,
    qa: 0,
  },
});
