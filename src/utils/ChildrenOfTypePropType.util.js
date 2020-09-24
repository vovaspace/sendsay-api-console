import { Children } from 'react';


const checkChild = (componentType, child) => componentType === child.type;


const createChecker = (componentType, isRequired) => (
  props,
  propName,
  componentName,
  _location,
  propFullName,
) => {
  // eslint-disable-next-line react/destructuring-assignment
  const prop = props[propName];

  if (!prop) {
    if (isRequired) {
      return new Error(
        `The prop '${propFullName || propName}' is marked as required in '${componentName}', but its value is '${prop}'.`,
      );
    }

    return null;
  }


  const childrenArray = Children.toArray(prop);
  const isArrayType = Array.isArray(componentType);

  const childOfOtherType = childrenArray.find((child) => {
    if (isArrayType) {
      return componentType.every((type) => !checkChild(type, child));
    }

    return !checkChild(componentType, child);
  });


  if (childOfOtherType) {
    const componentNameMessage = isArrayType
      ? `${componentType.map((ct) => `'${ct.name}'`).join('or ')} were expected.`
      : `'${componentType.name}' was expected.`;

    return new Error(
      `Invalid prop '${propFullName || propName}' supplied to '${componentName}'. ${componentNameMessage}`,
    );
  }

  return null;
};


export const ChildrenOfTypePropType = (componentType) => {
  const checker = createChecker(componentType, false);
  checker.isRequired = createChecker(componentType, true);

  return checker;
};
