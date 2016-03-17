import React from 'react';
import NavLink from 'src/nav-link';
import styles from './styles.css';

export default ({ paths, pathname }) => (
  <div className={styles.main}>
    {paths && paths.map((path, index) => (
      <NavLink key={index} path={path.path} isSelected={path.path === pathname}>
        {path.text}
      </NavLink>
      ))}
  </div>
);
