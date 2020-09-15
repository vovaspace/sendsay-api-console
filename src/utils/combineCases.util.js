/*
  Usage:

  .addMatcher(combineCases([actionCreatorOne, actionCreatorTwo]), ...)
*/

export const combineCases = (actionCreators) => (action) => (
  actionCreators.some((actionCreator) => actionCreator.type === action.type)
);
