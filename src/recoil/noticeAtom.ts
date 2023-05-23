import { atom } from 'recoil';

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue =
      typeof window !== 'undefined' ? localStorage.getItem(key) : null;

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const noticeState = atom<{ notice1: boolean; notice2: boolean }>({
  key: 'noticeState',
  default: {
    notice1: false,
    notice2: false,
  },
  effects: [localStorageEffect('isNoticeView')],
});
