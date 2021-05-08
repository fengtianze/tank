import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import {
  Button,
  ButtonTheme,
  Tooltip,
  TooltipPlacement,
  TooltipProps,
  TooltipRef,
  TooltipTheme,
  TooltipTrigger,
} from '../../components';

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .add('tooltip', () => {
    const trigger = select(
      'trigger',
      {
        [TooltipTrigger.Click]: TooltipTrigger.Click,
        [TooltipTrigger.Hover]: TooltipTrigger.Hover,
        [TooltipTrigger.Focus]: TooltipTrigger.Focus,
        [TooltipTrigger.Manual]: TooltipTrigger.Manual,
      },
      Tooltip.defaultProps.trigger,
    );
    const theme = select(
      'theme',
      {
        [TooltipTheme.Default]: TooltipTheme.Default,
        [TooltipTheme.Success]: TooltipTheme.Success,
        [TooltipTheme.Warning]: TooltipTheme.Warning,
        [TooltipTheme.Danger]: TooltipTheme.Danger,
        [TooltipTheme.Empty]: TooltipTheme.Empty,
      },
      Tooltip.defaultProps.theme,
    );
    const placementOptions = ['auto', 'top', 'right', 'bottom', 'left'].reduce(
      (prev: string[], curr: string) => {
        return prev.concat(curr, curr + '-start', curr + '-end');
      },
      [],
    );
    const placement = select(
      'placement',
      placementOptions,
      Tooltip.defaultProps.placement,
    );
    const offset = text('offset', Tooltip.defaultProps.offset as string);
    const arrow = boolean('arrow', Tooltip.defaultProps.arrow);

    return (
      <Demo
        trigger={trigger}
        theme={theme}
        placement={placement as TooltipPlacement}
        offset={offset}
        arrow={arrow}
      />
    );
  });

const refChangeLog = action('tooltipRef changed');

function Demo(props: TooltipProps) {
  const [tooltipRef, setTooltipRef] = useState<TooltipRef>();
  const handleTooltipRefChange = useCallback((ref) => {
    refChangeLog(ref);
    setTooltipRef(ref);
  }, []);
  const handleClick = useCallback(() => {
    if (props.trigger === TooltipTrigger.Manual && tooltipRef) {
      tooltipRef.switchActivated();
    }
  }, [tooltipRef, props.trigger]);

  return (
    <div style={{ padding: '50px' }}>
      <Tooltip {...props} ref={handleTooltipRefChange} content="content">
        <Button theme={ButtonTheme.Primary} onClick={handleClick}>
          trigger
        </Button>
      </Tooltip>
    </div>
  );
}
