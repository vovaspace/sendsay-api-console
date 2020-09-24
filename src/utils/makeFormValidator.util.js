/*
  The 'makeFormValidator' takes an object of validators
  like '{ [formFieldName]: validatorFunc | validatorFunc[] }'
  (where 'validatorFunc: (value) => bool')
  and returns a 'validator' function.

  The 'validator' function takes form value
  and returns object of errors like '{ [formFieldName]: true }'
  (where 'true' means that there is an error)
  or 'null' if there are not errors.
*/


export const makeFormValidator = (validatorFuncsObj) => {
  const validatorFuncsMap = Object.entries(validatorFuncsObj);

  return (formValue) => {
    const initialAcc = {};

    const errors = validatorFuncsMap.reduce((acc, [name, funcOrFuncsArr]) => {
      const formFieldValue = formValue[name];

      const result = typeof funcOrFuncsArr === 'function'
        ? !funcOrFuncsArr(formFieldValue)
        : funcOrFuncsArr.some((func) => !func(formFieldValue));

      return result ? { ...acc, [name]: result } : acc;
    }, initialAcc);

    return initialAcc === errors ? null : errors;
  };
};
