// runChain is a functional programming helper which allows us to pipe the result of one function into another in an easy to reason about way
export const runChain = (x: any) => ({
  chain: (f: Function) => runChain(f(x)),
  fold: (f: Function) => f(x)
});
