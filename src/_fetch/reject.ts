export default (reason: any, ms = 2000) =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject(reason);
    }, ms);
  });
