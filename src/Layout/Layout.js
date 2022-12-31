import { Fragment } from 'react';
import logo from '../assets/logo.png';

import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <Fragment>
      <img className={classes.logo} src={logo} alt="logo" />
      {/* <nav className={classes.nav}>
          <ul>
            {props.isLoggedIn && (
              <li>
                <NavLink to="/lobby" activeClassName={classes.active}>
                  Lobby
                </NavLink>
              </li>
            )}
            {props.isLoggedIn && (
              <li>
                <button onClick={props.onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav> */}

      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
