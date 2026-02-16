import { cloneElement, forwardRef, ReactElement, HTMLAttributes, MouseEvent } from 'react';
import Popover from '../popover/popover';
import { isElement } from '../popover/popover-trigger';
import { useMenuContext } from './menu-context';

export interface MenuTargetProps {
  as?: string;
  children: React.ReactNode;
  refProp?: string;
  className?: string;
}

export const MenuTrigger = forwardRef<HTMLElement, MenuTargetProps>(
  ({ as = 'li', children, refProp = 'ref', ...props }, ref) => {
    const ctx = useMenuContext();

    if (!isElement(children)) {
      throw new Error(
        'Menu.Trigger component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
      );
    }

    const child = children as ReactElement<HTMLAttributes<HTMLElement> & {
      onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
      onMouseEnter?: (event?: React.MouseEvent<HTMLElement>) => void;
      onMouseLeave?: (event?: React.MouseEvent<HTMLElement>) => void;
    }>;

    const onClick = (event?: React.MouseEvent<HTMLElement>) => {
      child.props.onClick?.(event);
      if (ctx.trigger === 'click') {
        ctx.toggleDropdown();
      } else if (ctx.trigger === 'click-hover') {
        ctx.setOpenedViaClick(true);
        if (!ctx.opened) {
          ctx.openDropdown();
        }
      }
    };

    const onMouseEnter = (event?: React.MouseEvent<HTMLElement>) => {
      child.props.onMouseEnter?.(event);
      if (ctx.trigger === 'hover' || ctx.trigger === 'click-hover') {
        ctx.openDropdown();
      }
    };

    const onMouseLeave = (event?: React.MouseEvent<HTMLElement>) => {
      child.props.onMouseLeave?.(event);
      if (ctx.trigger === 'hover') {
        ctx.closeDropdown();
      } else if (ctx.trigger === 'click-hover' && !ctx.openedViaClick) {
        ctx.closeDropdown();
      }
    };

    return (
      <Popover.Trigger popupType="menu" refProp={refProp} ref={ref} {...props}>
        {cloneElement(child, {
          onClick,
          onMouseEnter,
          onMouseLeave,
          'data-expanded': ctx.opened ? true : undefined,
        } as HTMLAttributes<HTMLElement> & {
          onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
          onMouseEnter?: (event?: React.MouseEvent<HTMLElement>) => void;
          onMouseLeave?: (event?: React.MouseEvent<HTMLElement>) => void;
        })}
      </Popover.Trigger>
    );
  }
);

MenuTrigger.displayName = 'MenuTrigger';
