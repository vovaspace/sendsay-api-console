export const getElementInnerWidth = (element) => {
  const { paddingLeft, paddingRight } = window.getComputedStyle(element);

  const parsedPaddingLeft = Number.parseInt(paddingLeft, 10);
  const parsedPaddingRight = Number.parseInt(paddingRight, 10);

  return element.offsetWidth - parsedPaddingLeft - parsedPaddingRight;
};
