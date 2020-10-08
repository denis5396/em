import React, { Component, createRef } from 'react';
import Snav from '../Onama/Snav';
import styles from './Radovi.module.css';
import { Link } from 'react-router-dom';
class Radovi extends Component {
  state = {
    init: true,
    arr1: false,
    arr2: false,
    arr3: false,
    arr4: false,
    arr5: false,
  };

  showOverlay = createRef();
  parentCon = createRef();
  parentCon1 = createRef();
  parentCon2 = createRef();
  parentCon3 = createRef();
  parentCon4 = createRef();
  xmark = createRef();
  slikeCon = createRef();
  slikeConimg = createRef();
  chevL = createRef();
  chevR = createRef();

  imgArray1 = undefined;
  imgArray2 = undefined;
  imgArray3 = undefined;
  imgArray4 = undefined;
  imgArray5 = undefined;
  arr1Imgs = [];
  arr2Imgs = [];
  arr3Imgs = [];
  arr4Imgs = [];
  arr5Imgs = [];
  idName = undefined;
  getImgId = undefined;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.repeat2(this.parentCon.current);
    this.repeat2(this.parentCon1.current);
    this.repeat2(this.parentCon2.current);
    this.repeat2(this.parentCon3.current);
    this.repeat2(this.parentCon4.current);
    document.title = 'Elektro Plus | Radovi';
  }
  componentWillUnmount() {
    document.querySelector('html').style.scrollBehavior = 'smooth';
  }
  repeat2 = (parN) => {
    parN.addEventListener('click', (e) => {
      const gid = e.target.parentElement.parentElement.id;
      let answer = '';
      let bool = false;
      for (let i = 0; i < gid.length; i++) {
        if (gid[i] === '_' && !bool) {
          bool = !bool;
        } else if (bool && gid[i] !== '_') {
          answer += gid[i];
        } else if (gid[i] === '_' && bool) {
          break;
        }
      }
      this.idName = answer;
      switch (this.idName) {
        case 'rasvjetab':
          this.setState({
            arr1: true,
            arr2: false,
            arr3: false,
            arr4: false,
            arr5: false,
          });
          break;
        case 'solarb':
          this.setState({
            arr1: false,
            arr2: true,
            arr3: false,
            arr4: false,
            arr5: false,
          });
          break;
        case 'mrezeitelb':
          this.setState({
            arr1: false,
            arr2: false,
            arr3: true,
            arr4: false,
            arr5: false,
          });
          break;
        case 'pamkucb':
          this.setState({
            arr1: false,
            arr2: false,
            arr3: false,
            arr4: true,
            arr5: false,
          });
          break;
        case 'kamererb':
          this.setState({
            arr1: false,
            arr2: false,
            arr3: false,
            arr4: false,
            arr5: true,
          });
      }
      this.repeat(e);
    });
  };

  chevRHandler = () => {
    if (this.state.arr1) {
      if (this.getImgId === this.arr1Imgs.length - 1) {
        this.getImgId = 0;
      } else {
        this.getImgId++;
      }
      this.slikeConimg.current.setAttribute(
        'src',
        this.arr1Imgs[this.getImgId]
      );
    } else if (this.state.arr2) {
      if (this.getImgId === this.arr2Imgs.length - 1) {
        this.getImgId = 0;
      } else {
        this.getImgId++;
      }
      this.slikeConimg.current.setAttribute(
        'src',
        this.arr2Imgs[this.getImgId]
      );
    } else if (this.state.arr3) {
      if (this.getImgId === this.arr3Imgs.length - 1) {
        this.getImgId = 0;
      } else {
        this.getImgId++;
      }
      this.slikeConimg.current.setAttribute(
        'src',
        this.arr3Imgs[this.getImgId]
      );
    } else if (this.state.arr4) {
      if (this.getImgId === this.arr4Imgs.length - 1) {
        this.getImgId = 0;
      } else {
        this.getImgId++;
      }
      this.slikeConimg.current.setAttribute(
        'src',
        this.arr4Imgs[this.getImgId]
      );
    } else if (this.state.arr5) {
      if (this.getImgId === this.arr5Imgs.length - 1) {
        this.getImgId = 0;
      } else {
        this.getImgId++;
      }
      this.slikeConimg.current.setAttribute(
        'src',
        this.arr5Imgs[this.getImgId]
      );
    }
  };
  chevLHandler = () => {
    if (this.state.arr1) {
      if (this.getImgId === 0) {
        this.getImgId = this.arr1Imgs.length - 1;
      } else {
        this.getImgId--;
      }
      this.slikeConimg.current.setAttribute(
        'src',
        this.arr1Imgs[this.getImgId]
      );
    } else if (this.state.arr2) {
      if (this.getImgId === 0) {
        this.getImgId = this.arr2Imgs.length - 1;
      } else {
        this.getImgId--;
      }
      this.slikeConimg.current.setAttribute(
        'src',
        this.arr2Imgs[this.getImgId]
      );
    } else if (this.state.arr3) {
      if (this.getImgId === 0) {
        this.getImgId = this.arr3Imgs.length - 1;
      } else {
        this.getImgId--;
      }
      this.slikeConimg.current.setAttribute(
        'src',
        this.arr3Imgs[this.getImgId]
      );
    } else if (this.state.arr4) {
      if (this.getImgId === 0) {
        this.getImgId = this.arr4Imgs.length - 1;
      } else {
        this.getImgId--;
      }
      this.slikeConimg.current.setAttribute(
        'src',
        this.arr4Imgs[this.getImgId]
      );
    } else if (this.state.arr5) {
      if (this.getImgId === 0) {
        this.getImgId = this.arr5Imgs.length - 1;
      } else {
        this.getImgId--;
      }
      this.slikeConimg.current.setAttribute(
        'src',
        this.arr5Imgs[this.getImgId]
      );
    }
  };

  repeat = (e) => {
    if (this.state.arr1) {
      this.imgArray1.forEach((img, idx) => {
        img.id = idx;
      });
      this.imgArray1.forEach((img, idx) => {
        this.arr1Imgs[idx] = img.getAttribute('src');
      });
    } else if (this.state.arr2) {
      this.imgArray2.forEach((img, idx) => {
        img.id = idx;
      });
      this.imgArray2.forEach((img, idx) => {
        this.arr2Imgs[idx] = img.getAttribute('src');
      });
    } else if (this.state.arr3) {
      this.imgArray3.forEach((img, idx) => {
        img.id = idx;
      });
      this.imgArray3.forEach((img, idx) => {
        this.arr3Imgs[idx] = img.getAttribute('src');
      });
    } else if (this.state.arr4) {
      this.imgArray4.forEach((img, idx) => {
        img.id = idx;
      });
      this.imgArray4.forEach((img, idx) => {
        this.arr4Imgs[idx] = img.getAttribute('src');
      });
    } else if (this.state.arr5) {
      this.imgArray5.forEach((img, idx) => {
        img.id = idx;
      });
      this.imgArray5.forEach((img, idx) => {
        this.arr5Imgs[idx] = img.getAttribute('src');
      });
    }

    this.showOverlay.current.style.transition = 'opacity 0.5s ease';
    const imgSrc = e.target.getAttribute('src');
    this.showOverlay.current.style.opacity = 1;
    this.showOverlay.current.style.zIndex = 0;
    this.xmark.current.style.zIndex = 1;
    this.xmark.current.style.opacity = 1;
    this.slikeCon.current.style.opacity = 1;
    this.slikeCon.current.style.zIndex = 1;
    this.chevL.current.style.zIndex = 1;
    this.chevL.current.style.opacity = 1;
    this.chevR.current.style.zIndex = 1;
    this.chevR.current.style.opacity = 1;
    this.slikeConimg.current.setAttribute('src', imgSrc);
    this.getImgId = parseInt(e.target.id);
  };

  xmarkHandler = () => {
    this.showOverlay.current.style.transition = 'none';
    this.showOverlay.current.style.opacity = 0;
    this.showOverlay.current.style.zIndex = -1;
    this.xmark.current.style.zIndex = -1;
    this.xmark.current.style.opacity = 0;
    this.chevL.current.style.zIndex = -1;
    this.chevL.current.style.opacity = 0;
    this.chevR.current.style.zIndex = -1;
    this.chevR.current.style.opacity = 0;
    this.slikeConimg.current.setAttribute('src', '#');
    this.slikeCon.current.style.opacity = 0;
    this.slikeCon.current.style.zIndex = -1;
  };

  render() {
    if (!this.imgArray1) {
      this.imgArray1 = [];
    } else {
      if (this.state.init) {
        this.setState({ init: false });
      }
    }
    if (!this.imgArray2) {
      this.imgArray2 = [];
    } else {
      if (this.state.init) {
        this.setState({ init: false });
      }
    }
    if (!this.imgArray3) {
      this.imgArray3 = [];
    } else {
      if (this.state.init) {
        this.setState({ init: false });
      }
    }
    if (!this.imgArray4) {
      this.imgArray4 = [];
    } else {
      if (this.state.init) {
        this.setState({ init: false });
      }
    }
    if (!this.imgArray5) {
      this.imgArray5 = [];
    } else {
      if (this.state.init) {
        this.setState({ init: false });
      }
    }
    return (
      <>
        <section class={styles.radovi}>
          <Snav cur={'radovi'} />
        </section>
        <section id={styles.portf}>
          <div id={styles.portftxt}>
            <h1>Naše reference</h1>
            <p>
              Stručnost i profesionalizam se može vidjeti u svakom našem
              projektu. Nastojimo da pružamo industrijski standard u svim
              vrstama elektro radova u cijeloj Bosni i Hercegovini.
            </p>
          </div>
          <div id={styles.portfb}>
            <div class={styles.portfcol}>
              <Link to="villasouth">
                <img src={require('../../assets/img/vila12.jpg')} alt="" />
                <div class={styles.portfcoltxt}>
                  <h3>Villa South</h3>
                  <p>Rezidencijalni Objekt</p>
                </div>
              </Link>
            </div>
            <div class={styles.portfcol}>
              <a href="/#">
                <Link to="kucnokino">
                  <img src={require('../../assets/img/kino1.jpg')} alt="" />
                  <div class={styles.portfcoltxt}>
                    <h3>Kućno Kino</h3>
                    <p>Rezidencijalni Objekt</p>
                  </div>
                </Link>
              </a>
            </div>
            <div class={styles.portfcol}>
              <Link to="villabrugge">
                <img src={require('../../assets/img/villa21.jpg')} alt="" />
                <div class={styles.portfcoltxt}>
                  <h3>Villa Brugge</h3>
                  <p>Rezidencijalni Objekt</p>
                </div>
              </Link>
            </div>
            <div class={styles.portfcol}>
              <Link to="porodicnakuca">
                <img src={require('../../assets/img/villa41.jpg')} alt="" />
                <div class={styles.portfcoltxt}>
                  <h3>Porodična Kuća</h3>
                  <p>Rezidencijalni Objekt</p>
                </div>
              </Link>
            </div>
            <div class={styles.portfcol}>
              <Link to="vikendica">
                <img src={require('../../assets/img/villa31.jpg')} alt="" />
                <div class={styles.portfcoltxt}>
                  <h3>Vikendica</h3>
                  <p>Rezidencijalni Objekt</p>
                </div>
              </Link>
            </div>
            <div class={styles.portfcol}>
              <Link to="planinarskidom">
                <img
                  src={require('../../assets/img/planinamain3.webp')}
                  alt=""
                />
                <div class={styles.portfcoltxt}>
                  <h3>Planinarski Dom</h3>
                  <p>Rezidencijalni Objekt</p>
                </div>
              </Link>
            </div>
            <div class={styles.portfcol}>
              <Link to="spahotel">
                <img src={require('../../assets/img/spahotel.jpg')} alt="" />
                <div class={styles.portfcoltxt}>
                  <h3>Spa Hotel</h3>
                  <p>Rezidencijalni Objekt</p>
                </div>
              </Link>
            </div>
            <div class={styles.portfcol}>
              <Link to="restoran">
                <img src={require('../../assets/img/restoran.png')} alt="" />
                <div class={styles.portfcoltxt}>
                  <h3>Restoran</h3>
                  <p>Rezidencijalni Objekt</p>
                </div>
              </Link>
            </div>
          </div>
          <div id={styles.rasvjeta}>
            <h3>Rasvjeta</h3>
            <div id={styles.rasvjetab} ref={this.parentCon}>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/radovi/ledlinear.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/radovi/ledlinear4.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/radovi/roof-terrace-lighting.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/radovi/ledlinear2.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/ledidea0.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/radovi/ledlinear5.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
                <div class={styles.portfcol}>
                  <img
                    src={require('../../assets/img/radovi/ledlinear4.jpg')}
                    alt=""
                    ref={(node) => {
                      if (
                        this.imgArray1.length < 45 &&
                        node &&
                        this.state.init
                      ) {
                        this.imgArray1.push(node);
                      }
                    }}
                  />
                </div>
              </div>
              <div class={`${styles.portfcol} ${styles.vertical}`}>
                <img
                  src={require('../../assets/img/radovi/ledlinear6.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.vertical}`}>
                <img
                  src={require('../../assets/img/radovi/ledlinearstaircase.png')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.vertical}`}>
                <img
                  src={require('../../assets/img/radovi/stepenice.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/radovi/led_gartenleuchte_zweiflammig_einflammig-800x510.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/radovi/boden6.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/radovi/boden.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/radovi/1-1.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/radovi/81cff96856e5365d516c22ec07e2666b.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/radovi/433490d60c05bd9f16066250287e7ef9.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/radovi/ferax_centauris_einbau.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/vila11.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/proj1.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.vertical}`}>
                <img
                  src={require('../../assets/img/usluge/proj2.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.big}`}>
                <img
                  src={require('../../assets/img/usluge/proj5.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/usluge/sigurnost7.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/wandleuchten1.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/wandleuchten.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/urb.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/Web-Loxone_Showhome_Wohnbereich_blau_violett.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/wireless-lighting-1-1.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/ugradbene.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/Web_Loxone_Showhome_Wohnbereich.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/Lichtschlauch_Terrasse.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/usluge/ledidee.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/ledidea.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/ledidea1.png')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.vertical}`}>
                <img
                  src={require('../../assets/img/usluge/ledidea2.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.vertical}`}>
                <img
                  src={require('../../assets/img/usluge/ledidea3.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/ledidea4.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/usluge/ledidea5.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/usluge/ledidea7.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.vertical}`}>
                <img
                  src={require('../../assets/img/usluge/ledidea6.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/ledidea8.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/usluge/ledidea9.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/ledidea.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/ledidea2.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.mh}`}>
                <img
                  src={require('../../assets/img/ledidea1.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/ledidea3.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray1.length < 45 && node && this.state.init) {
                      this.imgArray1.push(node);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div id={styles.solar}>
            <h3>Solarni Paneli</h3>
            <div id={styles.solarb} ref={this.parentCon1}>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar1.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar2.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar3.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar4.png')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar5.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar6.png')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar7.png')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar8.jpeg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar9.png')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar10.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar11.png')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar12.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar13.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar14.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/solar15.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray2.length < 16 && node && this.state.init) {
                      this.imgArray2.push(node);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div id={styles.mrezeitel}>
            <h3>Mreže i Telefonske Instalacije</h3>
            <div id={styles.mrezeitelb} ref={this.parentCon2}>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/mreze1.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray3.length < 11 && node && this.state.init) {
                      this.imgArray3.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/mreze2.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray3.length < 11 && node && this.state.init) {
                      this.imgArray3.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/mreze3.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray3.length < 11 && node && this.state.init) {
                      this.imgArray3.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/mreze4.jpeg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray3.length < 11 && node && this.state.init) {
                      this.imgArray3.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.vertical}`}>
                <img
                  src={require('../../assets/img/mreze5.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray3.length < 11 && node && this.state.init) {
                      this.imgArray3.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/mreze6.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray3.length < 11 && node && this.state.init) {
                      this.imgArray3.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.vertical}`}>
                <img
                  src={require('../../assets/img/mreze7.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray3.length < 11 && node && this.state.init) {
                      this.imgArray3.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/mreze8.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray3.length < 11 && node && this.state.init) {
                      this.imgArray3.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/mreze9.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray3.length < 11 && node && this.state.init) {
                      this.imgArray3.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/mreze10.png')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray3.length < 11 && node && this.state.init) {
                      this.imgArray3.push(node);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div id={styles.pamkuc}>
            <h3>KNX Pametna Kuća / Smart Home</h3>
            <div id={styles.pamkucb} ref={this.parentCon3}>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/smart1.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray4.length < 7 && node && this.state.init) {
                      this.imgArray4.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/smart2.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray4.length < 7 && node && this.state.init) {
                      this.imgArray4.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/smart3.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray4.length < 7 && node && this.state.init) {
                      this.imgArray4.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/smart4.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray4.length < 7 && node && this.state.init) {
                      this.imgArray4.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/smart6.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray4.length < 7 && node && this.state.init) {
                      this.imgArray4.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/smart5.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray4.length < 7 && node && this.state.init) {
                      this.imgArray4.push(node);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div id={styles.kamerer}>
            <h3>Video Nadzor</h3>
            <div id={styles.kamererb} ref={this.parentCon4}>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/kamere2.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray5.length < 11 && node && this.state.init) {
                      this.imgArray5.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/kamere1.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray5.length < 11 && node && this.state.init) {
                      this.imgArray5.push(node);
                    }
                  }}
                />
              </div>

              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/kamere3.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray5.length < 11 && node && this.state.init) {
                      this.imgArray5.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/kamere6.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray5.length < 11 && node && this.state.init) {
                      this.imgArray5.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/kamere7.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray5.length < 11 && node && this.state.init) {
                      this.imgArray5.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/kamere4.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray5.length < 11 && node && this.state.init) {
                      this.imgArray5.push(node);
                    }
                  }}
                />
              </div>

              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/kamere9.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray5.length < 11 && node && this.state.init) {
                      this.imgArray5.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/kamere8.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray5.length < 11 && node && this.state.init) {
                      this.imgArray5.push(node);
                    }
                  }}
                />
              </div>
              <div class={styles.portfcol}>
                <img
                  src={require('../../assets/img/kamere10.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray5.length < 11 && node && this.state.init) {
                      this.imgArray5.push(node);
                    }
                  }}
                />
              </div>
              <div class={`${styles.portfcol} ${styles.horizontal}`}>
                <img
                  src={require('../../assets/img/kamere11.jpg')}
                  alt=""
                  ref={(node) => {
                    if (this.imgArray5.length < 11 && node && this.state.init) {
                      this.imgArray5.push(node);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <div class={styles.slikaCon} ref={this.slikeCon}>
          <img src="#" alt="" ref={this.slikeConimg} />
        </div>
        <div class={styles.overlayp} ref={this.showOverlay}></div>
        <div
          class={styles.xmarkcon}
          ref={this.xmark}
          onClick={this.xmarkHandler}
        >
          <i id={styles.xmark} class="fas fa-times fa-4x"></i>
        </div>
        <i
          class={`${styles.fachevronright} fas fa-chevron-right fa-4x`}
          ref={this.chevR}
          onClick={this.chevRHandler}
        ></i>
        <i
          class={`${styles.fachevronleft} fas fa-chevron-left fa-4x`}
          ref={this.chevL}
          onClick={this.chevLHandler}
        ></i>
        <div id={styles.totop1}>
          <i class="fas fa-chevron-up fa-2x"></i>
        </div>
      </>
    );
  }
}

export default Radovi;
