import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Usluge/Usluge.module.css';

class header2 extends Component {
  state = {
    clickable: true,
    count: 1,
    srchBoxInput: '',
    working: false,
  };

  right = createRef();
  left = createRef();
  sliderux = createRef();
  tagParent = createRef();
  srchBox = createRef();
  rasvjetaS = createRef();
  jakastrS = createRef();
  slabastrS = createRef();
  knxS = createRef();
  dijagnozaS = createRef();
  sigurnostS = createRef();
  planiranjeS = createRef();
  mobileDropdownUlRef = createRef();
  mobileDropdownRef = createRef();
  dropdownClick = createRef();
  navRef = createRef();
  preImg = require('../../../assets/img/usluge/output-onlinepngtools2.webp');

  goRight = () => {
    if (this.state.clickable) {
      this.setState(
        (prevState) => ({
          clickable: false,
          count: prevState.count + 1,
        }),
        () => {
          this.sliderux.current.style.transition = 'transform 0.5s ease';
          this.changeSlide();
          setTimeout(() => {
            this.setState({ clickable: false });
            if (this.state.count === 8) {
              this.sliderux.current.style.transition = 'none';
            }
            this.identify();
          }, 1000);
        }
      );
    }
  };

  goLeft = () => {
    if (this.state.clickable) {
      this.setState(
        (prevState) => ({
          clickable: false,
          count: prevState.count - 1,
        }),
        () => {
          this.sliderux.current.style.transition = 'transform 0.5s ease';

          this.changeSlide();
          setTimeout(() => {
            this.setState({ clickable: false });
            if (this.state.count === 0) {
              this.sliderux.current.style.transition = 'none';
            }
            this.identify();
          }, 1000);
        }
      );
    }
  };

  changeSlide = () => {
    this.sliderux.current.style.transform = `translateX(-${
      100 * this.state.count
    }vw)`;
    //to try and fix quick slide changing after instantly clicking next or back it would change slide every 2s instead of 3
    this.removeInterval();
    this.callInterval();
  };

