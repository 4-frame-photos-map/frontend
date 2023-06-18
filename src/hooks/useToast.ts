import { toastState } from '@recoil/toastAtom';
import { getRandomNum } from '@utils/getRandomNum';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

const useToast = () => {
  const setToasts = useSetRecoilState(toastState);

  const hideToast = useCallback(
    (toastId: Toast['id']) => {
      setToasts((currentToast) =>
        currentToast.filter((toast) => toast.id !== toastId),
      );
    },
    [setToasts],
  );

  const showToast = useCallback(
    (toast: Toast) => {
      setToasts((currentToast) => [
        ...currentToast,
        { ...toast, id: getRandomNum() },
      ]);
      setTimeout(() => hideToast(toast.id), 500 + (toast.duration ?? 1000));
    },
    [hideToast, setToasts],
  );

  return { showToast };
};

export default useToast;
