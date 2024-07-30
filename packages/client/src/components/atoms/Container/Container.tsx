import { Flex, FlexProps } from '@gravity-ui/uikit';

export type ContainerProps = FlexProps;

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <section>
      <Flex gap="3" {...props}>
        {children}
      </Flex>
    </section>
  );
};
