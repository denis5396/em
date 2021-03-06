import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Usluge.module.css';

class Usluge extends Component {
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
  solarniP = createRef();
  gromobran = createRef();
  ispitivanje = createRef();
  dijagnozaS = createRef();
  sigurnostS = createRef();
  planiranjeS = createRef();
  mobileDropdownUlRef = createRef();
  mobileDropdownRef = createRef();
  dropdownClick = createRef();
  navRef = createRef();
  cardsBody = createRef();

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
    // this.removeInterval();
    // this.loop = undefined;
    this.setState = (state, callback) => {
      return;
    };
  }
  componentDidMount() {
    console.log(this.props.location);
    // window.scroll(0, this.findPos(this.knxS.current));
    // this.callInterval();
    if (this.props.location.state) {
      switch (this.props.location.state.infoId) {
        case 'sh':
          // window.scroll(0, this.findPos(this.knxS.current));
          this.knxS.current.scrollIntoView();
          break;
        case 'js':
          this.jakastrS.current.scrollIntoView();
          break;
        case 'ss':
          this.slabastrS.current.scrollIntoView();
          break;
        case 'dijagnoza':
          this.ispitivanje.current.scrollIntoView();
          break;
        case 'sigurnost':
          this.sigurnostS.current.scrollIntoView();
          break;
        case 'planiranje':
          this.planiranjeS.current.scrollIntoView();
          break;
      }
    }
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

    document.title = 'ELEKTROMONTING | Usluge';
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
  // loop = undefined;
  // callInterval = () => {
  //   this.loop = setInterval(() => {
  //     if (this.state.clickable) {
  //       this.setState(
  //         (prevState) => ({
  //           clickable: false,
  //           count: prevState.count + 1,
  //         }),
  //         () => {
  //           this.sliderux.current.style.transition = 'transform 0.5s ease';

  //           this.changeSlide();
  //           setTimeout(() => {
  //             this.setState({ clickable: false });
  //             if (this.state.count === 8) {
  //               this.sliderux.current.style.transition = 'none';
  //             }
  //             this.identify();
  //           }, 1000);
  //         }
  //       );
  //     }
  //   }, 3000);
  // };

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
      'knx ets pametna ku??a smart home',
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
      case 'ku??a':
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
  // removeInterval = () => {
  //   clearInterval(this.loop);
  // };

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

  handleClickCards = (e) => {
    console.log(this.cardsBody.current.children);
    for (let i = 0; i < this.cardsBody.current.children.length; i++) {
      if (this.cardsBody.current.children[i].contains(e.target)) {
        console.log(
          this.cardsBody.current.parentElement.parentElement.children[
            i + 1
          ].scrollIntoView()
        );
      }
    }
  };

  render() {
    return (
      <>
        <header
          id={styles.headeru}
          style={{
            background: `url(${require('../../assets/img/showcaseclassic.jpg')}) no-repeat center center/cover`,
            height: '470px',
          }}
        >
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
              onClick={this.handleClickHmenu}
              ref={this.dropdownClick}
            />
            <div id={styles.mobilemenu}>
              <div id={styles.mobilemenuin}></div>
            </div>
            <div id={styles.hambmobilemenu} ref={this.mobileDropdownRef}>
              <ul ref={this.mobileDropdownUlRef}>
                <li id={styles.pocfix}>
                  <Link to="/">Po??etna</Link>
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
                  <a href="./index.html">Po??etna</a>
                  <span className={styles.underline}></span>
                </Link>
              </li>
              <li>
                <Link to="/usluge">
                  <a href="/usluge.html" className={styles.current}>
                    Usluge
                  </a>
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
          {/* <div id={styles.slideru}>
            <div
              id={styles.sliderux}
              ref={this.sliderux}
              onMouseEnter={this.removeInterval}
              onMouseLeave={this.callInterval}
            >
              <div className={styles.sld}>
                <div className={`${styles.sldtxt} ${styles.ds}`}>
                  <h2>Planiranje i projektovanje</h2>
                  <i
                    className={`${styles.fas} ${styles.fachevrondown}
                     fas fa-chevron-down fa-3x`}
                  ></i>
                  <Link
                    onClick={() => this.scrollZaVise(this.planiranjeS.current)}
                  >
                    Klikni za vi??e
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
                  <Link onClick={() => this.jakastrS.current.scrollIntoView()}>
                    Klikni za vi??e
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
                    onClick={() => this.scrollZaVise(this.slabastrS.current)}
                  >
                    Klikni za vi??e
                  </Link>
                </div>
              </div>
              <div className={styles.sld}>
                <div className={styles.sldtxt}>
                  <img
                    src={require('../../assets/img/usluge/output-onlinepngtools.png')}
                    alt=""
                  />
                  <h2>Ku??na Automatizacija</h2>
                  <i
                    className={`${styles.fas} ${styles.fachevrondown}
                     fas fa-chevron-down fa-3x`}
                  ></i>
                  <Link onClick={() => this.scrollZaVise(this.knxS.current)}>
                    Klikni za vi??e
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
                    onClick={() => this.scrollZaVise(this.rasvjetaS.current)}
                  >
                    Klikni za vi??e
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
                    onClick={() => this.scrollZaVise(this.dijagnozaS.current)}
                  >
                    Klikni za vi??e
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
                    onClick={() => this.scrollZaVise(this.sigurnostS.current)}
                  >
                    Klikni za vi??e
                  </Link>
                </div>
              </div>
              <div className={styles.sld}>
                <div className={`${styles.sldtxt} ${styles.zasto}`}>
                  <h2>
                    Planiranje <span className={styles.lc}>i</span>{' '}
                    projektovanje
                  </h2>
                  <i
                    className={`${styles.fas} ${styles.fachevrondown}
                     fas fa-chevron-down fa-3x`}
                  ></i>
                  <Link
                    onClick={() => this.scrollZaVise(this.planiranjeS.current)}
                  >
                    Klikni za vi??e
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
                    onClick={() => this.scrollZaVise(this.jakastrS.current)}
                  >
                    Klikni za vi??e
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
          ></i> */}
        </header>
        <body id={styles.uslugeBody}>
          <div id={styles.ourServices}>
            <div id={styles.ourServicesHeader}>
              <div id={styles.ourServicesHeaderHeading}>
                <span></span>
                <h2>
                  Na??e <br />
                  Usluge
                </h2>
              </div>
              <div id={styles.ourServicesHeaderText}>
                <p>
                  Sve vrste elektroinstalacionih radova jake i slabe
                  struje(alarmi, video, mre??a, interfonija, rasvjeta...).
                </p>
              </div>
            </div>
            <div
              id={styles.ourServicesBody}
              onClick={(e) => this.handleClickCards(e)}
              ref={this.cardsBody}
            >
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/shtransp1.png')} />
                <h2>Pametna Ku??a</h2>
                <p>Kontroli??ite va?? dom pomo??u interneta</p>
              </div>
              <div className={styles.ourServicesCards}>
                <i
                  class={
                    window.innerWidth <= 300
                      ? 'fas fa-house-damage fa-2x'
                      : window.innerWidth <= 400
                      ? 'fas fa-house-damage fa-3x'
                      : window.innerWidth <= 500
                      ? 'fas fa-house-damage fa-4x'
                      : window.innerWidth <= 800
                      ? 'fas fa-house-damage fa-4x'
                      : window.innerWidth <= 1024
                      ? 'fas fa-house-damage fa-5x'
                      : 'fas fa-house-damage fa-6x'
                  }
                ></i>
                <h2>Instalacija Jake Struje</h2>
                <p>
                  Planiramo, implementiramo i odr??avamo razli??ite vrste
                  instalacija jake struje
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/weakcuricon1.png')} />
                <h2>Instalacija Slabe Struje</h2>
                <p>
                  Elektri??ne instalacije slabe struje slu??e za napajanje i
                  povezivanje telekomunikacijskih ure??aja, ure??aja za daljinsko
                  upravljanje, mjerenje i dr.
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/cameraicontransp.png')} />
                {/* <h2>Sigurosna Rje??enja</h2> */}
                <h2>Instalacija Tehni??ke Za??tite</h2>
                <p>
                  Protivpo??arni alarmi, video nadzor, signalni ure??aji, alarmne
                  centrale i pametni alarmni sistemi, kontrole pristupa
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/solarpicon2.png')} />
                <h2>Instalacija Solarnih Panela</h2>
                <p>
                  Ugradnja solarne elektrane garantuje brz povrat investicije,
                  mogu??nost totalne neovisnosti o elektro mre??i i vi??e.
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/gromobran.png')} />
                <h2>Gromobranska Instalacija</h2>
                <p>
                  Gromobran je elektri??na instalacija izvedena tako da mogu??nost
                  udara groma u za??ti??eni objekt bude svedena na minimum
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/voltm1.png')} />
                <h2>Ispitivanje Elektri??nih Instalacija</h2>
                <p>
                  Ispitujemo elektroinstalacije, sigurnosne ure??aje kao ??to su
                  FID sklopke, razvodne ormare, elektri??ne ure??aje i elektri??ne
                  ma??ine, kontrolne/sigurnosne sisteme.
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/planproj1.png')} />
                <h2>Planiranje i Projektovanje</h2>
                <p>
                  Na??a tehni??ke usluge planiranja obuhvataju sva polja
                  elektri??nih sistema po najnovijim tehni??kim i tehnolo??kim
                  saznanjima
                </p>
              </div>
            </div>
          </div>
          <div id={styles.sh} ref={this.knxS}>
            {/* <div id={styles.shBack}>
              <div id={styles.shBackOne}></div>
              <div id={styles.shBackTwo}></div>
            </div> */}
            <h1>Pametna Ku??a</h1>
            <p>
              Ku??na Automatizacija je bila dostupna ve?? nekoliko godina, ali
              izvan financijskih mogu??nosti za ve??inu ljudi. Stvari su se
              promijenile zadnjih par godina, i ku??na automatizacija postaje
              povoljnija i popularnija.
            </p>
            <p>
              Opisano je i kao pametna ku??a, i mijenja na??in na koji se ku??e
              kabliraju i upravljaju.
            </p>
            <p>
              Budu??nost je tu, i sve u va??em domu se mo??e kontrolisati putem
              internet mre??e. ??ta to ta??no zna??i? To je tehnologija koja
              kontroli??e automatizaciju integralnih funkcija bilo kakvog objekta
              (rezidencijalnog, komercijalnog, industrijskog itd) kao ??to su
              HVAC, rasvjeta, multimedija, sigurnost, energetski menad??ment i
              vi??e, sve ??to se napaja elektri??nom energijom se mo??e kontrolisati
              kroz mre??u.
            </p>
            <p>
              Sistem pametne ku??e tako??er istovremeno enormno smanjuje
              energetske tro??kove tako ??to konstantno nadgleda i prilago??ava
              operativne postavke za sve konektovane ure??aje na KNX bus.
            </p>
            <p>
              Ure??aji se mogu kontrolisati uz pomo?? pametnog telefona, tableta i
              glasa(Amazon Alexa). Mo??ete upravljati ne samo jednom stavkom,
              nego i vi??e njih sa jednom komandom. Recite "Alexa laku no??" i
              nakon toga se isklju??uje sva rasvjeta, termostat se podesi na
              ??eljenu temperaturu i vrata se zaklju??avaju.
            </p>
            <h2>Mogu??nosti</h2>
            <div id={styles.shCards}>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardsigurnost.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Sigurnosni Sistem</h3>
                  <p>
                    Ugradnjom pametnog sigurnosnog sistema imate direktan prenos
                    podataka o objektu, putem telefona
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardinterfon.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Integracija Interfona</h3>
                  <p>
                    Pametan interfon integrisan u odgovaraju??u Smart Home
                    aplikaciju
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardmob.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Pristup putem mobilnog telefona</h3>
                  <p>Va?? telefon koristite kao klju??</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardinterval.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Pode??avanje intervala za bilo koji ure??aj</h3>
                  <p>
                    Korisno za no??nu rasvjetu, ??aluzine, ali i za sve druge
                    ure??aje
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardpodno.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Kontrola podnog grijanja i hla??enja</h3>
                  <p>
                    U??inite va??e podno grijanje pametnim i u??tedite energiju
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardgrijanje.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Kontrola grijanja i hla??enja</h3>
                  <p>
                    Upravljanje grijanjem i hla??enjem na pametan na??in, ??ak i sa
                    udaljene lokacije
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardventilacija.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Integracija ventilacionog sistema</h3>
                  <p>Pametno provjetravanje prostorije</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardrasvjeta.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Kontrola rasvjete</h3>
                  <p>
                    Automatska kontrola rasvjete ili kontrola sa udaljene
                    lokacije
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardrasvjeta.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Senzori za svjetlost</h3>
                  <p>Kreirajte automatizacije na osnovu nivoa osvjetljenja</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardvrata.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Senzori za vrata i prozore</h3>
                  <p>
                    Aktiviranje ure??aja ako su va??a vrata i prozori otvoreni
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardsenzor.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Senzori pokreta</h3>
                  <p>
                    Aktiviranje ure??aja ili upozorenje na osnovu detektovanja
                    pokreta
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardbtn.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Fizi??ki tasteri za kontrolu</h3>
                  <p>Klasi??ni tasteri u kombinaciji sa digitalnim</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardcamera.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Integracija video nadzora</h3>
                  <p>Direktan prenos u aplikaciji</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardremote.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Upravljanje sa udaljene lokacije</h3>
                  <p>
                    Potpuna kontrola, sa bilo kog mjesta, u svakom trenutku,
                    putem telefona
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardsmartbtn.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Pametni tasteri za kontrolu</h3>
                  <p>Razli??ite opcije pametnih tastera za kontrolu</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcarddim.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Dimovanje rasvjete</h3>
                  <p>Prigu??ivanje rasvjete, jednostavno putem aplikacije</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardscene.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Scene</h3>
                  <p>
                    Jednim klikom aktivirate koliko ure??aja ??elite, istovremeno
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardroletne.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Kontrola roletni</h3>
                  <p>Pametna kontrola roletni i ??aluzina</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardvrijeme.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Integracija vremenske prognoze</h3>
                  <p>Aktiviranje ure??aja prema vremenskim uslovima</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardalert.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Upozorenja i obavje??tenja</h3>
                  <p>
                    Primite informacije na vrijeme, preko telefona ili tableta
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardgate.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Kontrola rampe i kapije</h3>
                  <p>
                    Otvaranje prepoznavanjem registarskih tablica, detektovanjem
                    lokacije ili telefonom
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id={styles.ourServicesStrongCur} ref={this.jakastrS}>
            <h2>Instalacija Jake Struje</h2>
            <p>
              Planiramo, implementiramo i odr??avamo razli??ite vrste instalacija
              jake struje:
            </p>
            <ul>
              <li>
                Uti??nice, prekida??i, ugradnja upravlja??kih ormara i razvodnih
                ormara
              </li>
              <li>
                Uvo??enje instalacija jake struje za industrijsku i drugu
                elektri??nu opremu
              </li>
              <li>
                Instalacije za sisteme napajanja, grijanja i klimatizacije
              </li>
              <li>Instalacije priklju??nica i fiksnih spojeva</li>
              <li>Instalacije rasvjete</li>
              <li>Razvodne ormare</li>
              <li>Gromobran</li>
            </ul>
          </div>
          <div id={styles.ourServicesWeakCur} ref={this.slabastrS}>
            <h2>Instalacija Slabe Struje</h2>
            <p>
              Planiramo, implementiramo i odr??avamo razli??ite vrste instalacija
              slabe struje:
            </p>
            <ul>
              <li>Alarmi</li>
              <li>Video nadzor</li>
              <li>Interfoni (video i audio)</li>
              <li>Vatrodojava</li>
              <li>Detekcija gasa</li>
              <li>Antenske instalacije</li>
              <li>Kontrole pristupa</li>
              <li>Ra??unarska mre??a (internet)</li>
              <li>Telefonske instalacije</li>
            </ul>
          </div>
          <div id={styles.ourServicesSecurity} ref={this.sigurnostS}>
            <h2>Instalacija Tehni??ke Za??tite</h2>
            <p>
              U svrhu za??tite imovine i osoba, pru??amo kompletnu uslugu tehni??ke
              za??tite. Na?? stru??ni tim ??e odraditi procijenu ugro??enosti objekta
              i prijedlog njegove mogu??e za??tite, a zatim izraditi projekt, te
              Vam pru??iti instalaciju i odr??avanje instaliranog sistema. Od
              tehni??ke za??tite nudimo slijede??e:
            </p>
            <ul>
              <li>Protivpo??arni sistemi</li>
              <li>Uzemljenje i izjedna??avanje potencijala</li>
              <li>
                Ugradnja prenaponskih ure??aja u razvodnom ormaru i na
                priklju??cima telefona, interneta i kablovske
              </li>
              <li>Interfoni (video i audio)</li>
              <li>Video nadzor</li>
              <li>Alarmne centrale</li>
            </ul>
          </div>
          <div id={styles.ourServicesGrom} ref={this.gromobran}>
            <h2>Gromobranska Instalacija</h2>
            <p>
              Gromobran je elektri??na instalacija izvedena tako da mogu??nost
              udara groma u za??ti??eni objekat bude svedena na minimum. Ta
              instalacija je sastavljena od: hvataljki, odvoda, uzemljiva??a,
              dopunskog pribora (prema potrebi).
            </p>
            <p>
              Uzemljenje omogu??uje brzo pra??njenje naboja u okolno tlo. Uglavnom
              se primjenjuju duboko zabijene ??eli??ne ili bakrene ??ipke ili
              plo??e, a oko ku??e se postavlja prsten od debljih ??ipki ili traka
              na koje se priklju??uju svi vertikalni krovni odvodi. Bitno je da
              je spoj metalne povr??ine i tla potpuno provodljiv, pa
              konstrukciju, dimenzije, na??in postavljanja i izbor materijala
              treba odrediti stru??njak.
            </p>
          </div>
          <div id={styles.ourServicesSolar} ref={this.solarniP}>
            <h2>Solarni Paneli</h2>
            <p>
              Vr??imo projektovanje i izgradnju solarnih elektrana sa mogu??no????u
              plasiranja i prodaje elektri??ne energije u mre??u.
            </p>
            <p>Za??to izabrati solarnu energiju ?</p>
            <div id={styles.solarItems}>
              <div className={styles.solarItem}>
                <img src={require('../../assets/img/solarinvest.png')} />
                <div className={styles.solarTxt}>
                  <h3>Povratak investicije</h3>
                  <p>
                    Ugradnja solarne elektrane garantuje brz povrat investicije.
                  </p>
                </div>
              </div>
              <div className={styles.solarItem}>
                <img
                  src={require('../../assets/img/solarhouse.png')}
                  style={{ borderRadius: '50%' }}
                />
                <div className={styles.solarTxt}>
                  <h3>Podru??ja bez elektro mre??e</h3>
                  <p>
                    Sistem je jako pogodan za vikendice, ku??e koje ne pokrivaju
                    elektro mre??u.
                  </p>
                </div>
              </div>
              <div className={styles.solarItem}>
                <img src={require('../../assets/img/solaroffgrid1.png')} />
                <div className={styles.solarTxt}>
                  <h3>Off-grid sistem</h3>
                  <p>Mogu??nost totalne neovisnosti o elektro mre??i.</p>
                </div>
              </div>
              <div className={styles.solarItem}>
                <img src={require('../../assets/img/shcardinterval.png')} />
                <div className={styles.solarTxt}>
                  <h3>Dugoro??no rje??enje</h3>
                  <p>Solarni paneli imaju vijek trajanja od 25 godina.</p>
                </div>
              </div>
              <div className={styles.solarItem}>
                <img src={require('../../assets/img/solareco1.png')} />
                <div className={styles.solarTxt}>
                  <h3>Ekolo??ki prihvatljivo</h3>
                  <p>
                    Sistemi su ekolo??ki po??eljni, jer ne prouzrokuju ??tetne
                    uticaje na okoli??.
                  </p>
                </div>
              </div>
              <div className={styles.solarItem}>
                <img src={require('../../assets/img/solarsavings1.png')} />
                <div className={styles.solarTxt}>
                  <h3>U??teda</h3>
                  <p>
                    Sistemi ON-SWITCH prouzrokuju enormnu u??tedu elekri??ne
                    energije, kao i pogodnosti spajanja elektri??ne energije i
                    grijanja/sanitarne vode
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id={styles.ourServicesTest} ref={this.ispitivanje}>
            <h2>Ispitivanje Elektri??nih Instalacija</h2>
            <p>
              Defektni ure??aji ili instalacije prouzrokuju mnogo ??tete. ??esti
              uzrok: istro??enost ili preoptere??enje, takvi rizici se mogu
              identificirati i eliminisati uz pomo?? redovnih ispitivanja.
            </p>
            <p>
              Izjava o zavr??nom pregledu i ispitivanju el. instalacija i potvrda
              o upotrebljivosti izvedene elektri??ne instalacije je potrebna kako
              bi distributer elektri??ne energije mogao napraviti priklju??ak na
              objekt. Izjavu o zavr??nom pregledu i ispitivanju el. instalacija i
              potvrdu o upotrebljivosti izvedene elektri??ne instalacije je
              mogu??e izdati samo ako su zadovoljeni slijede??i uvjeti:
            </p>
            <ul>
              <li>
                Uzemljenje objekta postavljeno (potrebno napraviti mjerenje
                uzemljenja)
              </li>
              <li>
                Napojni vod postavljen od mjernog priklju??ka ormara do razvodnog
                ormara (potrebno napraviti mjerenje otpora izolacije napojnog
                voda)
              </li>
              <li>
                Razvodna kutija postavljena sa FID sklopkom 25/0,03A (30 mA)
                (potrebno ispitati funkcionalnost FID sklopke, izmjeriti
                indirektni dodir)
              </li>
              <li>
                Minimalno postavljen jedan strujni krug (??arulja, uti??nica,
                prekida??)
              </li>
              <li>
                Ispitivanje elektri??nih instalacija (otpor izolacije,
                impedancija petlje kvara, obrada za??titnog ure??aja
                diferencijalne struje)
              </li>
              <li>Ispitivanje rasvjete</li>
              <li>Ispitivanje otpora uzemljenja</li>
              <li>Ispitivanje stati??kog elektriciteta</li>
              <li>Ispitivanje mjera izjedna??avanja potencijala</li>
              <li>Ispitivanje neprekidnosti za??titnog vodi??a</li>
            </ul>
          </div>
          <div id={styles.ourServicesPlan} ref={this.planiranjeS}>
            <h2>Planiranje i Projektovanje</h2>
            <p>
              U projektnoj dokumentaciji obra??ujemo sljede??e elektri??ne
              instalacije:
            </p>
            <ul>
              <li>Elektri??ne instalacije pametne ku??e</li>
              <li>Elektri??ne instalacije jake struje</li>
              <li>Elektri??ne instalacije slabe struje</li>
              <li>Sistemi dojave po??ara</li>
              <li>
                Sistemi tehni??ke za??tite (videonadzor, kontrola pristupa,
                protuprovala)
              </li>
            </ul>
          </div>
        </body>
        {/* <div id={styles.searchbox}>
          <i className={`fas fa-search fa-3x`}></i>
          <input
            type="search"
            name="sbox"
            id={styles.sbox}
            placeholder="Ukucajte tra??eni pojam..."
            ref={this.srchBox}
            onInput={this.handleInput}
          />
        </div>
        <div
          id={styles.tagcnt}
          ref={this.tagParent}
          onClick={this.handleSearch}
        >
          <div className={styles.tagcustom} id="tagrasvjeta">
            <h4>Rasvjeta</h4>
          </div>
          <div className={styles.tagcustom} id="tagjakastr">
            <h4>Jaka Struja</h4>
          </div>
          <div className={styles.tagcustom} id="tagslabastr">
            <h4>Slaba Struja</h4>
          </div>
          <div className={styles.tagcustom} id="tagknx">
            <h4>KNX</h4>
          </div>
          <div className={styles.tagcustom} id="tagsmarthome">
            <h4>Smart Home</h4>
          </div>
          <div className={styles.tagcustom} id="tagpametnakuca">
            <h4>Pametna Ku??a</h4>
          </div>
          <div className={styles.tagcustom} id="tagets">
            <h4>ETS</h4>
          </div>
          <div className={styles.tagcustom} id="tagdijagnoza">
            <h4>Dijagnoza</h4>
          </div>
          <div className={styles.tagcustom} id="tagpopravka">
            <h4>Popravka</h4>
          </div>
          <div className={styles.tagcustom} id="tagsigurnost">
            <h4>Sigurnost</h4>
          </div>
          <div className={styles.tagcustom} id="tagvideonadzor">
            <h4>Video Nadzor</h4>
          </div>
          <div className={styles.tagcustom} id="tagalarm">
            <h4>Alarm</h4>
          </div>
          <div className={styles.tagcustom} id="tagkamere">
            <h4>Kamere</h4>
          </div>
          <div className={styles.tagcustom} id="tagplaniranje">
            <h4>Planiranje</h4>
          </div>
          <div className={styles.tagcustom} id="tagprojektovanje">
            <h4>Projektovanje</h4>
          </div>
        </div> */}
        {/* <div id={styles.jakastrp}>
          <section id={styles.jakastr} ref={this.jakastrS}>
            <div className={styles.uscont}>
              <div id={styles.jakastrh}>
                <h2>Instalacija Jake Struje</h2>
                <span className={styles.usline}></span>
                <span className={styles.uscircle}></span>
              </div>
              <div id={styles.jakastrb}>
                <div id={styles.jakastrtxt}>
                  <h3>Implementacija instalacija jake struje</h3>
                  <p>
                    Pod elektroinstalacijama podrazumijevamo one objekte koji
                    koriste elektri??nu energiju za napajanje, rasvjetu i ostale
                    namjene, bilo industrijske ili za doma??instva.
                  </p>
                  <p>
                    Instalacije jake struje namijenjene su potro??a??ima kao ??to
                    su sistemi grijanja, klimatizacijski sistemi, razvodne
                    plo??e, rasvjeta???
                  </p>

                  <p>
                    Planiramo, implementiramo i odr??avamo razli??ite vrste
                    instalacija jake struje:
                  </p>

                  <ul>
                    <li>
                      Izjedna??avanje potencijala i uzemljenje u stambenim,
                      industrijskim, sportskim, javnim i poslovnim zgradama
                    </li>
                    <li>Oprema za katodnu za??titu</li>
                    <li>
                      Uti??nice, prekida??i, ugradnja upravlja??kih ormara i
                      razvodnih ormara
                    </li>
                    <li>
                      Instalacije za korisnike razli??itih tehnologija i
                      komutacijske blokove
                    </li>
                    <li>
                      Uvo??enje instalacija jake struje za industrijsku i drugu
                      elektri??nu opremu
                    </li>
                    <li>Instalacije za elektri??ne transformatorske stanice</li>
                    <li>Neprekidno napajanje UPS, DEA</li>
                    <li>
                      Instalacije za sisteme napajanja, grijanja i klimatizacije
                    </li>
                    <li>Gromobranska Instalacija</li>
                    <li>Instalacija sistema besprekidnog napajanja UPS-a</li>
                  </ul>
                </div>
                <div id={styles.jakastrimg}></div>
              </div>
            </div>
            <div className={styles.icona}>
              <i className={`fas fa-bolt fa-2x`}></i>
            </div>
          </section>
        </div>

        <section id={styles.slabastr} ref={this.slabastrS}>
          <div id={styles.slabastrh}>
            <h2>Instalacija Slabe Struje</h2>
          </div>
          <div className={styles.uscont}>
            <div id={styles.slabastrtxt}>
              <div id={styles.slabastrl}>
                <p>
                  Prate??i i usvajaju??i razvoj elektroinstalaterske djelatnosti,
                  materijala te alata i opreme za rad razvili smo i pro??irili
                  ponudu svojih djelatnosti na izvo??enje instalacija ra??unarskih
                  mre??a, protuprovale, videonadzora, interfona, satelitskih
                  sistema, pripremu instalacija za kablovske televizije, siteme
                  be??i??nog povezivanja potro??a??a sa upravljanjem, instalacije
                  pametne ku??e, elektri??nog podnog grijanja itd., ali i svih
                  sistema koje koriste i ve??i korisnici: industrijski i ostali
                  pogoni. Vr??imo kompletne usluge unutar elektroinstalaterske
                  djelatnosti ove grane.
                </p>
                <p>
                  Planiramo, implementiramo i odr??avamo razli??ite vrste
                  instalacija slave struje:
                </p>
                <ul>
                  <li>Alarmi</li>
                  <li>Video nadzor</li>
                  <li>Interfoni (video i audio)</li>
                  <li>Vatrodojava</li>
                  <li>Detekcija gasa</li>
                  <li>Antenske instalacije</li>
                  <li>Kontrole pristupa</li>
                  <li>Ra??unarska mre??a (internet)</li>
                  <li>Telefonska instalacija</li>
                </ul>
              </div>
              <div id={styles.slabastrr}>
                <p>
                  Elektri??ne instalacije slabe struje slu??e za napajanje i
                  povezivanje telekomunikacijskih ure??aja, ure??aja za daljinsko
                  upravljanje, mjerenje i dr. Instalacije slabe struje generalno
                  se dijele na:
                </p>
                <ul>
                  <li>Telekomunikacione instalacije</li>
                  <li>Signalne instalacije</li>
                </ul>
                <p>
                  Telekomunikacione instalacije se izra??uju za prenos poruka
                  koje mogu biti u obliku digitalnih (ra??unari,
                  teleprinteri,video-signali, alarmni sistemi itd.), ili
                  analognih signala (govor, muzika i sl.)
                </p>
                <p>
                  Pod pojmom telekomunikacione instalacije u u??em smislu
                  podrazumijevamo telekomunikacionu instalaciju unutar
                  zatvorenog prostora, namijenjenu za priklju??ak na mjesnu
                  telekomunikacionu mre??u.
                </p>
                <br />
                <p>
                  Signalne instalacije imaju sisteme za opslu??ivanje zgrade
                  (grijanje, hla??enje, rasvjeta i sl.), vatrodojavni sistem,
                  sistem nadzora i sl. Te se instalacije postavljaju na sli??an
                  na??in kao i elektroenergetske instalacije, ali se rade
                  posebni, naj??e????e bakreni vodovi (??? telekomunikacijski
                  vodovi).
                </p>
              </div>
            </div>
            <div id={styles.slabastrb}>
              <div className={styles.slabastrkol}>
                <img
                  src={require('../../assets/img/usluge/slabastrcol1.jpg')}
                  alt=""
                />
                <h3>Smart Home Tehnolgija</h3>
                <p>
                  Pametna Ku??a pru??a komfor ??ivljenja i smanjuje potro??nju
                  elektri??ne energije u odnosu na konvencionalne
                  elektroinstalacije.
                </p>
              </div>
              <div className={styles.slabastrkol}>
                <img
                  src={require('../../assets/img/usluge/slabastrcol2.jpg')}
                  alt=""
                />
                <h3>TV Prijemnik</h3>
                <p>DVB-S, Satelit, Internet ili Kablovska ?</p>
              </div>
              <div className={styles.slabastrkol}>
                <img
                  src={require('../../assets/img/usluge/slabastrcol3.jpg')}
                  alt=""
                />
                <h3>Mre??e</h3>
                <p>
                  Isplanirani i instalirani mre??ni sistem od strane stru??njaka
                  nudi mnogo prednosti.
                </p>
              </div>
              <div className={styles.slabastrkol}>
                <img
                  src={require('../../assets/img/usluge/slabastrcol4.jpg')}
                  alt=""
                />
                <h3>Video Tehnika</h3>
                <p>Budite sigurniji sa video nadzornim sistemom.</p>
              </div>
              <div className={styles.slabastrkol}>
                <img
                  src={require('../../assets/img/usluge/slabastrcol5.jpg')}
                  alt=""
                />
                <h3>Interfon</h3>
                <p>
                  Interfoni pru??aju komfor i pove??avaju sigurnost u va??a ??etiri
                  zida.
                </p>
              </div>
              <div className={styles.slabastrkol}>
                <img
                  src={require('../../assets/img/usluge/slabastrcol6.jpg')}
                  alt=""
                />
                <h3>Telefonski Sistemi</h3>
                <p>
                  Obim komunikacije koji se odvija preko klasi??nih telefonskih
                  sistema je i dalje dosta velik.
                </p>
              </div>
            </div>
            <div id={styles.slabastrknx}>
              <h3>Sistem Pametne Ku??e</h3>
              <div className={styles.sigurnostl}></div>
              <p>
                Pametna Ku??a vam omogu??ava da svoj dom pretvorite u dosta
                komfortabilnije mjesto. Sa ovim rije??enjima u??ivate u boravku
                va??eg doma i smanjujete elektri??nu potro??nju.
              </p>
              <div className={`${styles.plankol} ${styles.new}`}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/knxslabastr1.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3 className={styles.knxf}>
                    Rje??enja za pametne ku??e: Koje prednosti pru??aju ovi sistemi
                    ?
                  </h3>
                  <p>
                    Ve??ina ljudi kad ??uje pojam pametna ku??a pomisle na normalnu
                    uti??nicu koju mo??ete upravljati putem aplikacije kod
                    pametnog telefona. Me??utim to predstavlja samo mali dio
                    mogu??nosti koje KNX sistem posjeduje. Pri tome je mogu??e
                    razli??ite elemente ku??anske tehnike i pojedina??ne elektri??ne
                    ure??aje integrisati sa lako??om. Pametna ku??a se brine za
                    perfektan me??usobni rad izme??u svih polja u objektu. To
                    olak??ava kori??tenje i pametna rje??enja doprinose zna??ajnom
                    smanjenju potro??nje elektri??ne energije.
                  </p>
                </div>
              </div>
              <div className={styles.plankol}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/knxslabastr3.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3 className={styles.knxf}>
                    Pametno upravljanje rasvjete, roletni i grijanja
                  </h3>
                  <p>
                    Pametna ku??a vam nudi perfektne mogu??nosti za upravljanje
                    rasvjetom u va??em domu. Mo??ete tako prilagoditi rasvjetu na
                    odgovaraju??e vrijeme dana i imate mogu??nost prigu??ivanja
                    rasvjete. Fade-in efekat pru??a lagani prelaz na trenutni
                    ??eljeni nivo osvjetljenja. Pametna ku??a mo??e i sama
                    automatski da isklju??uje svjetlo kada se niko ne nalazi u
                    odre??enoj prostoriji, pod uvjetom da je instaliran detektor
                    pokreta ili detektor prisutnosti u sistemu. To poma??e pri
                    u??tedi elektri??ne energije, automatsko upravljanje roletni i
                    ??aluzina je isto mogu??e. Obavezno je instalirati
                    meteorolo??ku stanicu i spojiti je na KNX sistem. Kroz
                    automatsko prilago??avanje ??aluzina i aktuelnih vremenskih
                    prilika dobijate uvijek optimalnu klimu po sobama. Grijanje
                    je tako??er mogu??e integrisati u sistem.
                  </p>
                </div>
              </div>
              <div className={styles.plankol}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/knxslabastr4.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3 className={styles.knxf}>
                    Sistem za ve??i stambeni komfor
                  </h3>
                  <p>
                    Pametna ku??a brine o tome da se vi osje??ate dobro u va??em
                    domu. ??esto je mogu??e integrirati i pojedina??ne ure??aje kao
                    npr. kafema??inu. Ako ho??ete da se istu??irate, mo??ete preko
                    aplikacije uklju??iti bojler.
                  </p>
                </div>
              </div>
              <div className={styles.plankol}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/knxslabastr2.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3 className={styles.knxf}>
                    Inteligentna tehnika za va?? dom: mi ??emo vas rado
                    savjetovati
                  </h3>
                  <p>
                    Od velike prednosti je kad se sistem pametne ku??e izvede u
                    novogradnji. Tako mo??ete lokaciju svih komponenti od po??etka
                    planirati i spremiti potrebne priklju??ke. Mo??ete sistem
                    pametne ku??e ugraditi i u ve?? postoje??u instalaciju, u
                    svakom slu??aju dobro planiranje je bitno. Mi ??emo rado
                    preuzeti planiranje i implementaciju sistema pametne ku??e za
                    vas, neovisno o tome da li se radi o novogradnji ili ??elite
                    nadograditi va?? dom sa sistemom pametne ku??e.
                  </p>
                </div>
              </div>
            </div>
            <div id={styles.slabastrtv}>
              <h3>TV-Prijemnik</h3>
              <div className={styles.sigurnostl}></div>
              <p>Prijem tv signala je mogu?? na vi??e na??ina</p>
              <div className={styles.plankol}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/dvb.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3 className={styles.sm}>
                    Digitalni satelitski prijem (DVB-S)
                  </h3>
                  <p>
                    Paraboli??na antena, koja se montira na krovu ili na zid
                    ku??e, i prijemni ure??aj kod televizora mogu primati hiljade
                    programa. Kod porodi??nih ku??a potrebno je samo jedno
                    Paraboli??no ogledalo, koje se treba spojiti sa sistemom
                    distribucije. Satelitski sistem, zajedno sa ugradnjom
                    sat-resivera, je montirano u par sati. Sa specijalnim
                    sistemima koji posjeduju obrtni motor, mogu se primiti i
                    internacionalni sateliti, i dobijete pristup na hiljade tv
                    kanala ??irom svijeta.
                  </p>
                </div>
              </div>
              <div className={styles.plankol}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/dvb1.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3 className={styles.sm}>Kablovska (DVB-C)</h3>
                  <p>
                    Preko kablovskog operatora saznate, da li je kablovski
                    priklju??ak dostupan za va??e doma??instvo. Potrebne su
                    specijalne kablovske mre??e i ure??aj za prijem. Za
                    kori??tenje, pored naknade za emitovanje potrebno je i
                    platiti kablovski priklju??ak.
                  </p>
                </div>
              </div>
              <div className={styles.plankol}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/dvb2.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3 className={styles.sm}>Internet</h3>
                  <p>
                    Za prijem programa preko interneta potrebno je imati pristup
                    brzom DSL priklju??ku, odgovaraju??em ra??unaru i DSL-modemu.
                  </p>
                </div>
              </div>
            </div>
            <div id={styles.slabastrmre??a}>
              <div id={styles.mre??ab}>
                <div id={styles.mrezatxt}>
                  <h3>Mre??e</h3>
                  <div className={styles.sigurnostl}></div>
                  <p>Umre??eno u budu??nost</p>
                  <p className={styles.new}>
                    Lokalne mre??e su danas koncipirane kao ethernet sistemi sa
                    brzinom od jednog Gigabita u sekundi. Jaki razdjelnik se
                    bavi optimalnom izvedbom na svim interfejsima.
                  </p>
                  <p>
                    U najboljem slu??aju jedna mre??a spaja sve oblike
                    komunikacije: ra??unar, internet, telefon, IP internet
                    telefon. Centralni panel poma??e kada je potrebna nova
                    dodjela priklju??aka. Va??no je precizno planiranje i
                    implementacija, kao i provjera instalirane mre??e, mi ??emo
                    vas rado savjetovati.
                  </p>
                </div>
                <div id={styles.mrezaimg}>
                  <img
                    src={require('../../assets/img/usluge/Netzwerke1.jpg')}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div id={styles.slabastrvideo}>
              <h3>Video Tehnika</h3>
              <div className={styles.sigurnostl}></div>
              <div id={styles.slabastrvideob}>
                <div id={styles.slabastrvidtxt}>
                  <p>
                    Mi instaliramo CCTV-video nadzorne sisteme. Pored
                    kompetentnog savjetovanja kod video nadzornih sistema,
                    nudimo vam i odgovaraju??e materijale, kao npr. infracrvene
                    S/W i kamere u boji, IP kamere (mre??ne kamere), kao i opremu
                    za specijalne namjene kod ekstremnih uvjeta (postavljanje
                    kamera u eksternim podru??jima).
                  </p>
                  <p>
                    Naravno dobijate kod nas i profesionalnu instalaciju video
                    centrala i digitalnih sistema za pohranu slika. Kod pitanja
                    o prenosu signala video nadzornih kamera i daljinskog
                    upravljanja kao i telekomunikacijskih mre??a (intra i
                    internet, ISDN, PSTN, GSM) smo mi tu za vas.
                  </p>
                </div>
                <div id={styles.slabastrvidimg} className={styles.new}>
                  <img
                    src={require('../../assets/img/usluge/Videoueberwachung2.jpg')}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div id={styles.slabastrinterfon}>
              <h3>Interfon</h3>
              <div className={styles.sigurnostl}></div>
              <p>Sigurnost i komfor u va??em domu</p>
              <div id={styles.slabastrinterfonb}>
                <div id={styles.interfontxt}>
                  <p>
                    Mi smo specijalisti kod instalacije interfonskih sistema i
                    rado ??emo vam pomo??i kod odabira odgovaraju??ih interfona.
                  </p>
                  <p>
                    Mi ??emo obraditi va?? zahtjev (da li je detektor pokreta ili
                    interfon sa kamerom potreban, i ako da koliko instanci ??e
                    biti instalirano), brinemo se i o planiranju, instalaciji i
                    odr??avanju va??eg sistema. Imate li interesa za interfonske
                    instalacije ? kontaktirajte nas, radujemo se va??em pozivu
                    ili emailu.
                  </p>
                </div>
                <div id={styles.interfonimg} className={styles.new}>
                  <img
                    src={require('../../assets/img/usluge/interfon01.jpg')}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div id={styles.slabastrtelefon}>
              <h3>Telefonski Sistemi</h3>
              <div className={styles.sigurnostl}></div>
              <div id={styles.slabastrteltxt}>
                <p>
                  Privatno, sa klijentima, poslovnim partnerima ili radnim
                  kolegama telefoniranje u istom objektu, slanje faksa, obim
                  komunikacije koji se odvija preko klasi??nih telefonskih
                  sistema je i dalje veoma velik. Uprkos pametnih telefona i
                  interneta, telefonski sistemi ??ine ipak jo?? ve??inu internih i
                  eksternih komunikacijskih mre??a, od ku??a do kompleksnog
                  kori??tenja u prostranim zgradama.
                </p>
                <p>
                  Za normalno dvijanje razli??itih funkcija i komunikacijskih
                  zadataka su bitne dvije stvari: logisti??ka koherentna
                  koncepcija kompletnog sistema kao i sva oprema, koja treba da
                  bude kvalitativna, puzdana i funkcionalna.
                </p>
                <p>
                  Kakva vrsta telefonske instalacije je potrebna, i sa kakvim
                  pode??avanjem na kraju ovisi o raznim faktorima i parametrima.
                  Veli??ina preduze??a, institucije, stana ili ku??e, broj
                  korisnika i njihove potrebe. Potrebna vam je nova instalacija
                  telefonskog sistema ili ??elite postoje??i sistem u va??em
                  objektu zamjeniti ? Mi ??emo se pobrinuti da ispunimo va??a
                  o??ekivanja. Nudimo stru??no savjetovanje, planiranje i
                  projektovanje telefonskih instalacija.
                </p>
              </div>
              <div id={styles.slabastrtelimg}>
                <img
                  src={require('../../assets/img/usluge/telefsistemi.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/telef2.jpg')}
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        <section id={styles.knx} ref={this.knxS}>
          <div id={styles.knxtitle}>
            <img
              src={require('../../assets/img/usluge/output-onlinepngtools.png')}
              alt=""
            />
            <h2>Pametna Ku??a</h2>
            <img
              id={styles.shv}
              src={require('../../assets/img/vectorpaint.png')}
              alt=""
            />
          </div>
          <div id={styles.knxbody}>
            <div id={styles.knxbodyh}>
              <h2>
                ??ta <span className={styles.lc}>j</span>e KNX pametna ku??a
              </h2>
              <p>
                Automatizacija pametne ku??e <span className={styles.lc}>i</span>{' '}
                KNX menad??ment alati
              </p>
            </div>
            <div id={styles.stajeknx}>
              <i>
                KNX je internacionalno priznati globalni standard za pametne
                ku??e koji pru??a potpunu kontrolu i automatizaciju nad objektom
              </i>
              <video
                poster={require('../../assets/img/usluge/videothumb.jpg')}
                loop
                width="420"
                height="320"
                controls
                muted
              >
                <source
                  src={require('../../assets/img/WhatcanKNXdoforyou.mp4')}
                  type="video/mp4"
                />
              </video>
            </div>
            <section id={styles.one}>
              <h2>Sve o KNX pametnoj ku??i i automatizaciji objekata</h2>
              <p>
                KNX je tehnologija koja kontroli??e automatizaciju integralnih
                funkcija bilo kakvog objekta (rezidencijalnog, komercijalnog,
                industrijskog itd) kao ??to su HVAC, rasvjeta, multimedija,
                sigurnost, energetski menad??ment i vi??e.
              </p>
              <p>
                U ovom dijelu ??e te saznati sve ??to trebate da znate o KNX
                tehnologiji, kako KNX funkcioni??e i za??to bi uzeli u obzir KNX
                sistem pri integraciji u postoje??i objekat ili za va?? budu??i
                gra??evinski projekat.
              </p>
            </section>
            <section id={styles.two}>
              <h2>??ta je KNX?</h2>
              <img
                src={require('../../assets/img/usluge/knxbemi1.jpg')}
                alt=""
              />
              <p>
                Da bi prenijeli podatke do svih komponenti (smart home ure??aja)
                u objektu potreban je sistem koji izbjegava problem kad ve??i
                broj izoliranih ure??aja komunicira razli??itim jezicima.
              </p>
              <p>
                KNX ure??aji mogu da upravljaju rasvjetom, roletnama i
                ??aluzinama, HVAC, sigurnosnim sistemima, energetskim
                menad??mentom, audiom i videom, bijelom tehnikom, displejima,
                daljinskim upravlja??ima itd.
              </p>
              <p>
                KNX je jedini svijetski standard za ku??nu i kontrolu objekata,
                sa preko 300 razli??itih proizvo??a??a koji proizvode produkte koji
                mogu svi raditi me??usobno u jednom sistemu.
              </p>
              <p>
                KNX funkcioni??e po principu da obezbjedi svim komponentama,
                ure??ajima, svojstvima i funkcijama bilo kojeg objekta me??usobnu
                komunikaciju preko jednog zajedni??kog jezika, brzo i na daljinu.
              </p>
            </section>
            <section id={styles.three}>
              <h2>Kako KNX fukcioni??e ?</h2>
              <img
                src={require('../../assets/img/usluge/KNX-busd.jpg')}
                alt=""
              />
              <p>
                KNX bus linija je glavni centralni nervi sistem u instalaciji,
                to je zeleni kabal koji je instaliran kao dodatak
                konvencionalnom glavnom napajanju pri novoj gradnji ili
                renoviranju
              </p>
              <p>
                Poslije toga se tehnolo??ki elementi u objektu me??usobno spoje
                preko glavne bus linije u skladi sa va??e??im KNX standardima.
                Kablovski sistem je onda pod kontrolom ure??aja kao ??to su
                senzori, detektori, parametri itd, koji se kasnije mogu
                kontrolirati putem korisnika (laptop, smart phone, tablet,
                daljinski upravlja??i).
              </p>
              <p>
                KNX bus je uvezan paralelno sa glavnim elektri??nim snadbjevanjem
                do svih ure??aja i sistema na mre??i, spajaju??i slijede??e:
              </p>
              <ul>
                <li>
                  Senzori (push tasteri, termostati, meteorolo??ke stanice,
                  senzori pokreta i drugi) - prikupljaju informacije i ??alju na
                  bus u vidu telegrama(podataka)
                </li>
                <li>
                  Aktori (dimeri, ventili za grijanje, displeji) - primaju
                  telegrame koji su onda konvertirani u rad
                </li>
                <li>
                  Kontroleri i druge logi??ke funkcije (kontroleri sobne
                  temperature, kontroleri roletni itd)
                </li>
                <li>
                  Sistemski ure??aji i komponente (linijski kupleri, backbone
                  kupleri)
                </li>
              </ul>
              <img
                src={require('../../assets/img/usluge/homenergy(2).jpg')}
                alt=""
              />
              <p>
                Mnogo aktora tako??er posjeduje kontrolnu funkcionalnost, kao i
                senzorsku funkcionalnost (mjerenje operativnih sati, broj
                sklopnih ciklusa, potro??nja elektri??ne energije itd.)
              </p>
              <p>
                Aplikacioni softver u kombinaciji sa sistemskom topologijom i
                ETS programom se instalira u ure??aje pomo??u interfejs
                komponente.
              </p>
              <p>
                Instaliranim KNX sistemima se mo??e pristupiti preko LAN-a,
                point-to-point telekomunikacijske konekcije, mobilne mre??e,
                ra??unara, tableta, ekrana na dodir, pametnih telefona.
              </p>
            </section>
            <section id={styles.four}>
              <h2>
                Kojim svojstvima, funkcijama, ure??ajima mo??e KNX upravljati?
              </h2>
              <img
                src={require('../../assets/img/usluge/knxmanage.jpg')}
                alt=""
              />
              s
              <p>
                U ku??i, KNX rije??enja prave ??ivot jednostavnijim sa pouzdanim,
                inteligentnim i korisni??ki usmjerenim automatizacijama koji
                kontroliri??u i upravljaju rasvjetu, roletne i ??aluzine, HVAC,
                sigurnosne sisteme, multimediju, pametne ure??aje i vise.
              </p>
              <p>
                Bilo koji produkt ozna??en sa oficijalnim KNX za??titnim znakom je
                testiran od strane KNX kreditiranih laboratorija.
              </p>
              <p>
                Tokom testne stadije za KNX kompatibilne produkte, ure??aj se
                provjerava da podr??ava KNX protokol i korisni podaci su kodirani
                po globalnom KNX standardu.
              </p>
            </section>
            <section id={styles.five}>
              <h2>
                Kakva je energetska efikasnost i kako smanjiti energetsku
                potro??nju?
              </h2>
              <img
                src={require('../../assets/img/usluge/knxenerg1.jpg')}
                alt=""
              />
              <div id={styles.fivetxt}>
                <p>
                  KNX sistemi za pametne ku??e u komercijalne objekte ne same da
                  pru??aju bolju kontrolu i prakti??nost, KNX tako??er istovremeno
                  enormno smanjuje energetske tro??kove tako ??to konstantno
                  nadgleda i prilago??ava operativne postavke za sve konektovane
                  ure??aje na KNX bus.
                </p>
                <a href="img/usluge/monitoring.jpg">
                  <img
                    src={require('../../assets/img/usluge/monitoring.jpg')}
                    alt=""
                  />
                </a>
                <p>
                  KNX sistemi doprinose efektivnom energetskom menad??mentu kroz
                  vrhunsko zahtjevnom nadgledanju, detekciji struje, mre??nom
                  nadgledanju, pametnom mjerenju, brojanju energetskih pulseva,
                  logiranju podataka i vizualizaciji.
                </p>
              </div>
            </section>
            <section id={styles.six}>
              <h2>U kakvim se objektima mo??e instalirati KNX sistem?</h2>
              <a href="img/usluge/knxobjects.jpg">
                <img
                  src={require('../../assets/img/usluge/knxobjects.jpg')}
                  alt=""
                />
              </a>
              <p>
                KNX infrastruktura i KNX pametni sistemi se mogu koristiti u
                bilo kakvom objektu ili vanjskom prostoru, od male porodi??ne
                ku??e pa sve do velikih tr??nih centara i industrijskih kompleksa.
              </p>
              <ul>
                <li>Privatne ku??e</li>
                <li>Rezidencijski smje??taji (apartmani, gradske ku??e ...)</li>
                <li>Slu??bene zgrade (uredi)</li>
                <li>??kole</li>
                <li>Trgovi</li>
                <li>Kasina</li>
                <li>Bolnice</li>
                <li>Trgova??ki centri</li>
                <li>
                  Javni objekti i vanjski prostori (Zgrade vlade, biblioteke)
                </li>
                <li>Industrijski postrojenja i fabrike</li>
                <li>+ Vi??e</li>
              </ul>
            </section>
            <section id={styles.seven}>
              <h2>
                Mo??e li se KNX sistem ugraditi u ve?? postoje??e objektne
                strukture i da li je KNX tehnologija dobra opcija za budu??nost?
              </h2>
              <div className={styles.sigurnostl}></div>
              <img
                src={require('../../assets/img/usluge/knxfuture1.jpg')}
                alt=""
              />
              <p>
                KNX sistem je svestran, i mo??e se sa lako??om ugraditi u ve??
                postoje??e objekte.
              </p>
              <p>
                KNX sitem je tako??er pro??iriv sa sigurnom budu??no????u. To zna??i
                da bilo koji KNX sistem se mo??e pro??iriti ili repgroramirati sa
                lako??om
              </p>
              <p>
                Jednom instaliran, KNX sistem se adaptira na individualne
                potrebe korisnika.
              </p>
              <p>
                KNX tehnologija pru??a perfektno dugoro??no rje??enje za raznovrsnu
                upotrebu u raznim objektima i cijeli sistem se sa lako??om
                adaptira kada tehnologija uznapreduje i novi KNX produkti
                postanu dostupni.
              </p>
            </section>
            <section id={styles.eight}>
              <h2>
                Koje su glavne prednosti kori??tenja KNX tehnologije <br />
                pored manje energetske potro??nje?
              </h2>
              <div className={styles.sigurnostl}></div>
              <img
                src={require('../../assets/img/usluge/knxbenefits1.jpg')}
                alt=""
              />
              <p>
                KNX tehnologija je rezultat intenzivnog znanja i iskustva
                skupljenog preko zadnjih 15 godina sa prethodnim tehnologijama
                kao ??to su EIB(European Installation Bus), European Home System
                (EHS) i BatiBUS.
              </p>
              <h3>
                Ispod su 10 glavnih prednosti kori??tenja KNX sistema za pametne
                ku??e i pametnu automatizaciju objekata.
              </h3>
              <h3>
                1. KNX je internacionalni standard za pametnu automatizaciju
                objekata i njihove kontrole i ima sigurnu budu??nost.
              </h3>
              <p>
                ISO / IEC je odobrio KNX tehnologiju kao internacionalni
                standard ISO / IEC 14543-3 u 2006.
              </p>
              <p>
                CENELEC je odobrio KNX tehnologiju kao Evropski standard EN
                50090 u 2003.
              </p>
              <p>
                CEN je odobrio KNX tehnologiju kao EN 13321-1 i EN1332 - 2
                (KNXnet/IP) u 2006.
              </p>
              <p>
                SAC je odobrio KNX tehnologiju kao Kineski standard GB/T 20965 u
                2007.
              </p>
              <p>
                ANSI/ASHRAE je odobro KNX tehnologiju kao Ameri??ki standard
                ANSI/ASHRAE 135 u 2005.
              </p>
              <h3>
                2. KNX garantuje mogu??nost me??usobne komunikacije ure??aja sa
                oficijalnim KNX produkt certifikacijom.
              </h3>
              <p>
                KNX certifikacijski proces osigurava da razli??iti produkti
                razli??itih proizvo??a??a rade i komuniciraju me??usobno.
              </p>
              <p>
                Ovo osigurava veliku fleksibilnost u ekstenziji i modifikaciji
                KNX instalacija.
              </p>
              <p>
                KNX je jedini ku??ni i objektno kontrolni standard koriste??i
                globalnu certifikacijsku ??emu za produkte, trening centre
                (privatne institucije) i za individualne osobe (izvo??a??i elektro
                radova, dizajneri objekata).
              </p>
              <h3>3. KNX stoji za veliki kvalitet produkata</h3>
              <p>
                KNX asocijacija zahtjeva veliki nivo produkcije i kontrole
                kvaliteta tokom svih stadija ??ivota KNX produkta.
              </p>
              <p>
                U bilo kom slu??aju dvojbe, KNX asocijacija mo??e certifikovane
                produkte retestirati ili zatra??iti dodatne testne izvje??taje od
                strane proizvo??a??a.
              </p>
              <h3>
                4. Unikatani neovisni in??injerski alatni softver ETS &reg;.
              </h3>
              <p>
                PC softverski alat ETS mogu??ava planiranje, in??injering i
                konfiguraciju svih certificiranih KNX ure??aja.
              </p>
              <p>
                Alat je proizvo??a??ki neovisan, ??to zna??i da mo??e kombinuje
                produkte od raznih proizvo??a??a u jednu instalaciju
              </p>
              <h3>
                5. KNX se mo??e koristiti za sve aplikacije u pametnoj ku??i i
                objektnoj automatizacijskoj kontroli.
              </h3>
              <p>
                KNX se mo??e koristiti za razne aplikacije u ku??i i objektnoj
                kontroli polaze??i od rasvjete, roletna i ??aluzina, grijanja,
                ventilacije, klime, nadgledanja, alarma, kontroli vode,
                energetskog menad??menta, mjerenja i ku??nih aparata, audio itd.
              </p>
              <p>
                KNX pobolj??ava komfort i sigurnost, doprinosi smanjenju
                elektri??ne energije, za??titi klime (do 50% za kontrolu rasvjete
                i isti iznos ure??aje klime).
              </p>
              <h3>
                6. KNX se mo??e koristiti u raznim rezidencijalnim,
                komercijalnim, industrijskim i vanjskim prostorima.
              </h3>
              <p>
                KNX se tako??er mo??e koristiti i integrisati u nove i postoje??e
                objektne strukture.
              </p>
              <p>
                KNX instalacije tako mo??e sa lako??om pro??iriti i adaptirati na
                nove potrebe i zahtjeve, sa minimalnim vremenskim i financijskim
                investicijama.
              </p>
              <p>
                KNX se mo??e instalirati u male porodi??ne ku??e kao i ve??e
                objekte(poslovni prostori, hoteli, konferencijski centri,
                bolnice, ??kole, robne ku??e, aerodromi itd.
              </p>
              <h3>
                7. KNX podr??ava velik broj razli??itih konfiguracijskih modela.
              </h3>
              <p>
                KNX pru??a razli??ite ulazne nivoe za realizaciju KNX projekata.
              </p>
              <p>
                Preko KNX E-modusa, KNX nekvalifikovani izvo??a??i elektro radova
                su adresirani.
              </p>
              <p>
                Preko S-modusa, KNX trenirani izvo??a??i radova su u mogu??nosti da
                realiziraju sofisticirane instalacije.
              </p>
              <p>Razli??iti modus su:</p>
              <p>
                Lagana instalacija (E-modus): Konfiguracija je zavr??ena bez
                pomo??i ra??unara ali sa centralnim kontrolerom ili push
                tasterima. Produkti kompatibilni sa E-modusom imaju limitiranu
                funkcionalnost i namijenjeni su za instalacije srednje veli??ine.
              </p>
              <p>
                Sistem instalacija (S-modus): planiranje instalacije i
                konfiguracija je izvr??ena pomo??u ra??unara sa instaliranim ETS
                softverskim alatom, gdje svi podaci proizvo??a??a su sa??uvani u
                ETS bazi podataka. S-modus je namijenjen za KNX certificirane
                instalatere i za instalacije ve??ih razmjera.
              </p>
              <h3>8. KNX podr??ava veliki broj komunikacijskih medija.</h3>
              <p>
                Svaki komunikacijski medij se mo??e koristiti u kombinaciji sa
                jednom ili vi??e konfiguracijskih modela.
              </p>
              <p>
                Ovo omogu??ava svakom proizvo??a??u da izabere odgovaraju??u
                kombinaciju za ciljani tr??i??ni segment i aplikaciju.
              </p>
              <p>
                Twisted Pair (KNX TP): KNX se prenosi kroz odvojeni bus kabal,
                hijerarhijska struktura u linijama i poljima.
              </p>
              <p>
                Power Line (KNX PL): KNX se prenosi na postoje??oj glavnoj mre??i.
              </p>
              <p>
                Radio frekvencija (KNX RF): KNX se prenosi uz pomo?? radio
                signala. Ure??aji mogu biti uni ili bidirekcionalni.
              </p>
              <p>
                IP/Ethernet (KNXnet/IP): Ovaj komunikacijski medij se mo??e
                koristiti u spoju sa KNXnet/IP specifikacijama, ??to dozvoljava
                usmjeravanje KNX okvira(frame-ova) u IP okvire.
              </p>
              <h3>9. KNX se mo??e spojiti sa drugim sistemima.</h3>
              <p>
                Mnogobrojni KNX proizvo??a??i nude gateway-e do ostalih mre??a
                (drugih objektnih automatizacijskih sistema, telefonskih mre??a,
                multimedijskih mre??a, IP mre??a itd).
              </p>
              <p>
                KNX sistemi se mogu mapirati u BACnet objekte, ili pru??a
                mogu??nost da interfejsa sa DALI tehnologijom.
              </p>
              <h3>
                10. KNX je neovisan od bilo kakvih hardver ili softver
                tehnologija.
              </h3>
              <p>
                KNX se mo??e realizirati na bilo kojoj mikroprocesorskoj
                platformi.
              </p>
              <p>
                KNX se mo??e implementirati od starta. Kako god, za lagan
                marketin??ki ulaz, KNX proizvo??a??i mogu da uzmu resurse do
                nabavlja??a KNX sistemskih komponenti.
              </p>
            </section>
            <section id={styles.nine}>
              <div id={styles.knxprednosti}>
                <div id={styles.controlremote}>
                  <div id={styles.crheader}>
                    <h2>Kontroli??i funkcionalnosti pametne ku??e izdaleka</h2>
                    <div id={styles.crline}></div>
                    <p>
                      Lagano i odmah pristupi, upravljaj i kontroli??i sve
                      funkcije pametne ku??e od bilo kuda u svijetu koriste??i
                      tablet ili pametni telefon.
                    </p>
                  </div>
                  <div id={styles.crbody}>
                    <div className={styles.crbcol}>
                      <i className="fas fa-chart-bar"></i>
                      <h3>Energetski menad??ment</h3>
                      <p>Nadgledanje vrhunca potra??nje</p>
                      <p>Nadgledanje mre??e</p>
                      <p>Mjerenje</p>
                      <p>Brojanje energetskih pulseva</p>
                      <p>Logiranje podataka</p>
                      <p>Vizualizacija</p>
                      <p>Smanjenje optere??enja</p>
                    </div>
                    <div className={styles.crbcol}>
                      <div id={styles.updown}>
                        <i className="fas fa-caret-up fa-2x"></i>
                        <i className="fas fa-caret-down"></i>
                      </div>

                      <h3>Kontrola roletni i ??aluzina</h3>
                      <p>Grupna i centralna kontrola</p>
                      <p>Pode??eno pozicioniranje</p>
                      <p>Pra??enje sunca</p>
                      <p>Automatski programi</p>
                      <p>Reagovanje u odnosu na klimu</p>
                      <p>Za??tita od vjetra i ki??e</p>
                      <p>Sigurnosni modusi</p>
                    </div>
                    <div className={styles.crbcol}>
                      <i className="fas fa-lightbulb"></i>
                      <h3>Kontrola rasvjete</h3>
                      <p>Switching i Dimming</p>
                      <p>Automatska rasvjeta</p>
                      <p>Konstantna kontrola rasvjeta</p>
                      <p>Tempirana kontrola</p>
                      <p>Svijetlosne scene</p>
                      <p>DALI Gateway</p>
                    </div>
                    <div className={styles.crbcol}>
                      <i className="fas fa-network-wired"></i>
                      <h3>HVAC</h3>
                      <p>Individualna kontrola soba</p>
                      <p>Centralna i automatska kontrola</p>
                      <p>Tempirani operativni modusi</p>
                      <p>Kontrola pogonskih ventila</p>
                      <p>Podno grijanje</p>
                      <p>Fan Coileri</p>
                    </div>
                    <div className={styles.crbcol}>
                      <i className="fas fa-eye"></i>
                      <h3>Sigurnost</h3>
                      <p>Protuprovala</p>
                      <p>Detekcija dima</p>
                      <p>Tehni??ke gre??ke</p>
                      <p>Nadzor</p>
                      <p>Simulacija prezence</p>
                      <p>Preventivne tehnologije</p>
                    </div>
                    <div className={styles.crbcol}>
                      <i className="fas fa-cogs"></i>
                      <h3>Operacije i vizualizacija</h3>
                      <p>Switch / Push Tasteri</p>
                      <p>Dodirni paneli i displeji</p>
                      <p>Daljinska kontrola</p>
                      <p>PC vizualizacija</p>
                      <p>WAP</p>
                      <p>PDA</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section id={styles.ten}>
              <div id={styles.ourworkh}>
                <h2>Primjerak na??eg rada</h2>
                <div className={styles.ourowrkl}></div>
                <p>
                  KNX sistemi potpuno prilago??eni zahtjevima i preferencama
                  korisnika.
                </p>
              </div>
              <div id={styles.ourworkb}>
                <img
                  src={require('../../assets/img/usluge/knxmini1.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/knxmini2.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/knxmini3.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/knxmini4.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/knxmini5.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/knxmini6.jpg')}
                  alt=""
                />
              </div>
              <div id={styles.ourworkf}>
                <h2>Imate pitanja o KNX-u ?</h2>
                <div className={styles.ourworkl}></div>
                <p>
                  Kontaktirajte nas putem poziva, e-maila ili direktne poruke
                </p>
                <p>
                  <i className="fas fa-phone-alt"></i>
                  +387 33 246 495
                </p>
                <p>
                  <i className="fas fa-envelope-open-text"></i> E-mail:
                  ElektroPlus@gmail.com
                </p>
                <form action="#">
                  <label htmlFor="poruka">Pitanje</label>
                  <textarea
                    name="poruka"
                    id="poruka"
                    cols="30"
                    rows="10"
                  ></textarea>
                  <label htmlFor="name">Ime i Prezime</label>
                  <input type="text" name="name" id="name" />
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" />
                  <input type="submit" value="Po??aljite" />
                </form>
              </div>
            </section>
          </div>
        </section>
        <div id={styles.rasvjeta} ref={this.rasvjetaS}>
          <div id={styles.rasvjetah}>
            <h2>Rasvjeta</h2>
          </div>
          <div id={styles.rasvjetab}>
            <div id={styles.rasvjetabh}>
              <h2>Povjerite nama instalaciju rasvjete va??eg doma</h2>
              <div id={styles.rasvjetal}></div>
              <p>Osvjetlite va?? dom</p>
            </div>
            <div id={styles.rasvjetabb}>
              <div className={styles.rasvjetacol}>
                <h3>Be??i??na (Hue) Rasvjeta</h3>
                <img
                  src={require('../../assets/img/usluge/mobileresize/0012res.jpg')}
                  alt=""
                />
              </div>
              <div className={styles.rasvjetacol}>
                <h3>Unutra??nja Rasvjeta</h3>
                <img src={require('../../assets/img/usluge/intl.jpg')} alt="" />
              </div>
              <div className={styles.rasvjetacol}>
                <h3>Vanjska Rasvjeta</h3>
                <img
                  src={require('../../assets/img/usluge/outdoor2.jpg')}
                  alt=""
                />
              </div>
              <div className={styles.rasvjetacol}>
                <h3>LED Rasvjeta</h3>
                <img
                  src={require('../../assets/img/usluge/LED-Staircase-Lighting.jpg')}
                  alt=""
                />
              </div>
              <div className={styles.rasvjetacol}>
                <h3>BEMI Rasvjetni Dizajn</h3>
                <img
                  src={require('../../assets/img/usluge/lightingdesign.jpg')}
                  alt=""
                />
              </div>
              <div className={styles.rasvjetacol}>
                <h3>HCL Sistem Rasvjete</h3>
                <img
                  src={require('../../assets/img/usluge/mobileresize/0052res.jpg')}
                  alt=""
                />
              </div>
            </div>
            <div id={styles.rasvjetatxt}>
              <p>
                Rasvjeta je jedna od najraznovrsnijih podru??ja elektrotehnike.
              </p>
              <p>
                Kao certificirani KNX / EIB partner smo u mogu??nosti ponuditi
                kompleksna rje??enja i sura??ujemo sa poznatim proizvo??a??ima.
              </p>
              <p>
                Ako trenutno planirate renoviranje ili novogradnju onda je
                shodno tome i rasvjeta jedna od aktuelnih tema. Zbog toga je
                konkretno planiranje i profesionalna implementacija va??e
                rasvjete va??an zadatak kojeg ??emo rado preuzeti.
              </p>
              <section id={styles.ur}>
                <img
                  id={styles.rgif}
                  src={require('../../assets/img/maybeanimation.gif')}
                  alt=""
                />
                <h2>Unutra??nja Rasvjeta</h2>

                <div id={styles.urline}></div>
                <div id={styles.urimgs}>
                  <div id={styles.urimgsl}>
                    <img
                      src={require('../../assets/img/usluge/fluorescent-hanging-lamp-500x500(1).jpg')}
                      alt=""
                    />
                  </div>
                  <div id={styles.urimgsr}>
                    <img
                      src={require('../../assets/img/usluge/ledhallway1.jpg')}
                      alt=""
                    />
                  </div>
                </div>
                <div id={styles.urtxt}>
                  <div id={styles.urtxtl}>
                    <p>
                      Osnovno pravilo za osvjetljenje ??ivotnog ili radnog
                      prostora je dobra i kvalitetna rasvjeta koja omogu??ava
                      jasnu orijentaciju u prostoru te pru??a dovoljno svjetla za
                      pogled na regale, ladice i sli??no. Prostorije osvjetljene
                      samo op??tom rasvjetom brzo postaju monotone i u njima nema
                      pravog odnosa svjetla i sijene.
                    </p>
                    <p>
                      Ako u svom domu ??elite dodati posebnu i ugodnu atmosferu,
                      nemojte posezati za zidnim bojama, biljkama ili nekim
                      drugim dekorativnim sadr??ajem. Najve??u i najefikasniju
                      promjenu u Va??em prostoru bez obzira na namjenu (??ivotni
                      prostor, poslovni prostor ili sl.) omogu??it ??e upravo
                      pravilno i stru??no postavljeni izvori svijetlosti kojima
                      mo??ete pokazati sve prednosti i sakriti sve mane u Va??em
                      prostoru.
                    </p>
                    <p>
                      Na?? tim elektri??ara ??e dovesti va?? dom na novi estetski
                      nivo. Unutra??nja rasvjeta je esencijalni dio dizajna doma
                      ali mo??e i biti veliki potro??a?? elektri??ne energije.
                    </p>
                    <p>
                      Zbog tog razloga na?? tim ??e instalirati rasvjetu koja
                      najbolje odgovara va??em ??ivotnom stilu i bud??etu. Na??i
                      elektri??ari uvijek stavljaju va??e potrebe na prvo mjesto,
                      tako da garantujemo 100%-u satisfakciju.
                    </p>
                    <p>
                      Da li vi ??eljeli nadograditi trenutnu rasvjetu ili
                      pove??ati efikasnost elektri??ne energije u va??em domu, na??
                      tim je tu da vam pomogne. Na??i elektri??ari su
                      kvalifikovani da podnesu bilo koje izazove u instalaciji i
                      sigurni smo da ??emo ostvariti va??u ??eljenu rasvjetu.
                    </p>
                    <p>
                      Razli??iti tipovi rasvjete koji se mogu instalirati u va??em
                      objektu:
                    </p>
                    <ul>
                      <li>Ugradbena Rasvjeta</li>
                      <li>Rasvjeta za Multimedijalne Prostorije</li>
                      <li>Umjetni??ka Rasvjeta</li>
                      <li>Vise??a Rasvjeta</li>
                    </ul>
                  </div>
                  <div id={styles.urtxtr}>
                    <img
                      className={styles.hideMobile}
                      src={require('../../assets/img/usluge/urimgtest.jpg')}
                      alt=""
                    />
                    <img
                      className={styles.hideDesktop}
                      src={require('../../assets/img/usluge/mobileresize/urimgtest1.jpg')}
                      alt=""
                    />
                    <img
                      src={require('../../assets/img/usluge/urr1.jpg')}
                      alt=""
                    />
                  </div>
                  <div id={styles.urf}>
                    <div className={styles.urfbox}>
                      <h3>Ugradbena Rasvjeta</h3>
                      <img
                        src={require('../../assets/img/usluge/ugradbene.jpg')}
                        alt=""
                      />
                    </div>

                    <div className={styles.urfbox}>
                      <h3>Rasvjeta za Multimedijalne Prostorije</h3>
                      <img
                        src={require('../../assets/img/usluge/multimedia.jpg')}
                        alt=""
                      />
                    </div>

                    <div className={styles.urfbox}>
                      <h3>Umjetni??ka Rasvjeta</h3>
                      <img
                        className={styles.hideDesktop}
                        src={require('../../assets/img/usluge/mobileresize/artl21.jpg')}
                        alt=""
                      />
                      <img
                        className={styles.hideMobile}
                        src={require('../../assets/img/usluge/artl2.jpg')}
                        alt=""
                      />
                    </div>

                    <div className={styles.urfbox}>
                      <h3>Vise??a Rasvjeta</h3>
                      <img
                        className={styles.hideDesktop}
                        src={require('../../assets/img/usluge/mobileresize/vise??e1.jpg')}
                        alt=""
                      />
                      <img
                        className={styles.hideMobile}
                        src={require('../../assets/img/usluge/vise??e.jpg')}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section id={styles.vr}>
                <div id={styles.vrh}>
                  <h2>Vanjska Rasvjeta</h2>
                  <div id={styles.vrline}></div>
                </div>
                <div id={styles.vrimgs}>
                  <div id={styles.vrimgsl}>
                    <img
                      src={require('../../assets/img/usluge/treppenb2.6.jpg')}
                      alt=""
                    />
                  </div>
                  <div id={styles.vrimgsr}>
                    <img
                      src={require('../../assets/img/usluge/outdoorl.jpg')}
                      alt=""
                    />
                  </div>
                </div>
                <div id={styles.vrb}>
                  <p>
                    U dana??nje vrijeme posebno treba pridodati pa??nju velikim
                    u??tedama na energiji i to kori??tenjem LED dioda, LED traka i
                    drugog. Otvoreni prostori osvjetljeni LED rasvjetom lijepo
                    su osvjetljeni, vrlo privla??ni i ugodni.
                  </p>
                  <p>
                    Osobito je postignut veliki efekt u vrtovima odnosno
                    dvori??tima. Vanjska rasvjeta mo??e slu??iti kao detalj na
                    poplo??anim stazama, osvjetljenje ukrasnih grmova, cvije??a te
                    kao dekoracija na fasadi objekta. Vanjska rasvjeta po Va??em
                    izboru mo??e davati efekte u raznim bojama (bijela, toplo
                    bijela, RGB).
                  </p>
                  <p>
                    Spolja??nju rasvjetu mogu??e je podijeliti na uli??nu rasvjetu
                    (rasvjeta puteva), urbanu rasvjetu (rasvjeta trgova i
                    pje??a??kih zona) i reflektorsku rasvjetu (rasvjeta fasada i
                    presti??nih objekata). Osnovna uloga spolja??nje (vanjske)
                    rasvjete je:
                  </p>
                  <ul>
                    <li>
                      Dobra rasvjeta smanjuje broj nesre??a i pove??ava sigurnost
                      na putevima, te osigurava vidljivost pje??acima i
                      biciklistima
                    </li>
                    <li>
                      Rasvjeta pove??ava za??titu i sigurnost ljudi i objekata
                    </li>
                    <li>
                      Rasvjeta omogu??uje pravovremeno uo??avanje opasnih i
                      novonastalih situacija na cesti
                    </li>
                    <li>
                      Polo??aj svjetiljaka pokazuje putanju ceste, odnosno
                      djeluje kao "vodi??"
                    </li>
                    <li>
                      Rasvjeta omogu??uje orijentaciju tj. izbor pravog puta
                    </li>
                    <li>
                      U gradovima rasvjeta nagla??ava rezidencijalnu vrijednost i
                      stvara urbanu atmosferu
                    </li>
                    <li>
                      Rasvjeta predstavlja va??an element kvaliteta ljudskog
                      ??ivota
                    </li>
                  </ul>
                  <div id={styles.vrf}>
                    <div className={styles.vrfcol}>
                      <h3>Zidna Rasvjeta</h3>
                      <img
                        src={require('../../assets/img/usluge/mobileresize/wandleuchten31.jpg')}
                        alt=""
                        className={styles.hideDesktop}
                      />
                      <img
                        className={styles.hideMobile}
                        src={require('../../assets/img/usluge/wandleuchten3.jpg')}
                        alt=""
                      />
                      <p>
                        Zidne lampe predstavljaju oboga??enje za svaku sobu ili
                        vanjski prosto. Zidne lampe se ve??inom ne smatraju kao
                        dio standardne elektri??ne instalacije, ali se bez
                        problema mogu ugraditi u svaku novogradnju, tako da
                        svijetlo ne dolazi samo gornje strane. Najkorisnije su u
                        stubi??tima, dugim hodnicima, ??ekaonicama, fasadama itd.
                      </p>
                    </div>
                    <div className={styles.vrfcol}>
                      <h3>Plafonska Rasvjeta</h3>
                      <img
                        src={require('../../assets/img/usluge/outdoorimg1.jpg')}
                        alt=""
                      />
                      <p>
                        Pojam plafonske lampe obuhvata lampe, koje se mogu
                        instalirati na plafonu, kao npr. ispod nadstre??nice. U
                        ve??ini slu??ajeva se montiraju mogu montirati i na zid.
                      </p>
                    </div>
                    <div className={styles.vrfcol}>
                      <h3>Vrtna Rasvjeta</h3>
                      <img
                        src={require('../../assets/img/usluge/mobileresize/outdoorimg5res1.jpg')}
                        alt=""
                        className={styles.hideDesktop}
                      />
                      <img
                        className={styles.hideMobile}
                        src={require('../../assets/img/usluge/mobileresize/outdoorimg5res.jpg')}
                        alt=""
                      />
                      <p>
                        Vrtne lampe se mogu plasirati u vrt ili uz ulaz. One se
                        mogu montirati direktno u pod ili pomo??u baze.
                      </p>
                    </div>
                    <div className={styles.vrfcol}>
                      <h3>Spot Rasvjeta</h3>
                      <img
                        src={require('../../assets/img/usluge/outdoorimg2.jpg')}
                        alt=""
                      />
                      <p>
                        Spot rasvjeta je jedan od najpopularnijih na??ina za
                        transformaciju interijera kroz rasvjetu. Dizajn
                        reflektora je tijelo skriveno u povr??ini i prednji dio
                        koji se sastoji od ??arulje, difuzora, reflektora i
                        drugih dekorativnih detalja. Njihove glavne prednosti su
                        kompaktnost, strogost i raznovrsnost upotrebe.
                        Raznovrsnost to??kastih svjetala je u tome ??to se koriste
                        za op??u rasvjetu i za lokalno osvjetljenje. Oni su
                        najprikladniji za svjetlo dizajn stropova, ni??e, lukovi,
                        grede, kao i dekorativni elementi. Postoje modeli
                        svjetiljki s okretnom konstrukcijom. Okre??u??i se oko
                        svojeg pokretnog dijela, mo??ete usmjeriti svjetlo ka
                        ??eljenom smjeru.
                      </p>
                    </div>
                    <div className={styles.vrfcol}>
                      <h3>Ugradbeni Spotovi</h3>
                      <img
                        src={require('../../assets/img/usluge/outdoorimg3.jpg')}
                        alt=""
                      />
                      <p>
                        Ugradbeni spotovi se montiraju na ulazu, terasi ili
                        vrtu, direktno u pod.
                      </p>
                    </div>
                    <div className={styles.vrfcol}>
                      <h3>Vrtne Podne lampe</h3>
                      <img
                        src={require('../../assets/img/usluge/outdoorimg6.jpg')}
                        alt=""
                      />
                      <p>
                        Spotovi sa prizemnim ??iljcima se koriste da osvjetle
                        ku??nu fasadu ili dio ba??te koji ho??ete da istaknete.
                      </p>
                    </div>
                    <div className={styles.vrfcol}>
                      <h3>Svijetle??e Cijevi</h3>
                      <img
                        src={require('../../assets/img/usluge/Lichtschlauch_Beet.jpg')}
                        alt=""
                      />
                      <p>
                        Da li ste u potrazi za jedinstvenim estetskim konceptima
                        za va?? vrt ? Sa malo ma??te i svijetle??im ??laufom mo??ete
                        ostvariti va??e ideje.
                      </p>

                      <div id={styles.spoji1}>
                        <p>Mo??ete ista??i staze i stepenice.</p>
                        <img
                          className={styles.ok}
                          src={require('../../assets/img/usluge/stazestep1.jpg')}
                          alt=""
                        />
                        <div id={styles.spojiinner}>
                          <img
                            src={require('../../assets/img/usluge/Lichtschlauch_Terrasse.jpg')}
                            alt=""
                          />
                          <div id={styles.spojiinnertxt}>
                            <img
                              src={require('../../assets/img/usluge/slauf.jpeg')}
                              alt=""
                            />
                            <div id={styles.pwrap}>
                              <p>
                                Vanjska rasvjeta terasa, ograda i vikendica uz
                                pomo?? svijetle??ih cijevi dobija dodatnu
                                atmosferu. Mogu se koristiti i razli??ite boje.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id={styles.pwrap1}>
                        <p>
                          Vanjska rasvjeta terasa, ograda i vikendica uz pomo??
                          svijetle??ih cijevi dobija dodatnu atmosferu. Mogu se
                          koristiti i razli??ite boje.
                        </p>
                      </div>
                      <div id={styles.spoji2}>
                        <div id={styles.spoji20}>
                          <p>Mo??ete naglasiti i ivice bazena.</p>

                          <img
                            src={require('../../assets/img/usluge/Lichtschlauch_Pool.jpg')}
                            alt=""
                          />
                        </div>
                        <div id={styles.spoji21}>
                          <p>
                            Kori??tenje u vodi je tako??er opcija, ovdje smo mali
                            vodopad drasti??no osvijetlili.
                          </p>
                          <img
                            src={require('../../assets/img/usluge/waterfall1.jpg')}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section id={styles.hue}>
                <h2>Philips Hue</h2>
                <div id={styles.huel}></div>
                <p>Personalizirani sistem be??i??ne rasvjete</p>
                <div id={styles.hueimgs}>
                  <div id={styles.hueimgsl}>
                    <img
                      src={require('../../assets/img/usluge/mobileresize/0012res1.jpg')}
                      alt=""
                      className={styles.hideDesktop}
                    />
                    <img
                      className={styles.hideMobile}
                      src={require('../../assets/img/usluge/0012.jpg')}
                      alt=""
                    />
                  </div>
                  <div id={styles.hueimgsr}>
                    <img
                      src={require('../../assets/img/usluge/0002s.jpg')}
                      alt=""
                    />
                  </div>
                </div>
                <div id={styles.huebody}>
                  <p>
                    Vi??e od osvjetljenja, Philips Hue o??ivljava va??u ma??tu.
                    Budite se svako jutro uz sun??evu svjetlost. Podesite
                    rasvjetu da djeluje kao da ste kod ku??e, ??ak i kada niste.
                    Otkrijte ??to sve Philips Hue mo??e.
                  </p>
                  <div id={styles.huebodyg}>
                    <div className={styles.huecol}>
                      <div className={styles.huecolimg}></div>
                      <div className={styles.huecoltxt}>
                        <h3>Igrajte se sa 16 miliona boja</h3>
                        <p>
                          Raspon od 16 miliona boja pru??a vam neograni??ene
                          mogu??nosti sa va??im osvjetljenjem. Unesite ??ivot u
                          pri??e za laku no??, uskladite sportski doga??aj sa
                          bojama ekipe koju podr??avate, ili oslikajte zid u
                          va??em domu dekorativnim svjetlom. ??to vi mo??ete
                          zamisliti, Philips Hue mo??e ostvariti.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huecol}>
                      <div className={styles.huecolimg}></div>
                      <div className={styles.huecoltxt}>
                        <h3>Probudite se svaki dan uz sun??evu svjetlost</h3>
                        <p>
                          Dugo nakon ??to ste ugasili svjetla, ona doprinose
                          va??em blagostanju. Philips Hue mo??e vam pomo??i buditi
                          se i uspavljivati prirodnije, simuliraju??i uvjete
                          jutarnjeg i ve??ernjeg prirodnog osvjetljenja. Za
                          razliku od glasnih budilica, bu??enje pomo??u svjetla je
                          nje??no i neinvazivno. Prije nego zaspete, toplo bijelo
                          svjetlo opu??ta va??e tijelo, pripremaju??i vas za
                          kvalitetan san.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huecol}>
                      <div className={styles.huecolimg}></div>
                      <div className={styles.huecoltxt}>
                        <h3>Glasovno upravljajte rasvjetom</h3>
                        <p>
                          Od sada mo??ete upravljati rasvjetom glasovnim
                          naredbama. Philips Hue kompatibilan je sa Amazon
                          Alexa, Google Assistant i Apple HomeKit te vam
                          omogu??ava glasovno upravljanje rasvjetom. Mo??ete
                          svjetla uklju??iti, isklju??iti, poja??ati, prigu??iti ili
                          mijenjati boje u skladu sa ??eljama i raspolo??enjem u
                          svakom trenutku. U??ivajte u automatizaciji doma uz
                          rasvjetu kojom upravljate glasom.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huecol}>
                      <div className={styles.huecolimg}></div>
                      <div className={styles.huecoltxt}>
                        <h3>Kod ku??e i izvan nje</h3>
                        <p>
                          Prilikom dolaska ku??i, mo??ete zadati aplikaciji
                          paljenje svjetala pomo??u geolokacijske funkcije, kako
                          bi vas dom do??ekao prikladno osvjetljen. Philips Hue
                          tako??er mo??e stvoriti privid da ste doma i onda kada
                          ustvari niste. Sve ??to trebate jest upotrijebiti
                          funkciju automatskog rasporeda paljenja svjetala
                          unutar Philips Hue aplikacije. Upravljajte
                          osvjetljenjem daljinski ili podesite vi??e
                          automatiziranih rasporeda paljenja, kako biste
                          osvjetlili razne prostorije u razli??ito vrijeme.
                          Tako??er, mo??ete namjestiti postepeno ga??enje svjetala
                          tokomm no??i, pa vi??e ne??ete morati brinuti o tome
                          jeste li zaboravili ugasiti neko od njih.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id={styles.huebody2g}>
                    <h2>
                      Philips Hue <span className={styles.hidem}>|</span>{' '}
                      Pametan na toliko na??ina
                    </h2>
                    <div className={styles.huebodycol2}>
                      <div className={styles.huebimg}></div>
                      <div className={styles.huebtxt}>
                        <h3>
                          Pametne Philips Hue LED ??arulje i druga rasvjetna
                          tijela
                        </h3>
                        <p>
                          Philips Hue zasnovan je na pametnom i energetski
                          efikasnom LED rasvjetnom sustavu, koji pru??a
                          funkcionalno i ugodno svjetlosno iskustvo za sve va??e
                          redovne aktivnosti, posebne trenutke, kao i za
                          do??ivljaj filmova, kompjuterskih igara i glazbe.
                          Philips Hue rasvjetna tijela vrlo su prakti??na. Mo??e
                          se prigu??ivati i poja??avati razina osvjetljenja. Mogu
                          treperiti, pulsirati, ali i mijenjati boje. Mo??ete
                          posti??i gotovo sve ??to po??elite. Dostupna su u raznim
                          oblicima, veli??inama i modelima kako bi se ??to bolje
                          uklopila u va?? dom.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huebodycol2}>
                      <div className={styles.huebimg}></div>
                      <div className={styles.huebtxt}>
                        <h3>Bridge ??? pametan be??i??ni hub</h3>
                        <p>
                          Bridge je srce Philips Hue sistema, koje be??i??no
                          povezuje pametni ure??aj sa Philips Hue rasvjetnim
                          tijelima. Mo??ete povezati do 50 Philips Hue rasvjetnih
                          tijela i dodataka na jedan Bridge. Nakon ??to ga
                          pove??ete sa Wi-Fi routerom, Bridge povezuje va?? sustav
                          sa ostatkom svijeta putem Interneta, kako biste mogli
                          njime upravljati i kada ste izvan doma, kao i
                          koristiti mnoge druge pametne funkcije. Bridge je
                          uklju??en u svaki Philips Hue starter paket, ali,
                          mo??ete ga kupiti i odvojeno i izgraditi
                          personalizirani Philips Hue sistem.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huebodycol2}>
                      <div className={styles.huebimg}></div>
                      <div className={styles.huebtxt}>
                        <h3>Pametno upravljanje</h3>
                        <p>
                          Va?? Philips Hue sistem mo??ete kontrolirati sa bilo
                          kojeg pametnog ure??aja, gdje god se nalazili. Kako
                          biste najlak??e podesili razinu osvjetljenja,
                          svjetlosne podsjetnike i alarme, mijenjali boje (i jo??
                          mnogo toga), odaberite Philips Hue aplikaciju. Za jo??
                          jednostavniju kontrolu, koristite Hue be??i??ni prekida??
                          za prigu??ivanje ili Hue Tap sklopku. Spremite va??e
                          omiljene scene i svjetlosne scene, kako biste ih
                          uvijek imali pri ruci. Hue senzor pokreta, koji radi
                          na baterije, upravljati ??e va??im rasvjetnim tijelima
                          automatski. Podesite ih na na??in na koji su vam
                          potrebna i prema svrsi za koju su vam potrebna. Kako
                          biste upravljali vlastitim rasvjetnim sistemom, ne
                          morate ??ak ni biti kod ku??e, ??to je dobro za va??
                          du??evni mir.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huebodycol2}>
                      <div className={styles.huebimg}></div>
                      <div className={styles.huebtxt}>
                        <h3>Pametni be??i??ni rasvjetni sistem</h3>
                        <p>
                          Philips Hue be??i??ni rasvjetni sistem bazira se na
                          ZigBee LightLink, sigurnoj i pouzdanoj tehnologiji
                          upravljanja va??im osvjetljenjem, a male potro??nje.
                          Software i firmware nadogradnje obavljaju se be??i??no,
                          izravno na rasvjetna tijela. Philips Hue sistem
                          jednostavno je mogu??e integrirati sa ostalim sistemima
                          na bazi ZigBee protokola za dodatnu automatizaciju
                          va??eg doma.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id={styles.huebody3g}>
                    <img
                      src={require('../../assets/img/usluge/resizehue2.jpg')}
                      alt=""
                    />
                  </div>
                </div>
              </section>
              <section id={styles.led}>
                <h2>Led Rasvjeta</h2>
                <div id={styles.ledl}></div>
                <div id={styles.ledimgs}>
                  <div id={styles.ledimgsl}>
                    <img
                      src={require('../../assets/img/usluge/mobileresize/LED-Staircase-Lighting1.jpg')}
                      alt=""
                      className={styles.hideDesktop}
                    />
                    <img
                      className={styles.hideMobile}
                      src={require('../../assets/img/usluge/LED-Staircase-Lighting.jpg')}
                      alt=""
                    />
                  </div>
                  <div id={styles.ledimgsr}>
                    <img
                      src={require('../../assets/img/radovi/stepenice.jpg')}
                      alt=""
                    />
                  </div>
                </div>
                <div id={styles.ledbody}>
                  <h3>
                    Za Vas izvodimo monta??u i instalaciju za LED rasvjetu radi
                    u??tede energije i trajnosti svjetiljki.
                  </h3>
                  <p>
                    Mi ??emo se pobrinuti za va??u instalaciju rasvjete, bilo
                    atmosfersku ili toplu, sve??anu ili opu??taju??u. Moderna LED
                    rasvjeta vam pru??a ugodni ??ivotni ambijent.
                  </p>
                  <p>
                    Razli??ite opcije i mogu??nost da mijenjamo boje i intenzitet
                    preko aplikacije ili ??altera, nam dozvoljavaju da
                    prostorije, namje??taj i umjetni??ke objekte prika??emo u novom
                    svijetlu.
                  </p>
                  <p>
                    Najva??nija karakteristika led rasvjete je ekonomi??nost. Na
                    prvom mjestu je manja potro??nja, manje zagrijavanje led
                    dioda pri stvaranju svjetlosti. Kao drugo je odli??na razina
                    osvjetljenosti. Radna temperatura LED ??arulja je 50??C ??to je
                    znatno ni??e od dosada kori??tenih vrsta rasvjete. Sve to
                    omogu??ava njenu dugotrajnost koja je izrazita i traje 10
                    puta du??e.
                  </p>
                  <p>
                    Prednosti su mnogobrojne. Prije svega visoka efikasnost u
                    pretvaranju elektri??ne energije u svjetlosnu (??to povla??i
                    manje zagrijavanje svjetlosnog izvora, jer se ina??e "vi??ak"
                    pretvara u toplotu), male dimenzije, lako pode??avanje ja??ine
                    osvjetljenja (a uz odgovaraju??i sklop-RGB kontrloler- i
                    izbor boje, do punog zasi??enja), bitno du??i radni vijek u
                    kome nema naglog pregorijevanja izvora svjetla a jo?? manje
                    neprijatnog treperenja pri kraju radnog vijeka kao kod
                    fluroscentnih cijevi, odsustvo infracrvenog i
                    ultraljubi??astog opsega, otpornost na udarce i vibracije,
                    trenutno postizanje pune snage kao i otpornost na ??esto
                    uklju??ivanje i isklju??ivanje.
                  </p>
                  <p>
                    LED lampe rade bolji posao opona??aju??i prirodno svjetlo nego
                    druge sijalice, ??to je i lak??e za va??e o??i. LED sijalice su
                    fleksibilnije, led trake se mogu plasirati u udubljene
                    police, iza TV-a, uz pod. LED trake doprinose sigurnosti i
                    estetskom izgledu, skuplje trake mogu i mijenjati boju na
                    odgovaraju??e komande.
                  </p>
                  <h3>Vrste LED rasvjete</h3>
                  <p>
                    Najosnovnija podjela je na unutarnju i vanjsku. Postoje i
                    brojne pod vrste rasvjete. Primjeri unutarnje su: stolne,
                    podne i zidne te razli??ite vrste stropne rasvjete. Vanjsku
                    rasvjetu predstavljaju led reflektori, zidna rasvjeta, lampe
                    sa senzorom, podna za terase i rasvjeta poslovnih objekata.
                    Svaka prostorija odgovara aktivnostima koje se provode u
                    njoj. Na osnovu toga birajte i rasvjetna tijela. Neke
                    prostorije uklju??uju vi??e od jedne aktivnosti, stoga i izbor
                    rasvjetnih tijela prilagodite tome.
                  </p>
                  <h3>Prednosti LED rasvjete</h3>
                  <ul>
                    <li>
                      Ekonomi??nost ??? LED rasvjeta tro??i 10 puta manje struje od
                      istih ??arulja sa ??arnom niti i 40% je ekonomi??nija od
                      luminiscentnih izvora svjetlosti
                    </li>
                    <li>
                      Trajanje rada ??? LED lampe mogu funkcionirati 11 godina
                      neprekidnog rada, ??to prema??uje obi??ne lampe za 100 puta
                    </li>
                    <li>
                      Trajnost i sigurnost ??? zbog odsutnosti u??arenih niti i
                      staklenih ku??i??ta, LED ??arulje su otporne na udarce i
                      vibracije: na radne parametre lampe ne??e utjecati ni pad s
                      visine od 1,5 metara. Nedostatak topline ??ini ih
                      vatrootpornim
                    </li>
                    <li>
                      Tihi rad, odsustvo UV zra??enja ??? LED rasvjeta emitira ??ak
                      i svjetlo bez treperenja, za razliku od fluorescentnih
                      svjetiljki, ??ije je osvjetljenje popra??eno klikovima,
                      cviljem, jednokratnim isklju??ivanjem i generiranjem
                      ultraljubi??astog zra??enja
                    </li>
                    <li>
                      ??iroki raspon temperatura ??? LED-rasvjeta mo??e raditi u
                      te??kim uvjetima na temperaturama od -60 do 50 ?? C
                    </li>
                    <li>
                      Orijentacija rasvjete ??? ogroman raspon izmjena LED-a s
                      raspr??enjem svjetlosti pod uglom od 10 do 140 stepeni
                    </li>
                    <li>Ne sadr??e ??ivu</li>
                    <li>
                      Mije??anje 3 osnovne boje (crvena, zelena i plava) u
                      jednakom omjeru
                    </li>
                  </ul>
                  <div id={styles.led1}>
                    <div id={styles.led1imgs}>
                      <img
                        src={require('../../assets/img/radovi/led1.jpg')}
                        alt=""
                      />
                      <img
                        src={require('../../assets/img/radovi/ledlinearstaircase.png')}
                        alt=""
                      />
                    </div>
                    <p>
                      Takav niz prednosti dopu??ta kori??tenje LED svjetiljki u
                      osvjetljenju dnevnih i tehni??kih prostorija: kupaonica,
                      spremi??ta, svla??ionica, hodnika, stubi??ta, kao i u javnim
                      zgradama: bolnicama, uredima, knji??nicama i drugim
                      organizacijama.
                    </p>
                    <p>
                      Glavna osobina nadzemnih instalacija je da se njihova
                      instalacija mo??e planirati ne samo u fazi popravaka, ve?? i
                      nakon zavr??etka tog procesa. Odli??no rje??enje za ovu vrstu
                      rasvjete bit ??e za one koji razmi??ljaju o kori??tenju
                      svjetla za namje??taj ili naglasno osvjetljenje pojedinih
                      dijelova prostorije.
                    </p>
                    <p>
                      Prema na??inu pri??vr????ivanja na povr??inu postoje zidne i
                      stropne lampe. Ovisno o namjeni prostora u kojem ??e se
                      nalaziti rasvjetni ure??aji:
                    </p>
                    <ul>
                      <li>
                        Za dnevnu sobu ??? u pravilu, to su kvadratne ili okrugle
                        LED lampe s elegantnim nijansama koje sinhroniziraju u
                        stilu s dodatnim rasvjetnim ure??ajima
                      </li>
                      <li>
                        Za hodnik ??? uzimaju??i u obzir konfiguraciju prostorije,
                        mo??ete koristiti jednu ili vi??e okruglih ili pravokutnih
                        tijela ili niz zidnih to??aka
                      </li>
                      <li>
                        Za ured ??? glavna svjetla za ovu sobu odabrana su u
                        zreloj verziji, zajedno s stolnom svjetiljkom
                      </li>
                      <li>
                        Za kuhinje, kupatila i kupaonice ??? koriste se ure??aji
                        razli??itih oblika sa zatvorenim nijansama,
                        najprikladniji u dizajnu
                      </li>
                      <li>
                        Za pomo??ne prostorije ??? ovdje mo??ete koristiti modele
                        kvadratnog, pravougaonog ili okruglog oblika, s
                        pri??vr????ivanjem na strop i na zid.
                      </li>
                    </ul>
                  </div>
                  <div id={styles.led2}>
                    <img
                      src={require('../../assets/img/usluge/mobileresize/probaj21.jpg')}
                      alt=""
                      className={styles.hideDesktop}
                    />
                    <img
                      className={styles.hideMobile}
                      src={require('../../assets/img/probaj2.jpg')}
                      alt=""
                    />
                    <p>
                      Modeli nadzemnih LED lampi za ku??u imaju mehani??ku
                      ??vrsto??u i otpornost na vibracije, a neke od njih su
                      dizajnirane u anti-vandalskoj izvedbi, ??to im omogu??uje
                      instalaciju u prostorijama s te??kim uvjetima, uklju??uju??i
                      ulaze ili na druga mjesta koja su dovoljno prohodna.
                    </p>
                    <img
                      className={styles.hideDesktop}
                      src={require('../../assets/img/usluge/mobileresize/led71.jpg')}
                      alt=""
                    />
                    <img
                      className={styles.hideMobile}
                      src={require('../../assets/img/radovi/led7.jpg')}
                      alt=""
                    />
                    <p>
                      LED lampe mogu se koristiti ne samo kao izvori glavnog
                      svjetla, ve?? i za osvjetljenje pojedinih zona i elemenata.
                      Zbog raznovrsnih nijansi sjaja, takvi se ure??aji koriste
                      za unutarnje ure??enje u svim bojama.
                    </p>
                    <p>
                      Spot rasvjeta je jedan od najpopularnijih na??ina za
                      transformaciju interijera kroz rasvjetu. Dizajn reflektora
                      je tijelo skriveno u povr??ini i prednji dio koji se
                      sastoji od ??arulje, difuzora, reflektora i drugih
                      dekorativnih detalja. Njihove glavne prednosti su
                      kompaktnost, strogost i raznovrsnost upotrebe.
                    </p>
                    <p>
                      Raznovrsnost to??kastih lampi je u tome ??to se koriste za
                      op??u rasvjetu i za lokalno osvjetljenje. Oni su
                      najprikladniji za svjetlo dizajn stropova, ni??e, lukovi,
                      grede, kao i dekorativni elementi. Postoje modeli
                      svjetiljki s okretnom konstrukcijom. Okre??u??i se oko
                      svojeg pokretnog dijela, mo??ete usmjeriti svjetlo na
                      odre??eni element interijera.
                    </p>
                    <img
                      src={require('../../assets/img/usluge/mobileresize/led81.jpg')}
                      alt=""
                      className={styles.hideDesktop}
                    />
                    <img
                      className={styles.hideMobile}
                      src={require('../../assets/img/radovi/led8.jpg')}
                      alt=""
                    />
                    <p>
                      S obzirom na malu veli??inu, nedostatak grijanja i nisku
                      potro??nju energije, LED lampe ugra??ene su u ormari??, s
                      unutarnjim i vanjskim prostorom. Takvo osvjetljenje mo??e
                      biti opskrbljeno dodatnim mogu??nostima: uklju??ivanje
                      prilikom otvaranja ladice ili vrata ormara, nagla??avaju??i
                      sadr??aj svla??ionica, stvaraju??i smjer svjetlosnog toka.
                    </p>
                    <p>
                      Asortiman proizvedenih modela ugradbenih svjetiljki za
                      namje??taj vrlo je raznolik. To su lampe okruglog,
                      trokutastog i ??etvrtastog oblika, ??iji su dizajni u
                      potpunosti sastavljeni u namje??taj, a na povr??ini ostaje
                      samo ukrasni okvir. Oba odvojena ure??aja, kao i setovi
                      koji se sastoje od dva-tri i vi??e ??arulja su realizirani.
                    </p>
                    <img
                      className={styles.hideDesktop}
                      src={require('../../assets/img/usluge/mobileresize/led11s.jpg')}
                      alt=""
                    />
                    <img
                      className={styles.hideMobile}
                      src={require('../../assets/img/usluge/led1.jpg')}
                      alt=""
                    />
                    <h3>Linearne LED lampe</h3>
                    <p>
                      Linearne lampe ugra??ene su u stropove i zidove od
                      suhozidnih plo??a, letvi i drugih premaza. Pomo??u spojnih
                      elemenata mogu se montirati u jednoj liniji, te s
                      prijelazom svjetlosne konture sa stropa na zid pod uglom
                      od 90 i 270 stepeni. Dizajn takvog ure??aja za osvjetljenje
                      je aluminijsko ku??i??te, LED plo??a i plasti??ni difuzor.
                    </p>
                    <img
                      src={require('../../assets/img/usluge/mobileresize/Web-Loxone_Showhome_Wohnbereich_blau_violett11.jpg')}
                      alt=""
                      className={styles.hideDesktop}
                    />
                    <img
                      className={styles.hideMobile}
                      src={require('../../assets/img/usluge/Web-Loxone_Showhome_Wohnbereich_blau_violett.jpg')}
                      alt=""
                    />
                    <p>
                      Glavna razlika izme??u takvih izvora svjetlosti i
                      luminiscentnih analoga je u tome ??to je za osvjetljavanje
                      podru??ja s LED lampama potrebno 3 puta manje struje. I
                      njihov radni vijek prema??uje njihove modele za u??tedu
                      energije 8-10 puta. Osim toga, uz kontinuirani raspored
                      linearnih lampi nema u??inka tamnih mrlja, ??to vam
                      omogu??uje da stvorite nezamislive linije jednolikog sjaja.
                    </p>
                  </div>
                </div>
              </section>
              <section id={styles.bemi}>
                <h2>BEMI Rasvjetni Dizajn</h2>
                <div id={styles.bemil}></div>
                <div id={styles.bemiimgs}>
                  <div id={styles.bemiimgsl}>
                    <img
                      src={require('../../assets/img/usluge/proj2.jpg')}
                      alt=""
                    />
                  </div>
                  <div id={styles.bemiimgsr}>
                    <img
                      src={require('../../assets/img/usluge/lightingdesign.jpg')}
                      alt=""
                    />
                  </div>
                </div>
                <div id={styles.bemibody}>
                  <h3>
                    BEMI Automatizacija se specijalizira u rasvjetnom dizajnu
                    interijera i exterijera, za ku??e, komercijalne zgrade,
                    industrijske komplekse i vanjske prostore svih tipova i
                    dimenzija
                  </h3>
                  <p>
                    BEMI Automatizacija donosi sofisticirani i prilagodivi
                    sistem rasvjetnog dizajna za veliku ??irinu komercijalnih,
                    industrijskih i rezidencijalnih objekata.
                  </p>
                  <p>
                    Mi kombiniramo godine iskustva sa vrhunskom KNX tehnologijom
                    da dizajniramo i integriramo rasvjetna rje??enja za razne
                    potrebe.
                  </p>
                  <p>
                    Na?? tim ??e vam pomo??i dizajnirati i integrirati inteligentna
                    rasvjetna rje??enja, da pobolj??ate funkcionalnost, sigurnost,
                    esteti??nost i na kraju i udobnost korisnika - sa fokusom da
                    pobolj??amo operativnu efikasnost objekta.
                  </p>
                  <div id={styles.bemibg}>
                    <div className={styles.bemicol}>
                      <i className={`fas fa-user-check fa-5x`}></i>
                      <h4>Ergonomi??ki Dizajnirano</h4>
                      <p>
                        Od rasvjete do komercijalnih objekata, privatnih
                        rezidencija i vanjske rasvjete za javna mjesta, na??im
                        rasvjetnim dizajn servisom smo fokusirani na
                        ostvarivanju optimalne rasvjete za maksimalnu
                        prakti??nost, efikasnost i komfor.
                      </p>
                    </div>
                    <div className={styles.bemicol}>
                      <i className={`fas fa-star fa-5x`}></i>
                      <h4>Estetski Lijepo</h4>
                      <p>
                        Mi spajamo stru??nost, studije o prirodnoj svjetlosti i
                        KNX tehnologiju da kreiramo estetske displeje i
                        upravlja??ke rasvjetne sisteme da izdvojimo, naglasimo i
                        unparijedimo rasvjetu bilo unutra??nju ili vanjsku.
                      </p>
                    </div>
                    <div className={styles.bemicol}>
                      <i className={`fas fa-seedling fa-5x`}></i>
                      <h4>Energetski Efikasno</h4>
                      <p>
                        Na??i fleksibilni i potpuno podesivi KNX rasvjetni
                        sistemi se mogu koristiti da efikasno upravljaju
                        energetskom potro??njom i da unaprijede ukupnu operativnu
                        efikasnost objekta, doprinose??i daljinski i direktni
                        pristup kontroli svih opcija i funkcionalnosti objekta.
                      </p>
                    </div>
                  </div>
                  <div id={styles.bemitxt}>
                    <div id={styles.bemitxtimg}>
                      <img
                        src={require('../../assets/img/usluge/bemis.jpg')}
                        alt=""
                      />
                    </div>
                    <div id={styles.bemitxtg}>
                      <h2>
                        Fleksibilni Rasvjetni Dizajn sa Potpunom Kontrolom
                      </h2>
                      <p>
                        Sistemi rasvjetnog dizajna integrisani sa KNX
                        automatizacionom tehnologijom doprinose totalnoj
                        kontroli za korisnike, koji onda mogu po ??elji
                        prilagoditi sve postavke, bilo za estetiku,
                        funkcionalnost, sigurnost, o??uvanje el. energije.
                      </p>
                      <p>
                        Rasvjetni dizajn i kontrolne funkcije su klju??ni faktor
                        u optimizaciji objektno operativne efikasnosti,
                        smjanjenju energetskih tro??kova i o??uvanju okoline.
                      </p>
                      <p>
                        Opcije i mogu??nosti KNX rasvjete mogu dovesti do
                        ogromnog smjanjenja energetske potro??nje.
                      </p>
                      <ul>
                        <li>
                          Prilagodite i kontroli??ite KNX rasvjetu, te sa lako??om
                          modifikujte ambijent, temperaturu boje, akcentirajte
                          rasvjetu svake sobe, ureda i prostorije
                        </li>
                        <li>
                          Promjenite atmosferu sobe, kreirajte optimalna radna i
                          ??ivotna okru??enja
                        </li>
                        <li>
                          Osigurajte sigurnost sa automatiziranjem rasvjete
                          specifi??nih prostora oko bilo kojeg objekta ili
                          rezidencije
                        </li>
                        <li>
                          Upravljajte energetskom potro??njom sa automatiziranim
                          funkcijama koje mogu biti upravljane na daljinu preko
                          pametnog telefona, tableta itd.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              <section id={styles.hcl}>
                <h2>HCL Sistem Rasvjete</h2>
                <div id={styles.hcll}></div>
                <div id={styles.hclimgs}>
                  <div id={styles.hclimgsl}>
                    <img
                      src={require('../../assets/img/usluge/mobileresize/00521.jpg')}
                      alt=""
                      className={styles.hideDesktop}
                    />
                    <img
                      className={styles.hideMobile}
                      src={require('../../assets/img/usluge/0052.jpg')}
                      alt=""
                    />
                  </div>
                  <div id={styles.hclimgsr}>
                    <img
                      src={require('../../assets/img/usluge/hcl-human-centric-lighting-289450_1mg.jpg')}
                      alt=""
                    />
                  </div>
                </div>
                <div id={styles.hclbody}>
                  <p>
                    HCL(human-centric lighting) sistemi sa specijalnim LED
                    lampama se mogu podesiti do istog nivoa svijetlosti koje i
                    sunce pru??a, oja??avaju??i prirodne cikluse uku??ana.
                  </p>
                  <p>
                    HCL, isto poznato kao cirkadijska rasvjeta (rasvjeta za
                    zdravlje i dobrobit) se mo??e koristiti u mnogo razli??itih
                    okolnosti, daje ljudima ve??u svjest, produktivnost i
                    dobrobit.
                  </p>
                  <p>
                    HCL se tako??er mo??e koristiti za opu??tanje, od ku??e do
                    ureda, HCL sistemi se mogu potpuno upravljati i pode??avati
                    preko laptopa, tableta ili mobitela.
                  </p>
                  <img
                    className={styles.addmg}
                    src={require('../../assets/img/usluge/hclcompare.jpg')}
                    alt=""
                  />
                  <p>
                    Rasvjeta ima direktan utjecaj na na??e raspolo??enje i
                    zdravlje. Danas je nau??no dokazano da promjenljivi
                    intenziteti svijetla i boje:
                  </p>
                  <ul>
                    <li>Ja??aju bioritam</li>
                    <li>Ja??aju koncentraciju</li>
                    <li>Promovi??e psihi??ku i fizi??ku dobrobit</li>
                    <li>Ubla??ava poreme??aje spavanja</li>
                    <li>Pove??ava ??ivotni kvalitet i energiju</li>
                  </ul>
                  <p>
                    Vijekovima, arhitekti, dizajneri i graditelji su radili na
                    pobolj??anju radnog okru??enja, bilo to kroz sigurnost,
                    tehnologiju, ili funkcionalni dizajn. I zadnjih par decenija
                    smo mogli vidjeti eksploziju u inovaciji tehnologije, od
                    ra??unara do pametnog telefona, interneta i rasvjete. Sve ovo
                    je pomoglo radnicima da budu efikasniji.
                  </p>
                  <p>
                    Ali ??ta ako bi mogli dodati novu inovaciju u na??e radno
                    okru??enje ? Kao dodatak unaprije??enja alata s kojima radimo
                    u radnom okru??enju mo??emo i da unaprijedimo produktivnost
                    radnika i u isto vrijeme pobolj??ati njihovu efikasnost.
                  </p>
                  <p>
                    Kada pri??amo o rasvjeti, mo??emo unaprijediti radno okru??enje
                    tako ??to ??emo razmi??ljati o dizajnu objekta na potpuno nov
                    na??in. Odre??ene emocije su asocirane sa objektima, i ve??ina
                    tih emocija dolazi od efekata rasvjete na ljude. Tamna, lo??e
                    osvjetljena prostorija je sterilna i hladna. Zujanje i
                    treperenje starih flourescentnih lampi je lo??e za
                    koncentraciju i rad. Najbolje prostorije su one gdje
                    rasvjeta sura??uje sa okru??enjem i stvara pozitivne emocije.
                  </p>
                  <p>
                    Porast LED rasvjete je doprinio ve??oj konzistenciji i
                    kvaliteti rasvjete. LED nudi velike energetske u??tede,
                    fleksibilnost, pouzdanost, i danas su dio gotovo svake
                    instalacije.
                  </p>
                  <p>
                    Za vi??e od 50 godina, prigu??ne lampe su dostupne za
                    komercijalne prostorije, me??utim prethodno je smatrano
                    preskupo za ve??inu rasvjetnih aplikacija. Postoje LED lampe
                    koje mogu biti upravljane sa prethodnom generacijom
                    kontrola, ali budu??nost le??i u ugra??ivanju kontrolnih
                    sposobnosti u LED drajvere i kori??tenje digitalnih protokola
                    koji komuniciraju direktno sa dravjerima.
                  </p>
                  <p>
                    Nova vizija o maksimiziranju vrijednosti LED rasvjete ne
                    le??i samo u pode??avanju intenziteta svjetla, nego i
                    kvaliteti boje, koja sadr??i temperaturu boje (CCT-
                    correlated color temperature) i prikazivanje boja.
                    Kontroliranjem intenziteta i boje svjetla, rasvjetni dizajn
                    mo??e da doprinese dodatnoj satisfakciji i produktivnosti
                    ljudi.
                  </p>
                  <p>HCL je slijede??i korak u LED dizanu i kontroli</p>
                  <p>
                    LED bazirana HCL rasvjeta je upravlja??ka i podesiva preko
                    grupe uzajamnih boja i temperatura (CCT), da probudi
                    odre??ene biolo??ke procese i pona??anje ljudi u dobro
                    dizajniram okru??enjima.
                  </p>
                  <img
                    className={styles.addmg}
                    src={require('../../assets/img/usluge/heu.png')}
                    alt=""
                  />
                  <h3 className={styles.rmp}>HCL rasvjeta pri radu</h3>
                  <div className={styles.sigurnostl}></div>
                  <p>
                    Kori??tenje podesivih LED lampi na ovaj na??in naziva se HCL
                    rasvjetom, koja pru??a mnogo potencijalnih pogodnosti u
                    uredima i radnim okru??enjima. Istra??ivanja se rade o
                    emocionalnim i biolo??kim ishodima rasvjete koji opona??aju
                    promjene u boji temperature na??ene u prirodnom svjetlu.
                  </p>
                  <p>
                    ??ta se zasad zna je to da HCL ima vizualne beneficije koje
                    pobolj??avaju isukustvo ljudi u prostorijama gdje su
                    svjetiljke instalirane. HCL rasvjeta unaprije??uje svaku
                    prostoriju, mijenja na??in na koji je percipirana i stvara
                    razne na??ine doprino??enja ve??eg komfora i prilagodljive
                    atmosfere unutar objekata.
                  </p>
                  <p>
                    Bolnice koriste HCL da dodaju CCT, tako da je osoblje uvijek
                    oprezno tokom no??nih smjena. Tako??er se koristi toplija
                    verzija CCT-a u prostorijama gdje se nalaze pacijenti,da bi
                    bili komfortabilni dok se odmaraju i oporavljaju. ??kole
                    koriste HCL da studenti budu opu??teni i oprezni. U
                    comercijalnim radnim okru??enjima, efekti odgovaraju??e CCT
                    rasvjete mogu da naprave atmosferu u uredu prirodnijom i
                    komfortabilnijom, i pobolj??avaju produktivnost.
                  </p>
                  <p>
                    Napor da dr??imo radnike zdravim, anga??iranim i pa??ljivim
                    dolazi od stvarnih finansijskih pozadina. Ba?? kao i
                    ergonomske stolice i tastature, stoje??i stolovi su pomogli
                    firmama da imaju sretnije i zdravije radnike. HCL je jo??
                    jedna opcija u pobolj??anju uvjeta radnika.
                  </p>
                  <h3 className={styles.rmp}>
                    Sljede??i koraci u kontroli rasvjete
                  </h3>
                  <div className={styles.sigurnostl}></div>
                  <p>
                    Da se HCL dovede u objekat zna??i da instaliranje podesivih
                    rasvjetnih tijela i pametnih rasvjetnih kontrola mo??e
                    upravljati intenzitetom i CCT-om. Jedna inovativna
                    tehnologija koja se mo??e implementirati u ove kontrolne
                    strukture jeste ure??aj koji mo??e automatski da sinhronizuje
                    rasvjetni ciklus objekta, pomo??u astronomskih doga??aja. To
                    zna??i da objekat mo??e da emitira iste uslove svjetla izvan
                    objekta, ovise??i od precizne ??irine i du??ine lokacije.
                    Naravno da ova opcija se mo??e prebrisati i prilagoditi.
                    Bitna stavka HCL sistema jeste ta da se sistem sam mo??e
                    pode??avati u pozadini, tako da upravitelji objekata ne
                    moraju da prave svakodnevne promjene postavki.
                  </p>
                  <p>
                    HCL sistem nije samostalni sistem, ve?? je samo jedan dio u
                    sistemu kontrole rasvjete koji koristi senzore i foto??elije
                    da bi automatski podesio nivoe svjetlosti i u??tedio
                    elektri??nu energiju.
                  </p>
                  <p>
                    Za one koji razmi??ljaju o dodavanju HCL-a trenutnoj
                    instalaciji moraju da budu informisani o tenutnom ekosistemu
                    prdoukata. Lampe moraju raditi sa rasvjetnim sistemom bez
                    dodavanja dodatne kompleksnosti. Nisu svi proizvo??a??i ovo
                    omogu??ili, i korisnici ne??e biti sretni kada ostanu na
                    naprednoj HCL opremi koja se ne mo??e instalirati. To zna??i
                    da je potreban rasvjetni motor i kontrolni sistem koji je
                    napravljen sa korisnikom u vidu.
                  </p>
                  <p>
                    Instalacija i programiranje mo??e biti kompleksno i skupo sa
                    nekim HCL sistemima. Softver ??e mo??da biti potreban od
                    strane proizvo??a??a za dostizanje CCT rje??enja. Upoznati smo
                    i sa digitalnim rasvjetnim protokolima kao ??to su DALI
                    (digital addressable lighting interface) ili DMX kontrola sa
                    podesivim lampama.
                  </p>
                  <p>
                    Tako da moderna rje??enja za rasvjetu nisu samo lijepa za
                    vidjeti, sa HCL-om imate mogu??nost efektivno iskoristiti sve
                    dobrobiti svijetla.
                  </p>
                  <img
                    id={styles.hclfix}
                    src={require('../../assets/img/usluge/hclshowc.jpg')}
                    alt=""
                  />

                  <div className={`${styles.textbundle} ${styles.firstb}`}>
                    <div className={styles.textbl}>
                      <h3>??ta je HCL (ljudski orijentisana rasvjeta)</h3>
                      <p>
                        Pod pojmom HCL govorimo o modernim rasvjetnim konceptima
                        koji stavljaju ljudski ritam spavanja i bu??enja u fokus.
                        HCL orijentisana rasvjetna rje??enja uzimaju u obzir
                        biolo??ke efekte svijetla na upravljanje hormona, tako
                        ??to simuliraju sun??evu svijetlost. Pri tome rade HCL
                        koncepti sa dinami??kim svjetlom, ??iju osvjetljenost i
                        boju kontroli??e aplikacija.
                      </p>
                    </div>
                    <img
                      src={require('../../assets/img/usluge/hcl-mittel.jpg')}
                      alt=""
                    />
                  </div>
                  <div className={styles.textbundle}>
                    <div className={styles.textbl}>
                      <h3>Kakva HCL rje??enja postoje ?</h3>
                      <p>
                        HCL orijentisana rasvjeta se mo??e instalirati kao
                        individualno podesivi elementi ili kao gotova rje??enja
                        sa centralnom upravlja??kom jedinicom. Sveobuhvataju??a
                        HCL rasvjeta sa upravlja??kom jedinicom zahtjeva u svakom
                        slu??aju planiranje od strane profesionalaca.
                        Kontaktirajte nas, mi realiziramo optimalan rad svih HCL
                        elemenata.
                      </p>
                    </div>
                    <img
                      src={require('../../assets/img/usluge/hclsteuern.jpg')}
                      alt=""
                    />
                  </div>
                  <div className={styles.textbundle}>
                    <div className={styles.textbl}>
                      <h3>Kako funkcioni??e HCL ?</h3>
                      <p>
                        HCL sistemi upravljaju rasvjetom na bazi prirodnog
                        cirkadijalnog ritma ??ovjeka. Svako vrijeme dana ima
                        svoju odgovaraju??u boju, u jutro rasvjeta podsti??e
                        produkciju kortizola i serotonina. Nave??er toplo-bijelo
                        svijetlo sa velikim udjelom crvene boje, daje opu??taju??i
                        efekat.
                      </p>
                      <p>
                        Kakva je idealna raspodjela svjetlosti ? odgovor
                        dobijamo u prirodi, nebo osijava na??e o??i frontalno i
                        odozgo. Prema tome takva bi i trebala biti instalacija
                        rasvjetnih tijela.
                      </p>
                    </div>
                    <img
                      src={require('../../assets/img/usluge/hcldiff.jpg')}
                      alt=""
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div id={styles.dijagnoza} ref={this.dijagnozaS}>
          <div id={styles.dijagnozashowcase}>
            <h2>Dijagnoza i Popravka</h2>
          </div>
          <div id={styles.dijagnozatxt}>
            <p>
              Lo??e priklju??ene ma??ine, stari kablovi, klimavi dijelovi ne samo
              da na du??e staze uni??tavaju va??e ure??aje nego i predstavljaju
              veliki rizik u svakodnevnici.
            </p>
            <p>
              Da vam se ne desi nezgoda, isplati se baciti pogled s vremena na
              vrijeme na va??e ure??aje, mi smo tu da vam pomognemo.
            </p>
            <p>
              ??i????enje i odr??avanje va??ih ure??aja je veoma bitno, ako ih ho??ete
              dugoro??no koristiti. Previ??e velika potro??nja vode i elektri??ne
              energije i sve lo??ija funkcionalnost su prvi predznaci, mogu??e je
              i lo??e ura??ena prethodna instalacija.
            </p>
            <p>
              Rado ??emo analizirati stanje va??ih ure??aja. Na??e elektri??ari rade
              brzo i precizno i rado ??e vas posavjetovati o popravci, odr??avanju
              itd.
            </p>
            <p>
              Ako bude popravka nu??na, mo??ete ugovoriti termin sa na??im
              elektri??arima. Odmah kod analize ??ete dobiti procjenu tro??kova za
              popravku po fer cijenama.
            </p>
            <p>
              Pri tome pazimo da od po??etka sve faktore uzmemo u obzir, obim
              posla, cijenu eventualnih rezervnih dijelova, dolazak (putni
              tro??kovi). Ve??inom se ve?? kod analize ure??aja se uklone prisutni
              kvarovi.
            </p>
            <h2></h2>
            <p>
              ??ivot se u zadnjih 50 godina dosta promjenio. Ra??unari, ku??ni
              ure??aji, interaktivni ravni paneli su stvari bez kojih danas ne
              mo??emo. Za elektri??ni sistem ipak postoji mogu??nost
              preoptere??enja, ??to mo??e imati lo??e posljedice.
            </p>
            <p>Moraju se testirati slijede??e stvari:</p>
            <ul>
              <li>Da li ima dovoljno strujnih krugova ?</li>
              <li>Da li su strujni krugovi dobro raspore??eni i osigurani ?</li>
              <li>
                Da li su kablovi, utika??i, uti??nice i prekida??i u dobrom stanju
                ?
              </li>
              <li>
                Jesu li kupatilo, kuhinja, vanjski sistemi (kapijska vrata,
                sistemi odvodnjavanja, vrtni sistemi itd.) osigurani po propisu
                sa odgovaraju??im elektri??nim ure??ajima
              </li>
              <li>
                Da li su ura??ene promjene na elektro instalaciji i ako jesu, da
                li su bile ispravne ?
              </li>
            </ul>
            <div id={styles.dijimgc}>
              <img
                src={require('../../assets/img/usluge/mobileresize/dijagnozapopravka1.jpg')}
                alt=""
                className={styles.hideDesktop}
              />
              <img
                className={styles.hideMobile}
                src={require('../../assets/img/usluge/dijagnozapopravka.jpg')}
                alt=""
              />
            </div>
            <h3>E - ??ek</h3>
            <p>
              E - ??ek je ispitivanje svih elektri??nih ure??aja u instalaciji,
              dobijamo trenutno stanje i prepoznajemo mogu??e opasnosti prije
              nego ??to nastane ??teta.
            </p>
            <ul>
              <li>
                Dobijate izvjesnost da testirana elektroinstalacija i ispitani
                elektroure??aji zadovoljavaju sve sigurnosne aspekte
              </li>
              <li>
                Svi uku??ani su tako sigurni od rizika preoptere??enja ili kratkog
                spoja i time izazvane vatre
              </li>
              <li>
                U slu??aju ??tete mo??ete osiguranju dokazati ispravnost svih
                naprava i ure??aja
              </li>
              <li>
                Savjetujemo vas kod svih pitanja energetske efikasnosti i
                uka??emo vam sve mogu??nosti u??tede el. energije
              </li>
            </ul>
            <div id={styles.idkm}>
              <img
                src={require('../../assets/img/usluge/mobileresize/e??ek41.jpg')}
                alt=""
                className={styles.hideDesktop}
              />
              <img
                className={styles.hideMobile}
                src={require('../../assets/img/usluge/e??ek4.jpg')}
                alt=""
              />
              <img
                src={require('../../assets/img/usluge/mobileresize/e??ek31.jpg')}
                alt=""
                className={styles.hideDesktop}
              />
              <img
                className={styles.hideMobile}
                src={require('../../assets/img/usluge/e??ek3.jpg')}
                alt=""
              />
            </div>

            <h3>Mi dovodimo va??u instalaciju na najnoviji tehnolo??ki nivo</h3>
            <p>
              Provjerite sami da li va??a instalacija odgovara HEA - standardima
              za elektroinstalacije
            </p>
            <p>
              Sa rastu??im zahtjevima za komforom i ve??im brojem priklju??aka,
              mora se i pove??ati i broj strujnih krugova
            </p>
            <p>
              E-??ek se mo??e izvesti samo od strane firmi sa ??kolovanim kadrom
              koji koriste odgovaraju??e instrumente za mjerenje.
            </p>
            <h3>Enormni potencijal u??tede elektri??ne energije</h3>
            <p>
              Ovo nije jedini ekonomski faktor, savjetovanje koje dolazi uz
              e-??ek za u??tedu el. energije kroz elektri??ne ure??aje i sisteme je
              tako??er dio paketa.
            </p>
            <h3>E-??ek u specijalnim poljima</h3>
            <p>
              Nudimo i E-??ek za razli??ita polja u elektrotehnici, npr. E-??ek IT,
              E-mobilnost i E-??ek PV.
            </p>
            <p>
              Nabavka elektri??nog auta kao i instalacija ure??aja za u??itavanje
              je dobra investicija za budu??nost. Svaka nekretnina je druga??ija i
              ima svoje uslove u pogledu na elektri??nu mobilnost. U okviru
              E-??eka, E-mobilnost provjeravamo na mjestu i prilago??avamo po
              potrebi.
            </p>
            <p>
              Preko E-??ek PV provjeravamo solarne panele na nedostatke i
              o??te??enja, testiramo funkcije i performanse, provjeravamo
              efikasnost za??tite protiv strujnog udara i prenapona. Ako je
              stanje zadovoljavaju??e, sve se na kraju potvrdi sa E-??ek PV
              stikerom i dobijete izvje??taj o ura??enom testiranju.
            </p>
            <h3>
              E-??ek pru??a sigurnost i ??tedi novac, prema tome je dobra
              investicija za budu??nost
            </h3>
            <p></p>
            <div id={styles.e??k}>
              <img src={require('../../assets/img/usluge/e??ek.jpg')} alt="" />
            </div>
          </div>
        </div>
        <div id={styles.sigurnost} ref={this.sigurnostS}>
          <div id={styles.sigurnosth}>
            <h2>
              Sigurnost <span className={styles.lc}>u</span>{' '}
              Elektroinstalacijama
            </h2>
          </div>
          <div id={styles.sigurnostbody}>
            <h3>Kad se radi o sigurnosti mi smo jedni od najboljih!</h3>
            <div className={styles.sigurnostl}></div>
            <div className={styles.textbundlex}>
              <div className={styles.textbl}>
                <h3>Protivpo??arni sistemi</h3>
                <p>
                  U??estalost po??ara, ogromne materijalne ??tete i ljudske ??rtve,
                  name??u potrebu kompleksnijeg sagledavanja ovog problema i
                  preduzimanja efikasnijih mera preventivne za??tite i suzbijanja
                  i onemogu??avanja te??ih posledica.
                </p>
                <p>
                  U dana??nje vreme za??tita od po??ara obuhvata mnoge aspekte, a
                  jedan od njih su stabilne instalacije za automatsku dojavu
                  po??ara. Stabilne instalacije za automatsku dojavu po??ara su
                  elektronski sistemi koji slu??e da ??to ranije detektuju po??ar,
                  detektuju??i neku od njegovih osnovnih manifestacija (dim,
                  porast temperature, svetlost plamena, iskra???). Namena
                  stabilnih instalacija za automatsku dojavu po??ara proizlazi iz
                  osnovnog cilja protivpo??arne za??tite, a to je da se spre??i
                  nastanak po??ara ili da se on ugasi u njegovoj najranijoj fazi
                  kada jo?? nije naneo zna??ajnu ??tetu.
                </p>
                <p>
                  Sistemi za automatsku dojavu se sastoje od periferne opreme za
                  detekciju (automatskih detektora, ru??nih javlja??a, sirena,
                  modula???), kablovske instalacije kojom je periferna oprema
                  povezana sa centralnim ure??ajem i centralnog ure??aja koji
                  obra??uje signale periferne opreme i aktivira ure??aje za
                  signalizaciju i izvr??ne module. Stabilna instalacija za
                  automatsku dojavu po??ara pored standardne detekcije i
                  signalizacije po??ara mo??e slu??iti i za aktivaciju izvr??nih
                  funkcija kao ??to su isklju??enje struje, aktivacija PP klapni,
                  otvaranje ili zatvaranje prozora i vrata, spu??tanje liftova,
                  isklju??enje klima komora, itd.
                </p>
                <p>
                  Pored centralnih ure??aja za detekciju klijentima nudimo ??irok
                  asortiman opreme za detekciju i signalizaciju (automatski
                  javlja??i, ru??ni javlja??i, sirene, moduli, linijski detektori,
                  barijere, itd).
                </p>
                <p>
                  Dole navedene protivpo??arne sisteme smo u mogu??nosti izvesti,
                  odr??avati i servisirati:
                </p>
                <ul>
                  <li>Sistemi za ga??enje po??ara vodom</li>
                  <li>Sistemi za ga??enje po??ara vodenom maglom</li>
                  <li>Sistemi za ga??enje po??ara te??kom i lakom pjenom</li>
                  <li>Sistemi za ga??enje po??ara inertnim plinovima</li>
                  <li>Kuhinjski sistemi za ga??enje po??ara</li>
                  <li>
                    Specijalni sistemi ga??enja (ga??enje pneumatskim cjevovodima,
                    ga??enje sa zatvorenim protokom zraka)
                  </li>
                </ul>
              </div>
              <div className={styles.textbundleximg}>
                <img
                  src={require('../../assets/img/usluge/firedetector.jpg')}
                  alt=""
                />
              </div>
            </div>
            <div className={styles.chp}>
              <div className={styles.textbl}>
                <h3>
                  CHP - Jedinica koja upravlja sa toplotom i snagom (Combined
                  Heat & Power Unit)
                </h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Kao kod svih velikih ideja, koncept iza CHP-a je jednostavan,
                  otklanja postoje??i grija?? i zamjenjuje ga sa jedinicom koja
                  proizvodi vodu za va?? dom, toplotu i elektri??nu energiju.
                </p>
                <p>
                  Poslije razvoja i testiranja, Eninuity je proizveo
                  revolucionarni novi CHP sistem sa potencijalom da optimizuje
                  potro??nju energije.
                </p>
              </div>
              <div className={styles.chpimgs}>
                <div id={styles.chpimg0}>
                  <img
                    src={require('../../assets/img/usluge/mobileresize/mchp1.jpg')}
                    alt=""
                    className={styles.hideDesktop}
                  />
                  <img
                    className={styles.hideMobile}
                    src={require('../../assets/img/usluge/mchp.jpg')}
                    alt=""
                  />
                </div>
                <div id={styles.chpimg1}>
                  <img
                    src={require('../../assets/img/usluge/Mini-BHKW_Illu_Haus1.jpg')}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div id={styles.fis}>
              <h3>FI-Za??titna sklopka po VDE</h3>
              <div className={styles.sigurnostl}></div>
              <div id={styles.fisup}>
                <p>
                  U okviru jednog e-??eka provjeravamo cijelu instalaciju u
                  detalj i da li va??e FI za??titne sklopke odgovaraju najnovijim
                  tehni??kim standardima.
                </p>
              </div>
              <div id={styles.fisdown}>
                <p>
                  U svakodnevnici se mo??e sva??ta desiti. Dijete mo??e staviti
                  prste u uti??nicu ili goli provodnik itd. Sve ovo mo??e izazvati
                  te??ke povrede, zbog toga su osigura??i tako neophodni.
                </p>

                <ul>
                  <li>
                    Oni ??tite od elektri??nog udara, tako ??to automatski prekinu
                    strujni krug prije nego ??to se bilo ??ta desi
                  </li>
                  <li>
                    Ova sigurnosna mjera je po DIN VDE standardima neophodna za
                    svaku uti??nicu
                  </li>
                </ul>
              </div>
              <div id={styles.fisimgs}>
                <img src={require('../../assets/img/usluge/fis1.jpg')} alt="" />
                <img src={require('../../assets/img/usluge/fis.jpg')} alt="" />
              </div>
            </div>
            <div id={styles.uzemljenje}>
              <h3>Uzemljenje i izjedna??avanje potencijala</h3>
              <div className={styles.sigurnostl}></div>
              <p>
                Spajanje jednog dijela instalacije sa zemljom se zove
                uzemljenje. Uzemljenje ima vi??e zadataka da ispuni kao npr.
                za??titu od elektri??nog udara, atmosferskog prenapona,
                osiguravanje elektromagnetne kompatibilnosti kao i za??tita
                antenskog sistema.
              </p>
              <p>
                Ako se 2 ta??ke razli??itog potencijala me??usobno spoje, onda se
                njihova razlika u potencijalu izjedna??i. Napon se vi??e izme??u
                ove 2 ta??ke ne mo??e mjeriti i stvoreno je izjedna??enje
                potencijala. Po DIN standardu je izjedna??enje potencijala
                propisano tako ??to svi postoje??i metalni sistemi u objektu kao i
                za??titni provodnik, izjedna??iva??i potencijala i odvodnik
                prenapona se me??usobno spoje na glavnu ??inu uzemljenja.
                Izjedna??avanje potencijala i uzemljenje zajedno ??ine kompletni
                sistem za??tite.
              </p>
            </div>

            <div id={styles.prenapon}>
              <div id={styles.prenapontxt}>
                <h3>Vi??e sigurnosti protiv opasnih prenapona</h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Udar groma nije naj??e????i uzrok ??tete kod oluja, ve?? prenapon.
                  ??ak kod razdaljine do 1.5 km od udara groma, ili kroz
                  uklju??ivanje i isklju??ivanje potro??a??a mogu nastatati masivne
                  ??tete na ure??ajima.
                </p>
                <p>
                  Da bi se ovo sprije??ilo mora se ugraditi nekoliko prenaponskih
                  ure??aja u razvodnom ormaru i na priklju??cima telefona,
                  interneta i kablovkse.
                </p>
              </div>
              <div id={styles.prenaponimgs}>
                <img
                  src={require('../../assets/img/usluge/prenap.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/prenap1.jpg')}
                  alt=""
                />
              </div>
            </div>

            <div id={styles.emobilnost}>
              <div id={styles.emobilnosttxt}>
                <h3>
                  E-mobilnost - vozite se sigurno sa samoproizvedenom strujom
                </h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Naravno kada pri??amo i o E-mobilnosti va??a sigurnost stoji na
                  prvom mjestu. Bitno je prilagoditi se elektrotehni??koj
                  infrastrukturi, tako da zadovoljite sve uslove. Po potrebi
                  mo??emo i redimenzionirati va??e kablove.
                </p>
                <p>
                  Ove mjere su bitan preduslov za brza punjenja. Kod E-??eka se
                  cijela struktura E-mobilnosti testira na funkcionalnost i
                  sigurnost
                </p>
                <ul>
                  <li>
                    Instalacija stanice za punjenje i integracija u postoje??u
                    ku??nu tehniku
                  </li>
                  <li>
                    Prilago??avanje va??e ku??ne instalacije, da bi se otklonile
                    eventualno nastale opasnosti
                  </li>
                </ul>
              </div>
              <div id={styles.emobilnostimgs}>
                <img
                  src={require('../../assets/img/usluge/sigurnost1.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/sigurnost2.jpg')}
                  alt=""
                />
              </div>
            </div>

            <div id={styles.vi??esig}>
              <div id={styles.vi??esigtxt}>
                <h3>Vi??e sigurnosti u budu??nosti - budite spremni na sve</h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Digitalni broja??i ili obnovljive energije, poslije
                  elektrotehni??ke sanacije je va?? dom najbolje spreman za sutra
                </p>
                <ul>
                  <li>
                    Pametni metar - digitalni broja??i omogu??avaju perfektni
                    energetski menad??ment u svoja ??etiri zida
                  </li>
                  <li>
                    Toplotne pumpe i solarni paneli za smanjenje energetske
                    potro??nje
                  </li>
                  <li>Interfon i video nadzor</li>
                  <li>Automatsko upravljanje ??aluzina</li>
                  <li>Umre??eni protupo??arni sistemi</li>
                  <li>
                    Moderni mikro-spojeni toplotni sistemi snage, proizvode
                    struju i toplotu istovremeno
                  </li>
                </ul>
              </div>
              <div id={styles.vi??esigimgs}>
                <img
                  src={require('../../assets/img/usluge/sigurnost3.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/sigurnost5.jpg')}
                  alt=""
                />
              </div>
            </div>
            <div id={styles.alarmi}>
              <div id={styles.alarmitxt}>
                <h3>Alarmne centrale</h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Provale i mogu??i po??ari su realna opasnost po va?? objekat,
                  mnogi ljudi misle da su se osiguranjem dovoljno za??titili, ali
                  nijedno osiguranje ne mo??e ??ivot za??titi ili gubitak
                  skupocjenih stvari, povratiti ukradene podatke ili promjeniti
                  nastale psiholo??ke probleme.
                </p>
                <p>
                  Alarmne centrale (EMA) pru??aju posebnu sigurnost, kroz njihovu
                  detekciju je dosta lak??e otkriti razbojnika.
                </p>
                <p>
                  Sigurnosni ure??aji mogu ispuniti svoju du??nost samo ako su
                  prethodno profesionalno i po propisima instalirani. Mi
                  popravljamo sigurnosne rupe u va??em objektu i poka??emo vam
                  optimalna rje??enja protiv provale i drugih opasnosti kao npr.
                  po??ar.
                </p>
                <p>
                  Sa na??im iskustvom smo u stanju instalirati odgovaraju??e
                  sigurnoste umre??ene sisteme, hibridne sisteme i moderne
                  be??i??ne alarmne centrale, kod kojih se ugradnja odvija bez
                  prljav??tine, bez kablova i velikog napora.
                </p>
              </div>
              <div id={styles.alarmiimgs}>
                <img
                  src={require('../../assets/img/usluge/alarmc0.png')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/alarmc1.png')}
                  alt=""
                />
              </div>
            </div>
            <div id={styles.interfoni}>
              <div id={styles.interfonitxt}>
                <h3>Interfoni</h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Sistemi TCS audio interfona su zasnovani na modernoj BUS
                  tehnologiji koja omogu??ava realizaciju sistema primjenom
                  jednog dvo??ilnog vodi??a tj. jedne parice za kompletan objekat.
                </p>
                <p>
                  Bez obzira na jednostavnost instalacije i primjene samo jedne
                  parice, TCS sistemi audio interfona obezbje??uju niz funkcija:
                </p>
                <ul>
                  <li>
                    Razgovor sa osobom na ulazu bez mogu??nosti prislu??kivanja
                  </li>
                  <li>Otklju??avanje vrata</li>
                  <li>Uklju??enje svjetla u hodniku</li>
                  <li>Kori????enje ve??eg broja pozivnih stanica</li>
                  <li>Interno pozivanje izme??u korisnika</li>
                  <li>Prebacivanje interfonskog poziva na fiksni telefon</li>
                  <li>Funkcija automatskih vrata</li>
                  <li>Integracija sa sistemima kontrole pristupa</li>
                </ul>
                <p>
                  Sistemi TCS video interfona su zasnovani na modernoj BUS
                  tehnologiji koja omogu??ava realizaciju sistema primjenom
                  jednog ??esto??ilnog vodi??a tj. tri parice za kompletan objekat,
                  bez primjene koaksijalnog kabla.
                </p>
                <p>
                  Bez obzira na jednostavnost instalacije i primjene samo 3
                  parice TCS sistemi video interfona obezbje??uju niz naprednih
                  funkcija:
                </p>
                <ul>
                  <li>
                    Razgovor sa osobom na ulazu bez mogu??nosti prislu??kivanja
                  </li>
                  <li>Otklju??avanje vrata</li>
                  <li>Uklju??enje svjetla u hodniku</li>
                  <li>
                    Kori????enje ve??eg broja pozivnih stanica i pregledanje slika
                    sa 16 kamera
                  </li>
                  <li>Interno pozivanje izme??u korisnika</li>
                  <li>Kombinovanje audio i video govornih aparata</li>
                  <li>Integracija sa sistemima kontrole pristupa</li>
                  <li>Izgradnja velikih sistema</li>
                </ul>
              </div>
              <div id={styles.interfoniimgs}>
                <img
                  src={require('../../assets/img/usluge/interfon00.png')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/interfon01.jpg')}
                  alt=""
                />
              </div>
            </div>
            <div id={styles.videonadzor}>
              <div id={styles.videonadzortxt}>
                <h3>Video i be??i??ni nadzorni sistemi</h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Na javnim mjestima kao npr. ambasadama, uredima, bolnicama ili
                  kompanijama, za za??titu firme ili privatnog vlasni??tva se
                  koristi video nadzor da bi se za??titili ljudi i objekti od
                  provala i vandalizma.
                </p>
                <p>
                  Sa profesionalnim video nadzorom proizvo??a??a Elbex, Avigilon,
                  Gira, Heitel, osiguravate objekat na perfektan na??in. Ovisno
                  od primjene objekta, kreiramo za vas individualni sugurnosni
                  plan kao optimalno rje??enje.
                </p>
                <ul>
                  <li>
                    Za to kombiniramo kamere, objektive, monitore, spa??avanje
                    snimanog materijala i analizatore kao i njihov pribor
                  </li>
                  <li>
                    Po potrebi dolaze i sistemi pohranjivanja podataka (video
                    kamere ili detektori pokreta)
                  </li>
                  <li>
                    Realiziramo i nadzor na daljinu i kontrolu nadzora
                    geografski podijeljenih lokacija preko interne mre??e
                    podataka ili interneta
                  </li>
                  <li>
                    Instaliramo nadzorne sisteme koji konstantno ??alju
                    informacije na alarmnu centralu i telefon
                  </li>
                  <li>
                    I za skriveni video nadzor imamo perfektan koncept za vas
                  </li>
                </ul>
              </div>
              <div id={styles.videonadzorimgs}>
                <img
                  src={require('../../assets/img/usluge/surveillance-cctv-camera-alex-bartel.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/video-surveillance.jpg')}
                  alt=""
                />
              </div>
            </div>

            <div id={styles.senzori}>
              <div id={styles.senzoritxt}>
                <h3>
                  Sa odgovaraju??om elektrotehnikom - bez barijera, neovisno i
                  sigurno ??ivjeti
                </h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Dobar prilog hodnicima su senzori pokreta i detektori
                  prisutnosti koji upravljaju rasvjetom automatski, ??to je kod
                  kupatila i stepenica od velike prednosti.
                </p>
                <p>
                  Sa inteligentnim ??alterima mo??ete upravljati rasvjetom
                  (uklju??ivanje, isklju??ivanje, prigu??ivanje), grijanjem,
                  ??aluzinama i elektronskim ure??ajima.
                </p>
                <ul>
                  <li>
                    Prekida??i za prigu??ivanje postoje i sa memorijskom
                    funkcijom, tada mo??ete pristupiti svim prethodno sa??uvanim
                    rasvjetnim scenama
                  </li>
                  <li>
                    Orijentacijske lampe u hodniku i stubi??tu doprinose ve??em
                    komforu i sigurnosti
                  </li>
                </ul>
              </div>
              <div id={styles.senzoriimgs}>
                <img
                  src={require('../../assets/img/usluge/sigurnostdetektor.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/sigurnosttouch.jpg')}
                  alt=""
                />
              </div>
            </div>
            <div id={styles.priklju??ak}>
              <div id={styles.ptxt}>
                <h3>Odgovaraju??i priklju??ak u svakoj sobi</h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Elektri??ni ure??aji i TV ili ra??unar su svugdje u radnom
                  modusu, u kuhinji, radnoj sobi, dnevnoj i spava??oj sobi,
                  podrumu, gara??i ili vani.
                </p>
                <p>
                  I s toga je bitan velik broj uti??nica, po DIN standardima
                  moraju biti 4 uti??nice u svakoj sobi do 20 m&sup2;.
                </p>
                <p>
                  Ko ??eli vi??e komfora i ima puno ure??aja u radnom modusu, treba
                  imati vi??e uti??nica i strujnih krugova. Specijalne izvedbe
                  uti??nica su posebno za??ti??ene protiv vlage i vanjskih udaraca.
                  Ako imate djecu, postoje i kvalitativne uti??nice za za??titu
                  djece.
                </p>
              </div>
              <div id={styles.pimgs}>
                <img
                  src={require('../../assets/img/usluge/sigurnost9.jpg')}
                  alt=""
                />
                <img
                  src={require('../../assets/img/usluge/sigurnost8.jpg')}
                  alt=""
                />
              </div>
            </div>
            <div id={styles.sigimgf}>
              <img
                src={require('../../assets/img/usluge/sigurnost11.jpg')}
                alt=""
              />
            </div>
          </div>
        </div>
        <div id={styles.planiranje} ref={this.planiranjeS}>
          <div id={styles.planiranjeh}>
            <h2>
              Planiranje <span className={styles.lc}>i</span> Projektovanje
            </h2>
          </div>
          <div id={styles.planiranjeb}>
            <h3>Planiranje i Projektovanje</h3>
            <div className={styles.sigurnostl}></div>
            <div id={styles.projektov}>
              <div className={styles.prjkt}>
                <img
                  src={require('../../assets/img/usluge/planiranje.jpg')}
                  alt=""
                />
                <h4>Planiranje</h4>
                <div className={styles.sigurnostl}></div>
                <p>
                  Mi planiramo va??u elektroinstalaciju da bude po najnovijim
                  standardima i da u??teda elektri??ne energije bude maksimalna
                </p>
              </div>
              <div className={styles.prjkt}>
                <img
                  src={require('../../assets/img/usluge/knxplaniranje.jpg')}
                  alt=""
                />
                <h4>KNX Planiranje</h4>
                <div className={styles.sigurnostl}></div>
                <p>
                  Kao certificirani KNX partner smo kompetentni savjetnici oko
                  KNX sistema
                </p>
              </div>
              <div className={styles.prjkt}>
                <img
                  src={require('../../assets/img/usluge/savjetovanje.jpg')}
                  alt=""
                />
                <h4>Savjetovanje</h4>
                <div className={styles.sigurnostl}></div>
                <div className={styles.texttry}>
                  <p>
                    Novogradnja ili renoviranje ? mi ??emo vas rado savjetovati
                  </p>
                </div>
              </div>
            </div>
            <h3>Gre??ke kod planiranja elektroinstalacije se te??ko isprave</h3>
            <p>
              Uspje??ni projekat zahtjeva dobro planiranje. Planiranje i
              projektovanje elektroinstalacija slobodno prepustite nama.
            </p>
            <p>
              Pa??ljivo planiranje je potrebno da bi va??a elektroinstalacija bila
              sigurna: rano prepoznavanje gre??ki, optimalna raspodjela
              elektri??ne energije kao i me??usobna interakcija komponenti. Sa
              profesionalnim Auto CAD softverom stvaramo kompletne i revizione
              planove.
            </p>
            <p>
              Va??a elektri??na instalacija ??e zadovoljavati sve uslovu i odredbe,
              ve?? kod planiranja i projektovanja uzimamo u obzir sva bitna
              pitanja od sigurnosne tehnologije,zakonskih odredbi, optimalno
              prostorno planiranje kao i va??e specifi??ne ??elje. Tu dodajemo i
              prora??un struje kratkog spoja za korektno dimenzoniranje
              instalacija jake struje, poma??e pri ranoj detekciji mogu??ih
              problema.
            </p>
            <p>
              Tehnika se svakodnevno razvija i sve se vi??e mora gledati na
              odre??ene finese, nova pravila i na sigurnost. Sve ove stvari se
              ve?? u po??etnoj fazi moraju uzeti u obzir.
            </p>
            <p>
              Mnoge sisteme poznajemo od samog po??etka i zajedno smo napredovali
              sa svim novitetima i inovacijama. Kod na??eg projektovanja uzimamo
              sve aspekte u obzir i informi??emo vas o svim mogu??im zamkama i
              problemima unaprijed.
            </p>
            <p>
              Dobi??ete kompletan koncept na??eg rada i vremenski raspored,
              kratkoro??ne promjene nisu problem.
            </p>
            <p>
              Va??e ideje, ??elje i vizije pretvaramo u plan i izra??ujemo
              ??emiranje kompletne instalacije. Stavljamo fokus na sigurnost,
              komfor, ekonomi??nost i odr??ivost.
            </p>
            <p>
              Kod realizacije va??e novogradnje ili renoviranja zastupamo va??e
              interese. Koordiniramo i upravljamo radnim tokovima na objektu i
              brinemo da se rad odvija po sigurnosnim propisima i da se sve
              zavr??i u zadanom vremenskom roku.
            </p>
            <p>Nudimo slijede??e usluge:</p>
            <ul>
              <li>
                Detaljno planiranje i projektiranje elektri??nih instalacija,
                ekspertiza i analiza tro??kova
              </li>
              <li>Pomo?? kod javnih nabavki</li>
              <li>Stru??an rad i osiguravanje kvalitete</li>
              <li>Podr??ka kod izbora dobavlja??a i odgovaraju??eg materijala</li>
            </ul>
            <div id={styles.plan}>
              <h3>Planiranje</h3>
              <p>
                Neuspje??na elektroinstalacija mo??e izazvati dosta neugodnosti.
                Naknadno instaliranje uti??nica i praznih cijevi je zahtjeva
                veliki napor i zalaganje. Zbog toga bi ste trebali prije svega
                razgovarati sa specijalistom o va??im ??eljama i planovima.
              </p>
              <div className={styles.plankol}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/uticnicap.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3>Uti??nice</h3>
                  <p>
                    Planiramo za sve ure??aje, uti??nice plus rezerve koje mo??emo
                    koristiti za punjenje mobitela npr. ili kori??tenje ru??nog
                    miksera.
                  </p>
                </div>
              </div>
              <div className={styles.plankol}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/internetp.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3>Pristup internetu i mre??i</h3>
                  <p>
                    Poslovno i privatno danas je te??ko zamisliti ??ivot bez
                    interneta, da bi dugo imali ne??to od ove investicije, treba
                    kabliranje za ra??unarsku mre??u biti promi??ljeno i razumno.
                  </p>
                </div>
              </div>
              <div className={styles.plankol}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/knxwalls.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3>Ku??na kontrola</h3>
                  <p>
                    Sa ku??nim upravljanjem se mogu puno stvari automatizirati.
                    ??aluzine i roletne se mogu podizati i spu??tati uz pomo??
                    daljinskog upravlja??a ili preko tableta i pametnog telefona.
                    Isto tako mo??ete kompletnu rasvjetu centralno isklju??iti,
                    kada idete na spavanje ili izlazite iz ku??e.
                  </p>
                </div>
              </div>
            </div>
            <div id={styles.knxplan}>
              <h3>KNX Planiranje</h3>
              <p className={styles.al}>
                Trajne investicije za graditelje i investitore
              </p>
              <p>
                Ko se danas odlu??i da gradi ili kupi nekretninu ho??e jedno i to
                je sigurna investicija, koja ??e trajati i rasti u cijeni. KNX je
                svjetski priznati standard koji ispunjava sve navedene uslove.
              </p>
              <p>
                KNX tehnologija je dostupna ve?? 20 godina i nikad nije izbor
                inovativnih produkata bio toliki kao danas. Preko 400
                proizvo??a??a razvijaju produkte, koji su kompatibilni sa KNX
                tehnologijom
              </p>
              <p>
                KNX upravlja grijanjem, rasvjetom, ??aluzinama, ventilacijom,
                multimedijom i sigurnosnim tehnologijama. Tako nastaje umre??eni
                sistem, koji radi ekonomi??no i zadovoljava dana??nje potrebe
                ljudi. Zahvaljuju??i umre??enosti sistema, mogu se realizirati
                funkcionalnosti koje su do sada bile zamislive samo sa velikim
                tehni??kim naporom ili nikako. To stvara prosor za nove
                inovativne ideje.
              </p>
              <div className={`${styles.plankol} ${styles.plf}`}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/komfor.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3>Vi??e komfora</h3>
                  <p>
                    Sa KNX-om ??ete imati dobra iskustva, sa odgovaraju??om
                    rasvjetom ili pode??enom temperaturom, KNX se prilago??ava
                    va??im ??eljama i odra??uje mnogo stvari automatski. Sa KNX-om
                    imate uvijek odgovaraju??u temperaturu i ??aluzine u svakom
                    momentu mogu da prepoznati koliko svjetlosti treba
                    prostoriji.
                  </p>
                </div>
              </div>
              <div className={`${styles.plankol} ${styles.plf}`}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/ekonomi??nost.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3>Ekonomi??nost</h3>
                  <p>
                    Sa KNX-om mo??ete u??tedi dosta novca, samo kroz individualnu
                    kontrolu soba u vezi sa nadgledanjem prozora i automatskog
                    upravljanja roletni mo??e se u??tediti veliki dio toplotne
                    energije. KNX nudi mnogo vi??e funkcija.
                  </p>
                </div>
              </div>
              <div className={`${styles.plankol} ${styles.plf}`}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/security1.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3>Vi??e sigurnosti</h3>
                  <p>
                    KNX je pouzdani ??uvar za va?? dom, ljetos i zimi, danju i
                    no??u. Sistem nadgleda prozore i vrata, i u slu??aju nu??de se
                    telefonski zove pomo??. Tako??er ??titi od opasnosti koji mogu
                    biti prouzrokovani od po??ara, vode ili nepravilnog odnosa sa
                    strujom.
                  </p>
                </div>
              </div>
              <div className={`${styles.plankol} ${styles.plf}`}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/future.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3>Sigurna budu??nost</h3>
                  <p>
                    Elektroinstalacija na bazi KNX-a ima sigurnu budu??nost i
                    ispunjava sve potrebe uku??ana, i va??a investicija je na dugu
                    stazu ekonomi??na.
                  </p>
                </div>
              </div>
            </div>
            <div id={styles.savjet}>
              <h3>Savjetovanje</h3>
              <h3>Va??e zadovoljstvo je na?? cilj</h3>
              <p>Planirate novogradnju, ili ho??ete renovirati va?? dom ?</p>
              <p>
                Planirajte sa nama! Na??i elektri??ari zavr??avaju na mjestu
                pouzdano i ta??no dimenzioniranje va??eg projekta, i dobijate
                cijenu materijala i njegovu potrebnu koli??inu.
              </p>
            </div>
          </div> */}
        {/* </div> */}
        <div id={styles.totop1}>
          <i className={`fas fa-chevron-up fa-2x`}></i>
        </div>
      </>
    );
  }
}

export default Usluge;
