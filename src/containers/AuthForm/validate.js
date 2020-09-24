import { REGEX } from '@/constants';
import { makeFormValidator } from '@/utils';


const isNotEmpty = (str) => str.length > 0;

const isEmail = (str) => REGEX.email.test(str);
const isLogin = (str) => REGEX.login.test(str);
const isEmailOrLogin = (str) => isEmail(str) || isLogin(str);
const isPassword = (str) => REGEX.password.test(str);


export const validate = makeFormValidator({
  login: [isNotEmpty, isEmailOrLogin],
  password: [isNotEmpty, isPassword],
});
