import { Button as ButtonComponent, ButtonProps } from '@gravity-ui/uikit';

export const Button = ({
  type = 'button',
  view = 'normal',
  children,
  ...props
}: ButtonProps) => {
  return (
    <ButtonComponent
      type={type}
      view={view}
      size="xl"
      pin={'brick-brick'}
      {...props}>
      {children}
    </ButtonComponent>
  );
};
