import { Title } from "rizzui";
import cn from "../../utils/class-names";
import { ForwardedRef, forwardRef } from "react";

const widgetCardClasses = {
  base: "border border-muted bg-paper py-5 dark:bg-paper lg:py-7",
  rounded: {
    sm: "rounded-sm",
    DEFAULT: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
  },
};

type WidgetCardTypes = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  rounded?: keyof typeof widgetCardClasses.rounded;
  headerClassName?: string;
  titleClassName?: string;
  actionClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

function WidgetCard(
  {
    title,
    action,
    description,
    rounded = "DEFAULT",
    className,
    headerClassName,
    actionClassName,
    titleClassName,
    descriptionClassName,
    children,
  }: React.PropsWithChildren<WidgetCardTypes>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className={cn(
        widgetCardClasses.base,
        widgetCardClasses.rounded[rounded],
        className
      )}
      ref={ref}
    >
      {action || title || description ? (
        <div
          className={cn(
            action && "flex items-start justify-between",
            headerClassName
          )}
        >
          {title && (
            <div>
              {title && (
                <Title
                  as="h3"
                  className={cn(
                    "text-base font-semibold sm:text-lg",
                    titleClassName
                  )}
                >
                  {title}
                </Title>
              )}
              {description && (
                <div className={descriptionClassName}>{description}</div>
              )}
            </div>
          )}
          {action && (
            <div className={cn("ps-2", actionClassName)}>{action}</div>
          )}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export default forwardRef(WidgetCard);
WidgetCard.displayName = "WidgetCard";
