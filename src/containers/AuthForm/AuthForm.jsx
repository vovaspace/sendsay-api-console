import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';
import { AuthActions } from '@/actions';
import { AuthSelectors } from '@/selectors';

import { TextLogotype } from '@/components/TextLogotype';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { ErrorCard } from '@/components/ErrorCard';

import { validate } from './validate';

import styles from './AuthForm.scss';


const cn = makeCn('AuthForm', styles);


export const AuthForm = (props) => {
  const {
    className,
  } = props;

  const dispatch = useDispatch();

  const loginError = useSelector(AuthSelectors.selectErrorWithoutRequest);
  const isLoading = useSelector(AuthSelectors.selectIsLoading);


  const [formValue, setFormValue] = useState({
    login: '',
    sublogin: '',
    password: '',
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);


  const handleChange = useCallback((value, name) => {
    setFormValue((currentValue) => ({ ...currentValue, [name]: value }));
  }, []);


  const formErrors = useMemo(() => validate(formValue), [formValue]);


  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setHasSubmitted(true);

    if (!formErrors) {
      dispatch(AuthActions.loginRequest(formValue));
    }
  }, [formValue, formErrors, dispatch]);


  return (
    <form
      className={cn(null, [className])}
      onSubmit={handleSubmit}
    >
      <TextLogotype className={cn('Item')} />

      {loginError && (
        <ErrorCard
          className={cn('Item')}
          message="Вход не вышел"
          error={loginError}
        />
      )}

      <TextField
        className={cn('Item')}
        value={formValue.login}
        name="login"
        label="Логин"
        type="email"
        inputmode="email"
        error={hasSubmitted && formErrors?.login}

        onChange={handleChange}
      />

      <TextField
        className={cn('Item')}
        value={formValue.sublogin}
        name="sublogin"
        label="Сублогин"
        type="email"
        inputmode="email"
        required={false}

        onChange={handleChange}
      />

      <TextField
        className={cn('Item')}
        value={formValue.password}
        name="password"
        label="Пароль"
        type="password"
        error={hasSubmitted && formErrors?.password}

        onChange={handleChange}
      />

      <Button
        className={cn('Item')}
        type="submit"
        disabled={Boolean(hasSubmitted && formErrors)}
        loading={isLoading}
      >
        Войти
      </Button>
    </form>
  );
};


export const AuthFormPropTypes = {
  className: PropTypes.string,
};


export const AuthFormDefaultProps = {
  className: null,
};


AuthForm.propTypes = AuthFormPropTypes;
AuthForm.defaultProps = AuthFormDefaultProps;
