import { render } from '@testing-library/react';
import Seo from '@components/common/Seo';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

test('title props에 따른 타이틀 확인', () => {
  render(<Seo title="홈" url="home" />, { container: document.head });
  expect(document.title).toBe('홈 | 네컷지도');
});
