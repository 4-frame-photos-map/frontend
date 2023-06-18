import { atom } from 'recoil';

export type Toast = {
  id?: string;
  message: string;
  duration?: number;
};

export const toastState = atom<Toast[]>({
  key: 'toastState',
  default: [],
});
