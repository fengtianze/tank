import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button, ButtonTheme } from '../../components';

const btnClicked = 'button clicked';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('button', () => {
    const content = text('content', 'button');
    const plain = boolean('plain', false);
    const round = boolean('round', false);
    const square = boolean('square', false);
    const loading = boolean('loading', false);
    const disabled = boolean('disabled', false);

    return (
      <div>
        <Button
          theme={ButtonTheme.Default}
          plain={plain}
          round={round}
          square={square}
          loading={loading}
          disabled={disabled}
          onClick={action(btnClicked)}
        >
          {content}
        </Button>
        <Button
          theme={ButtonTheme.Primary}
          plain={plain}
          round={round}
          square={square}
          loading={loading}
          disabled={disabled}
          onClick={action(btnClicked)}
        >
          {content}
        </Button>
        <Button
          theme={ButtonTheme.Success}
          plain={plain}
          round={round}
          square={square}
          loading={loading}
          disabled={disabled}
          onClick={action(btnClicked)}
        >
          {content}
        </Button>
        <Button
          theme={ButtonTheme.Warning}
          plain={plain}
          round={round}
          square={square}
          loading={loading}
          disabled={disabled}
          onClick={action(btnClicked)}
        >
          {content}
        </Button>
        <Button
          theme={ButtonTheme.Danger}
          plain={plain}
          round={round}
          square={square}
          loading={loading}
          disabled={disabled}
          onClick={action(btnClicked)}
        >
          {content}
        </Button>
        <Button
          theme={ButtonTheme.Info}
          plain={plain}
          round={round}
          square={square}
          loading={loading}
          disabled={disabled}
          onClick={action(btnClicked)}
        >
          {content}
        </Button>
        <br />
        <br />
        <Button
          theme={ButtonTheme.Text}
          plain={plain}
          round={round}
          square={square}
          loading={loading}
          disabled={disabled}
          onClick={action(btnClicked)}
        >
          {content}
        </Button>
      </div>
    );
  });
