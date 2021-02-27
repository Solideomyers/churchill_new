import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import * as BsIcons from 'react-icons/bs';
import { RiSlideshow2Fill, RiStopFill } from 'react-icons/ri';

import { ROUTES } from 'values';
import { usePresenter, useSettingsSidebar } from 'hooks';

export function Navbar() {
  const location = useLocation();
  const { toggleSettings } = useSettingsSidebar();
  const { toggle, presenting } = usePresenter();
  // const [date, setDate] = useState(new Date());

  // useEffect(() => {
  //   const timer = setInterval(() => setDate(new Date()), 1000);
  //   return () => clearInterval(timer);
  // }, []);

  if (location.pathname === ROUTES.CAST_PAGE) {
    return null;
  }

  const navbarStyle = `navbar navbar-expand-lg sticky-top ${
    presenting ? 'navbar-light bg-warning' : 'navbar-dark bg-primary'
  }`;

  return (
    <>
      <nav className={navbarStyle}>
        <div className="container-fluid">
          <span className="navbar-brand">Churchill</span>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                className="nav-link"
                activeClassName="active"
              >
                <BsIcons.BsHouseFill />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={ROUTES.SCRIPTURES_PAGE}
                className="nav-link"
                activeClassName="active"
              >
                <BsIcons.BsBook /> Escrituras
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={ROUTES.ANTHEMNS_PAGE}
                className="nav-link"
                activeClassName="active"
              >
                <BsIcons.BsMusicNoteList /> Himnos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={ROUTES.BIRTHDAYS_PAGE}
                className="nav-link"
                activeClassName="active"
              >
                <BsIcons.BsGift /> Cumpleaños
              </NavLink>
            </li>
          </ul>

          {/* <span className="navbar-text d-block mr-3">
            {date.toLocaleTimeString()}
          </span> */}

          <Button
            className="mr-3"
            onClick={toggle}
            variant={presenting ? 'outline-dark' : 'outline-light'}
          >
            {presenting ? <RiStopFill /> : <RiSlideshow2Fill />}
          </Button>

          <Button
            onClick={toggleSettings}
            className={presenting ? 'text-dark px-0' : 'text-light px-0'}
            variant={presenting ? 'link' : 'link'}
          >
            <BsIcons.BsFillGearFill />
          </Button>
        </div>
      </nav>
    </>
  );
}
