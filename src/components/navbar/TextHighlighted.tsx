type HighlightedProps = {
  value: string;
  initial: string;
  rest: string[];
};

const TextHighlighted = ({ value, initial, rest }: HighlightedProps) => {
  const space = rest.join('').split(' ');
  return (
    <>
      {rest.length > 0 ? (
        space[0] === '' ? (
          <>
            <span className="text-black text-label1">{initial}</span>
            <span className="text-label1 text-status-error">&nbsp;{value}</span>
            <span className="-ml-1 text-black text-label1">&nbsp;{rest}</span>
          </>
        ) : (
          <>
            <span className="text-black text-label1">{initial}</span>
            <span className="text-label1 text-status-error">&nbsp;{value}</span>
            <span className="text-black text-label1">{rest}</span>
          </>
        )
      ) : (
        initial
      )}
    </>
  );
};

export default TextHighlighted;
