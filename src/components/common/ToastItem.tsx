import { PropsWithChildren, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const ToastItem = ({
  children,
  duration,
}: PropsWithChildren<Pick<Toast, 'duration'>>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleSetTimeout = setTimeout(() => {
      setIsVisible(false);
      clearTimeout(handleSetTimeout);
    }, duration);
  }, [duration]);

  const toastItemStyle = {
    opacity: isVisible ? 1 : 0,
  };

  return <ToastItemBox style={toastItemStyle}>{children}</ToastItemBox>;
};

const ToastItemBox = tw.div`
absolute bottom-10 transition-all duration-500 ease-in-out w-fit h-11 bg-brand-black flex justify-center items-center rounded-[4px] px-4
`;

export default ToastItem;
