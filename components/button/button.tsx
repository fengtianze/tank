import React, { forwardRef, MouseEvent } from 'react';
import { Icon } from '../icon';
import { assertClass, Bem } from '../utils/class-helper';
import { ButtonProps, ButtonTheme } from './types';

const bem = Bem.of('tk-button');

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      theme,
      plain,
      round,
      square,
      loading,
      className,
      children,
      onClick,
      ...restProps
    } = props;

    const classString = `${bem.b(theme)} ${assertClass({
      loading,
      plain,
      round,
      square,
    })} ${className}`;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <button
        {...restProps}
        ref={ref}
        className={classString}
        onClick={handleClick}
      >
        <span className={bem.e('content')}>{children}</span>
        {loading ? (
          <span className={bem.e('spinner')}>
            <Icon name={'tk-icon-spinner'} />
          </span>
        ) : null}
      </button>
    );
  },
);

Button.defaultProps = {
  theme: ButtonTheme.Default,
  className: '',
};

Button.displayName = 'TkButton';
