import useDebounceValue from '@hooks/useDebounceValue';
import { renderHook, waitFor } from '@testing-library/react';

describe('useDebounce를 테스트한다.', () => {
  test('초기값은 빈 문자열 또는 값이 없어야 한다.', () => {
    const initValue = '';
    const { result } = renderHook(() =>
      useDebounceValue<string>(initValue, 500),
    );
    expect(result.current).toBe('');
  });

  test('사용자의 입력이 종료된 후 500ms 이후 텍스트가 입력된다.', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceValue<string>(value, 500),
      {
        initialProps: { value: '' },
      },
    );

    rerender({ value: '네컷사진' });

    await waitFor(
      () => {
        expect(result.current).toBe('네컷사진');
      },
      { timeout: 550 },
    );
  });
});
