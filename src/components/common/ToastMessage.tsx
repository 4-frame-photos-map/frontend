import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type ToastProps = {
  text: string;
  setToast: Dispatch<SetStateAction<boolean>>;
};

const ToastMessage = ({ text, setToast }: ToastProps) => {
  const [opacity, setOpacity] = useState<number>(0.7);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setToast(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <>
      {
        <div
          className={`mx-12 flex items-center justify-center rounded bg-black px-4 py-3`}
          style={{ opacity: opacity, transition: 'opacity 0.5s ease' }}
        >
          <span className="text-white text-label2">{text}</span>
        </div>
      }
    </>
  );
};

export default ToastMessage;
