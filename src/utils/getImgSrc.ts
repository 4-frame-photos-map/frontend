export const getSelectedImg = (name: string) => {
  const src = name?.includes('인생네컷')
    ? '/svg/marker_select_pink.svg'
    : name?.includes('하루필름')
    ? '/svg/marker_select_blue.svg'
    : name?.includes('포토이즘')
    ? '/svg/marker_select_black.svg'
    : name?.includes('포토그레이')
    ? '/svg/marker_select_gray.svg'
    : '/svg/marker_select_white.svg';
  return src;
};

export const getDefaultImg = (name: string) => {
  const src = name?.includes('인생네컷')
    ? '/svg/marker_pink.svg'
    : name?.includes('하루필름')
    ? '/svg/marker_blue.svg'
    : name?.includes('포토이즘')
    ? '/svg/marker_black.svg'
    : name?.includes('포토그레이')
    ? '/svg/marker_gray.svg'
    : '/svg/marker_white.svg';
  return src;
};
