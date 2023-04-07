const dateFormat = (date: number[]) => {
  const year = String(date[0]).slice(2, 4);
  const month = String(date[1]).padStart(2, '0');
  const day = String(date[2]).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default dateFormat;