  identify = () => {
    if (this.state.count === 0) {
      this.setState({ count: 7 }, () => {
        this.sliderux.current.style.transform = `translateX(-${100 * 7}vw)`;
      });
    } else if (this.state.count === 8) {
      this.setState({ count: 1 }, () => {
        this.sliderux.current.style.transform = `translateX(-${100 * 1}vw)`;
      });
    }
    this.setState({ clickable: true });
  };
  componentWillUnmount() {
    document.querySelector('html').style.scrollBehavior = 'smooth';
    this.removeInterval();
    this.loop = undefined;
    this.setState = (state, callback) => {
      return;
    };
  }
  componentDidMount() {
    this.callInterval();
    const dropDown = this.navRef.current.clientHeight;
    this.mobileDropdownUlRef.current.style.transform = 'translateY(10rem)';
    this.mobileDropdownUlRef.current.style.opacity = '0';
    this.mobileDropdownUlRef.current.style.transition =
      'transform 0.5s ease, opacity 0.2s ease, display 1s ease';
    this.mobileDropdownRef.current.style.marginTop = dropDown + 'px';
    const saveUrl = window.location.href;
    let answer = '';
    function extractHash(url) {
      let hash = false;
      let secHash = false;
      for (let i = 0; i < url.length; i++) {
        if (url[i] === '#' && !hash) {
          hash = true;
        } else if (url[i] === '#' && hash) {
          secHash = true;
        } else if (hash && secHash) {
          answer += url[i];
        }
      }
      return answer;
    }
    extractHash(saveUrl);
    switch (answer) {
      case 'slabastr':
        window.scroll(0, this.findPos(this.slabastrS.current));
        break;
      case 'videonadzor':
        window.scroll(0, this.findPos(this.sigurnostS.current));
        break;
      case 'dijagnoza':
        window.scroll(0, this.findPos(this.dijagnozaS.current));
        break;
      case 'jakastr':
        window.scroll(0, this.findPos(this.jakastrS.current));
        break;
      case 'knx':
        window.scroll(0, this.findPos(this.knxS.current));
        break;
      case 'p':
        window.scroll(0, 0);
    }

    document.title = 'ELEKTROMONTING | Početna';
  }
  findPos = (obj) => {
    var curtop = 0;
    if (obj) {
      if (obj.offsetParent) {
        do {
          curtop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return [curtop];
      }
    }
  };
  loop = undefined;
  callInterval = () => {
    this.loop = setInterval(() => {
      if (this.state.clickable) {
        this.setState(
          (prevState) => ({
            clickable: false,
            count: prevState.count + 1,
          }),
          () => {
            this.sliderux.current.style.transition = 'transform 0.5s ease';

            this.changeSlide();
            setTimeout(() => {
              this.setState({ clickable: false });
              if (this.state.count === 8) {
                if (this.sliderux.current) {
                  this.sliderux.current.style.transition = 'none';
                }
              }
              this.identify();
            }, 1000);
          }
        );
      }
    }, 3500);
  };

  handleSearch = (e) => {
    if (
      e.target.className.indexOf('tagcustom') !== -1 ||
      e.target.parentElement.className.indexOf('tagcustom') !== -1
    ) {
      let txt = e.target.textContent.toLowerCase();
      this.srchBox.current.value = txt;
      this.setState({ srchBoxInput: txt }, () => {
        this.srchCompare(this.state.srchBoxInput);
      });
    }
  };
  handleInput = (e) => {
    this.setState({ srchBoxInput: e.target.value.toLowerCase() }, () =>
      this.srchCompare(this.state.srchBoxInput)
    );
  };
  srchCompare = (inputVal) => {
    const uslugeArr = [
      'rasvjeta',
      'jaka jake',
      'slaba slabe',
      'knx ets pametna kuća smart home',
      'dijagnoza i popravka',
      'sigurnost video nadzor alarm kamere kamera',
      'planiranje projektovanje planiranja projekt plan projekat',
    ];
    let newarrx = [];
    uslugeArr.forEach((item, idx) => {
      newarrx[idx] = item.split(' ');
    });

    for (let i = 0; i < newarrx.length; i++) {
      for (let j = 0; j < newarrx[i].length; j++) {
        if (inputVal.indexOf(newarrx[i][j]) !== -1) {
          this.findMatch(newarrx[i][j]);
        } else if (inputVal.length === 0) {
          this.rasvjetaS.current.style.display = 'block';
          this.knxS.current.style.display = 'block';
          this.dijagnozaS.current.style.display = 'block';
          this.planiranjeS.current.style.display = 'block';
          this.slabastrS.current.style.display = 'block';
          this.jakastrS.current.style.display = 'block';
          this.sigurnostS.current.style.display = 'block';
        }
      }
    }
  };

  findMatch = (findMatchVal) => {
    switch (findMatchVal) {
      case 'rasvjeta':
        this.rasvjetaS.current.style.display = 'block';
        this.knxS.current.style.display = 'none';
        this.dijagnozaS.current.style.display = 'none';
        this.planiranjeS.current.style.display = 'none';
        this.slabastrS.current.style.display = 'none';
        this.jakastrS.current.style.display = 'none';
        this.sigurnostS.current.style.display = 'none';
        break;
      case 'jaka':
      case 'jake':
        this.jakastrS.current.style.display = 'block';
        this.knxS.current.style.display = 'none';
        this.dijagnozaS.current.style.display = 'none';
        this.planiranjeS.current.style.display = 'none';
        this.slabastrS.current.style.display = 'none';
        this.rasvjetaS.current.style.display = 'none';
        this.sigurnostS.current.style.display = 'none';
        break;
      case 'slaba':
      case 'slabe':
        this.slabastrS.current.style.display = 'block';
        this.slabastrS.current.style.marginTop = '10rem';
        this.knxS.current.style.display = 'none';
        this.dijagnozaS.current.style.display = 'none';
        this.planiranjeS.current.style.display = 'none';
        this.rasvjetaS.current.style.display = 'none';
        this.jakastrS.current.style.display = 'none';
        this.sigurnostS.current.style.display = 'none';
        break;
      case 'knx':
      case 'pametna':
      case 'kuća':
      case 'ets':
      case 'smart':
      case 'home':
        this.knxS.current.style.display = 'block';
        this.rasvjetaS.current.style.display = 'none';
        this.dijagnozaS.current.style.display = 'none';
        this.planiranjeS.current.style.display = 'none';
        this.rasvjetaS.current.style.display = 'none';
        this.jakastrS.current.style.display = 'none';
        this.slabastrS.current.style.display = 'none';
        this.sigurnostS.current.style.display = 'none';
        break;
      case 'dijagnoza':
      case 'popravka':
        this.slabastrS.current.style.display = 'none';
        this.knxS.current.style.display = 'none';
        this.dijagnozaS.current.style.display = 'block';
        this.planiranjeS.current.style.display = 'none';
        this.rasvjetaS.current.style.display = 'none';
        this.jakastrS.current.style.display = 'none';
        this.slabastrS.current.style.display = 'none';
        this.sigurnostS.current.style.display = 'none';
        break;
      case 'sigurnost':
      case 'kamera':
      case 'kamere':
      case 'video':
      case 'nadzor':
      case 'alarm':
        this.slabastrS.current.style.display = 'none';
        this.knxS.current.style.display = 'none';
        this.dijagnozaS.current.style.display = 'none';
        this.planiranjeS.current.style.display = 'none';
        this.rasvjetaS.current.style.display = 'none';
        this.jakastrS.current.style.display = 'none';
        this.slabastrS.current.style.display = 'none';
        this.sigurnostS.current.style.display = 'block';
        break;
      case 'planiranje':
      case 'projektovanje':
      case 'planiranja':
      case 'projekt':
      case 'plan':
      case 'projekat':
        this.slabastrS.current.style.display = 'none';
        this.knxS.current.style.display = 'none';
        this.dijagnozaS.current.style.display = 'none';
        this.planiranjeS.current.style.display = 'block';
        this.rasvjetaS.current.style.display = 'none';
        this.jakastrS.current.style.display = 'none';
        this.slabastrS.current.style.display = 'none';
        this.sigurnostS.current.style.display = 'none';
        break;
    }
  };
  removeInterval = () => {
    clearInterval(this.loop);
  };

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

  scrollZaVise = (node) => {
    window.scroll(0, this.findPos(node));
  };
  render() {
    return (
      <header id={styles.headeru}>
        <nav id={styles.nav} ref={this.navRef}>
          <a id={styles.homelink} href="index.html">
            <Link to={'/'}>
              <div id={styles.logo}>
                <span id={styles.ones}>Elektromonting</span>
                <img
                  id={styles.logoimg}
                  src={require('../../../assets/img/emlogo.png')}
                  alt=""
                />
              </div>
            </Link>
          </a>
          <input
            type="checkbox"
            name="hmenu"
            id={styles.hmenu}
            onClick={this.handleClickHmenu}
            ref={this.dropdownClick}
          />
          <div id={styles.mobilemenu}>
            <div id={styles.mobilemenuin}></div>
          </div>
          <div id={styles.hambmobilemenu} ref={this.mobileDropdownRef}>
            <ul ref={this.mobileDropdownUlRef}>
              <li id={styles.pocfix}>
                <Link to="/">Početna</Link>
              </li>
              <li>
                <Link to="/usluge">Usluge</Link>
              </li>
              <li>
                <a href="/onama.html">
                  <Link to="/onama">O nama</Link>
                </a>
              </li>
              <li>
                <Link to="/radovi">Radovi</Link>
              </li>
              <li>
                <Link to="/kontakt">Kontakt</Link>
              </li>
            </ul>
          </div>
          <ul>
            <li>
              <Link to="/">
                <a href="./index.html" className={styles.current}>
                  Početna
                </a>
                <span className={styles.underline}></span>
              </Link>
            </li>
            <li>
              <Link to="/usluge">
                <a href="/usluge.html">Usluge</a>
                <span className={styles.underline}></span>
              </Link>
            </li>
            <li>
              <Link to="/onama">
                <a href="onama.html">O nama</a>
                <span className={styles.underline}></span>
              </Link>
            </li>
            <li>
              <Link to="/radovi">
                <a href="/radovi.html">Radovi</a>
                <span className={styles.underline}></span>
              </Link>
            </li>
            <li>
              <Link to="/kontakt">
                <a href="/kontakt.html">Kontakt</a>
                <span className={styles.underline}></span>
              </Link>
            </li>
          </ul>
        </nav>
        <div id={styles.slideru}>
          <div
            id={styles.sliderux}
            ref={this.sliderux}
            onMouseEnter={this.removeInterval}
            onMouseLeave={this.callInterval}
          >
            <div className={styles.sld}>
              <div className={`${styles.sldtxt} ${styles.ds}`}>
                <h2>
                  Planiranje <span className={styles.lc}>i</span> projektovanje
                </h2>
                <i
                  className={`${styles.fas} ${styles.fachevrondown}
                 fas fa-chevron-down fa-3x`}
                ></i>
                <Link
                  onClick={() => this.scrollZaVise(this.planiranjeS.current)}
                >
                  Klikni za više
                </Link>
              </div>
            </div>
            <div className={styles.sld}>
              <div className={styles.sldtxt}>
                <img
                  style={{ width: '20rem', zIndex: '1' }}
                  src={this.preImg}
                  alt="knx"
                />
                <h2>Kućna Automatizacija</h2>
                <i
                  className={`${styles.fas} ${styles.fachevrondown}
                 fas fa-chevron-down fa-3x`}
                ></i>
                <Link
                  to={{
                    pathname: 'usluge',
                    state: {
                      infoId: 'sh',
                    },
                  }}
                  onClick={() => this.scrollZaVise(this.knxS.current)}
                >
                  Klikni za više
                </Link>
              </div>
            </div>
            <div className={styles.sld}>
              <div className={styles.sldtxt}>
                <h2>Instalacija jake struje</h2>
                <i
                  className={`${styles.fas} ${styles.fachevrondown}
                 fas fa-chevron-down fa-3x`}
                ></i>
                <Link
                  to={{
                    pathname: 'usluge',
                    state: {
                      infoId: 'js',
                    },
                  }}
                >
                  Klikni za više
                </Link>
              </div>
            </div>
            <div className={styles.sld}>
              <div className={styles.sldtxt}>
                <h2>Instalacija slabe struje</h2>
                <i
                  className={`${styles.fas} ${styles.fachevrondown}
                 fas fa-chevron-down fa-3x`}
                ></i>
                <Link
                  to={{
                    pathname: 'usluge',
                    state: {
                      infoId: 'ss',
                    },
                  }}
                  onClick={() => this.scrollZaVise(this.slabastrS.current)}
                >
                  Klikni za više
                </Link>
              </div>
            </div>
            <div className={styles.sld}>
              <div className={styles.sldtxt}>
                <h2>Rasvjeta</h2>
                <i
                  className={`${styles.fas} ${styles.fachevrondown}
                 fas fa-chevron-down fa-3x`}
                ></i>
                <Link
                  to={{
                    pathname: 'radovi',
                    state: {
                      infoId: 'rasvjeta',
                    },
                  }}
                  onClick={() => this.scrollZaVise(this.rasvjetaS.current)}
                >
                  Klikni za više
                </Link>
              </div>
            </div>
            <div className={styles.sld}>
              <div className={styles.sldtxt}>
                <h2>
                  Dijagnoza <span className="lc">i</span> popravka
                </h2>
                <i
                  className={`${styles.fas} ${styles.fachevrondown}
                 fas fa-chevron-down fa-3x`}
                ></i>
                <Link
                  to={{
                    pathname: 'usluge',
                    state: {
                      infoId: 'dijagnoza',
                    },
                  }}
                  onClick={() => this.scrollZaVise(this.dijagnozaS.current)}
                >
                  Klikni za više
                </Link>
              </div>
            </div>
            <div className={styles.sld}>
              <div className={styles.sldtxt}>
                <h2>Sigurnosna tehnologija</h2>
                <i
                  className={`${styles.fas} ${styles.fachevrondown}
                 fas fa-chevron-down fa-3x`}
                ></i>
                <Link
                  to={{
                    pathname: 'usluge',
                    state: {
                      infoId: 'sigurnost',
                    },
                  }}
                  onClick={() => this.scrollZaVise(this.sigurnostS.current)}
                >
                  Klikni za više
                </Link>
              </div>
            </div>
            <div className={styles.sld}>
              <div className={`${styles.sldtxt} ${styles.zasto}`}>
                <h2>
                  Planiranje <span className={styles.lc}>i</span> projektovanje
                </h2>
                <i
                  className={`${styles.fas} ${styles.fachevrondown}
                 fas fa-chevron-down fa-3x`}
                ></i>
                <Link
                  to={{
                    pathname: 'usluge',
                    state: {
                      infoId: 'planiranje',
                    },
                  }}
                  onClick={() => this.scrollZaVise(this.planiranjeS.current)}
                >
                  Klikni za više
                </Link>
              </div>
            </div>
            <div className={styles.sld}>
              <div className={styles.sldtxt}>
                <img
                  style={{ width: '20rem', zIndex: '1' }}
                  src={this.preImg}
                  alt="knx"
                />
                <h2>Kućna Automatizacija</h2>
                <i
                  className={`${styles.fas} ${styles.fachevrondown}
                 fas fa-chevron-down fa-3x`}
                ></i>
                <Link
                  to={{
                    pathname: 'usluge',
                    state: {
                      infoId: 'sh',
                    },
                  }}
                  onClick={() => this.scrollZaVise(this.knxS.current)}
                >
                  Klikni za više
                </Link>
              </div>
            </div>
          </div>
        </div>
        <i
          className={`${styles.fas} ${styles.faangleright} fas fa-angle-right fa-7x`}
          ref={this.right}
          onClick={this.goRight}
        ></i>
        <i
          className={`${styles.fas} ${styles.faangleleft} fas fa-angle-left fa-7x`}
          ref={this.left}
          onClick={this.goLeft}
        ></i>
      </header>
    );
  }
}

export default header2;
