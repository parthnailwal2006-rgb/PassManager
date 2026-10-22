import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sun, Moon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { removestorage } from "../redux/features/auth/AuthSlice";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const [flag, setflag] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  function handleChange() {
    if (props.mode === "dark") {
      setflag(true);
    } else {
      setflag(false);
    }
  }

  return (
    <header className="sticky top-0 z-20 w-full bg-green-300 border-b border-default">
      <nav className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between px-4 py-3">
        <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">LOCALVAULT</span>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <NavLink to="/" onClick={() => { dispatch(removestorage()) }}>
                {isAuthenticated ? "Logout" : "Login"}
              </NavLink>
            </li>

            <li>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onClick={props.toggletheme}
                  onChange={handleChange}
                  checked={flag === false}
                />
                <div className="relative w-9 h-5 bg-neutral-quaternary ring-2 rounded-full peer-focus:outline-none peer-focus:ring-brand-soft after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:bg-brand"></div>
                <span className="select-none ms-3 text-sm font-medium text-heading">
                  {props.mode === "light" ? <Sun /> : <Moon />}
                </span>
                <span></span>
              </label>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
