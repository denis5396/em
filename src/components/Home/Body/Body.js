import React, { Component, createRef } from "react";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";
import { v1 as uuid } from "uuid";
import "./Body.css";
import { getAllByPlaceholderText } from "@testing-library/react";
class Body extends Component {
  state = {
    forward: false,
    backwards: false,
    unlock: true,
    init: true,
    clicked: false,
    projs: [],
    lessThan: false,
    lng: 0,
  };
  projectSlider = createRef();
  slides = createRef();
  slideWidth = createRef();
  sliderWidth = createRef();
  nextx = createRef();
  prevx = createRef();

  translateY = createRef();

  kax = createRef();
  ka = createRef();

  footerBtn = createRef();
  footerBtnA = createRef();
  footerBtnAx = createRef();

  removeSmooth = () => {
    document.querySelector("html").style.scrollBehavior = "auto";
  };

  bacaj = () => {
    // if (this.slides[0]) {
    //   let boxWidth = await this.slides[0].clientWidth;
    //   this.setState({ unlock: false });
    //   this.projectSlider.current.style.transition = "transform .5s ease";
    //   if (this.state.projs.length <= 3) {
    //     let cpyState = [...this.state.projs];
    //     cpyState.push(cpyState[0]);
    //     this.setState(
    //       (state) => ({
    //         ...state,
    //         projs: [...cpyState],
    //       }),
    //       () => {
    //         console.log(this.state);
    //       }
    //     );
    //   }
    //   this.projectSlider.current.style.transform = `translateX(${
    //     -boxWidth - 10
    //   }px)`;
    //   this.btnAnimation("next");
    // }
    if (this.projectSlider.current.children[0]) {
      let boxWidth = window.getComputedStyle(
        this.projectSlider.current.children[0]
      ).width;
      boxWidth = +boxWidth.slice(0, boxWidth.length - 2);
      this.setState({ unlock: false }, () => {
        this.projectSlider.current.style.transition = "transform .5s ease";
        // if (this.state.projs.length <= 3) {
        let cpyState = [...this.state.projs];
        cpyState.push(cpyState[0]);
        this.setState(
          (state) => ({
            ...state,
            projs: [...cpyState],
          }),
          () => {
            this.projectSlider.current.style.transform = `translateX(${
              -boxWidth - 10
            }px)`;
            this.btnAnimation("next");
            console.log(boxWidth.width);
            console.log(this.state);
          }
        );
        // }
        // else {
        //   this.projectSlider.current.style.transform = `translateX(${
        //     -boxWidth - 10
        //   }px)`;
        //   this.btnAnimation("next");
        //   console.log(boxWidth.width);
        // }
      });
    }
  };
  handleForward = () => {
    if (this.state.unlock) {
      this.setState(
        (state) => ({
          ...state,
          forward: true,
          backwards: false,
        }),
        () => {
          this.bacaj();
        }
      );
    }
  };
  handleBackwards = () => {
    if (this.state.unlock) {
      this.setState(
        (state) => ({
          ...state,
          forward: false,
          backwards: true,
        }),
        () => {
          // && this.projectSlider.current.children.length === this.state.lng

          this.popSlide();
        }
      );
    }
  };
  handleTransition = (e) => {
    if (e.propertyName === "transform") {
      if (this.state.forward) {
        this.shiftSlide();
      } else if (
        this.state.backwards
        // this.state.lessThan &&
        // !this.state.unlock
      ) {
        console.log("transitionend");
        this.shiftSlideBack();
      }
    }
  };

