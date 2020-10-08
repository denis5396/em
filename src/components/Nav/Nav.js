import React, { Component, createRef } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
class Nav extends Component {
  state = {
    working: false,
  };
  mobileDropdownUlRef = createRef();
  mobileDropdownRef = createRef();
  dropdownClick = createRef();
  navRef = createRef();
  componentDidMount() {
    const dropDown = this.navRef.current.clientHeight;
    this.mobileDropdownUlRef.current.style.transform = 'translateY(10rem)';
    this.mobileDropdownUlRef.current.style.opacity = '0';
    this.mobileDropdownUlRef.current.style.transition =
      'transform 0.5s ease, opacity 0.2s ease, display 1s ease';
    this.mobileDropdownRef.current.style.marginTop = dropDown + 'px';
  }

  handleClickHmenu = () => {
    this.dropdownClick.current.disabled = true;
    setTimeout(() => {
      this.dropdownClick.current.disabled = false;
    }, 500);

    if (!this.state.working) {
      this.setState({ working: true });
    } else if (this.state.working) {
      this.setState({ working: false });
    }
    if (!this.state.working) {
      this.mobileDropdownUlRef.current.style.display = 'flex';
      setTimeout(() => {
        this.mobileDropdownUlRef.current.style.transform = 'translateY(0rem)';
        this.mobileDropdownUlRef.current.style.opacity = '1';
      }, 10);
    } else if (this.state.working) {
      this.mobileDropdownUlRef.current.style.transform = 'translateY(10rem)';
      this.mobileDropdownUlRef.current.style.opacity = '0';
      setTimeout(() => {
        this.mobileDropdownUlRef.current.style.display = 'none';
      }, 400);
    }
  };
  render() {
    return (
      <>
        <nav className="nav" ref={this.navRef}>
          <a className="homelink">
            <Link to={'/'}>
              <div className="logo">
                <img
                  className="logoimg"
                  src={require('../../assets/img/giphy5.gif')}
                  alt=""
                />
                <span className="ones">Elektro</span>
                <span className="twos">Plus</span>
              </div>
            </Link>
          </a>
          <input
            type="checkbox"
            name="hmenu"
            id="hmenu"
            onClick={this.handleClickHmenu}
            ref={this.dropdownClick}
          />
          <div id="mobilemenu">
            <div id="mobilemenuin"></div>
          </div>
          <div id="hambmobilemenu" ref={this.mobileDropdownRef}>
            <ul ref={this.mobileDropdownUlRef}>
              <li id="pocfix">
                <Link to="/">Početna</Link>
              </li>
              <li>
                <Link to="/usluge">Usluge</Link>
              </li>
              <li>
                <Link to="/onama">O nama</Link>
              </li>
              <li>
                <a href="/radovi.html">
                  <Link to={'/radovi'}>Radovi</Link>
                </a>
              </li>
              <li>
                <a href="./kontakt.html">
                  <Link to={'/kontakt'}>Kontakt</Link>
                </a>
              </li>
            </ul>
          </div>
          <ul>
            <li>
              <a href="#" className="current">
                <Link to="/" style={{ color: '#ffcd3c', fontWeight: 'bolder' }}>
                  Početna
                </Link>
              </a>
              <span className="underline"></span>
            </li>
            <li>
              <a href="./usluge.html">
                <Link
                  to="/usluge"
                  style={{ color: '#1b6ca8', fontWeight: 'bolder' }}
                >
                  Usluge
                </Link>
              </a>
              <span className="underline"></span>
            </li>
            <li>
              <a href="./onama.html">
                <Link
                  to="/onama"
                  style={{ color: '#1b6ca8', fontWeight: 'bolder' }}
                >
                  O nama
                </Link>
              </a>
              <span className="underline"></span>
            </li>
            <li>
              <a href="/radovi.html">
                <Link
                  to={'/radovi'}
                  style={{ color: '#1b6ca8', fontWeight: 'bolder' }}
                >
                  Radovi
                </Link>
              </a>
              <span className="underline"></span>
            </li>
            <li>
              <a href="./kontakt.html">
                <Link
                  to={'/kontakt'}
                  style={{ color: '#1b6ca8', fontWeight: 'bolder' }}
                >
                  Kontakt
                </Link>
              </a>
              <span className="underline"></span>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default Nav;
