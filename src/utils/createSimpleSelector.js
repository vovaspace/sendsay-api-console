export const createSimpleSelector = (rootSelector, selector) => (
  (state) => selector(rootSelector(state))
);
