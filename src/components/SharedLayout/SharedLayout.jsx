import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={`${styles.list} ${styles.noDecoration}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.list}>
              <Link to="/movies">Movies</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  );
};

export default SharedLayout;
