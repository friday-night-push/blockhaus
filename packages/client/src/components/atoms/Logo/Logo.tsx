import logo from 'src/assets/logo.svg';

import styles from './Logo.module.css';

export const Logo = ({ size = 'normal' }) => {
  return (
    <img className={styles.logo} data-size={size} src={logo} alt="Blockhaus" />
  );
};
