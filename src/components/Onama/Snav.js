import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Snav.module.css';
class Snav extends Component {
  state = {
    working: false,
    onama: false,
    radovi: false,
    kontakt: false,
  };
  mobileDropdownRef = createRef();
  mobileDropdownUlRef = createRef();
  navRef = createRef();
  dropdownClick = createRef();
  dropdown = createRef();
  componentDidMount() {
    const dropDown = this.navRef.current.clientHeight;
    this.mobileDropdownUlRef.current.style.transform = 'translateY(10rem)';
    this.mobileDropdownUlRef.current.style.opacity = '0';
    this.mobileDropdownUlRef.current.style.transition =
      'transform 0.5s ease, opacity 0.2s ease, display 1s ease';
    this.mobileDropdownRef.current.style.marginTop = dropDown + 'px';

    switch (this.props.cur) {
      case 'onama':
        this.setState({ onama: true, radovi: false, kontakt: false });
        break;
      case 'radovi':
        this.setState({ onama: false, radovi: true, kontakt: false });
        break;
      case 'kontakt':
        this.setState({ onama: false, radovi: false, kontakt: true });
        break;
    }
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
      // this.mobileDropdownUlRef.current.style.display = 'flex';
      this.mobileDropdownUlRef.current.style.setProperty(
        'display',
        'flex',
        'important'
      );
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
      <nav id={styles.nav} ref={this.navRef}>
        <a id={styles.homelink} href="index.html">
          <Link to={'/'}>
            <div id={styles.logo}>
              <span id={styles.ones}>Elektromonting</span>
              <img
                id={styles.logoimg}
                src={require('../../assets/img/emlogo.png')}
                alt=""
              />
            </div>
          </Link>
        </a>
        <input
          type="checkbox"
          name="hmenu"
          id={styles.hmenu}
          ref={this.dropdownClick}
          onClick={this.handleClickHmenu}
        />
        <div id={styles.mobilemenu}>
          <div id={styles.mobilemenuin}></div>
        </div>
        <div id={styles.hambmobilemenu} ref={this.mobileDropdownRef}>
          <ul ref={this.mobileDropdownUlRef}>
            <li id={styles.pocfix}>
              <a href="./index.html">
                <Link to={'/'}>Početna</Link>
              </a>
            </li>
            <li>
              <a href="./usluge.html">
                <Link to={'/usluge'}>Usluge</Link>
              </a>
            </li>
            <li>
              <a href="./onama.html">
                <Link to={'/onama'}>O nama</Link>
              </a>
            </li>
            <li>
              <a href="/radovi.html">
                <Link to={'/radovi'}>Radovi</Link>
              </a>
            </li>
            <li>
              <a href="/kontakt.html">
                <Link to={'/kontakt'}>Kontakt</Link>
              </a>
            </li>
          </ul>
        </div>
        <ul id={styles.fixUl}>
          <li>
            <a href="index.html">
              <Link to={'/'}>Početna</Link>
            </a>
            <span class={styles.underline}></span>
          </li>
          <li>
            <a href="./usluge.html">
              <Link to={'/usluge'}>Usluge</Link>
            </a>
            <span class={styles.underline}></span>
          </li>
          <li>
            <a href="./onama.html">
              <Link
                to={'/onama'}
                class={this.state.onama ? styles.current : ''}
                style={{ color: this.state.onama ? '#ffcd3c' : '#fff' }}
              >
                O nama
              </Link>
            </a>
            <span class={styles.underline}></span>
          </li>
          <li>
            <a
              href="/radovi.html"
              class={this.state.radovi ? styles.current : ''}
            >
              <Link to={'/radovi'}>Radovi</Link>
            </a>
            <span class={styles.underline}></span>
          </li>
          <li>
            <a
              href="./kontakt.html"
              class={this.state.kontakt ? styles.current : ''}
            >
              <Link to={'/kontakt'}>Kontakt</Link>
            </a>
            <span class={styles.underline}></span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Snav;
