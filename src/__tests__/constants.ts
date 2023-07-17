export const DUMMY_ITEMS = Array(20)
  .fill(0)
  .map((v, i) => {
    return {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * i * 2),
      open: i + 3,
      high: i + 10,
      low: i + 1,
      close: i + 5,
    };
  });
