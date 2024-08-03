import { Menu } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';

export type MenuItemProps = {
  label: string;
  href: string;
};

export const MenuItem = ({ label, href }: MenuItemProps) => {
  const navigate = useNavigate();

  const goToHref = () => {
    navigate(href);
  };

  return <Menu.Item onClick={goToHref}>{label}</Menu.Item>;
};
