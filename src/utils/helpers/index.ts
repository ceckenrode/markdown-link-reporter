export const runChain = (x: any) => ({
  chain: (f: Function) => runChain(f(x)),
  fold: (f: Function) => f(x)
});
