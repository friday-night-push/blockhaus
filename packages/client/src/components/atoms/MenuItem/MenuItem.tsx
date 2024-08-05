import { Menu, Text } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';

export type MenuItemProps = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export const MenuItem = ({ label, href, onClick }: MenuItemProps) => {
  const navigate = useNavigate();

  const goToHref = () => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <Menu.Item
      theme={'normal'}
      style={{ minHeight: '50px' }}
      onClick={onClick || goToHref}>
      <Text variant={'display-2'}>{label}</Text>
    </Menu.Item>
  );
};
