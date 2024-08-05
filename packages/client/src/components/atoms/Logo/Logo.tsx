import logoWithBlocks from 'src/assets/logo-w-blocks.svg';
import logo from 'src/assets/logo.svg';

import styles from './Logo.module.css';

export type LogoProps = {
  size?: 'auto' | 'sm' | 'md';
  isFull?: boolean;
};

export const Logo = ({ size = 'md', isFull = false }: LogoProps) => {
  return (
    <img
      className={styles.logo}
      data-size={size}
      src={isFull ? logoWithBlocks : logo}
      alt="Blockhaus"
    />
  );
};
