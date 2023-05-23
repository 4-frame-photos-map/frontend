import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { SetterOrUpdater } from 'recoil';

type NoticeItemProps = {
  title: string;
  content: string;
  isNoticeView: boolean;
  setIsNoticeView: SetterOrUpdater<boolean>;
};

const NoticeItem = ({
  title,
  content,
  isNoticeView,
  setIsNoticeView,
}: NoticeItemProps) => {
  const [isView, setIsView] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, [isNoticeView]);

  if (!mounted) return <></>;

  return (
    <NoticeList>
      <div className="mb-1 flex justify-between text-body2">
        <div className="flex">
          <p>{title}</p>
          {!isNoticeView && (
            <div className="ml-1 h-2 w-2 rounded-full bg-status-error"></div>
          )}
        </div>
        <Image
          src={isView ? '/svg/dropdown.svg' : '/svg/dropup.svg'}
          alt="열기"
          width={20}
          height={20}
          onClick={() => {
            if (isView) {
              setIsView(false);
            } else {
              setIsNoticeView(true);
              setIsView(true);
            }
          }}
        />
      </div>
      {isView && <p className="py-5 text-body1">{content}</p>}
    </NoticeList>
  );
};

const NoticeList = tw.li`
mb-1 bg-white py-2 px-4
`;

export default NoticeItem;
