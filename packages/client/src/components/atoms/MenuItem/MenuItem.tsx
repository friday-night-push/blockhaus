import { Link, Text } from '@gravity-ui/uikit';

export type MenuItemProps = {
  label: string;
  href: string;
};

export const MenuItem = ({ label, href }: MenuItemProps) => {
  return (
    <Text variant={'display-1'}>
      <Link view={'primary'} href={href}>
        {label}
      </Link>
    </Text>
  );
};