  popSlide = () => {
    console.log("test");
    if (this.projectSlider.current.children[0]) {
      let boxWidth = window.getComputedStyle(
        this.projectSlider.current.children[0]
      ).width;
      boxWidth = +boxWidth.slice(0, boxWidth.length - 2);
      this.setState(
        (state) => ({
          ...state,
          unlock: false,
        }),
        () => {
          let cpyState = [...this.state.projs];
          cpyState.unshift(cpyState[cpyState.length - 1]);
          this.projectSlider.current.style.transition = "none";
          this.setState(
            (state) => ({ ...state, projs: [...cpyState] }),
            () => {
              this.projectSlider.current.style.transform = `translateX(${
                -boxWidth - 10
              }px)`;
              this.btnAnimation("prev");

              setTimeout(() => {
                this.projectSlider.current.style.transition =
                  "transform 0.5s ease";
                this.projectSlider.current.style.transform = `translateX(0vw)`;
              }, 10);
            }
          );
        }
      );
    }
    // this.setState(
    //   (state) => ({ ...state, unlock: false }),
    //   () => {
    //     if (this.slides) {
    //       if (!this.state.lessThan) {
    //         let izbrisi = this.slides[this.slides.length - 1];
    //         const sliderParent = izbrisi.parentElement;
    //         let izbrisii = sliderParent.children[this.slides.length - 1];
    //         console.log(izbrisii);
    //         sliderParent.children[this.slides.length - 1].remove();
    //         sliderParent.prepend(izbrisii);
    //         this.projectSlider.current.style.transition = "none";
    //         this.projectSlider.current.style.transform = "translateX(-25vw)";
    //         this.btnAnimation("prev");
    //         setTimeout(() => {
    //           this.fixaj();
    //         }, 1);
    //       } else {
    //         console.log("test2");

    //         let boxWidth = this.slides[0].clientWidth;
    //         this.setState({ unlock: false });
    //         this.projectSlider.current.style.transition = "none";
    //         if (this.state.projs.length <= 3) {
    //           let cpyState = [...this.state.projs];
    //           cpyState.unshift(cpyState[cpyState.length - 1]);
    //           this.setState(
    //             (state) => ({
    //               ...state,
    //               projs: [...cpyState],
    //             }),
    //             () => {
    //               console.log(this.state);
    //             }
    //           );
    //         }
    //         this.projectSlider.current.style.transform = `translateX(-${
    //           boxWidth + 10
    //         }px)`;
    //         this.btnAnimation("prev");
    //         if (navigator.userAgent.indexOf("Firefox") != -1) {
    //           setTimeout(() => {
    //             this.projectSlider.current.style.transition =
    //               "transform .5s ease";
    //             this.projectSlider.current.style.transform = "translateX(0)";
    //           }, 100);
    //         } else {
    //           setTimeout(() => {
    //             this.projectSlider.current.style.transition =
    //               "transform .5s ease";
    //             this.projectSlider.current.style.transform = "translateX(0)";
    //           }, 0.1);
    //         }
    //         // setTimeout(() => {
    //         //   this.setState({ unlock: true });
    //         // }, 500);
    //       }
    //     }
    //   }
    // );
  };
  fixaj = () => {
    this.projectSlider.current.style.transition = "transform 0.5s ease";
    this.projectSlider.current.style.transform = `translateX(0vw)`;
    setTimeout(() => {
      this.setState({ unlock: true });
    }, 500);
  };

  shiftSlide = () => {
    let cpyState = [...this.state.projs];
    cpyState.splice(0, 1);
    this.projectSlider.current.style.transition = "none";
    setTimeout(() => {
      this.projectSlider.current.style.transform = "translateX(0)";
      this.setState(
        (state) => ({
          ...state,
          projs: [...cpyState],
        }),
        () => {
          console.log(this.state);
          this.setState((state) => ({ ...state, unlock: true }));
        }
      );
    }, 10);
  };

  shiftSlideBack = () => {
    let cpyState = [...this.state.projs];
    cpyState.splice(cpyState.length - 1, 1);
    this.setState(
      (state) => ({
        ...state,
        projs: [...cpyState],
        unlock: true,
      }),
      () => {
        console.log(this.state);
      }
    );

    // this.setState({ unlock: true });
  };

