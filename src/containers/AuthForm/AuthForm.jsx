import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';
import { AuthActions } from '@/actions';
import { AuthSelectors } from '@/selectors';

import { TextLogotype } from '@/components/TextLogotype';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { ErrorCard } from '@/components/ErrorCard';

import './AuthForm.scss';


const cn = makeCn('AuthForm');


export const AuthForm = (props) => {
  const {
    className,
  } = props;

  const dispatch = useDispatch();

  const error = useSelector(AuthSelectors.selectError);


  const [formValue, setFormValue] = useState({
    login: '',
    sublogin: '',
    password: '',
  });


  const handleChange = useCallback((value, name) => {
    setFormValue((currentValue) => ({ ...currentValue, [name]: value }));
  }, []);


  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    dispatch(AuthActions.loginRequest(formValue));
  }, [formValue, dispatch]);


  return (
    <form
      className={classnames(cn(), className)}
      onSubmit={handleSubmit}
    >
      <TextLogotype className={cn('Item')} />

      {error && (
        <ErrorCard
          className={cn('Item')}
          message="Вход не вышел"
          error={error}
        />
      )}

      <TextField
        className={cn('Item')}
        value={formValue.login}
        name="login"
        label="Логин"

        onChange={handleChange}
      />

      <TextField
        className={cn('Item')}
        value={formValue.sublogin}
        name="sublogin"
        label="Сублогин"
        required={false}

        onChange={handleChange}
      />

      <TextField
        className={cn('Item')}
        value={formValue.password}
        name="password"
        label="Пароль"

        onChange={handleChange}
      />

      <Button
        className={cn('Item', { alignedLeft: true })}
        type="submit"
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
