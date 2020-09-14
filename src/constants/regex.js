export const REGEX = {
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,

  // Latin characters, digits and _
  login: /^\w+$/,

  // Not cyrillic
  password: /^[^\u0400-\u04FF]+$/,
};
