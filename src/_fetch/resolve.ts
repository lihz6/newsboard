export default <T>(data: T, ms = 2000): Promise<T> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, ms);
  });
