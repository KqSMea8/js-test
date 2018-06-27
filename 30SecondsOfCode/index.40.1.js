const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

const sum = pipeAsyncFunctions(
    x => x + 1,
    x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
    x => x + 3,
    async x => (await x) + 4
  );
  (async () => {
    console.log(await sum(5)); // 15 (after one second)
  })();


  const promisify = func => (...args) => 
    new Promise((resolve, reject) => 
      func(...args, (err, result) => (err ? reject(err): resolve(result)))
  )

  const promisify = func => (...args) =>
    new Promise((resolve, reject) => 
    func(...args, (err, result) => (err ? reject(err): resolve(result)))
  )

  const deepFlatten = arr => [].concat(...arr.map((v) => Array.isArray(v) ? deepFlatten(v) : v))
  const deepFlatten = arr => [].concat(...arr.map((v) => Array.isArray(v) ? deepFlatten(v) : v))

  const differenceBy = ((a, b, fn) => {
    const s = new Set(...fn(b));
    return b.filter(v => !s.has(fn(v)))
  })

  const differenceBy = ((a, b, fn) => {
    const s = new Set(...fn(b));
    return b.filter(v => !s.has((fn(v))))
  })


  const filterNonUnique = (arr) => arr.filter(v => v.indexOf(arr) === v.lastIndexOf(arr))

  const filterNonUnique = (arr) => arr.filter(v => v.indexOf(arr) === v.lastIndexOf(arr))

  const flatten = (arr, depth = 1) => 
    arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1): v), [])

  const flatten = (arr, depth = 1) =>
    arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1): v), [])  

const initalize2DArray = (w, h, val = null) => 
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));


const initalize2DArray = (w, h, val = null) =>
  Array.from({length: h}).map(() => Array.from({length: w}).fill(val))  

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}


const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}
const  union = (a, b) => Array.from(new Set([...a, ...b]))

// const union = (a, b) => [...new Set([...a, ...b])]


const pick = (obj, arr) => 
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({length: maxLength}).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i])
  })
}

const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({length: maxLength}).map((_, i) => {
    return Array.from({length: arrays.length}, (_, k) => arrays[k][i])
  })
}

const unzip = arr => 
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  )

const unzip = arr => 
  arr.reduce(
    (acc,val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  )

const chainAsync = fns => {
  let curr = 0;
  const next = () => fns[curr++](next);
  next();
} 

const chainAsync = fns => {
  let curr = 0;
  const next = () => fns[curr++](next);
  next();
}

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));


const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);


const delay = d => new Promise(r => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]);


const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve())


const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

const memoize = fn => {
  const cache = new Map();
  const cached = function(val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val) && cache.get(val));
  };
  cached.cache = cache;
  return cached;
}

const once = fn => {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  }
}

var throttle = function ( fn, interval ) {
  var __self = fn, // 保存需要被延迟执行的函数引用
          timer, // 定时器
          firstTime = true; // 是否是第一次调用
  return function () {
      var args = arguments,
              __me = this;
      if ( firstTime ) { // 如果是第一次调用，不需延迟执行
          __self.apply(__me, args);
          return firstTime = false;
      }
      if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
          return false;
      }
      timer = setTimeout(function () { // 延迟一段时间执行
          clearTimeout(timer);
          timer = null;
          __self.apply(__me, args);
      }, interval || 5000 );
  };
};


const uncurry = (fn, n = 1) => (...args) => {
  const next = acc => args => args.reduce((x, y) => x(y), acc);
  if (n > args.length) throw new RangeError('arguments too few');
  return next(fn)(args.slice(0, n))
}