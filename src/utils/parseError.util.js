export const parseError = (error) => {
  if (error instanceof Error) {
    return { error: error.name, message: error.message };
  }

  return error;
};