  btnAnimation = (nextx) => {
    console.log(nextx);
    if (nextx === "prev") {
      console.log("prev");
      this.prevx.current.animate(
        [
          { transform: "rotateY(0) translateY(50%)" },
          { transform: "rotateY(-45deg) translateY(50%)" },
          { transform: "rotateY(0deg) translateY(50%)" },
        ],
        {
          duration: 400,
        }
      );
      this.prevx.current.style.backgroundColor = "rgba(83, 109, 254, 0.7)";
      setTimeout(() => {
        this.prevx.current.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      }, 400);
    } else if (nextx === "next") {
      this.nextx.current.animate(
        [
          { transform: "rotateY(0) translateY(50%)" },
          { transform: "rotateY(45deg) translateY(50%)" },
          { transform: "rotateY(0deg) translateY(50%)" },
        ],
        {
          duration: 400,
        }
      );
      this.nextx.current.style.backgroundColor = "rgba(83, 109, 254, 0.7)";
      setTimeout(() => {
        this.nextx.current.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      }, 400);
    }
  };

  swapfront = (e) => {
    const front = e.target.children[0];
    const back = e.target.children[1];
    front.style.transition = "all 1s ease";
    front.animate(
      [{ transform: "rotateY(0deg)" }, { transform: "rotateY(90deg)" }],
      {
        duration: 200,
        easing: "ease-in",
        fill: "forwards",
      }
    );
    back.animate(
      [{ transform: "rotateY(90deg)" }, { transform: "rotateY(0deg)" }],
      {
        duration: 200,
        delay: 200,
        easing: "ease-in",
        fill: "forwards",
      }
    );
  };

  swapback = (e) => {
    const front = e.target.children[0];
    const back = e.target.children[1];
    front.style.transition = "all 1s ease";
    front.animate(
      [{ transform: "rotateY(90deg)" }, { transform: "rotateY(0deg)" }],
      {
        duration: 200,
        easing: "ease-in",
        fill: "forwards",
        delay: 100,
      }
    );
    back.animate(
      [{ transform: "rotateY(0deg)" }, { transform: "rotateY(90deg)" }],
      {
        duration: 200,
        easing: "ease-in",
        fill: "forwards",
      }
    );
  };

  hovanim2e = () => {
    this.kax.current.style.transition = "color 0.5s ease";
    this.kax.current.style.color = "#111";
    this.ka.current.style.animation = "fillbtn 0.5s linear forwards";
  };

  hovanim2l = () => {
    this.kax.current.style.transition = "color 0.5s ease";
    this.kax.current.style.color = "#fff";
    this.ka.current.style.animation = "fillbtnrev 0.5s ease-in forwards";
  };

  footerBtnE = () => {
    this.footerBtnAx.current.style.transition = "color 0.5s ease";
    this.footerBtnAx.current.style.color = "#111";
    this.footerBtnA.current.style.animation = "fillbtn 0.5s linear forwards";
  };

  footerBtnL = () => {
    this.footerBtnAx.current.style.transition = "color 0.5s ease";
    this.footerBtnAx.current.style.color = "#fff";
    this.footerBtnA.current.style.animation =
      "fillbtnrev 0.5s ease-in forwards";
  };
  // fakeRequest = () => {
  //   return new Promise((resolve) => setTimeout(() => resolve(), 12500));
  // };

