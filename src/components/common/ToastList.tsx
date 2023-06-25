import { toastState } from '@recoil/toastAtom';
import { useRecoilValue } from 'recoil';
import ToastItem from '@components/common/ToastItem';

const ToastList = () => {
  const toasts = useRecoilValue(toastState);
  return (
    <div className="fixed bottom-16 z-[999] flex w-full justify-center">
      {toasts.map(({ id, duration, message }) => (
        <ToastItem key={id} duration={duration}>
          <span className="text-white text-label2">{message}</span>
        </ToastItem>
      ))}
    </div>
  );
};

export default ToastList;
