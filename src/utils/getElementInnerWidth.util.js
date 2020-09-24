export const getElementInnerWidth = (el) => {
  const { paddingRight, paddingLeft } = getComputedStyle(el);

  return (
    el.clientWidth
    - (Number.parseInt(paddingRight, 10) || 0)
    - (Number.parseInt(paddingLeft, 10) || 0)
  );
};