  componentDidMount() {
    // document.addEventListener('DOMContentLoaded', function (event) {
    //   alert('loaded');
    // });
    // this.fakeRequest().then(() => alert('done'));
    // if (
    //   (navigator.userAgent.indexOf('Opera') !== -1 ||
    //     navigator.userAgent.indexOf('OPR')) != -1
    // ) {
    //   alert('Opera');
    // } else if (navigator.userAgent.indexOf('Chrome') != -1) {
    //   alert('Chrome');
    // } else if (navigator.userAgent.indexOf('Safari') != -1) {
    //   alert('Safari');
    // } else if (navigator.userAgent.indexOf('Firefox') != -1) {
    //   alert('Firefox');
    // } else if (
    //   navigator.userAgent.indexOf('MSIE') != -1 ||
    //   !!document.documentMode == true
    // ) {
    //   //IF IE > 10
    //   alert('IE');
    // } else {
    //   alert('unknown');
    // }
    if (this.state.projs.length <= 3) {
      this.setState({ lessThan: true });
    }
    // if (this.slides[0]) {
    //   let boxWidth = this.slides[0].clientWidth;
    //   this.slides.forEach((slide) => {
    //     slide.style.width = `${boxWidth}px`;
    //   });
    //   this.sliderWidth.current.style.width = `${boxWidth * 3 + 12}px`;
    // }
    const dbRef = db.ref("/content");
    // dbRef.set({ username: 'hello' });
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const copyObj = [];
      let cnt = 0;
      const copyObj2 = [];
      let cnt2 = 0;
      for (let key in data) {
        // if (data[key].imageUrl.length === 1) {
        copyObj[cnt] = {
          title: data[key].title,
          imageUrl: data[key].imageUrl[0].replace(
            "https://firebasestorage.googleapis.com",
            `https://ik.imagekit.io/1cryg5xvxsq/tr:w-${
              window.innerWidth > 768 && window.innerWidth < 1201
                ? window.innerWidth / 2
                : window.innerWidth > 1200
                ? window.innerWidth / 3
                : window.innerWidth < 501
                ? window.innerWidth * 0.8
                : window.innerWidth
            }`
          ),
        };
        cnt++;
        // }
      }
      // copyObj.splice(2);
      this.setState(
        (state) => ({
          ...state,
          projs: [...copyObj],
          lng: copyObj.length,
        }),
        () => {
          console.log(this.state);
          if (this.projectSlider.current && this.state.projs.length === 1) {
            if (window.innerWidth > 800) {
              this.projectSlider.current.parentElement.style.maxWidth = "50vw";
            } else if (window.innerWidth <= 500) {
              this.projectSlider.current.parentElement.style.maxWidth = "77vw";
            } else {
              // this.projectSlider.current.children[0].style.width = "77vw";
              this.projectSlider.current.parentElement.style.maxWidth = "60vw";
            }
          }
        }
      );
      console.log(copyObj);
    });

    window.addEventListener("orientationchange", () => {
      window.location.reload();
    });

    document.title = "ELEKTROMONTING | Po??etna";
  }

  // componentDidUpdate() {
  //   alert('yes');
  // }

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   console.log(nextState);
  //   let bool = true;
  //   if (nextState.projs === this.state.projs) {
  //     bool = false;
  //   }
  //   return bool;
  // };

  render() {
    this.slides = undefined;
    if (!this.slides) {
      this.slides = [];
    } else {
      this.setState({ init: false });
    }
    return (
      <main>
        <div id="spoji">
          <h2>
            <strong>ELEKTROMONTING</strong>
          </h2>
          <img src={require("../../../assets/img/emlogo.png")} alt="" />
        </div>

        {/* <div id="mainimgcontainer">
          <div className="box">
            <div className="imgBx"></div>
            <div className="content">
              <h2>Kvalitetan Servis</h2>
              <p>
                Izra??ujemo i montiramo kvalitetne elektro instalacije za siguran
                i kvalitetan prijenos elektri??ne energije dugi niz godina.
              </p>
            </div>
          </div>
          <div className="box">
            <div className="imgBx"></div>
            <div className="content">
              <h2>Dugogodi??nje iskustvo</h2>
              <p>
                Obratite nam se s povjerenjem, jer ono ??to odlikuje na??u firmu
                jest dugogodi??nje iskustvo u radu s elektroinstalacijama.
              </p>
            </div>
          </div>
          <div className="box">
            <div className="imgBx"></div>
            <div className="content">
              <h2>pratimo najnoviju tehnologiju</h2>
              <p>
                Ako ??elite u svoj stambeni ili poslovni prostor ugraditi
                najnoviju inteligentnu elektroinstalaciju, na pravom ste mjestu.
              </p>
            </div>
          </div>
          <div className="box">
            <div className="imgBx"></div>
            <div className="content">
              <h2>Stru??ni tim</h2>
              <p>
                Na??e stru??no osoblje odabrati ??e za Vas optimalno rje??enje,
                izvr??iti odabir opreme, brzo i u roku isporu??iti opremu,
                izvr??iti monta??u ili pru??iti potrebnu tehni??ku podr??ku, te
                osigurati pu??tanje u pogon.
              </p>
            </div>
          </div>
        </div>
    */}
        <section id="whatwedo">
          <div id="bx1">
            <h1>kvalitetan servis</h1>
          </div>
          <div id="bx2">
            <h1>Dugogodi??nje Iskustvo</h1>
          </div>
          <div id="bx3">
            <h1>Poznajemo i Pratimo Nove Tehnologije</h1>
          </div>
          <div id="bx4">
            <h1>Stru??ni Tim</h1>
          </div>
        </section>
        <section id="usluge">
          <header>
            <h2>Na??e Usluge</h2>
            <h3>Na??a rje??enja za va?? dom</h3>
            <div className="lineh"></div>
            <div className="linec"></div>
          </header>
          <div id="uslugebody">
            <div className="usluge">
              <div className="imgwrapper">
                <img
                  src={require("../../../assets/img/KNX_logo.svg_-300x143.png")}
                  alt=""
                />
              </div>
              <h3>KNX / EIB</h3>
              <p>
                KNX/EIB se mo??e okarakterisati kao digitalni nervni sistem za
                va?? dom. Pri tome ste vi kao korisnik u glavnoj ulozi tako ??to
                upravljate cijelim sistemom uz pomoc interneta, daljinskog,
                tableta ili pametnog telefona. Funkcionalni princip je
                jednostavan, senzori, termostati i senzori pokreta komuniciraju
                preko KNX/EIB - mre??e sa rasvjetom, klima ure??ajima, grijanjem,
                ??aluzinama itd.
              </p>
            </div>
            <div className="usluge">
              <div className="imgwrapper">
                <i className="fas fa-house-damage fa-7x"></i>
              </div>
              <h3>Elektroinstalacije</h3>
              <p>
                Prije je industrija odlu??ivala koji produkti bi bili na tr??i??tu.
                Danas je to Kupac. ??elje i ideje kupca su odlu??uju??i faktor u
                razvojnom radu, prema tome je i velika raznovrsnost ponude u
                elektrotehnici. Vi planirate novi gra??evinski projekat ili
                ??elite postoje??u nekretninu dovesti na najnoviji nivo
                elektrotehnike ? Kontaktirajte nas, na?? tim specijalista ??e vam
                rado pomo??i.
              </p>
            </div>
            <div className="usluge">
              <div className="imgwrapper">
                <i className="fas fa-laptop-house fa-7x"></i>
              </div>
              <h3>Smart Home</h3>
              <p>
                Grijanje, rasvjeta, sigurnosni mehanizmi, ??aluzine,
                komunikacijska i multimedijalna rije??enja - sve navedeno se mo??e
                lagodno kontrolirati, uz pomo?? integrisane inteligencije koja je
                dio BUS sistema. Aparati, ure??aji i njihove upravlja??ke jedinice
                moraju biti me??usobno povezani i programirani. Smart Home pru??a
                energetsku efikasnost i fleksibilnost, jednom implementirane
                funkcionalnosti se mogu u bilo koje vrijeme prilagoditi na nove
                naredbe.
              </p>
            </div>
            <div className="usluge">
              <div className="imgwrapper">
                <i className="fas fa-lightbulb fa-7x"></i>
              </div>
              <h3>Rasvjeta</h3>
              <p>
                Pojedina??no koherentni rasvjetni scenariji se mogu uz pomo??
                jednog inteligentnog rasvjetnog menad??menta na bazi DALI(Digital
                Adressable Lighting Interface) regulisati i upravljati. DALI ne
                samo da preuzima ??altanje i dimanje rasvjete nego i omogu??ava
                upravljanje raznobojnih rasvjetnih scenarija sa LED,
                Flourescentnim ili Halogenim lampama.
              </p>
            </div>

            <div className="usluge sr">
              <div className="imgwrapper">
                <i className="fas fa-server fa-7x"></i>
              </div>
              <h3>Mre??ne Instalacije</h3>
              <ul id="fixaj">
                <li>
                  <p>Radimo slijede??e:</p>
                </li>
                <li>
                  <p>- Uti??nice za antene</p>
                </li>
                <li>
                  <p>- Telefonske linije</p>
                </li>
                <li>
                  <p>- Uti??nice : Prenos podataka preko elektri??nog voda</p>
                </li>
                <li>
                  <p>- Ethernet kabliranje</p>
                </li>
                <li>
                  <p>- Radio mre??a sa WLAN</p>
                </li>
                <li>
                  <p>
                    Prenos podataka je siguran i bez gubitaka, br??i pristup
                    velikoj koli??ini podataka, pohrana podataka na centralni
                    server, indivudalne komponente se mogu s lako??om
                    upravljati(video kamere, video interfon, detektor dima itd.)
                  </p>
                </li>
              </ul>
            </div>
            <div className="usluge sr">
              <div className="imgwrapper">
                <i className="fas fa-question-circle fa-7x"></i>
              </div>
              <h3>Ispitivanje elektri??nih instalacija</h3>
              <p>
                Defektni ure??aji ili instalacije prouzrokuju mnogo ??tete. ??esti
                uzrok: istro??enost ili preoptere??enje, takvi rizici se mogu
                identificirati i eliminisati uz pomo?? redovnih ispitivanja.
                Ispitujemo elektroinstalacije, sigurnosne ure??aje kao ??to su FID
                sklopke, razvodne ormare. Pri tome provjeravamo elektri??ne
                ure??aje i elektri??ne ma??ine kao ??to su pe??i, fotokopirni
                ure??aji, reza??i papira, kompjuteri, ??tampa??i itd. Pri potrebi
                ispitujemo i kontrolne/sigurnosne sisteme(gromobranske
                instalacije).
              </p>
            </div>
            <div className="usluge sr">
              <div className="imgwrapper">
                <i className="fas fa-ruler-combined fa-7x"></i>
              </div>
              <h3>Planiranje i projektovanje</h3>
              <p>
                Nudimo vam kompletna rije??enja, od konsultacije do planiranja i
                sve do izvr??enja projekta. Naknadna podr??ka se tako??er
                podrazumijeva. Na??a tehni??ke usluge planiranja obuhvataju sva
                polja elektri??nih sistema po najnovijim tehni??kim i tehnolo??kim
                saznanjima. U to spadaju i elektrotehni??ki sistemi u
                konvencionalnoj i KNX - tehnologiji, sistemi rasvjete i hitnog
                osvjetljenja, protiv provalni i protiv po??arni sistemi,
                elektroakusti??ki pretvara??i, komunikacijski sistemi,
                gromobranske instalacije i sistemi uzemljenja.
              </p>
            </div>
            <div className="usluge sr">
              <div className="imgwrapper">
                <i className="fas fa-lock fa-7x"></i>
              </div>
              <h3>Sigurnosna tehnologija</h3>
              <p>
                Protivpo??arni alarmi, video nadzor, signalni ure??aji, alarmne
                centrale i pametni alarmni sistemi, kontrole pristupa. Moderna
                sigurnosna rje??enja nude mnoge mogu??nosti, pomo??u kojih se
                objekat/imanje mo??e za??titi od razbojnika, po??ara i vremenskih
                neprilika. Nudimo vam planiranje i instalaciju razli??itih
                sigurnosnih sistema, provjeravamo i instaliramo navedene ure??aje
                po propisima i garantujemo vam optimalnu sigurnost i za??titu od
                nepozvanih gostiju i opasnih situacija.
              </p>
            </div>
          </div>
        </section>
        {/*
        <section id="lookaround">
          <div id="lookaroundimg"></div>
          <div id="lookaroundtxt">
            <h3>Pretra??ite na??u web stranicu detaljnije</h3>
            <p style={{ color: '#fff', fontSize: '1.4rem' }}>
              Na??a stranica vam daje uvid o potencijalu moderne elektrotehnike.
              Va??e ??elje za sigurno????u, jednostavnim upravljanjem i niskom
              energetskom potro??njom ??e biti ispunjene. Na?? tim specijalista ??e
              vam pru??iti odgovaraju??a rje??enja i njihovu implementaciju.
            </p>
            <p style={{ color: '#fff', fontSize: '1.4rem' }}>
              Digitalno poslo??ene informacije ne mogu zamjeniti li??ni razgovor,
              ??ekamo vas!
            </p>
            <div
              id="hovanim2"
              onMouseEnter={this.hovanim2e}
              onMouseLeave={this.hovanim2l}
            >
              <a style={{ visibility: 'hidden' }} href="#">
                {' '}
                Kontakt{' '}
              </a>

              <div id="ka" ref={this.ka}>
                <strong>
                  <Link
                    to="/kontakt"
                    ref={this.kax}
                    onClick={this.removeSmooth}
                  >
                    Kontakt
                  </Link>{' '}
                </strong>
              </div>
            </div>
          </div>
        </section> */}
        <section id="projectsheader">
          <h2>Posljednji Projekti</h2>
          <div className="lineh"></div>
          <div className="linec"></div>
        </section>
        <section id="projects">
          <div id="box1"></div>
          <div id="prev" ref={this.prevx} onClick={this.handleBackwards}>
            <i className="fas fa-chevron-left fa-3x"></i>
          </div>
          <div id="next" onClick={this.handleForward} ref={this.nextx}>
            <i className="fas fa-chevron-right fa-3x"></i>
          </div>
          <div id="project" ref={this.sliderWidth}>
            <div
              id="projectslider"
              ref={this.projectSlider}
              onTransitionEnd={this.handleTransition}
              // style={{
              //   gridTemplateColumns: `${
              //     this.state.projs.length > 6
              //       ? `repeat(${this.state.projs.length}, 1fr)`
              //       : "repeat(6, 1fr)"
              //   }`,
              // }}
              style={{
                gridTemplateColumns: `repeat(${
                  this.state.projs.length + 1
                }, 1fr)`,
              }}
            >
              {this.state.projs.map((proj, i) => (
                <div
                  id={
                    this.state.lng === 2
                      ? "item2"
                      : this.state.lng === 1
                      ? "item3"
                      : "one"
                  }
                  className="project"
                  key={uuid()}
                  style={{
                    background: `url(${proj.imageUrl}) no-repeat center/cover`,
                  }}
                >
                  <h3>{proj.title}</h3>
                </div>
              ))}
              {/* {this.state.projs.map((proj, i) => (
                <div
                  style={{ width: '30vw' }}
                  className="project"
                  id={
                    // i === 0
                    //   ? 'one'
                    //   : i === 1
                    //   ? 'two'
                    //   : i === 2
                    //   ? 'three'
                    //   : i === 3
                    //   ? 'four'
                    //   : ''
                    // 'one'
                    this.state.lng === 2
                      ? 'item2'
                      : this.state.lng === 1
                      ? 'item3'
                      : 'one'
                  }
                  key={uuid()}
                  ref={(slide) => {
                    if (
                      this.slides.length < this.state.projs.length &&
                      slide &&
                      this.state.init
                    ) {
                      this.slides.push(slide);
                    }
                  }}
                  style={{
                    background: `url(${proj.imageUrl}) no-repeat center/cover`,
                  }}
                >
                  <h3>{proj.title}</h3>
                </div>
              ))} */}
              {/* <div
                className="project"
                id="one"
                ref={(slide) => {
                  if (this.slides.length < 6 && slide && this.state.init) {
                    this.slides.push(slide);
                  }
                }}
              >
                <h3>Objekt jedan</h3>
              </div>
              <div
                className="project"
                id="two"
                ref={(slide) => {
                  if (this.slides.length < 6 && slide && this.state.init) {
                    this.slides.push(slide);
                  }
                }}
              >
                <h3>Objekt jedan</h3>
              </div>
              <div
                className="project"
                id="three"
                ref={(slide) => {
                  if (this.slides.length < 6 && slide && this.state.init) {
                    this.slides.push(slide);
                  }
                }}
              >
                <h3>Objekt jedan</h3>
              </div>
              <div
                className="project"
                id="four"
                ref={(slide) => {
                  if (this.slides.length < 6 && slide && this.state.init) {
                    this.slides.push(slide);
                  }
                }}
              >
                <h3>Objekt jedan</h3>
              </div>
              <div
                className="project"
                id="five"
                ref={(slide) => {
                  if (this.slides.length < 6 && slide && this.state.init) {
                    this.slides.push(slide);
                  }
                }}
              >
                <h3>Objekt jedan</h3>
              </div>
              <div
                className="project"
                id="six"
                ref={(slide) => {
                  if (this.slides.length < 6 && slide && this.state.init) {
                    this.slides.push(slide);
                  }
                }}
              >
                <h3>Objekt jedan</h3>
              </div> */}
            </div>
          </div>
        </section>
        <footer id="footer">
          <div
            id="totop"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <i className="fas fa-chevron-up fa-2x"></i>
          </div>
          <div id="upperrow">
            <div id="footersct1">
              <img src={require("../../../assets/img/emlogo.png")} alt="" />
              <h2>ELEKTROMONTING</h2>
            </div>
            <div id="footersct2">
              <h2>O NAMA</h2>
              <p>
                Mi smo kompanija koja na bosanskohercegova??kom tr??i??tu posluje
                od 2015. Firma se nalazi na Ilid??i.
              </p>
              <p>
                Osnovna djelatnost su elektromonta??erski i elektroinstalaterski
                radovi jake i slabe struje.
              </p>
              <p></p>
              <div
                id="hovanim"
                ref={this.footerBtn}
                onMouseEnter={this.footerBtnE}
                onMouseLeave={this.footerBtnL}
              >
                <Link id="btnfooter"> Saznaj Vi??e </Link>

                <div id="fillbtn" ref={this.footerBtnA}>
                  <strong>
                    <Link
                      to="/onama"
                      href="#"
                      ref={this.footerBtnAx}
                      onClick={this.removeSmooth}
                    >
                      Saznaj Vi??e
                    </Link>{" "}
                  </strong>
                </div>
              </div>
            </div>
            <div id="footersct3">
              <h2>Navigacija</h2>
              <ul>
                <li>
                  <Link to="/" onClick={this.removeSmooth}>
                    Po??etna
                  </Link>
                </li>
                <li>
                  <Link to="/usluge#p" onClick={this.removeSmooth}>
                    Usluge
                  </Link>
                </li>
                <li>
                  <Link to="/onama" onClick={this.removeSmooth}>
                    O nama
                  </Link>
                </li>
                <li>
                  <Link to="/radovi" onClick={this.removeSmooth}>
                    Radovi
                  </Link>
                </li>
                <li>
                  <Link to="kontakt" onClick={this.removeSmooth}>
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>
            <div id="footersct4">
              <h2>Adresa i radno vrijeme</h2>
              <ul>
                <li>
                  <i
                    style={{ color: "lightblue", transform: "scale(1.2)" }}
                    className="fas fa-home"
                  ></i>{" "}
                  &nbsp;Most Spasa 64, Ilid??a
                </li>
                <li>
                  <i
                    style={{ color: "lightcoral", transform: "scale(1.2)" }}
                    className="far fa-clock"
                  ></i>{" "}
                  &nbsp;pon-pet: 08:00 - 17:00
                </li>
                <li>
                  <i
                    style={{ color: "lightsalmon", transform: "scale(1.2)" }}
                    className="far fa-clock"
                  ></i>{" "}
                  &nbsp;subota: 08:00 - 15:00
                </li>
                <li>
                  <i
                    style={{ color: "lightgreen", transform: "scale(1.2)" }}
                    className="fas fa-phone-alt"
                  ></i>{" "}
                  +387 62 430 995
                </li>
                <li style={{ display: "flex" }}>
                  <img
                    id="resizeGmail"
                    src={require("../../../assets/img/Gmail_Icon.png")}
                    alt="elektromonting email"
                  />
                  &nbsp;E-mail: elektromonting.01@gmail.com
                </li>
                <li>
                  <a
                    style={{ textDecoration: "none", color: "wheat" }}
                    rel="noopener"
                    href="https://www.facebook.com/elektro.monting"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-square"></i> Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div id="bottomrow">
            <p>
              &copy;{`${new Date().getFullYear()}`} ELEKTROMONTING - Tu za vas!
            </p>
          </div>
        </footer>
      </main>
    );
  }
}

export default Body;
