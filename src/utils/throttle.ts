const throttle = (func: any, limit: number = 1000) => {
  let timeout: any;
  let lastRun: number;
  return (...args: any) => {
    if (!lastRun) {
      lastRun = Date.now();
      func.call(this, ...args);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        lastRun = Date.now();
        func.call(this, ...args);
      }, limit - (Date.now() - lastRun));
    }
  };
};

export default throttle;
