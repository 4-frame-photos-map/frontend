import { getRandomNum } from '@utils/getRandomNum';

describe('getRandomNum를 테스트한다.', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('문자열 형태의 난수를 반환해야 한다.', () => {
    const output1 = getRandomNum();

    expect(typeof output1).toBe('string');
  });

  it('생성된 난수는 유니크한 값이여야 한다.', () => {
    const output1 = getRandomNum();
    // Date 객체를 통해 난수를 생성하기 때문에 타이머를 통해 생성을 지연시킵니다.
    jest.advanceTimersByTime(1000);
    const output2 = getRandomNum();

    expect(output2).not.toBe(output1);
  });
});
