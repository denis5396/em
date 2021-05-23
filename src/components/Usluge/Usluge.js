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
  dijagnozaS = createRef();
  sigurnostS = createRef();
  planiranjeS = createRef();
  mobileDropdownUlRef = createRef();
  mobileDropdownRef = createRef();
  dropdownClick = createRef();
  navRef = createRef();

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
    // this.callInterval();
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
    if (obj.offsetParent) {
      do {
        curtop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      return [curtop];
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

  render() {
    return (
      <>
        <header id={styles.headeru}>
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
                  <a href="./index.html">Početna</a>
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
                  <Link onClick={() => this.jakastrS.current.scrollIntoView()}>
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
                    onClick={() => this.scrollZaVise(this.slabastrS.current)}
                  >
                    Klikni za više
                  </Link>
                </div>
              </div>
              <div className={styles.sld}>
                <div className={styles.sldtxt}>
                  <img
                    src={require('../../assets/img/usluge/output-onlinepngtools.png')}
                    alt=""
                  />
                  <h2>Kućna Automatizacija</h2>
                  <i
                    className={`${styles.fas} ${styles.fachevrondown}
                     fas fa-chevron-down fa-3x`}
                  ></i>
                  <Link onClick={() => this.scrollZaVise(this.knxS.current)}>
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
                    onClick={() => this.scrollZaVise(this.sigurnostS.current)}
                  >
                    Klikni za više
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
                    onClick={() => this.scrollZaVise(this.jakastrS.current)}
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
          ></i> */}
        </header>
        <body id={styles.uslugeBody}>
          <div id={styles.ourServices}>
            <div id={styles.ourServicesHeader}>
              <div id={styles.ourServicesHeaderHeading}>
                <span></span>
                <h2>
                  Naše <br />
                  Usluge
                </h2>
              </div>
              <div id={styles.ourServicesHeaderText}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus deleniti dignissimos debitis modi soluta illum
                  inventore eius, magni ipsam est!
                </p>
              </div>
            </div>
            <div id={styles.ourServicesBody}>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/shtransp1.png')} />
                <h2>Pametna Kuća</h2>
                <p>Kontrolišite vaš dom pomoću interneta</p>
              </div>
              <div className={styles.ourServicesCards}>
                <i class="fas fa-house-damage fa-6x"></i>
                <h2>Instalacija Jake Struje</h2>
                <p>
                  Planiramo, implementiramo i održavamo različite vrste
                  instalacija jake struje
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/weakcuricon1.png')} />
                <h2>Instalacija Slabe Struje</h2>
                <p>
                  Električne instalacije slabe struje služe za napajanje i
                  povezivanje telekomunikacijskih uređaja, uređaja za daljinsko
                  upravljanje, mjerenje i dr.
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/cameraicontransp.png')} />
                {/* <h2>Sigurosna Rješenja</h2> */}
                <h2>Instalacija Tehničke Zaštite</h2>
                <p>
                  Protivpožarni alarmi, video nadzor, signalni uređaji, alarmne
                  centrale i pametni alarmni sistemi, kontrole pristupa
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/solarpicon2.png')} />
                <h2>Instalacija Solarnih Panela</h2>
                <p>
                  Ugradnja solarne elektrane garantuje brz povrat investicije,
                  mogućnost totalne neovisnosti o elektro mreži i više.
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/gromobran.png')} />
                <h2>Gromobranska Instalacija</h2>
                <p>
                  Gromobran je električna instalacija izvedena tako da mogućnost
                  udara groma u zaštićeni objekt bude svedena na minimum
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/voltm1.png')} />
                <h2>Ispitivanje Električnih Instalacija</h2>
                <p>
                  Ispitujemo elektroinstalacije, sigurnosne uređaje kao što su
                  FID sklopke, razvodne ormare, električne uređaje i električne
                  mašine, kontrolne/sigurnosne sisteme.
                </p>
              </div>
              <div className={styles.ourServicesCards}>
                <img src={require('../../assets/img/planproj1.png')} />
                <h2>Planiranje i Projektovanje</h2>
                <p>
                  Naša tehničke usluge planiranja obuhvataju sva polja
                  električnih sistema po najnovijim tehničkim i tehnološkim
                  saznanjima
                </p>
              </div>
            </div>
          </div>
          <div id={styles.sh}>
            {/* <div id={styles.shBack}>
              <div id={styles.shBackOne}></div>
              <div id={styles.shBackTwo}></div>
            </div> */}
            <h1>Pametna Kuća</h1>
            <p>
              Kućna Automatizacija je bila dostupna već nekoliko godina, ali
              izvan financijskih mogućnosti za većinu ljudi. Stvari su se
              promijenile zadnjih par godina, i kućna automatizacija postaje
              povoljnija i popularnija.
            </p>
            <p>
              Opisano je i kao pametna kuća, i mijenja način na koji se kuće
              kabliraju i upravljaju.
            </p>
            <p>
              Budućnost je tu, i sve u vašem domu se može kontrolisati putem
              internet mreže. Šta to tačno znači? To je tehnologija koja
              kontroliše automatizaciju integralnih funkcija bilo kakvog objekta
              (rezidencijalnog, komercijalnog, industrijskog itd) kao što su
              HVAC, rasvjeta, multimedija, sigurnost, energetski menadžment i
              više, sve što se napaja električnom energijom se može kontrolisati
              kroz mrežu.
            </p>
            <p>
              Sistem pametne kuće također istovremeno enormno smanjuje
              energetske troškove tako što konstantno nadgleda i prilagođava
              operativne postavke za sve konektovane uređaje na KNX bus.
            </p>
            <p>
              Uređaji se mogu kontrolisati uz pomoć pametnog telefona, tableta i
              glasa(Amazon Alexa). Možete upravljati ne samo jednom stavkom,
              nego i više njih sa jednom komandom. Recite "Alexa laku noć" i
              nakon toga se isključuje sva rasvjeta, termostat se podesi na
              željenu temperaturu i vrata se zaključavaju.
            </p>
            <h2>Mogućnosti</h2>
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
                    Pametan interfon integrisan u odgovarajuću Smart Home
                    aplikaciju
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardmob.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Pristup putem mobilnog telefona</h3>
                  <p>Vaš telefon koristite kao ključ</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardinterval.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Podešavanje intervala za bilo koji uređaj</h3>
                  <p>
                    Korisno za noćnu rasvjetu, žaluzine, ali i za sve druge
                    uređaje
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardpodno.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Kontrola podnog grijanja i hlađenja</h3>
                  <p>
                    Učinite vaše podno grijanje pametnim i uštedite energiju
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardgrijanje.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Kontrola grijanja i hlađenja</h3>
                  <p>
                    Upravljanje grijanjem i hlađenjem na pametan način, čak i sa
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
                    Aktiviranje uređaja ako su vaša vrata i prozori otvoreni
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardsenzor.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Senzori pokreta</h3>
                  <p>
                    Aktiviranje uređaja ili upozorenje na osnovu detektovanja
                    pokreta
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardbtn.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Fizički tasteri za kontrolu</h3>
                  <p>Klasični tasteri u kombinaciji sa digitalnim</p>
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
                  <p>Različite opcije pametnih tastera za kontrolu</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcarddim.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Dimovanje rasvjete</h3>
                  <p>Prigušivanje rasvjete, jednostavno putem aplikacije</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardscene.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Scene</h3>
                  <p>
                    Jednim klikom aktivirate koliko uređaja želite, istovremeno
                  </p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardroletne.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Kontrola roletni</h3>
                  <p>Pametna kontrola roletni i žaluzina</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardvrijeme.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Integracija vremenske prognoze</h3>
                  <p>Aktiviranje uređaja prema vremenskim uslovima</p>
                </div>
              </div>
              <div className={styles.shCard}>
                <img src={require('../../assets/img/shcardalert.png')} />
                <div className={styles.shCardTxt}>
                  <h3>Upozorenja i obavještenja</h3>
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
          <div id={styles.ourServicesStrongCur}>
            <h2>Instalacija Jake Struje</h2>
            <p>
              Planiramo, implementiramo i održavamo različite vrste instalacija
              jake struje:
            </p>
            <ul>
              <li>
                Utičnice, prekidači, ugradnja upravljačkih ormara i razvodnih
                ormara
              </li>
              <li>
                Uvođenje instalacija jake struje za industrijsku i drugu
                električnu opremu
              </li>
              <li>
                Instalacije za sisteme napajanja, grijanja i klimatizacije
              </li>
              <li>Instalacije priključnica i fiksnih spojeva</li>
              <li>Instalacije rasvjete</li>
              <li>Razvodne ormare</li>
              <li>Gromobran</li>
            </ul>
          </div>
          <div id={styles.ourServicesWeakCur}>
            <h2>Instalacija Slabe Struje</h2>
            <p>
              Planiramo, implementiramo i održavamo različite vrste instalacija
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
              <li>Računarska mreža (internet)</li>
              <li>Telefonske instalacije</li>
            </ul>
          </div>
          <div id={styles.ourServicesSecurity}>
            <h2>Instalacija Tehničke Zaštite</h2>
            <p>
              U svrhu zaštite imovine i osoba, pružamo kompletnu uslugu tehničke
              zaštite. Naš stručni tim će odraditi procijenu ugroženosti objekta
              i prijedlog njegove moguće zaštite, a zatim izraditi projekt, te
              Vam pružiti instalaciju i održavanje instaliranog sistema. Od
              tehničke zaštite nudimo slijedeće:
            </p>
            <ul>
              <li>Protivpožarni sistemi</li>
              <li>Uzemljenje i izjednačavanje potencijala</li>
              <li>
                Ugradnja prenaponskih uređaja u razvodnom ormaru i na
                priključcima telefona, interneta i kablovske
              </li>
              <li>Interfoni (video i audio)</li>
              <li>Video nadzor</li>
              <li>Alarmne centrale</li>
            </ul>
          </div>
          <div id={styles.ourServicesSolar}>
            <h2>Solarni Paneli</h2>
            <p>
              Vršimo projektovanje i izgradnju solarnih elektrana sa mogučnošću
              plasiranja i prodaje električne energije u mrežu.
            </p>
            <p>Zašto izabrati solarnu energiju ?</p>
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
                  <h3>Područja bez elektro mreže</h3>
                  <p>
                    Sistem je jako pogodan za vikendice, kuće koje ne pokrivaju
                    elektro mrežu.
                  </p>
                </div>
              </div>
              <div className={styles.solarItem}>
                <img src={require('../../assets/img/solaroffgrid1.png')} />
                <div className={styles.solarTxt}>
                  <h3>Off-grid sistem</h3>
                  <p>Mogućnost totalne neovisnosti o elektro mreži.</p>
                </div>
              </div>
              <div className={styles.solarItem}>
                <img src={require('../../assets/img/shcardinterval.png')} />
                <div className={styles.solarTxt}>
                  <h3>Dugoročno rješenje</h3>
                  <p>Solarni paneli imaju vijek trajanja od 25 godina.</p>
                </div>
              </div>
              <div className={styles.solarItem}>
                <img src={require('../../assets/img/solareco1.png')} />
                <div className={styles.solarTxt}>
                  <h3>Ekološki prihvatljivo</h3>
                  <p>
                    Sistemi su ekološki poželjni, jer ne prouzrokuju štetne
                    uticaje na okoliš.
                  </p>
                </div>
              </div>
              <div className={styles.solarItem}>
                <img src={require('../../assets/img/solarsavings1.png')} />
                <div className={styles.solarTxt}>
                  <h3>Ušteda</h3>
                  <p>
                    Sistemi ON-SWITCH prouzrokuju enormnu uštedu elekrične
                    energije, kao i pogodnosti spajanja električne energije i
                    grijanja/sanitarne vode
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id={styles.ourServicesGrom}>
            <h2>Gromobranska Instalacija</h2>
            <p>
              Gromobran je električna instalacija izvedena tako da mogućnost
              udara groma u zaštićeni objekat bude svedena na minimum. Ta
              instalacija je sastavljena od: hvataljki, odvoda, uzemljivača,
              dopunskog pribora (prema potrebi).
            </p>
            <p>
              Uzemljenje omogućuje brzo pražnjenje naboja u okolno tlo. Uglavnom
              se primjenjuju duboko zabijene čelične ili bakrene šipke ili
              ploče, a oko kuće se postavlja prsten od debljih šipki ili traka
              na koje se priključuju svi vertikalni krovni odvodi. Bitno je da
              je spoj metalne površine i tla potpuno provodljiv, pa
              konstrukciju, dimenzije, način postavljanja i izbor materijala
              treba odrediti stručnjak.
            </p>
          </div>
          <div id={styles.ourServicesTest}>
            <h2>Ispitivanje Električnih Instalacija</h2>
            <p>
              Defektni uređaji ili instalacije prouzrokuju mnogo štete. Česti
              uzrok: istrošenost ili preopterećenje, takvi rizici se mogu
              identificirati i eliminisati uz pomoć redovnih ispitivanja.
            </p>
            <p>
              Izjava o završnom pregledu i ispitivanju el. instalacija i potvrda
              o upotrebljivosti izvedene električne instalacije je potrebna kako
              bi distributer električne energije mogao napraviti priključak na
              objekt. Izjavu o završnom pregledu i ispitivanju el. instalacija i
              potvrdu o upotrebljivosti izvedene električne instalacije je
              moguće izdati samo ako su zadovoljeni slijedeći uvjeti:
            </p>
            <ul>
              <li>
                Uzemljenje objekta postavljeno (potrebno napraviti mjerenje
                uzemljenja)
              </li>
              <li>
                Napojni vod postavljen od mjernog priključka ormara do razvodnog
                ormara (potrebno napraviti mjerenje otpora izolacije napojnog
                voda)
              </li>
              <li>
                Razvodna kutija postavljena sa FID sklopkom 25/0,03A (30 mA)
                (potrebno ispitati funkcionalnost FID sklopke, izmjeriti
                indirektni dodir)
              </li>
              <li>
                Minimalno postavljen jedan strujni krug (žarulja, utičnica,
                prekidač)
              </li>
              <li>
                Ispitivanje električnih instalacija (otpor izolacije,
                impedancija petlje kvara, obrada zaštitnog uređaja
                diferencijalne struje)
              </li>
              <li>Ispitivanje rasvjete</li>
              <li>Ispitivanje otpora uzemljenja</li>
              <li>Ispitivanje statičkog elektriciteta</li>
              <li>Ispitivanje mjera izjednačavanja potencijala</li>
              <li>Ispitivanje neprekidnosti zaštitnog vodiča</li>
            </ul>
          </div>
          <div id={styles.ourServicesPlan}>
            <h2>Planiranje i Projektovanje</h2>
            <p>
              U projektnoj dokumentaciji obrađujemo sljedeće električne
              instalacije:
            </p>
            <ul>
              <li>Električne instalacije pametne kuće</li>
              <li>Električne instalacije jake struje</li>
              <li>Električne instalacije slabe struje</li>
              <li>Sistemi dojave požara</li>
              <li>
                Sistemi tehničke zaštite (videonadzor, kontrola pristupa,
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
            placeholder="Ukucajte traženi pojam..."
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
            <h4>Pametna Kuća</h4>
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
                    koriste električnu energiju za napajanje, rasvjetu i ostale
                    namjene, bilo industrijske ili za domaćinstva.
                  </p>
                  <p>
                    Instalacije jake struje namijenjene su potrošačima kao što
                    su sistemi grijanja, klimatizacijski sistemi, razvodne
                    ploče, rasvjeta…
                  </p>

                  <p>
                    Planiramo, implementiramo i održavamo različite vrste
                    instalacija jake struje:
                  </p>

                  <ul>
                    <li>
                      Izjednačavanje potencijala i uzemljenje u stambenim,
                      industrijskim, sportskim, javnim i poslovnim zgradama
                    </li>
                    <li>Oprema za katodnu zaštitu</li>
                    <li>
                      Utičnice, prekidači, ugradnja upravljačkih ormara i
                      razvodnih ormara
                    </li>
                    <li>
                      Instalacije za korisnike različitih tehnologija i
                      komutacijske blokove
                    </li>
                    <li>
                      Uvođenje instalacija jake struje za industrijsku i drugu
                      električnu opremu
                    </li>
                    <li>Instalacije za električne transformatorske stanice</li>
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
                  Prateći i usvajajući razvoj elektroinstalaterske djelatnosti,
                  materijala te alata i opreme za rad razvili smo i proširili
                  ponudu svojih djelatnosti na izvođenje instalacija računarskih
                  mreža, protuprovale, videonadzora, interfona, satelitskih
                  sistema, pripremu instalacija za kablovske televizije, siteme
                  bežičnog povezivanja potrošača sa upravljanjem, instalacije
                  pametne kuće, električnog podnog grijanja itd., ali i svih
                  sistema koje koriste i veći korisnici: industrijski i ostali
                  pogoni. Vršimo kompletne usluge unutar elektroinstalaterske
                  djelatnosti ove grane.
                </p>
                <p>
                  Planiramo, implementiramo i održavamo različite vrste
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
                  <li>Računarska mreža (internet)</li>
                  <li>Telefonska instalacija</li>
                </ul>
              </div>
              <div id={styles.slabastrr}>
                <p>
                  Električne instalacije slabe struje služe za napajanje i
                  povezivanje telekomunikacijskih uređaja, uređaja za daljinsko
                  upravljanje, mjerenje i dr. Instalacije slabe struje generalno
                  se dijele na:
                </p>
                <ul>
                  <li>Telekomunikacione instalacije</li>
                  <li>Signalne instalacije</li>
                </ul>
                <p>
                  Telekomunikacione instalacije se izrađuju za prenos poruka
                  koje mogu biti u obliku digitalnih (računari,
                  teleprinteri,video-signali, alarmni sistemi itd.), ili
                  analognih signala (govor, muzika i sl.)
                </p>
                <p>
                  Pod pojmom telekomunikacione instalacije u užem smislu
                  podrazumijevamo telekomunikacionu instalaciju unutar
                  zatvorenog prostora, namijenjenu za priključak na mjesnu
                  telekomunikacionu mrežu.
                </p>
                <br />
                <p>
                  Signalne instalacije imaju sisteme za opsluživanje zgrade
                  (grijanje, hlađenje, rasvjeta i sl.), vatrodojavni sistem,
                  sistem nadzora i sl. Te se instalacije postavljaju na sličan
                  način kao i elektroenergetske instalacije, ali se rade
                  posebni, najčešće bakreni vodovi (→ telekomunikacijski
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
                  Pametna Kuća pruža komfor življenja i smanjuje potrošnju
                  električne energije u odnosu na konvencionalne
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
                <h3>Mreže</h3>
                <p>
                  Isplanirani i instalirani mrežni sistem od strane stručnjaka
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
                  Interfoni pružaju komfor i povečavaju sigurnost u vaša četiri
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
                  Obim komunikacije koji se odvija preko klasičnih telefonskih
                  sistema je i dalje dosta velik.
                </p>
              </div>
            </div>
            <div id={styles.slabastrknx}>
              <h3>Sistem Pametne Kuće</h3>
              <div className={styles.sigurnostl}></div>
              <p>
                Pametna Kuća vam omogućava da svoj dom pretvorite u dosta
                komfortabilnije mjesto. Sa ovim riješenjima uživate u boravku
                vašeg doma i smanjujete električnu potrošnju.
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
                    Rješenja za pametne kuće: Koje prednosti pružaju ovi sistemi
                    ?
                  </h3>
                  <p>
                    Većina ljudi kad čuje pojam pametna kuća pomisle na normalnu
                    utičnicu koju možete upravljati putem aplikacije kod
                    pametnog telefona. Međutim to predstavlja samo mali dio
                    mogućnosti koje KNX sistem posjeduje. Pri tome je moguće
                    različite elemente kućanske tehnike i pojedinačne električne
                    uređaje integrisati sa lakoćom. Pametna kuća se brine za
                    perfektan međusobni rad između svih polja u objektu. To
                    olakšava korištenje i pametna rješenja doprinose značajnom
                    smanjenju potrošnje električne energije.
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
                    Pametna kuća vam nudi perfektne mogućnosti za upravljanje
                    rasvjetom u vašem domu. Možete tako prilagoditi rasvjetu na
                    odgovarajuće vrijeme dana i imate mogućnost prigušivanja
                    rasvjete. Fade-in efekat pruža lagani prelaz na trenutni
                    željeni nivo osvjetljenja. Pametna kuća može i sama
                    automatski da isključuje svjetlo kada se niko ne nalazi u
                    određenoj prostoriji, pod uvjetom da je instaliran detektor
                    pokreta ili detektor prisutnosti u sistemu. To pomaže pri
                    uštedi električne energije, automatsko upravljanje roletni i
                    žaluzina je isto moguće. Obavezno je instalirati
                    meteorološku stanicu i spojiti je na KNX sistem. Kroz
                    automatsko prilagođavanje žaluzina i aktuelnih vremenskih
                    prilika dobijate uvijek optimalnu klimu po sobama. Grijanje
                    je također moguće integrisati u sistem.
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
                    Sistem za veći stambeni komfor
                  </h3>
                  <p>
                    Pametna kuća brine o tome da se vi osjećate dobro u vašem
                    domu. Često je moguće integrirati i pojedinačne uređaje kao
                    npr. kafemašinu. Ako hoćete da se istuširate, možete preko
                    aplikacije uključiti bojler.
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
                    Inteligentna tehnika za vaš dom: mi ćemo vas rado
                    savjetovati
                  </h3>
                  <p>
                    Od velike prednosti je kad se sistem pametne kuće izvede u
                    novogradnji. Tako možete lokaciju svih komponenti od početka
                    planirati i spremiti potrebne priključke. Možete sistem
                    pametne kuće ugraditi i u već postojeću instalaciju, u
                    svakom slučaju dobro planiranje je bitno. Mi ćemo rado
                    preuzeti planiranje i implementaciju sistema pametne kuće za
                    vas, neovisno o tome da li se radi o novogradnji ili želite
                    nadograditi vaš dom sa sistemom pametne kuće.
                  </p>
                </div>
              </div>
            </div>
            <div id={styles.slabastrtv}>
              <h3>TV-Prijemnik</h3>
              <div className={styles.sigurnostl}></div>
              <p>Prijem tv signala je moguć na više načina</p>
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
                    Parabolična antena, koja se montira na krovu ili na zid
                    kuće, i prijemni uređaj kod televizora mogu primati hiljade
                    programa. Kod porodičnih kuća potrebno je samo jedno
                    Parabolično ogledalo, koje se treba spojiti sa sistemom
                    distribucije. Satelitski sistem, zajedno sa ugradnjom
                    sat-resivera, je montirano u par sati. Sa specijalnim
                    sistemima koji posjeduju obrtni motor, mogu se primiti i
                    internacionalni sateliti, i dobijete pristup na hiljade tv
                    kanala širom svijeta.
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
                    priključak dostupan za vaše domaćinstvo. Potrebne su
                    specijalne kablovske mreže i uređaj za prijem. Za
                    korištenje, pored naknade za emitovanje potrebno je i
                    platiti kablovski priključak.
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
                    brzom DSL priključku, odgovarajućem računaru i DSL-modemu.
                  </p>
                </div>
              </div>
            </div>
            <div id={styles.slabastrmreža}>
              <div id={styles.mrežab}>
                <div id={styles.mrezatxt}>
                  <h3>Mreže</h3>
                  <div className={styles.sigurnostl}></div>
                  <p>Umreženo u budućnost</p>
                  <p className={styles.new}>
                    Lokalne mreže su danas koncipirane kao ethernet sistemi sa
                    brzinom od jednog Gigabita u sekundi. Jaki razdjelnik se
                    bavi optimalnom izvedbom na svim interfejsima.
                  </p>
                  <p>
                    U najboljem slučaju jedna mreža spaja sve oblike
                    komunikacije: računar, internet, telefon, IP internet
                    telefon. Centralni panel pomaže kada je potrebna nova
                    dodjela priključaka. Važno je precizno planiranje i
                    implementacija, kao i provjera instalirane mreže, mi ćemo
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
                    nudimo vam i odgovarajuće materijale, kao npr. infracrvene
                    S/W i kamere u boji, IP kamere (mrežne kamere), kao i opremu
                    za specijalne namjene kod ekstremnih uvjeta (postavljanje
                    kamera u eksternim područjima).
                  </p>
                  <p>
                    Naravno dobijate kod nas i profesionalnu instalaciju video
                    centrala i digitalnih sistema za pohranu slika. Kod pitanja
                    o prenosu signala video nadzornih kamera i daljinskog
                    upravljanja kao i telekomunikacijskih mreža (intra i
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
              <p>Sigurnost i komfor u vašem domu</p>
              <div id={styles.slabastrinterfonb}>
                <div id={styles.interfontxt}>
                  <p>
                    Mi smo specijalisti kod instalacije interfonskih sistema i
                    rado ćemo vam pomoći kod odabira odgovarajućih interfona.
                  </p>
                  <p>
                    Mi ćemo obraditi vaš zahtjev (da li je detektor pokreta ili
                    interfon sa kamerom potreban, i ako da koliko instanci će
                    biti instalirano), brinemo se i o planiranju, instalaciji i
                    održavanju vašeg sistema. Imate li interesa za interfonske
                    instalacije ? kontaktirajte nas, radujemo se vašem pozivu
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
                  komunikacije koji se odvija preko klasičnih telefonskih
                  sistema je i dalje veoma velik. Uprkos pametnih telefona i
                  interneta, telefonski sistemi čine ipak još većinu internih i
                  eksternih komunikacijskih mreža, od kuća do kompleksnog
                  korištenja u prostranim zgradama.
                </p>
                <p>
                  Za normalno dvijanje različitih funkcija i komunikacijskih
                  zadataka su bitne dvije stvari: logistička koherentna
                  koncepcija kompletnog sistema kao i sva oprema, koja treba da
                  bude kvalitativna, puzdana i funkcionalna.
                </p>
                <p>
                  Kakva vrsta telefonske instalacije je potrebna, i sa kakvim
                  podešavanjem na kraju ovisi o raznim faktorima i parametrima.
                  Veličina preduzeća, institucije, stana ili kuće, broj
                  korisnika i njihove potrebe. Potrebna vam je nova instalacija
                  telefonskog sistema ili želite postojeći sistem u vašem
                  objektu zamjeniti ? Mi ćemo se pobrinuti da ispunimo vaša
                  očekivanja. Nudimo stručno savjetovanje, planiranje i
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
            <h2>Pametna Kuća</h2>
            <img
              id={styles.shv}
              src={require('../../assets/img/vectorpaint.png')}
              alt=""
            />
          </div>
          <div id={styles.knxbody}>
            <div id={styles.knxbodyh}>
              <h2>
                Šta <span className={styles.lc}>j</span>e KNX pametna kuća
              </h2>
              <p>
                Automatizacija pametne kuće <span className={styles.lc}>i</span>{' '}
                KNX menadžment alati
              </p>
            </div>
            <div id={styles.stajeknx}>
              <i>
                KNX je internacionalno priznati globalni standard za pametne
                kuće koji pruža potpunu kontrolu i automatizaciju nad objektom
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
              <h2>Sve o KNX pametnoj kući i automatizaciji objekata</h2>
              <p>
                KNX je tehnologija koja kontroliše automatizaciju integralnih
                funkcija bilo kakvog objekta (rezidencijalnog, komercijalnog,
                industrijskog itd) kao što su HVAC, rasvjeta, multimedija,
                sigurnost, energetski menadžment i više.
              </p>
              <p>
                U ovom dijelu će te saznati sve što trebate da znate o KNX
                tehnologiji, kako KNX funkcioniše i zašto bi uzeli u obzir KNX
                sistem pri integraciji u postojeći objekat ili za vaš budući
                građevinski projekat.
              </p>
            </section>
            <section id={styles.two}>
              <h2>Šta je KNX?</h2>
              <img
                src={require('../../assets/img/usluge/knxbemi1.jpg')}
                alt=""
              />
              <p>
                Da bi prenijeli podatke do svih komponenti (smart home uređaja)
                u objektu potreban je sistem koji izbjegava problem kad veći
                broj izoliranih uređaja komunicira različitim jezicima.
              </p>
              <p>
                KNX uređaji mogu da upravljaju rasvjetom, roletnama i
                žaluzinama, HVAC, sigurnosnim sistemima, energetskim
                menadžmentom, audiom i videom, bijelom tehnikom, displejima,
                daljinskim upravljačima itd.
              </p>
              <p>
                KNX je jedini svijetski standard za kućnu i kontrolu objekata,
                sa preko 300 različitih proizvođača koji proizvode produkte koji
                mogu svi raditi međusobno u jednom sistemu.
              </p>
              <p>
                KNX funkcioniše po principu da obezbjedi svim komponentama,
                uređajima, svojstvima i funkcijama bilo kojeg objekta međusobnu
                komunikaciju preko jednog zajedničkog jezika, brzo i na daljinu.
              </p>
            </section>
            <section id={styles.three}>
              <h2>Kako KNX fukcioniše ?</h2>
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
                Poslije toga se tehnološki elementi u objektu međusobno spoje
                preko glavne bus linije u skladi sa važečim KNX standardima.
                Kablovski sistem je onda pod kontrolom uređaja kao što su
                senzori, detektori, parametri itd, koji se kasnije mogu
                kontrolirati putem korisnika (laptop, smart phone, tablet,
                daljinski upravljači).
              </p>
              <p>
                KNX bus je uvezan paralelno sa glavnim električnim snadbjevanjem
                do svih uređaja i sistema na mreži, spajajući slijedeće:
              </p>
              <ul>
                <li>
                  Senzori (push tasteri, termostati, meteorološke stanice,
                  senzori pokreta i drugi) - prikupljaju informacije i šalju na
                  bus u vidu telegrama(podataka)
                </li>
                <li>
                  Aktori (dimeri, ventili za grijanje, displeji) - primaju
                  telegrame koji su onda konvertirani u rad
                </li>
                <li>
                  Kontroleri i druge logičke funkcije (kontroleri sobne
                  temperature, kontroleri roletni itd)
                </li>
                <li>
                  Sistemski uređaji i komponente (linijski kupleri, backbone
                  kupleri)
                </li>
              </ul>
              <img
                src={require('../../assets/img/usluge/homenergy(2).jpg')}
                alt=""
              />
              <p>
                Mnogo aktora također posjeduje kontrolnu funkcionalnost, kao i
                senzorsku funkcionalnost (mjerenje operativnih sati, broj
                sklopnih ciklusa, potrošnja električne energije itd.)
              </p>
              <p>
                Aplikacioni softver u kombinaciji sa sistemskom topologijom i
                ETS programom se instalira u uređaje pomoću interfejs
                komponente.
              </p>
              <p>
                Instaliranim KNX sistemima se može pristupiti preko LAN-a,
                point-to-point telekomunikacijske konekcije, mobilne mreže,
                računara, tableta, ekrana na dodir, pametnih telefona.
              </p>
            </section>
            <section id={styles.four}>
              <h2>
                Kojim svojstvima, funkcijama, uređajima može KNX upravljati?
              </h2>
              <img
                src={require('../../assets/img/usluge/knxmanage.jpg')}
                alt=""
              />
              s
              <p>
                U kući, KNX riješenja prave život jednostavnijim sa pouzdanim,
                inteligentnim i korisnički usmjerenim automatizacijama koji
                kontrolirišu i upravljaju rasvjetu, roletne i žaluzine, HVAC,
                sigurnosne sisteme, multimediju, pametne uređaje i vise.
              </p>
              <p>
                Bilo koji produkt označen sa oficijalnim KNX zaštitnim znakom je
                testiran od strane KNX kreditiranih laboratorija.
              </p>
              <p>
                Tokom testne stadije za KNX kompatibilne produkte, uređaj se
                provjerava da podržava KNX protokol i korisni podaci su kodirani
                po globalnom KNX standardu.
              </p>
            </section>
            <section id={styles.five}>
              <h2>
                Kakva je energetska efikasnost i kako smanjiti energetsku
                potrošnju?
              </h2>
              <img
                src={require('../../assets/img/usluge/knxenerg1.jpg')}
                alt=""
              />
              <div id={styles.fivetxt}>
                <p>
                  KNX sistemi za pametne kuće u komercijalne objekte ne same da
                  pružaju bolju kontrolu i praktičnost, KNX također istovremeno
                  enormno smanjuje energetske troškove tako što konstantno
                  nadgleda i prilagođava operativne postavke za sve konektovane
                  uređaje na KNX bus.
                </p>
                <a href="img/usluge/monitoring.jpg">
                  <img
                    src={require('../../assets/img/usluge/monitoring.jpg')}
                    alt=""
                  />
                </a>
                <p>
                  KNX sistemi doprinose efektivnom energetskom menadžmentu kroz
                  vrhunsko zahtjevnom nadgledanju, detekciji struje, mrežnom
                  nadgledanju, pametnom mjerenju, brojanju energetskih pulseva,
                  logiranju podataka i vizualizaciji.
                </p>
              </div>
            </section>
            <section id={styles.six}>
              <h2>U kakvim se objektima može instalirati KNX sistem?</h2>
              <a href="img/usluge/knxobjects.jpg">
                <img
                  src={require('../../assets/img/usluge/knxobjects.jpg')}
                  alt=""
                />
              </a>
              <p>
                KNX infrastruktura i KNX pametni sistemi se mogu koristiti u
                bilo kakvom objektu ili vanjskom prostoru, od male porodične
                kuće pa sve do velikih tržnih centara i industrijskih kompleksa.
              </p>
              <ul>
                <li>Privatne kuće</li>
                <li>Rezidencijski smještaji (apartmani, gradske kuće ...)</li>
                <li>Službene zgrade (uredi)</li>
                <li>Škole</li>
                <li>Trgovi</li>
                <li>Kasina</li>
                <li>Bolnice</li>
                <li>Trgovački centri</li>
                <li>
                  Javni objekti i vanjski prostori (Zgrade vlade, biblioteke)
                </li>
                <li>Industrijski postrojenja i fabrike</li>
                <li>+ Više</li>
              </ul>
            </section>
            <section id={styles.seven}>
              <h2>
                Može li se KNX sistem ugraditi u već postojeće objektne
                strukture i da li je KNX tehnologija dobra opcija za budućnost?
              </h2>
              <div className={styles.sigurnostl}></div>
              <img
                src={require('../../assets/img/usluge/knxfuture1.jpg')}
                alt=""
              />
              <p>
                KNX sistem je svestran, i može se sa lakoćom ugraditi u već
                postojeće objekte.
              </p>
              <p>
                KNX sitem je također proširiv sa sigurnom budučnošću. To znači
                da bilo koji KNX sistem se može proširiti ili repgroramirati sa
                lakoćom
              </p>
              <p>
                Jednom instaliran, KNX sistem se adaptira na individualne
                potrebe korisnika.
              </p>
              <p>
                KNX tehnologija pruža perfektno dugoročno rješenje za raznovrsnu
                upotrebu u raznim objektima i cijeli sistem se sa lakoćom
                adaptira kada tehnologija uznapreduje i novi KNX produkti
                postanu dostupni.
              </p>
            </section>
            <section id={styles.eight}>
              <h2>
                Koje su glavne prednosti korištenja KNX tehnologije <br />
                pored manje energetske potrošnje?
              </h2>
              <div className={styles.sigurnostl}></div>
              <img
                src={require('../../assets/img/usluge/knxbenefits1.jpg')}
                alt=""
              />
              <p>
                KNX tehnologija je rezultat intenzivnog znanja i iskustva
                skupljenog preko zadnjih 15 godina sa prethodnim tehnologijama
                kao što su EIB(European Installation Bus), European Home System
                (EHS) i BatiBUS.
              </p>
              <h3>
                Ispod su 10 glavnih prednosti korištenja KNX sistema za pametne
                kuće i pametnu automatizaciju objekata.
              </h3>
              <h3>
                1. KNX je internacionalni standard za pametnu automatizaciju
                objekata i njihove kontrole i ima sigurnu budućnost.
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
                ANSI/ASHRAE je odobro KNX tehnologiju kao Američki standard
                ANSI/ASHRAE 135 u 2005.
              </p>
              <h3>
                2. KNX garantuje mogućnost međusobne komunikacije uređaja sa
                oficijalnim KNX produkt certifikacijom.
              </h3>
              <p>
                KNX certifikacijski proces osigurava da različiti produkti
                različitih proizvođača rade i komuniciraju međusobno.
              </p>
              <p>
                Ovo osigurava veliku fleksibilnost u ekstenziji i modifikaciji
                KNX instalacija.
              </p>
              <p>
                KNX je jedini kućni i objektno kontrolni standard koristeći
                globalnu certifikacijsku šemu za produkte, trening centre
                (privatne institucije) i za individualne osobe (izvođači elektro
                radova, dizajneri objekata).
              </p>
              <h3>3. KNX stoji za veliki kvalitet produkata</h3>
              <p>
                KNX asocijacija zahtjeva veliki nivo produkcije i kontrole
                kvaliteta tokom svih stadija života KNX produkta.
              </p>
              <p>
                U bilo kom slučaju dvojbe, KNX asocijacija može certifikovane
                produkte retestirati ili zatražiti dodatne testne izvještaje od
                strane proizvođača.
              </p>
              <h3>
                4. Unikatani neovisni inžinjerski alatni softver ETS &reg;.
              </h3>
              <p>
                PC softverski alat ETS mogućava planiranje, inžinjering i
                konfiguraciju svih certificiranih KNX uređaja.
              </p>
              <p>
                Alat je proizvođački neovisan, što znači da može kombinuje
                produkte od raznih proizvođača u jednu instalaciju
              </p>
              <h3>
                5. KNX se može koristiti za sve aplikacije u pametnoj kući i
                objektnoj automatizacijskoj kontroli.
              </h3>
              <p>
                KNX se može koristiti za razne aplikacije u kući i objektnoj
                kontroli polazeći od rasvjete, roletna i žaluzina, grijanja,
                ventilacije, klime, nadgledanja, alarma, kontroli vode,
                energetskog menadžmenta, mjerenja i kućnih aparata, audio itd.
              </p>
              <p>
                KNX poboljšava komfort i sigurnost, doprinosi smanjenju
                električne energije, zaštiti klime (do 50% za kontrolu rasvjete
                i isti iznos uređaje klime).
              </p>
              <h3>
                6. KNX se može koristiti u raznim rezidencijalnim,
                komercijalnim, industrijskim i vanjskim prostorima.
              </h3>
              <p>
                KNX se također može koristiti i integrisati u nove i postojeće
                objektne strukture.
              </p>
              <p>
                KNX instalacije tako može sa lakoćom proširiti i adaptirati na
                nove potrebe i zahtjeve, sa minimalnim vremenskim i financijskim
                investicijama.
              </p>
              <p>
                KNX se može instalirati u male porodične kuće kao i veće
                objekte(poslovni prostori, hoteli, konferencijski centri,
                bolnice, škole, robne kuće, aerodromi itd.
              </p>
              <h3>
                7. KNX podržava velik broj različitih konfiguracijskih modela.
              </h3>
              <p>
                KNX pruža različite ulazne nivoe za realizaciju KNX projekata.
              </p>
              <p>
                Preko KNX E-modusa, KNX nekvalifikovani izvođači elektro radova
                su adresirani.
              </p>
              <p>
                Preko S-modusa, KNX trenirani izvođači radova su u mogučnosti da
                realiziraju sofisticirane instalacije.
              </p>
              <p>Različiti modus su:</p>
              <p>
                Lagana instalacija (E-modus): Konfiguracija je završena bez
                pomoći računara ali sa centralnim kontrolerom ili push
                tasterima. Produkti kompatibilni sa E-modusom imaju limitiranu
                funkcionalnost i namijenjeni su za instalacije srednje veličine.
              </p>
              <p>
                Sistem instalacija (S-modus): planiranje instalacije i
                konfiguracija je izvršena pomoću računara sa instaliranim ETS
                softverskim alatom, gdje svi podaci proizvođača su sačuvani u
                ETS bazi podataka. S-modus je namijenjen za KNX certificirane
                instalatere i za instalacije večih razmjera.
              </p>
              <h3>8. KNX podržava veliki broj komunikacijskih medija.</h3>
              <p>
                Svaki komunikacijski medij se može koristiti u kombinaciji sa
                jednom ili više konfiguracijskih modela.
              </p>
              <p>
                Ovo omogučava svakom proizvođaču da izabere odgovarajuću
                kombinaciju za ciljani tržišni segment i aplikaciju.
              </p>
              <p>
                Twisted Pair (KNX TP): KNX se prenosi kroz odvojeni bus kabal,
                hijerarhijska struktura u linijama i poljima.
              </p>
              <p>
                Power Line (KNX PL): KNX se prenosi na postojećoj glavnoj mreži.
              </p>
              <p>
                Radio frekvencija (KNX RF): KNX se prenosi uz pomoć radio
                signala. Uređaji mogu biti uni ili bidirekcionalni.
              </p>
              <p>
                IP/Ethernet (KNXnet/IP): Ovaj komunikacijski medij se može
                koristiti u spoju sa KNXnet/IP specifikacijama, što dozvoljava
                usmjeravanje KNX okvira(frame-ova) u IP okvire.
              </p>
              <h3>9. KNX se može spojiti sa drugim sistemima.</h3>
              <p>
                Mnogobrojni KNX proizvođači nude gateway-e do ostalih mreža
                (drugih objektnih automatizacijskih sistema, telefonskih mreža,
                multimedijskih mreža, IP mreža itd).
              </p>
              <p>
                KNX sistemi se mogu mapirati u BACnet objekte, ili pruža
                mogučnost da interfejsa sa DALI tehnologijom.
              </p>
              <h3>
                10. KNX je neovisan od bilo kakvih hardver ili softver
                tehnologija.
              </h3>
              <p>
                KNX se može realizirati na bilo kojoj mikroprocesorskoj
                platformi.
              </p>
              <p>
                KNX se može implementirati od starta. Kako god, za lagan
                marketinški ulaz, KNX proizvođači mogu da uzmu resurse do
                nabavljača KNX sistemskih komponenti.
              </p>
            </section>
            <section id={styles.nine}>
              <div id={styles.knxprednosti}>
                <div id={styles.controlremote}>
                  <div id={styles.crheader}>
                    <h2>Kontroliši funkcionalnosti pametne kuće izdaleka</h2>
                    <div id={styles.crline}></div>
                    <p>
                      Lagano i odmah pristupi, upravljaj i kontroliši sve
                      funkcije pametne kuće od bilo kuda u svijetu koristeći
                      tablet ili pametni telefon.
                    </p>
                  </div>
                  <div id={styles.crbody}>
                    <div className={styles.crbcol}>
                      <i className="fas fa-chart-bar"></i>
                      <h3>Energetski menadžment</h3>
                      <p>Nadgledanje vrhunca potražnje</p>
                      <p>Nadgledanje mreže</p>
                      <p>Mjerenje</p>
                      <p>Brojanje energetskih pulseva</p>
                      <p>Logiranje podataka</p>
                      <p>Vizualizacija</p>
                      <p>Smanjenje opterećenja</p>
                    </div>
                    <div className={styles.crbcol}>
                      <div id={styles.updown}>
                        <i className="fas fa-caret-up fa-2x"></i>
                        <i className="fas fa-caret-down"></i>
                      </div>

                      <h3>Kontrola roletni i žaluzina</h3>
                      <p>Grupna i centralna kontrola</p>
                      <p>Podešeno pozicioniranje</p>
                      <p>Pračenje sunca</p>
                      <p>Automatski programi</p>
                      <p>Reagovanje u odnosu na klimu</p>
                      <p>Zaštita od vjetra i kiše</p>
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
                      <p>Tehničke greške</p>
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
                <h2>Primjerak našeg rada</h2>
                <div className={styles.ourowrkl}></div>
                <p>
                  KNX sistemi potpuno prilagođeni zahtjevima i preferencama
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
                  <input type="submit" value="Pošaljite" />
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
              <h2>Povjerite nama instalaciju rasvjete vašeg doma</h2>
              <div id={styles.rasvjetal}></div>
              <p>Osvjetlite vaš dom</p>
            </div>
            <div id={styles.rasvjetabb}>
              <div className={styles.rasvjetacol}>
                <h3>Bežićna (Hue) Rasvjeta</h3>
                <img
                  src={require('../../assets/img/usluge/mobileresize/0012res.jpg')}
                  alt=""
                />
              </div>
              <div className={styles.rasvjetacol}>
                <h3>Unutrašnja Rasvjeta</h3>
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
                Rasvjeta je jedna od najraznovrsnijih područja elektrotehnike.
              </p>
              <p>
                Kao certificirani KNX / EIB partner smo u mogućnosti ponuditi
                kompleksna rješenja i surađujemo sa poznatim proizvođačima.
              </p>
              <p>
                Ako trenutno planirate renoviranje ili novogradnju onda je
                shodno tome i rasvjeta jedna od aktuelnih tema. Zbog toga je
                konkretno planiranje i profesionalna implementacija vaše
                rasvjete važan zadatak kojeg ćemo rado preuzeti.
              </p>
              <section id={styles.ur}>
                <img
                  id={styles.rgif}
                  src={require('../../assets/img/maybeanimation.gif')}
                  alt=""
                />
                <h2>Unutrašnja Rasvjeta</h2>

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
                      Osnovno pravilo za osvjetljenje životnog ili radnog
                      prostora je dobra i kvalitetna rasvjeta koja omogućava
                      jasnu orijentaciju u prostoru te pruža dovoljno svjetla za
                      pogled na regale, ladice i slično. Prostorije osvjetljene
                      samo opštom rasvjetom brzo postaju monotone i u njima nema
                      pravog odnosa svjetla i sijene.
                    </p>
                    <p>
                      Ako u svom domu želite dodati posebnu i ugodnu atmosferu,
                      nemojte posezati za zidnim bojama, biljkama ili nekim
                      drugim dekorativnim sadržajem. Najveću i najefikasniju
                      promjenu u Vašem prostoru bez obzira na namjenu (životni
                      prostor, poslovni prostor ili sl.) omogućit će upravo
                      pravilno i stručno postavljeni izvori svijetlosti kojima
                      možete pokazati sve prednosti i sakriti sve mane u Vašem
                      prostoru.
                    </p>
                    <p>
                      Naš tim električara će dovesti vaš dom na novi estetski
                      nivo. Unutrašnja rasvjeta je esencijalni dio dizajna doma
                      ali može i biti veliki potrošač električne energije.
                    </p>
                    <p>
                      Zbog tog razloga naš tim će instalirati rasvjetu koja
                      najbolje odgovara vašem životnom stilu i budžetu. Naši
                      električari uvijek stavljaju vaše potrebe na prvo mjesto,
                      tako da garantujemo 100%-u satisfakciju.
                    </p>
                    <p>
                      Da li vi željeli nadograditi trenutnu rasvjetu ili
                      povećati efikasnost električne energije u vašem domu, naš
                      tim je tu da vam pomogne. Naši električari su
                      kvalifikovani da podnesu bilo koje izazove u instalaciji i
                      sigurni smo da ćemo ostvariti vašu željenu rasvjetu.
                    </p>
                    <p>
                      Različiti tipovi rasvjete koji se mogu instalirati u vašem
                      objektu:
                    </p>
                    <ul>
                      <li>Ugradbena Rasvjeta</li>
                      <li>Rasvjeta za Multimedijalne Prostorije</li>
                      <li>Umjetnička Rasvjeta</li>
                      <li>Viseća Rasvjeta</li>
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
                      <h3>Umjetnička Rasvjeta</h3>
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
                      <h3>Viseća Rasvjeta</h3>
                      <img
                        className={styles.hideDesktop}
                        src={require('../../assets/img/usluge/mobileresize/viseće1.jpg')}
                        alt=""
                      />
                      <img
                        className={styles.hideMobile}
                        src={require('../../assets/img/usluge/viseće.jpg')}
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
                    U današnje vrijeme posebno treba pridodati pažnju velikim
                    uštedama na energiji i to korištenjem LED dioda, LED traka i
                    drugog. Otvoreni prostori osvjetljeni LED rasvjetom lijepo
                    su osvjetljeni, vrlo privlačni i ugodni.
                  </p>
                  <p>
                    Osobito je postignut veliki efekt u vrtovima odnosno
                    dvorištima. Vanjska rasvjeta može služiti kao detalj na
                    popločanim stazama, osvjetljenje ukrasnih grmova, cvijeća te
                    kao dekoracija na fasadi objekta. Vanjska rasvjeta po Vašem
                    izboru može davati efekte u raznim bojama (bijela, toplo
                    bijela, RGB).
                  </p>
                  <p>
                    Spoljašnju rasvjetu moguće je podijeliti na uličnu rasvjetu
                    (rasvjeta puteva), urbanu rasvjetu (rasvjeta trgova i
                    pješačkih zona) i reflektorsku rasvjetu (rasvjeta fasada i
                    prestižnih objekata). Osnovna uloga spoljašnje (vanjske)
                    rasvjete je:
                  </p>
                  <ul>
                    <li>
                      Dobra rasvjeta smanjuje broj nesreća i povećava sigurnost
                      na putevima, te osigurava vidljivost pješacima i
                      biciklistima
                    </li>
                    <li>
                      Rasvjeta povećava zaštitu i sigurnost ljudi i objekata
                    </li>
                    <li>
                      Rasvjeta omogućuje pravovremeno uočavanje opasnih i
                      novonastalih situacija na cesti
                    </li>
                    <li>
                      Položaj svjetiljaka pokazuje putanju ceste, odnosno
                      djeluje kao "vodič"
                    </li>
                    <li>
                      Rasvjeta omogućuje orijentaciju tj. izbor pravog puta
                    </li>
                    <li>
                      U gradovima rasvjeta naglašava rezidencijalnu vrijednost i
                      stvara urbanu atmosferu
                    </li>
                    <li>
                      Rasvjeta predstavlja važan element kvaliteta ljudskog
                      života
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
                        Zidne lampe predstavljaju obogaćenje za svaku sobu ili
                        vanjski prosto. Zidne lampe se večinom ne smatraju kao
                        dio standardne električne instalacije, ali se bez
                        problema mogu ugraditi u svaku novogradnju, tako da
                        svijetlo ne dolazi samo gornje strane. Najkorisnije su u
                        stubištima, dugim hodnicima, čekaonicama, fasadama itd.
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
                        instalirati na plafonu, kao npr. ispod nadstrešnice. U
                        večini slučajeva se montiraju mogu montirati i na zid.
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
                        mogu montirati direktno u pod ili pomoću baze.
                      </p>
                    </div>
                    <div className={styles.vrfcol}>
                      <h3>Spot Rasvjeta</h3>
                      <img
                        src={require('../../assets/img/usluge/outdoorimg2.jpg')}
                        alt=""
                      />
                      <p>
                        Spot rasvjeta je jedan od najpopularnijih načina za
                        transformaciju interijera kroz rasvjetu. Dizajn
                        reflektora je tijelo skriveno u površini i prednji dio
                        koji se sastoji od žarulje, difuzora, reflektora i
                        drugih dekorativnih detalja. Njihove glavne prednosti su
                        kompaktnost, strogost i raznovrsnost upotrebe.
                        Raznovrsnost točkastih svjetala je u tome što se koriste
                        za opću rasvjetu i za lokalno osvjetljenje. Oni su
                        najprikladniji za svjetlo dizajn stropova, niše, lukovi,
                        grede, kao i dekorativni elementi. Postoje modeli
                        svjetiljki s okretnom konstrukcijom. Okrećući se oko
                        svojeg pokretnog dijela, možete usmjeriti svjetlo ka
                        željenom smjeru.
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
                        Spotovi sa prizemnim šiljcima se koriste da osvjetle
                        kućnu fasadu ili dio bašte koji hoćete da istaknete.
                      </p>
                    </div>
                    <div className={styles.vrfcol}>
                      <h3>Svijetleće Cijevi</h3>
                      <img
                        src={require('../../assets/img/usluge/Lichtschlauch_Beet.jpg')}
                        alt=""
                      />
                      <p>
                        Da li ste u potrazi za jedinstvenim estetskim konceptima
                        za vaš vrt ? Sa malo mašte i svijetlećim šlaufom možete
                        ostvariti vaše ideje.
                      </p>

                      <div id={styles.spoji1}>
                        <p>Možete istaći staze i stepenice.</p>
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
                                pomoć svijetlećih cijevi dobija dodatnu
                                atmosferu. Mogu se koristiti i različite boje.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id={styles.pwrap1}>
                        <p>
                          Vanjska rasvjeta terasa, ograda i vikendica uz pomoć
                          svijetlećih cijevi dobija dodatnu atmosferu. Mogu se
                          koristiti i različite boje.
                        </p>
                      </div>
                      <div id={styles.spoji2}>
                        <div id={styles.spoji20}>
                          <p>Možete naglasiti i ivice bazena.</p>

                          <img
                            src={require('../../assets/img/usluge/Lichtschlauch_Pool.jpg')}
                            alt=""
                          />
                        </div>
                        <div id={styles.spoji21}>
                          <p>
                            Korištenje u vodi je također opcija, ovdje smo mali
                            vodopad drastično osvijetlili.
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
                <p>Personalizirani sistem bežićne rasvjete</p>
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
                    Više od osvjetljenja, Philips Hue oživljava vašu maštu.
                    Budite se svako jutro uz sunčevu svjetlost. Podesite
                    rasvjetu da djeluje kao da ste kod kuće, čak i kada niste.
                    Otkrijte što sve Philips Hue može.
                  </p>
                  <div id={styles.huebodyg}>
                    <div className={styles.huecol}>
                      <div className={styles.huecolimg}></div>
                      <div className={styles.huecoltxt}>
                        <h3>Igrajte se sa 16 miliona boja</h3>
                        <p>
                          Raspon od 16 miliona boja pruža vam neograničene
                          mogućnosti sa vašim osvjetljenjem. Unesite život u
                          priče za laku noć, uskladite sportski događaj sa
                          bojama ekipe koju podržavate, ili oslikajte zid u
                          vašem domu dekorativnim svjetlom. Što vi možete
                          zamisliti, Philips Hue može ostvariti.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huecol}>
                      <div className={styles.huecolimg}></div>
                      <div className={styles.huecoltxt}>
                        <h3>Probudite se svaki dan uz sunčevu svjetlost</h3>
                        <p>
                          Dugo nakon što ste ugasili svjetla, ona doprinose
                          vašem blagostanju. Philips Hue može vam pomoći buditi
                          se i uspavljivati prirodnije, simulirajući uvjete
                          jutarnjeg i večernjeg prirodnog osvjetljenja. Za
                          razliku od glasnih budilica, buđenje pomoću svjetla je
                          nježno i neinvazivno. Prije nego zaspete, toplo bijelo
                          svjetlo opušta vaše tijelo, pripremajući vas za
                          kvalitetan san.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huecol}>
                      <div className={styles.huecolimg}></div>
                      <div className={styles.huecoltxt}>
                        <h3>Glasovno upravljajte rasvjetom</h3>
                        <p>
                          Od sada možete upravljati rasvjetom glasovnim
                          naredbama. Philips Hue kompatibilan je sa Amazon
                          Alexa, Google Assistant i Apple HomeKit te vam
                          omogućava glasovno upravljanje rasvjetom. Možete
                          svjetla uključiti, isključiti, pojačati, prigušiti ili
                          mijenjati boje u skladu sa željama i raspoloženjem u
                          svakom trenutku. Uživajte u automatizaciji doma uz
                          rasvjetu kojom upravljate glasom.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huecol}>
                      <div className={styles.huecolimg}></div>
                      <div className={styles.huecoltxt}>
                        <h3>Kod kuće i izvan nje</h3>
                        <p>
                          Prilikom dolaska kući, možete zadati aplikaciji
                          paljenje svjetala pomoću geolokacijske funkcije, kako
                          bi vas dom dočekao prikladno osvjetljen. Philips Hue
                          također može stvoriti privid da ste doma i onda kada
                          ustvari niste. Sve što trebate jest upotrijebiti
                          funkciju automatskog rasporeda paljenja svjetala
                          unutar Philips Hue aplikacije. Upravljajte
                          osvjetljenjem daljinski ili podesite više
                          automatiziranih rasporeda paljenja, kako biste
                          osvjetlili razne prostorije u različito vrijeme.
                          Također, možete namjestiti postepeno gašenje svjetala
                          tokomm noći, pa više nećete morati brinuti o tome
                          jeste li zaboravili ugasiti neko od njih.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id={styles.huebody2g}>
                    <h2>
                      Philips Hue <span className={styles.hidem}>|</span>{' '}
                      Pametan na toliko načina
                    </h2>
                    <div className={styles.huebodycol2}>
                      <div className={styles.huebimg}></div>
                      <div className={styles.huebtxt}>
                        <h3>
                          Pametne Philips Hue LED žarulje i druga rasvjetna
                          tijela
                        </h3>
                        <p>
                          Philips Hue zasnovan je na pametnom i energetski
                          efikasnom LED rasvjetnom sustavu, koji pruža
                          funkcionalno i ugodno svjetlosno iskustvo za sve vaše
                          redovne aktivnosti, posebne trenutke, kao i za
                          doživljaj filmova, kompjuterskih igara i glazbe.
                          Philips Hue rasvjetna tijela vrlo su praktična. Može
                          se prigušivati i pojačavati razina osvjetljenja. Mogu
                          treperiti, pulsirati, ali i mijenjati boje. Možete
                          postići gotovo sve što poželite. Dostupna su u raznim
                          oblicima, veličinama i modelima kako bi se što bolje
                          uklopila u vaš dom.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huebodycol2}>
                      <div className={styles.huebimg}></div>
                      <div className={styles.huebtxt}>
                        <h3>Bridge – pametan bežični hub</h3>
                        <p>
                          Bridge je srce Philips Hue sistema, koje bežično
                          povezuje pametni uređaj sa Philips Hue rasvjetnim
                          tijelima. Možete povezati do 50 Philips Hue rasvjetnih
                          tijela i dodataka na jedan Bridge. Nakon što ga
                          povežete sa Wi-Fi routerom, Bridge povezuje vaš sustav
                          sa ostatkom svijeta putem Interneta, kako biste mogli
                          njime upravljati i kada ste izvan doma, kao i
                          koristiti mnoge druge pametne funkcije. Bridge je
                          uključen u svaki Philips Hue starter paket, ali,
                          možete ga kupiti i odvojeno i izgraditi
                          personalizirani Philips Hue sistem.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huebodycol2}>
                      <div className={styles.huebimg}></div>
                      <div className={styles.huebtxt}>
                        <h3>Pametno upravljanje</h3>
                        <p>
                          Vaš Philips Hue sistem možete kontrolirati sa bilo
                          kojeg pametnog uređaja, gdje god se nalazili. Kako
                          biste najlakše podesili razinu osvjetljenja,
                          svjetlosne podsjetnike i alarme, mijenjali boje (i još
                          mnogo toga), odaberite Philips Hue aplikaciju. Za još
                          jednostavniju kontrolu, koristite Hue bežični prekidač
                          za prigušivanje ili Hue Tap sklopku. Spremite vaše
                          omiljene scene i svjetlosne scene, kako biste ih
                          uvijek imali pri ruci. Hue senzor pokreta, koji radi
                          na baterije, upravljati će vašim rasvjetnim tijelima
                          automatski. Podesite ih na način na koji su vam
                          potrebna i prema svrsi za koju su vam potrebna. Kako
                          biste upravljali vlastitim rasvjetnim sistemom, ne
                          morate čak ni biti kod kuće, što je dobro za vaš
                          duševni mir.
                        </p>
                      </div>
                    </div>
                    <div className={styles.huebodycol2}>
                      <div className={styles.huebimg}></div>
                      <div className={styles.huebtxt}>
                        <h3>Pametni bežićni rasvjetni sistem</h3>
                        <p>
                          Philips Hue bežični rasvjetni sistem bazira se na
                          ZigBee LightLink, sigurnoj i pouzdanoj tehnologiji
                          upravljanja vašim osvjetljenjem, a male potrošnje.
                          Software i firmware nadogradnje obavljaju se bežićno,
                          izravno na rasvjetna tijela. Philips Hue sistem
                          jednostavno je moguće integrirati sa ostalim sistemima
                          na bazi ZigBee protokola za dodatnu automatizaciju
                          vašeg doma.
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
                    Za Vas izvodimo montažu i instalaciju za LED rasvjetu radi
                    uštede energije i trajnosti svjetiljki.
                  </h3>
                  <p>
                    Mi ćemo se pobrinuti za vašu instalaciju rasvjete, bilo
                    atmosfersku ili toplu, svečanu ili opuštajuću. Moderna LED
                    rasvjeta vam pruža ugodni životni ambijent.
                  </p>
                  <p>
                    Različite opcije i mogućnost da mijenjamo boje i intenzitet
                    preko aplikacije ili šaltera, nam dozvoljavaju da
                    prostorije, namještaj i umjetničke objekte prikažemo u novom
                    svijetlu.
                  </p>
                  <p>
                    Najvažnija karakteristika led rasvjete je ekonomičnost. Na
                    prvom mjestu je manja potrošnja, manje zagrijavanje led
                    dioda pri stvaranju svjetlosti. Kao drugo je odlična razina
                    osvjetljenosti. Radna temperatura LED žarulja je 50°C što je
                    znatno niže od dosada korištenih vrsta rasvjete. Sve to
                    omogućava njenu dugotrajnost koja je izrazita i traje 10
                    puta duže.
                  </p>
                  <p>
                    Prednosti su mnogobrojne. Prije svega visoka efikasnost u
                    pretvaranju električne energije u svjetlosnu (što povlači
                    manje zagrijavanje svjetlosnog izvora, jer se inače "višak"
                    pretvara u toplotu), male dimenzije, lako podešavanje jačine
                    osvjetljenja (a uz odgovarajući sklop-RGB kontrloler- i
                    izbor boje, do punog zasićenja), bitno duži radni vijek u
                    kome nema naglog pregorijevanja izvora svjetla a još manje
                    neprijatnog treperenja pri kraju radnog vijeka kao kod
                    fluroscentnih cijevi, odsustvo infracrvenog i
                    ultraljubičastog opsega, otpornost na udarce i vibracije,
                    trenutno postizanje pune snage kao i otpornost na često
                    uključivanje i isključivanje.
                  </p>
                  <p>
                    LED lampe rade bolji posao oponašajući prirodno svjetlo nego
                    druge sijalice, što je i lakše za vaše oči. LED sijalice su
                    fleksibilnije, led trake se mogu plasirati u udubljene
                    police, iza TV-a, uz pod. LED trake doprinose sigurnosti i
                    estetskom izgledu, skuplje trake mogu i mijenjati boju na
                    odgovarajuće komande.
                  </p>
                  <h3>Vrste LED rasvjete</h3>
                  <p>
                    Najosnovnija podjela je na unutarnju i vanjsku. Postoje i
                    brojne pod vrste rasvjete. Primjeri unutarnje su: stolne,
                    podne i zidne te različite vrste stropne rasvjete. Vanjsku
                    rasvjetu predstavljaju led reflektori, zidna rasvjeta, lampe
                    sa senzorom, podna za terase i rasvjeta poslovnih objekata.
                    Svaka prostorija odgovara aktivnostima koje se provode u
                    njoj. Na osnovu toga birajte i rasvjetna tijela. Neke
                    prostorije uključuju više od jedne aktivnosti, stoga i izbor
                    rasvjetnih tijela prilagodite tome.
                  </p>
                  <h3>Prednosti LED rasvjete</h3>
                  <ul>
                    <li>
                      Ekonomičnost – LED rasvjeta troši 10 puta manje struje od
                      istih žarulja sa žarnom niti i 40% je ekonomičnija od
                      luminiscentnih izvora svjetlosti
                    </li>
                    <li>
                      Trajanje rada – LED lampe mogu funkcionirati 11 godina
                      neprekidnog rada, što premašuje obične lampe za 100 puta
                    </li>
                    <li>
                      Trajnost i sigurnost – zbog odsutnosti užarenih niti i
                      staklenih kućišta, LED žarulje su otporne na udarce i
                      vibracije: na radne parametre lampe neće utjecati ni pad s
                      visine od 1,5 metara. Nedostatak topline čini ih
                      vatrootpornim
                    </li>
                    <li>
                      Tihi rad, odsustvo UV zračenja – LED rasvjeta emitira čak
                      i svjetlo bez treperenja, za razliku od fluorescentnih
                      svjetiljki, čije je osvjetljenje popraćeno klikovima,
                      cviljem, jednokratnim isključivanjem i generiranjem
                      ultraljubičastog zračenja
                    </li>
                    <li>
                      Široki raspon temperatura – LED-rasvjeta može raditi u
                      teškim uvjetima na temperaturama od -60 do 50 ° C
                    </li>
                    <li>
                      Orijentacija rasvjete – ogroman raspon izmjena LED-a s
                      raspršenjem svjetlosti pod uglom od 10 do 140 stepeni
                    </li>
                    <li>Ne sadrže živu</li>
                    <li>
                      Miješanje 3 osnovne boje (crvena, zelena i plava) u
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
                      Takav niz prednosti dopušta korištenje LED svjetiljki u
                      osvjetljenju dnevnih i tehničkih prostorija: kupaonica,
                      spremišta, svlačionica, hodnika, stubišta, kao i u javnim
                      zgradama: bolnicama, uredima, knjižnicama i drugim
                      organizacijama.
                    </p>
                    <p>
                      Glavna osobina nadzemnih instalacija je da se njihova
                      instalacija može planirati ne samo u fazi popravaka, već i
                      nakon završetka tog procesa. Odlično rješenje za ovu vrstu
                      rasvjete bit će za one koji razmišljaju o korištenju
                      svjetla za namještaj ili naglasno osvjetljenje pojedinih
                      dijelova prostorije.
                    </p>
                    <p>
                      Prema načinu pričvršćivanja na površinu postoje zidne i
                      stropne lampe. Ovisno o namjeni prostora u kojem će se
                      nalaziti rasvjetni uređaji:
                    </p>
                    <ul>
                      <li>
                        Za dnevnu sobu – u pravilu, to su kvadratne ili okrugle
                        LED lampe s elegantnim nijansama koje sinhroniziraju u
                        stilu s dodatnim rasvjetnim uređajima
                      </li>
                      <li>
                        Za hodnik – uzimajući u obzir konfiguraciju prostorije,
                        možete koristiti jednu ili više okruglih ili pravokutnih
                        tijela ili niz zidnih točaka
                      </li>
                      <li>
                        Za ured – glavna svjetla za ovu sobu odabrana su u
                        zreloj verziji, zajedno s stolnom svjetiljkom
                      </li>
                      <li>
                        Za kuhinje, kupatila i kupaonice – koriste se uređaji
                        različitih oblika sa zatvorenim nijansama,
                        najprikladniji u dizajnu
                      </li>
                      <li>
                        Za pomoćne prostorije – ovdje možete koristiti modele
                        kvadratnog, pravougaonog ili okruglog oblika, s
                        pričvršćivanjem na strop i na zid.
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
                      Modeli nadzemnih LED lampi za kuću imaju mehaničku
                      čvrstoću i otpornost na vibracije, a neke od njih su
                      dizajnirane u anti-vandalskoj izvedbi, što im omogućuje
                      instalaciju u prostorijama s teškim uvjetima, uključujući
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
                      svjetla, već i za osvjetljenje pojedinih zona i elemenata.
                      Zbog raznovrsnih nijansi sjaja, takvi se uređaji koriste
                      za unutarnje uređenje u svim bojama.
                    </p>
                    <p>
                      Spot rasvjeta je jedan od najpopularnijih načina za
                      transformaciju interijera kroz rasvjetu. Dizajn reflektora
                      je tijelo skriveno u površini i prednji dio koji se
                      sastoji od žarulje, difuzora, reflektora i drugih
                      dekorativnih detalja. Njihove glavne prednosti su
                      kompaktnost, strogost i raznovrsnost upotrebe.
                    </p>
                    <p>
                      Raznovrsnost točkastih lampi je u tome što se koriste za
                      opću rasvjetu i za lokalno osvjetljenje. Oni su
                      najprikladniji za svjetlo dizajn stropova, niše, lukovi,
                      grede, kao i dekorativni elementi. Postoje modeli
                      svjetiljki s okretnom konstrukcijom. Okrećući se oko
                      svojeg pokretnog dijela, možete usmjeriti svjetlo na
                      određeni element interijera.
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
                      S obzirom na malu veličinu, nedostatak grijanja i nisku
                      potrošnju energije, LED lampe ugrađene su u ormarić, s
                      unutarnjim i vanjskim prostorom. Takvo osvjetljenje može
                      biti opskrbljeno dodatnim mogućnostima: uključivanje
                      prilikom otvaranja ladice ili vrata ormara, naglašavajući
                      sadržaj svlačionica, stvarajući smjer svjetlosnog toka.
                    </p>
                    <p>
                      Asortiman proizvedenih modela ugradbenih svjetiljki za
                      namještaj vrlo je raznolik. To su lampe okruglog,
                      trokutastog i četvrtastog oblika, čiji su dizajni u
                      potpunosti sastavljeni u namještaj, a na površini ostaje
                      samo ukrasni okvir. Oba odvojena uređaja, kao i setovi
                      koji se sastoje od dva-tri i više žarulja su realizirani.
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
                      Linearne lampe ugrađene su u stropove i zidove od
                      suhozidnih ploča, letvi i drugih premaza. Pomoću spojnih
                      elemenata mogu se montirati u jednoj liniji, te s
                      prijelazom svjetlosne konture sa stropa na zid pod uglom
                      od 90 i 270 stepeni. Dizajn takvog uređaja za osvjetljenje
                      je aluminijsko kućište, LED ploča i plastični difuzor.
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
                      Glavna razlika između takvih izvora svjetlosti i
                      luminiscentnih analoga je u tome što je za osvjetljavanje
                      područja s LED lampama potrebno 3 puta manje struje. I
                      njihov radni vijek premašuje njihove modele za uštedu
                      energije 8-10 puta. Osim toga, uz kontinuirani raspored
                      linearnih lampi nema učinka tamnih mrlja, što vam
                      omogućuje da stvorite nezamislive linije jednolikog sjaja.
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
                    interijera i exterijera, za kuće, komercijalne zgrade,
                    industrijske komplekse i vanjske prostore svih tipova i
                    dimenzija
                  </h3>
                  <p>
                    BEMI Automatizacija donosi sofisticirani i prilagodivi
                    sistem rasvjetnog dizajna za veliku širinu komercijalnih,
                    industrijskih i rezidencijalnih objekata.
                  </p>
                  <p>
                    Mi kombiniramo godine iskustva sa vrhunskom KNX tehnologijom
                    da dizajniramo i integriramo rasvjetna rješenja za razne
                    potrebe.
                  </p>
                  <p>
                    Naš tim če vam pomoći dizajnirati i integrirati inteligentna
                    rasvjetna rješenja, da poboljšate funkcionalnost, sigurnost,
                    estetićnost i na kraju i udobnost korisnika - sa fokusom da
                    poboljšamo operativnu efikasnost objekta.
                  </p>
                  <div id={styles.bemibg}>
                    <div className={styles.bemicol}>
                      <i className={`fas fa-user-check fa-5x`}></i>
                      <h4>Ergonomički Dizajnirano</h4>
                      <p>
                        Od rasvjete do komercijalnih objekata, privatnih
                        rezidencija i vanjske rasvjete za javna mjesta, našim
                        rasvjetnim dizajn servisom smo fokusirani na
                        ostvarivanju optimalne rasvjete za maksimalnu
                        praktičnost, efikasnost i komfor.
                      </p>
                    </div>
                    <div className={styles.bemicol}>
                      <i className={`fas fa-star fa-5x`}></i>
                      <h4>Estetski Lijepo</h4>
                      <p>
                        Mi spajamo stručnost, studije o prirodnoj svjetlosti i
                        KNX tehnologiju da kreiramo estetske displeje i
                        upravljačke rasvjetne sisteme da izdvojimo, naglasimo i
                        unparijedimo rasvjetu bilo unutrašnju ili vanjsku.
                      </p>
                    </div>
                    <div className={styles.bemicol}>
                      <i className={`fas fa-seedling fa-5x`}></i>
                      <h4>Energetski Efikasno</h4>
                      <p>
                        Naši fleksibilni i potpuno podesivi KNX rasvjetni
                        sistemi se mogu koristiti da efikasno upravljaju
                        energetskom potrošnjom i da unaprijede ukupnu operativnu
                        efikasnost objekta, doprinoseći daljinski i direktni
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
                        kontroli za korisnike, koji onda mogu po želji
                        prilagoditi sve postavke, bilo za estetiku,
                        funkcionalnost, sigurnost, očuvanje el. energije.
                      </p>
                      <p>
                        Rasvjetni dizajn i kontrolne funkcije su ključni faktor
                        u optimizaciji objektno operativne efikasnosti,
                        smjanjenju energetskih troškova i očuvanju okoline.
                      </p>
                      <p>
                        Opcije i mogućnosti KNX rasvjete mogu dovesti do
                        ogromnog smjanjenja energetske potrošnje.
                      </p>
                      <ul>
                        <li>
                          Prilagodite i kontrolišite KNX rasvjetu, te sa lakoćom
                          modifikujte ambijent, temperaturu boje, akcentirajte
                          rasvjetu svake sobe, ureda i prostorije
                        </li>
                        <li>
                          Promjenite atmosferu sobe, kreirajte optimalna radna i
                          životna okruženja
                        </li>
                        <li>
                          Osigurajte sigurnost sa automatiziranjem rasvjete
                          specifičnih prostora oko bilo kojeg objekta ili
                          rezidencije
                        </li>
                        <li>
                          Upravljajte energetskom potrošnjom sa automatiziranim
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
                    sunce pruža, ojačavajući prirodne cikluse ukućana.
                  </p>
                  <p>
                    HCL, isto poznato kao cirkadijska rasvjeta (rasvjeta za
                    zdravlje i dobrobit) se može koristiti u mnogo različitih
                    okolnosti, daje ljudima veću svjest, produktivnost i
                    dobrobit.
                  </p>
                  <p>
                    HCL se također može koristiti za opuštanje, od kuće do
                    ureda, HCL sistemi se mogu potpuno upravljati i podešavati
                    preko laptopa, tableta ili mobitela.
                  </p>
                  <img
                    className={styles.addmg}
                    src={require('../../assets/img/usluge/hclcompare.jpg')}
                    alt=""
                  />
                  <p>
                    Rasvjeta ima direktan utjecaj na naše raspoloženje i
                    zdravlje. Danas je naučno dokazano da promjenljivi
                    intenziteti svijetla i boje:
                  </p>
                  <ul>
                    <li>Jačaju bioritam</li>
                    <li>Jačaju koncentraciju</li>
                    <li>Promoviše psihićku i fizićku dobrobit</li>
                    <li>Ublažava poremećaje spavanja</li>
                    <li>Povećava životni kvalitet i energiju</li>
                  </ul>
                  <p>
                    Vijekovima, arhitekti, dizajneri i graditelji su radili na
                    poboljšanju radnog okruženja, bilo to kroz sigurnost,
                    tehnologiju, ili funkcionalni dizajn. I zadnjih par decenija
                    smo mogli vidjeti eksploziju u inovaciji tehnologije, od
                    računara do pametnog telefona, interneta i rasvjete. Sve ovo
                    je pomoglo radnicima da budu efikasniji.
                  </p>
                  <p>
                    Ali šta ako bi mogli dodati novu inovaciju u naše radno
                    okruženje ? Kao dodatak unaprijeđenja alata s kojima radimo
                    u radnom okruženju možemo i da unaprijedimo produktivnost
                    radnika i u isto vrijeme poboljšati njihovu efikasnost.
                  </p>
                  <p>
                    Kada pričamo o rasvjeti, možemo unaprijediti radno okruženje
                    tako što ćemo razmišljati o dizajnu objekta na potpuno nov
                    način. Određene emocije su asocirane sa objektima, i večina
                    tih emocija dolazi od efekata rasvjete na ljude. Tamna, loše
                    osvjetljena prostorija je sterilna i hladna. Zujanje i
                    treperenje starih flourescentnih lampi je loše za
                    koncentraciju i rad. Najbolje prostorije su one gdje
                    rasvjeta surađuje sa okruženjem i stvara pozitivne emocije.
                  </p>
                  <p>
                    Porast LED rasvjete je doprinio večoj konzistenciji i
                    kvaliteti rasvjete. LED nudi velike energetske uštede,
                    fleksibilnost, pouzdanost, i danas su dio gotovo svake
                    instalacije.
                  </p>
                  <p>
                    Za više od 50 godina, prigušne lampe su dostupne za
                    komercijalne prostorije, međutim prethodno je smatrano
                    preskupo za večinu rasvjetnih aplikacija. Postoje LED lampe
                    koje mogu biti upravljane sa prethodnom generacijom
                    kontrola, ali budućnost leži u ugrađivanju kontrolnih
                    sposobnosti u LED drajvere i korištenje digitalnih protokola
                    koji komuniciraju direktno sa dravjerima.
                  </p>
                  <p>
                    Nova vizija o maksimiziranju vrijednosti LED rasvjete ne
                    leži samo u podešavanju intenziteta svjetla, nego i
                    kvaliteti boje, koja sadrži temperaturu boje (CCT-
                    correlated color temperature) i prikazivanje boja.
                    Kontroliranjem intenziteta i boje svjetla, rasvjetni dizajn
                    može da doprinese dodatnoj satisfakciji i produktivnosti
                    ljudi.
                  </p>
                  <p>HCL je slijedeći korak u LED dizanu i kontroli</p>
                  <p>
                    LED bazirana HCL rasvjeta je upravljačka i podesiva preko
                    grupe uzajamnih boja i temperatura (CCT), da probudi
                    određene biološke procese i ponašanje ljudi u dobro
                    dizajniram okruženjima.
                  </p>
                  <img
                    className={styles.addmg}
                    src={require('../../assets/img/usluge/heu.png')}
                    alt=""
                  />
                  <h3 className={styles.rmp}>HCL rasvjeta pri radu</h3>
                  <div className={styles.sigurnostl}></div>
                  <p>
                    Korištenje podesivih LED lampi na ovaj način naziva se HCL
                    rasvjetom, koja pruža mnogo potencijalnih pogodnosti u
                    uredima i radnim okruženjima. Istraživanja se rade o
                    emocionalnim i biološkim ishodima rasvjete koji oponašaju
                    promjene u boji temperature nađene u prirodnom svjetlu.
                  </p>
                  <p>
                    Šta se zasad zna je to da HCL ima vizualne beneficije koje
                    poboljšavaju isukustvo ljudi u prostorijama gdje su
                    svjetiljke instalirane. HCL rasvjeta unaprijeđuje svaku
                    prostoriju, mijenja način na koji je percipirana i stvara
                    razne načine doprinošenja večeg komfora i prilagodljive
                    atmosfere unutar objekata.
                  </p>
                  <p>
                    Bolnice koriste HCL da dodaju CCT, tako da je osoblje uvijek
                    oprezno tokom noćnih smjena. Također se koristi toplija
                    verzija CCT-a u prostorijama gdje se nalaze pacijenti,da bi
                    bili komfortabilni dok se odmaraju i oporavljaju. Škole
                    koriste HCL da studenti budu opušteni i oprezni. U
                    comercijalnim radnim okruženjima, efekti odgovarajuće CCT
                    rasvjete mogu da naprave atmosferu u uredu prirodnijom i
                    komfortabilnijom, i poboljšavaju produktivnost.
                  </p>
                  <p>
                    Napor da držimo radnike zdravim, angažiranim i pažljivim
                    dolazi od stvarnih finansijskih pozadina. Baš kao i
                    ergonomske stolice i tastature, stojeći stolovi su pomogli
                    firmama da imaju sretnije i zdravije radnike. HCL je još
                    jedna opcija u poboljšanju uvjeta radnika.
                  </p>
                  <h3 className={styles.rmp}>
                    Sljedeći koraci u kontroli rasvjete
                  </h3>
                  <div className={styles.sigurnostl}></div>
                  <p>
                    Da se HCL dovede u objekat znači da instaliranje podesivih
                    rasvjetnih tijela i pametnih rasvjetnih kontrola može
                    upravljati intenzitetom i CCT-om. Jedna inovativna
                    tehnologija koja se može implementirati u ove kontrolne
                    strukture jeste uređaj koji može automatski da sinhronizuje
                    rasvjetni ciklus objekta, pomoću astronomskih događaja. To
                    znači da objekat može da emitira iste uslove svjetla izvan
                    objekta, oviseći od precizne širine i dužine lokacije.
                    Naravno da ova opcija se može prebrisati i prilagoditi.
                    Bitna stavka HCL sistema jeste ta da se sistem sam može
                    podešavati u pozadini, tako da upravitelji objekata ne
                    moraju da prave svakodnevne promjene postavki.
                  </p>
                  <p>
                    HCL sistem nije samostalni sistem, več je samo jedan dio u
                    sistemu kontrole rasvjete koji koristi senzore i fotoćelije
                    da bi automatski podesio nivoe svjetlosti i uštedio
                    električnu energiju.
                  </p>
                  <p>
                    Za one koji razmišljaju o dodavanju HCL-a trenutnoj
                    instalaciji moraju da budu informisani o tenutnom ekosistemu
                    prdoukata. Lampe moraju raditi sa rasvjetnim sistemom bez
                    dodavanja dodatne kompleksnosti. Nisu svi proizvođači ovo
                    omogućili, i korisnici neće biti sretni kada ostanu na
                    naprednoj HCL opremi koja se ne može instalirati. To znači
                    da je potreban rasvjetni motor i kontrolni sistem koji je
                    napravljen sa korisnikom u vidu.
                  </p>
                  <p>
                    Instalacija i programiranje može biti kompleksno i skupo sa
                    nekim HCL sistemima. Softver će možda biti potreban od
                    strane proizvođača za dostizanje CCT rješenja. Upoznati smo
                    i sa digitalnim rasvjetnim protokolima kao što su DALI
                    (digital addressable lighting interface) ili DMX kontrola sa
                    podesivim lampama.
                  </p>
                  <p>
                    Tako da moderna rješenja za rasvjetu nisu samo lijepa za
                    vidjeti, sa HCL-om imate mogućnost efektivno iskoristiti sve
                    dobrobiti svijetla.
                  </p>
                  <img
                    id={styles.hclfix}
                    src={require('../../assets/img/usluge/hclshowc.jpg')}
                    alt=""
                  />

                  <div className={`${styles.textbundle} ${styles.firstb}`}>
                    <div className={styles.textbl}>
                      <h3>Šta je HCL (ljudski orijentisana rasvjeta)</h3>
                      <p>
                        Pod pojmom HCL govorimo o modernim rasvjetnim konceptima
                        koji stavljaju ljudski ritam spavanja i buđenja u fokus.
                        HCL orijentisana rasvjetna rješenja uzimaju u obzir
                        biološke efekte svijetla na upravljanje hormona, tako
                        što simuliraju sunčevu svijetlost. Pri tome rade HCL
                        koncepti sa dinamičkim svjetlom, čiju osvjetljenost i
                        boju kontroliše aplikacija.
                      </p>
                    </div>
                    <img
                      src={require('../../assets/img/usluge/hcl-mittel.jpg')}
                      alt=""
                    />
                  </div>
                  <div className={styles.textbundle}>
                    <div className={styles.textbl}>
                      <h3>Kakva HCL rješenja postoje ?</h3>
                      <p>
                        HCL orijentisana rasvjeta se može instalirati kao
                        individualno podesivi elementi ili kao gotova rješenja
                        sa centralnom upravljačkom jedinicom. Sveobuhvatajuća
                        HCL rasvjeta sa upravljačkom jedinicom zahtjeva u svakom
                        slučaju planiranje od strane profesionalaca.
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
                      <h3>Kako funkcioniše HCL ?</h3>
                      <p>
                        HCL sistemi upravljaju rasvjetom na bazi prirodnog
                        cirkadijalnog ritma čovjeka. Svako vrijeme dana ima
                        svoju odgovarajuću boju, u jutro rasvjeta podstiće
                        produkciju kortizola i serotonina. Navečer toplo-bijelo
                        svijetlo sa velikim udjelom crvene boje, daje opuštajući
                        efekat.
                      </p>
                      <p>
                        Kakva je idealna raspodjela svjetlosti ? odgovor
                        dobijamo u prirodi, nebo osijava naše oči frontalno i
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
              Loše priključene mašine, stari kablovi, klimavi dijelovi ne samo
              da na duže staze uništavaju vaše uređaje nego i predstavljaju
              veliki rizik u svakodnevnici.
            </p>
            <p>
              Da vam se ne desi nezgoda, isplati se baciti pogled s vremena na
              vrijeme na vaše uređaje, mi smo tu da vam pomognemo.
            </p>
            <p>
              Čišćenje i održavanje vaših uređaja je veoma bitno, ako ih hoćete
              dugoročno koristiti. Previše velika potrošnja vode i električne
              energije i sve lošija funkcionalnost su prvi predznaci, moguće je
              i loše urađena prethodna instalacija.
            </p>
            <p>
              Rado ćemo analizirati stanje vaših uređaja. Naše električari rade
              brzo i precizno i rado će vas posavjetovati o popravci, održavanju
              itd.
            </p>
            <p>
              Ako bude popravka nužna, možete ugovoriti termin sa našim
              električarima. Odmah kod analize ćete dobiti procjenu troškova za
              popravku po fer cijenama.
            </p>
            <p>
              Pri tome pazimo da od početka sve faktore uzmemo u obzir, obim
              posla, cijenu eventualnih rezervnih dijelova, dolazak (putni
              troškovi). Večinom se već kod analize uređaja se uklone prisutni
              kvarovi.
            </p>
            <h2></h2>
            <p>
              Život se u zadnjih 50 godina dosta promjenio. Računari, kućni
              uređaji, interaktivni ravni paneli su stvari bez kojih danas ne
              možemo. Za električni sistem ipak postoji mogućnost
              preopterećenja, što može imati loše posljedice.
            </p>
            <p>Moraju se testirati slijedeće stvari:</p>
            <ul>
              <li>Da li ima dovoljno strujnih krugova ?</li>
              <li>Da li su strujni krugovi dobro raspoređeni i osigurani ?</li>
              <li>
                Da li su kablovi, utikači, utičnice i prekidači u dobrom stanju
                ?
              </li>
              <li>
                Jesu li kupatilo, kuhinja, vanjski sistemi (kapijska vrata,
                sistemi odvodnjavanja, vrtni sistemi itd.) osigurani po propisu
                sa odgovarajućim električnim uređajima
              </li>
              <li>
                Da li su urađene promjene na elektro instalaciji i ako jesu, da
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
            <h3>E - ček</h3>
            <p>
              E - ček je ispitivanje svih električnih uređaja u instalaciji,
              dobijamo trenutno stanje i prepoznajemo moguće opasnosti prije
              nego što nastane šteta.
            </p>
            <ul>
              <li>
                Dobijate izvjesnost da testirana elektroinstalacija i ispitani
                elektrouređaji zadovoljavaju sve sigurnosne aspekte
              </li>
              <li>
                Svi ukućani su tako sigurni od rizika preopterećenja ili kratkog
                spoja i time izazvane vatre
              </li>
              <li>
                U slučaju štete možete osiguranju dokazati ispravnost svih
                naprava i uređaja
              </li>
              <li>
                Savjetujemo vas kod svih pitanja energetske efikasnosti i
                ukažemo vam sve mogućnosti uštede el. energije
              </li>
            </ul>
            <div id={styles.idkm}>
              <img
                src={require('../../assets/img/usluge/mobileresize/eček41.jpg')}
                alt=""
                className={styles.hideDesktop}
              />
              <img
                className={styles.hideMobile}
                src={require('../../assets/img/usluge/eček4.jpg')}
                alt=""
              />
              <img
                src={require('../../assets/img/usluge/mobileresize/eček31.jpg')}
                alt=""
                className={styles.hideDesktop}
              />
              <img
                className={styles.hideMobile}
                src={require('../../assets/img/usluge/eček3.jpg')}
                alt=""
              />
            </div>

            <h3>Mi dovodimo vašu instalaciju na najnoviji tehnološki nivo</h3>
            <p>
              Provjerite sami da li vaša instalacija odgovara HEA - standardima
              za elektroinstalacije
            </p>
            <p>
              Sa rastućim zahtjevima za komforom i većim brojem priključaka,
              mora se i povečati i broj strujnih krugova
            </p>
            <p>
              E-ček se može izvesti samo od strane firmi sa školovanim kadrom
              koji koriste odgovarajuće instrumente za mjerenje.
            </p>
            <h3>Enormni potencijal uštede električne energije</h3>
            <p>
              Ovo nije jedini ekonomski faktor, savjetovanje koje dolazi uz
              e-ček za uštedu el. energije kroz električne uređaje i sisteme je
              također dio paketa.
            </p>
            <h3>E-ček u specijalnim poljima</h3>
            <p>
              Nudimo i E-ček za različita polja u elektrotehnici, npr. E-ček IT,
              E-mobilnost i E-ček PV.
            </p>
            <p>
              Nabavka električnog auta kao i instalacija uređaja za učitavanje
              je dobra investicija za budućnost. Svaka nekretnina je drugačija i
              ima svoje uslove u pogledu na električnu mobilnost. U okviru
              E-čeka, E-mobilnost provjeravamo na mjestu i prilagođavamo po
              potrebi.
            </p>
            <p>
              Preko E-ček PV provjeravamo solarne panele na nedostatke i
              oštećenja, testiramo funkcije i performanse, provjeravamo
              efikasnost zaštite protiv strujnog udara i prenapona. Ako je
              stanje zadovoljavajuće, sve se na kraju potvrdi sa E-ček PV
              stikerom i dobijete izvještaj o urađenom testiranju.
            </p>
            <h3>
              E-ček pruža sigurnost i štedi novac, prema tome je dobra
              investicija za budućnost
            </h3>
            <p></p>
            <div id={styles.ečk}>
              <img src={require('../../assets/img/usluge/eček.jpg')} alt="" />
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
                <h3>Protivpožarni sistemi</h3>
                <p>
                  Učestalost požara, ogromne materijalne štete i ljudske žrtve,
                  nameću potrebu kompleksnijeg sagledavanja ovog problema i
                  preduzimanja efikasnijih mera preventivne zaštite i suzbijanja
                  i onemogućavanja težih posledica.
                </p>
                <p>
                  U današnje vreme zaštita od požara obuhvata mnoge aspekte, a
                  jedan od njih su stabilne instalacije za automatsku dojavu
                  požara. Stabilne instalacije za automatsku dojavu požara su
                  elektronski sistemi koji služe da što ranije detektuju požar,
                  detektujući neku od njegovih osnovnih manifestacija (dim,
                  porast temperature, svetlost plamena, iskra…). Namena
                  stabilnih instalacija za automatsku dojavu požara proizlazi iz
                  osnovnog cilja protivpožarne zaštite, a to je da se spreči
                  nastanak požara ili da se on ugasi u njegovoj najranijoj fazi
                  kada još nije naneo značajnu štetu.
                </p>
                <p>
                  Sistemi za automatsku dojavu se sastoje od periferne opreme za
                  detekciju (automatskih detektora, ručnih javljača, sirena,
                  modula…), kablovske instalacije kojom je periferna oprema
                  povezana sa centralnim uređajem i centralnog uređaja koji
                  obrađuje signale periferne opreme i aktivira uređaje za
                  signalizaciju i izvršne module. Stabilna instalacija za
                  automatsku dojavu požara pored standardne detekcije i
                  signalizacije požara može služiti i za aktivaciju izvršnih
                  funkcija kao što su isključenje struje, aktivacija PP klapni,
                  otvaranje ili zatvaranje prozora i vrata, spuštanje liftova,
                  isključenje klima komora, itd.
                </p>
                <p>
                  Pored centralnih uređaja za detekciju klijentima nudimo širok
                  asortiman opreme za detekciju i signalizaciju (automatski
                  javljači, ručni javljači, sirene, moduli, linijski detektori,
                  barijere, itd).
                </p>
                <p>
                  Dole navedene protivpožarne sisteme smo u mogućnosti izvesti,
                  održavati i servisirati:
                </p>
                <ul>
                  <li>Sistemi za gašenje požara vodom</li>
                  <li>Sistemi za gašenje požara vodenom maglom</li>
                  <li>Sistemi za gašenje požara teškom i lakom pjenom</li>
                  <li>Sistemi za gašenje požara inertnim plinovima</li>
                  <li>Kuhinjski sistemi za gašenje požara</li>
                  <li>
                    Specijalni sistemi gašenja (gašenje pneumatskim cjevovodima,
                    gašenje sa zatvorenim protokom zraka)
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
                  otklanja postojeći grijač i zamjenjuje ga sa jedinicom koja
                  proizvodi vodu za vaš dom, toplotu i električnu energiju.
                </p>
                <p>
                  Poslije razvoja i testiranja, Eninuity je proizveo
                  revolucionarni novi CHP sistem sa potencijalom da optimizuje
                  potrošnju energije.
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
              <h3>FI-Zaštitna sklopka po VDE</h3>
              <div className={styles.sigurnostl}></div>
              <div id={styles.fisup}>
                <p>
                  U okviru jednog e-čeka provjeravamo cijelu instalaciju u
                  detalj i da li vaše FI zaštitne sklopke odgovaraju najnovijim
                  tehničkim standardima.
                </p>
              </div>
              <div id={styles.fisdown}>
                <p>
                  U svakodnevnici se može svašta desiti. Dijete može staviti
                  prste u utičnicu ili goli provodnik itd. Sve ovo može izazvati
                  teške povrede, zbog toga su osigurači tako neophodni.
                </p>

                <ul>
                  <li>
                    Oni štite od električnog udara, tako što automatski prekinu
                    strujni krug prije nego što se bilo šta desi
                  </li>
                  <li>
                    Ova sigurnosna mjera je po DIN VDE standardima neophodna za
                    svaku utičnicu
                  </li>
                </ul>
              </div>
              <div id={styles.fisimgs}>
                <img src={require('../../assets/img/usluge/fis1.jpg')} alt="" />
                <img src={require('../../assets/img/usluge/fis.jpg')} alt="" />
              </div>
            </div>
            <div id={styles.uzemljenje}>
              <h3>Uzemljenje i izjednačavanje potencijala</h3>
              <div className={styles.sigurnostl}></div>
              <p>
                Spajanje jednog dijela instalacije sa zemljom se zove
                uzemljenje. Uzemljenje ima više zadataka da ispuni kao npr.
                zaštitu od električnog udara, atmosferskog prenapona,
                osiguravanje elektromagnetne kompatibilnosti kao i zaštita
                antenskog sistema.
              </p>
              <p>
                Ako se 2 tačke različitog potencijala međusobno spoje, onda se
                njihova razlika u potencijalu izjednači. Napon se više između
                ove 2 tačke ne može mjeriti i stvoreno je izjednačenje
                potencijala. Po DIN standardu je izjednačenje potencijala
                propisano tako što svi postojeći metalni sistemi u objektu kao i
                zaštitni provodnik, izjednačivaći potencijala i odvodnik
                prenapona se međusobno spoje na glavnu šinu uzemljenja.
                Izjednačavanje potencijala i uzemljenje zajedno čine kompletni
                sistem zaštite.
              </p>
            </div>

            <div id={styles.prenapon}>
              <div id={styles.prenapontxt}>
                <h3>Više sigurnosti protiv opasnih prenapona</h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Udar groma nije najčešći uzrok štete kod oluja, već prenapon.
                  Čak kod razdaljine do 1.5 km od udara groma, ili kroz
                  uključivanje i isključivanje potrošača mogu nastatati masivne
                  štete na uređajima.
                </p>
                <p>
                  Da bi se ovo sprijećilo mora se ugraditi nekoliko prenaponskih
                  uređaja u razvodnom ormaru i na priključcima telefona,
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
                  Naravno kada pričamo i o E-mobilnosti vaša sigurnost stoji na
                  prvom mjestu. Bitno je prilagoditi se elektrotehničkoj
                  infrastrukturi, tako da zadovoljite sve uslove. Po potrebi
                  možemo i redimenzionirati vaše kablove.
                </p>
                <p>
                  Ove mjere su bitan preduslov za brza punjenja. Kod E-čeka se
                  cijela struktura E-mobilnosti testira na funkcionalnost i
                  sigurnost
                </p>
                <ul>
                  <li>
                    Instalacija stanice za punjenje i integracija u postojeću
                    kućnu tehniku
                  </li>
                  <li>
                    Prilagođavanje vaše kućne instalacije, da bi se otklonile
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

            <div id={styles.višesig}>
              <div id={styles.višesigtxt}>
                <h3>Više sigurnosti u budućnosti - budite spremni na sve</h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Digitalni brojači ili obnovljive energije, poslije
                  elektrotehničke sanacije je vaš dom najbolje spreman za sutra
                </p>
                <ul>
                  <li>
                    Pametni metar - digitalni brojači omogučavaju perfektni
                    energetski menadžment u svoja četiri zida
                  </li>
                  <li>
                    Toplotne pumpe i solarni paneli za smanjenje energetske
                    potrošnje
                  </li>
                  <li>Interfon i video nadzor</li>
                  <li>Automatsko upravljanje žaluzina</li>
                  <li>Umreženi protupožarni sistemi</li>
                  <li>
                    Moderni mikro-spojeni toplotni sistemi snage, proizvode
                    struju i toplotu istovremeno
                  </li>
                </ul>
              </div>
              <div id={styles.višesigimgs}>
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
                  Provale i mogući požari su realna opasnost po vaš objekat,
                  mnogi ljudi misle da su se osiguranjem dovoljno zaštitili, ali
                  nijedno osiguranje ne može život zaštiti ili gubitak
                  skupocjenih stvari, povratiti ukradene podatke ili promjeniti
                  nastale psihološke probleme.
                </p>
                <p>
                  Alarmne centrale (EMA) pružaju posebnu sigurnost, kroz njihovu
                  detekciju je dosta lakše otkriti razbojnika.
                </p>
                <p>
                  Sigurnosni uređaji mogu ispuniti svoju dužnost samo ako su
                  prethodno profesionalno i po propisima instalirani. Mi
                  popravljamo sigurnosne rupe u vašem objektu i pokažemo vam
                  optimalna rješenja protiv provale i drugih opasnosti kao npr.
                  požar.
                </p>
                <p>
                  Sa našim iskustvom smo u stanju instalirati odgovarajuće
                  sigurnoste umrežene sisteme, hibridne sisteme i moderne
                  bežićne alarmne centrale, kod kojih se ugradnja odvija bez
                  prljavštine, bez kablova i velikog napora.
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
                  tehnologiji koja omogućava realizaciju sistema primjenom
                  jednog dvožilnog vodića tj. jedne parice za kompletan objekat.
                </p>
                <p>
                  Bez obzira na jednostavnost instalacije i primjene samo jedne
                  parice, TCS sistemi audio interfona obezbjeđuju niz funkcija:
                </p>
                <ul>
                  <li>
                    Razgovor sa osobom na ulazu bez mogućnosti prisluškivanja
                  </li>
                  <li>Otključavanje vrata</li>
                  <li>Uključenje svjetla u hodniku</li>
                  <li>Korišćenje većeg broja pozivnih stanica</li>
                  <li>Interno pozivanje između korisnika</li>
                  <li>Prebacivanje interfonskog poziva na fiksni telefon</li>
                  <li>Funkcija automatskih vrata</li>
                  <li>Integracija sa sistemima kontrole pristupa</li>
                </ul>
                <p>
                  Sistemi TCS video interfona su zasnovani na modernoj BUS
                  tehnologiji koja omogućava realizaciju sistema primjenom
                  jednog šestožilnog vodića tj. tri parice za kompletan objekat,
                  bez primjene koaksijalnog kabla.
                </p>
                <p>
                  Bez obzira na jednostavnost instalacije i primjene samo 3
                  parice TCS sistemi video interfona obezbjeđuju niz naprednih
                  funkcija:
                </p>
                <ul>
                  <li>
                    Razgovor sa osobom na ulazu bez mogućnosti prisluškivanja
                  </li>
                  <li>Otključavanje vrata</li>
                  <li>Uključenje svjetla u hodniku</li>
                  <li>
                    Korišćenje većeg broja pozivnih stanica i pregledanje slika
                    sa 16 kamera
                  </li>
                  <li>Interno pozivanje između korisnika</li>
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
                <h3>Video i bežićni nadzorni sistemi</h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Na javnim mjestima kao npr. ambasadama, uredima, bolnicama ili
                  kompanijama, za zaštitu firme ili privatnog vlasništva se
                  koristi video nadzor da bi se zaštitili ljudi i objekti od
                  provala i vandalizma.
                </p>
                <p>
                  Sa profesionalnim video nadzorom proizvođača Elbex, Avigilon,
                  Gira, Heitel, osiguravate objekat na perfektan način. Ovisno
                  od primjene objekta, kreiramo za vas individualni sugurnosni
                  plan kao optimalno rješenje.
                </p>
                <ul>
                  <li>
                    Za to kombiniramo kamere, objektive, monitore, spašavanje
                    snimanog materijala i analizatore kao i njihov pribor
                  </li>
                  <li>
                    Po potrebi dolaze i sistemi pohranjivanja podataka (video
                    kamere ili detektori pokreta)
                  </li>
                  <li>
                    Realiziramo i nadzor na daljinu i kontrolu nadzora
                    geografski podijeljenih lokacija preko interne mreže
                    podataka ili interneta
                  </li>
                  <li>
                    Instaliramo nadzorne sisteme koji konstantno šalju
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
                  Sa odgovarajućom elektrotehnikom - bez barijera, neovisno i
                  sigurno živjeti
                </h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Dobar prilog hodnicima su senzori pokreta i detektori
                  prisutnosti koji upravljaju rasvjetom automatski, što je kod
                  kupatila i stepenica od velike prednosti.
                </p>
                <p>
                  Sa inteligentnim šalterima možete upravljati rasvjetom
                  (uključivanje, isključivanje, prigušivanje), grijanjem,
                  žaluzinama i elektronskim uređajima.
                </p>
                <ul>
                  <li>
                    Prekidači za prigušivanje postoje i sa memorijskom
                    funkcijom, tada možete pristupiti svim prethodno sačuvanim
                    rasvjetnim scenama
                  </li>
                  <li>
                    Orijentacijske lampe u hodniku i stubištu doprinose večem
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
            <div id={styles.priključak}>
              <div id={styles.ptxt}>
                <h3>Odgovarajući priključak u svakoj sobi</h3>
                <div className={styles.sigurnostl}></div>
                <p>
                  Električni uređaji i TV ili računar su svugdje u radnom
                  modusu, u kuhinji, radnoj sobi, dnevnoj i spavaćoj sobi,
                  podrumu, garaži ili vani.
                </p>
                <p>
                  I s toga je bitan velik broj utičnica, po DIN standardima
                  moraju biti 4 utičnice u svakoj sobi do 20 m&sup2;.
                </p>
                <p>
                  Ko želi više komfora i ima puno uređaja u radnom modusu, treba
                  imati više utičnica i strujnih krugova. Specijalne izvedbe
                  utičnica su posebno zaštićene protiv vlage i vanjskih udaraca.
                  Ako imate djecu, postoje i kvalitativne utičnice za zaštitu
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
                  Mi planiramo vašu elektroinstalaciju da bude po najnovijim
                  standardima i da ušteda električne energije bude maksimalna
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
                    Novogradnja ili renoviranje ? mi ćemo vas rado savjetovati
                  </p>
                </div>
              </div>
            </div>
            <h3>Greške kod planiranja elektroinstalacije se teško isprave</h3>
            <p>
              Uspješni projekat zahtjeva dobro planiranje. Planiranje i
              projektovanje elektroinstalacija slobodno prepustite nama.
            </p>
            <p>
              Pažljivo planiranje je potrebno da bi vaša elektroinstalacija bila
              sigurna: rano prepoznavanje greški, optimalna raspodjela
              električne energije kao i međusobna interakcija komponenti. Sa
              profesionalnim Auto CAD softverom stvaramo kompletne i revizione
              planove.
            </p>
            <p>
              Vaša električna instalacija će zadovoljavati sve uslovu i odredbe,
              već kod planiranja i projektovanja uzimamo u obzir sva bitna
              pitanja od sigurnosne tehnologije,zakonskih odredbi, optimalno
              prostorno planiranje kao i vaše specifične želje. Tu dodajemo i
              proraćun struje kratkog spoja za korektno dimenzoniranje
              instalacija jake struje, pomaže pri ranoj detekciji mogućih
              problema.
            </p>
            <p>
              Tehnika se svakodnevno razvija i sve se više mora gledati na
              određene finese, nova pravila i na sigurnost. Sve ove stvari se
              već u početnoj fazi moraju uzeti u obzir.
            </p>
            <p>
              Mnoge sisteme poznajemo od samog početka i zajedno smo napredovali
              sa svim novitetima i inovacijama. Kod našeg projektovanja uzimamo
              sve aspekte u obzir i informišemo vas o svim mogućim zamkama i
              problemima unaprijed.
            </p>
            <p>
              Dobićete kompletan koncept našeg rada i vremenski raspored,
              kratkoročne promjene nisu problem.
            </p>
            <p>
              Vaše ideje, želje i vizije pretvaramo u plan i izrađujemo
              šemiranje kompletne instalacije. Stavljamo fokus na sigurnost,
              komfor, ekonomičnost i održivost.
            </p>
            <p>
              Kod realizacije vaše novogradnje ili renoviranja zastupamo vaše
              interese. Koordiniramo i upravljamo radnim tokovima na objektu i
              brinemo da se rad odvija po sigurnosnim propisima i da se sve
              završi u zadanom vremenskom roku.
            </p>
            <p>Nudimo slijedeće usluge:</p>
            <ul>
              <li>
                Detaljno planiranje i projektiranje električnih instalacija,
                ekspertiza i analiza troškova
              </li>
              <li>Pomoć kod javnih nabavki</li>
              <li>Stručan rad i osiguravanje kvalitete</li>
              <li>Podrška kod izbora dobavljača i odgovarajućeg materijala</li>
            </ul>
            <div id={styles.plan}>
              <h3>Planiranje</h3>
              <p>
                Neuspješna elektroinstalacija može izazvati dosta neugodnosti.
                Naknadno instaliranje utičnica i praznih cijevi je zahtjeva
                veliki napor i zalaganje. Zbog toga bi ste trebali prije svega
                razgovarati sa specijalistom o vašim željama i planovima.
              </p>
              <div className={styles.plankol}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/uticnicap.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3>Utičnice</h3>
                  <p>
                    Planiramo za sve uređaje, utičnice plus rezerve koje možemo
                    koristiti za punjenje mobitela npr. ili korištenje ručnog
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
                  <h3>Pristup internetu i mreži</h3>
                  <p>
                    Poslovno i privatno danas je teško zamisliti život bez
                    interneta, da bi dugo imali nešto od ove investicije, treba
                    kabliranje za računarsku mrežu biti promišljeno i razumno.
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
                  <h3>Kućna kontrola</h3>
                  <p>
                    Sa kućnim upravljanjem se mogu puno stvari automatizirati.
                    Žaluzine i roletne se mogu podizati i spuštati uz pomoć
                    daljinskog upravljača ili preko tableta i pametnog telefona.
                    Isto tako možete kompletnu rasvjetu centralno isključiti,
                    kada idete na spavanje ili izlazite iz kuće.
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
                Ko se danas odluči da gradi ili kupi nekretninu hoće jedno i to
                je sigurna investicija, koja će trajati i rasti u cijeni. KNX je
                svjetski priznati standard koji ispunjava sve navedene uslove.
              </p>
              <p>
                KNX tehnologija je dostupna već 20 godina i nikad nije izbor
                inovativnih produkata bio toliki kao danas. Preko 400
                proizvođača razvijaju produkte, koji su kompatibilni sa KNX
                tehnologijom
              </p>
              <p>
                KNX upravlja grijanjem, rasvjetom, žaluzinama, ventilacijom,
                multimedijom i sigurnosnim tehnologijama. Tako nastaje umreženi
                sistem, koji radi ekonomično i zadovoljava današnje potrebe
                ljudi. Zahvaljujući umreženosti sistema, mogu se realizirati
                funkcionalnosti koje su do sada bile zamislive samo sa velikim
                tehničkim naporom ili nikako. To stvara prosor za nove
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
                  <h3>Više komfora</h3>
                  <p>
                    Sa KNX-om ćete imati dobra iskustva, sa odgovarajućom
                    rasvjetom ili podešenom temperaturom, KNX se prilagođava
                    vašim željama i odrađuje mnogo stvari automatski. Sa KNX-om
                    imate uvijek odgovarajuću temperaturu i žaluzine u svakom
                    momentu mogu da prepoznati koliko svjetlosti treba
                    prostoriji.
                  </p>
                </div>
              </div>
              <div className={`${styles.plankol} ${styles.plf}`}>
                <div className={styles.plankolimg}>
                  <img
                    src={require('../../assets/img/usluge/ekonomićnost.jpg')}
                    alt=""
                  />
                </div>
                <div className={styles.plankoltxt}>
                  <h3>Ekonomičnost</h3>
                  <p>
                    Sa KNX-om možete uštedi dosta novca, samo kroz individualnu
                    kontrolu soba u vezi sa nadgledanjem prozora i automatskog
                    upravljanja roletni može se uštediti veliki dio toplotne
                    energije. KNX nudi mnogo više funkcija.
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
                  <h3>Više sigurnosti</h3>
                  <p>
                    KNX je pouzdani čuvar za vaš dom, ljetos i zimi, danju i
                    noću. Sistem nadgleda prozore i vrata, i u slučaju nužde se
                    telefonski zove pomoć. Također štiti od opasnosti koji mogu
                    biti prouzrokovani od požara, vode ili nepravilnog odnosa sa
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
                  <h3>Sigurna budućnost</h3>
                  <p>
                    Elektroinstalacija na bazi KNX-a ima sigurnu budućnost i
                    ispunjava sve potrebe ukućana, i vaša investicija je na dugu
                    stazu ekonomična.
                  </p>
                </div>
              </div>
            </div>
            <div id={styles.savjet}>
              <h3>Savjetovanje</h3>
              <h3>Vaše zadovoljstvo je naš cilj</h3>
              <p>Planirate novogradnju, ili hoćete renovirati vaš dom ?</p>
              <p>
                Planirajte sa nama! Naši električari završavaju na mjestu
                pouzdano i tačno dimenzioniranje vašeg projekta, i dobijate
                cijenu materijala i njegovu potrebnu količinu.
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
