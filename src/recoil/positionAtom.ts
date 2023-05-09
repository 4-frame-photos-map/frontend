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

export const curPosState = atom<Position>({
  key: 'curPos',
  default: {
    lat: 0,
    lng: 0,
  },
  effects: [localStorageEffect('current_position')],
});
