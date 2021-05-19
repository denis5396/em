import React, { Component, createRef } from 'react';
import { db } from '../../firebase';
import { v1 as uuid } from 'uuid';
import Snav from './Snav';
import styles from './Onama.module.css';

class Onama extends Component {
  state = {
    init: true,
    unlock: true,
    forward: false,
    backwards: false,
    imageUrl: [],
    workers: [],
  };

  nexto = createRef();
  prevo = createRef();
  parento = createRef();
  sliderWidtho = createRef();
  slides = createRef();
  setTX = 30;
  exp = '';
  yearExp = createRef();

  componentDidMount() {
    // window.addEventListener('orientationchange', () => {
    //   window.location.reload();
    // });

    const n = new Date();
    const y = n.getFullYear();
    const showExp = y - 2016;
    this.exp = showExp;
    this.yearExp.current.innerText = showExp;
    // if (this.slides[0]) {
    //   alert('xd');
    //   let boxWidth = this.slides[0].clientWidth;
    //   this.slides.forEach((slide) => {
    //     slide.style.width = `${boxWidth}px`;
    //   });
    //   this.sliderWidtho.current.style.width = `${boxWidth * 3 + 12}px`;
    // }
    window.scrollTo(0, 0);
    document.title = 'ELEKTROMONTING | O Nama';

    const dbRef = db.ref('/content');
    // dbRef.set({ username: 'hello' });
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const copyObj = [];
      let cnt = 0;
      const copyObj2 = [];
      let cnt2 = 0;
      let arrKeys = [];
      let keyNums = [];
      let finalKeys = [];
      let workerArr = [];
      for (let key in data) {
        if (data[key].title === 'uposlenici') {
          copyObj[cnt] = data[key];
          cnt++;
        }
      }
      arrKeys = Object.keys(copyObj[0]);
      for (let i = 0; i < arrKeys.length; i++) {
        if (arrKeys[i].match(/\d+/)) {
          keyNums.push(arrKeys[i].match(/\d+/g));
        }
      }
      keyNums.forEach((key) => {
        finalKeys.push(key[0]);
      });
      finalKeys.forEach((key) => {
        workerArr.push(copyObj[0][key]);
      });

      this.setState(
        (state) => ({
          ...state,
          imageUrl: [...copyObj[0].imageUrl],
          workers: [...workerArr],
        }),
        () => {
          console.log(this.state);
          console.log(this.slides.length);
          if (this.slides[0]) {
            let boxWidth = this.slides[0].clientWidth;
            this.slides.forEach((slide) => {
              slide.style.width = `${boxWidth}px`;
              slide.style.width = `${30}vw`;
            });
            // this.sliderWidtho.current.style.width = `${boxWidth * 3 + 12}px`;
          }
          if (this.state.imageUrl.length === 2 && this.parento.current) {
            this.parento.current.children[0].style.width = '45vw';
            this.parento.current.children[1].style.width = '45vw';
            this.setTX = 45;
          } else if (this.state.imageUrl.length === 1 && this.parento.current) {
            this.parento.current.children[0].style.width = '50vw';
            this.setTX = 50;
            this.sliderWidtho.current.style.width = '50%';
          }
        }
      );
      console.log(workerArr);
      console.log(finalKeys);
      console.log(keyNums);
      console.log(copyObj);
    });
  }
  componentWillUnmount() {
    document.querySelector('html').style.scrollBehavior = 'smooth';
  }
  bacaj = async () => {
    let boxWidth = await this.slides[0].clientWidth;
    this.setState({ unlock: false });
    this.parento.current.style.transition = 'transform .5s ease';
    if (this.state.imageUrl.length <= 3) {
      let izbrisi = this.slides[0];
      const sliderParent = izbrisi.parentElement;
      let izbrisii = sliderParent.children[0];
      // sliderParent.children[0].remove();
      // this.parento.current.style.transition = 'none';
      // this.parento.current.style.transform = 'translateX(0)';
      console.log(izbrisi);
      // sliderParent.appendChild(izbrisii);
      console.log(this.state.workers);
      let cpyState = [...this.state.workers];
      cpyState.push(cpyState[0]);
      this.setState(
        (state) => ({
          // ...(state.workers[state.workers.length] = state.workers[0]),
          ...state,
          workers: [...cpyState],
        }),
        () => {
          console.log(this.state);
        }
      );

      this.parento.current.style.transform = `translateX(${-boxWidth - 10}px)`;
    } else {
      this.parento.current.style.transform = `translateX(${-boxWidth - 10}px)`;
    }
    this.setState({ unlock: true });
  };
  handleForward = () => {
    this.setState(
      {
        forward: true,
      },
      () => {
        if (this.state.unlock) {
          this.bacaj();
        }
      }
    );
  };
  handleBackwards = () => {
    this.setState({ forward: false, backwards: true }, () => {
      if (this.state.unlock) {
        this.popSlide();
      }
    });
  };

  handleTransition = (e) => {
    if (
      e.propertyName === 'transform' &&
      e.target.id.indexOf('slidetranslate') !== -1
    ) {
      if (this.state.forward) {
        this.shiftSlide();
      }
    }
  };

  popSlide = () => {
    if (window.innerWidth <= 500) {
      this.setTX = 90;
    }
    this.setState({ unlock: false });
    console.log(this.slides.length);
    this.slides.forEach((slide) => {
      console.log(slide);
    });
    if (this.state.imageUrl.length <= 3) {
      let cpyState = [...this.state.workers];
      cpyState.unshift(this.state.workers[this.state.workers.length - 1]);
      this.setState(
        (state) => ({
          // ...(state.workers[state.workers.length] = state.workers[0]),
          ...state,
          workers: [...cpyState],
        }),
        () => {
          console.log(this.state);
        }
      );
      this.parento.current.style.transition = 'none';
      this.parento.current.style.transform = `translateX(-${this.setTX}vw)`;
      setTimeout(() => {
        this.fixaj();
      }, 1);
    } else {
      let izbrisi = this.slides[this.slides.length - 1];
      console.log(this.slides);
      const sliderParent = izbrisi.parentElement;
      let izbrisii = sliderParent.children[this.slides.length - 1];
      sliderParent.children[this.slides.length - 1].remove();
      sliderParent.prepend(izbrisii);
      this.parento.current.style.transition = 'none';
      this.parento.current.style.transform = `translateX(-${this.setTX}vw)`;
      setTimeout(() => {
        this.fixaj();
      }, 1);
    }
  };
  fixaj = () => {
    this.parento.current.style.transition = 'transform 0.5s ease';
    this.parento.current.style.transform = `translateX(0vw)`;

    if (this.state.imageUrl.length <= 3) {
      setTimeout(() => {
        let cpyState = [...this.state.workers];
        cpyState.splice(cpyState.length - 1, 1);
        this.setState(
          (state) => ({
            ...state,
            workers: [...cpyState],
          }),
          () => {
            console.log(this.state);
          }
        );
        this.setState({ unlock: true });
      }, 499);

      console.log(this.state);
    } else {
      setTimeout(() => {
        this.setState({ unlock: true });
      }, 500);
    }
  };

  shiftSlide = () => {
    if (this.state.imageUrl.length <= 3) {
      let cpyState = [...this.state.workers];
      cpyState.splice(0, 1);
      this.parento.current.style.transition = 'none';
      this.parento.current.style.transform = 'translateX(0)';
      this.setState(
        (state) => ({
          ...state,
          workers: [...cpyState],
        }),
        () => {
          console.log(this.state);
        }
      );
    } else {
      let izbrisi = this.slides[0];
      const sliderParent = izbrisi.parentElement;
      let izbrisii = sliderParent.children[0];
      sliderParent.children[0].remove();
      this.parento.current.style.transition = 'none';
      this.parento.current.style.transform = 'translateX(0)';
      sliderParent.appendChild(izbrisii);
    }
  };

  render() {
    this.slides = undefined;
    if (!this.slides) {
      this.slides = [];
    } else {
      this.setState({ init: false });
    }
    return (
      <>
        <Snav cur={'onama'} />
        <section id={styles.onamahead}>
          <h1>ELEKTROMONTING</h1>
          <h2>O nama</h2>
        </section>

        <section id={styles.onama}>
          <p>
            <strong>ELEKTROMONTING</strong> je firma koja na
            bosanskohercegovačkom tržištu posluje od 2015. i ove godine slavimo
            {` ${this.exp}`} godina uspješnog poslovanja.
          </p>
          <p>
            Osnovna djelatnost su elektromontažerski i elektroinstalaterski
            radovi jake i slabe struje. Radimo sa mnogim dobavljačima elektro
            opreme i lako se prilagođavamo svim zahtjevima tržišta. Svi
            uposlenici prolaze kroz stalne seminare i edukacije, bilo stručne
            ili one koje se tiču motivacije, povećanja efikasnosti,
            produktivnosti ili zaštite na radu.
          </p>
          <p>
            Naš fokus leži na izvanrednoj korisničkoj podršci i pažnji na
            detalje, nastojimo da ispunimo ove ciljeve pri svakom poslu.
            Izgradili smo našu firmu sa stručnim timom električara, koji
            satisfakciju mušterije stavljaju na prvo mjesto.
          </p>

          <h3>KNX Partner</h3>

          <p>
            Kao certificirani KNX partner smo dio jednog velikog umreženog
            sistema kompanija, koji se zalažu za održivo građevinarstvo.
          </p>
          <p>
            Naši radnici su prošli obuku KNX asocijacije i raspolažu sa velikim
            praktičnim iskustvom kod instalacija koji se baziraju na KNX
            tehnologji. Dozvolite sebi da vas posavjetujemo.
          </p>
          <p>
            Pomoću KNX tehnologije su različite funkcije u objektu ujedinjene u
            jedan BUS sistem. Tako se obezbjeđuje optimalna interna komunikaciju
            svih uređaja i sistema u objektu.
          </p>
          <p>
            Velika prednost je sigurno ta da preko 250 poznatih proizvođača
            proizvode KNX produkte, koji su svi međusobno kompatibilni. To daje
            izvanrednu fleksibilnost i varijabilnost u zajedničkom planiranju.
            Tako vam možemo garantovati optimalnu instalaciju po vašim željama.
          </p>
        </section>
        <section id={styles.workdone}>
          <h3>Naša firma ima</h3>
          <div class={styles.workdoneb}>
            <div class={styles.workcol}>
              <i class="fas fa-users fa-4x"></i>
              <div class={styles.iel}></div>
              <h3>{this.state.imageUrl.length}</h3>
              <div class={styles.workl}></div>
              <p>Uposlenika</p>
            </div>
          </div>
          <div class={styles.workdoneb}>
            <div class={styles.workcol}>
              <i class="fas fa-house-damage fa-4x"></i>
              <div class={styles.iel}></div>
              <h3>100+</h3>
              <div class={styles.workl}></div>
              <p>referenci</p>
            </div>
          </div>
          <div class={styles.workdoneb}>
            <div class={styles.workcol}>
              <i class="fas fa-briefcase fa-4x"></i>
              <div class={styles.iel}></div>
              <h3 ref={this.yearExp}></h3>
              <div class={styles.workl}></div>
              <p>Godina iskustva</p>
            </div>
          </div>
        </section>
        <section id={styles.ourteam}>
          <h2>Naš Tim</h2>
          <div id={styles.slidecontainbtns}>
            <div
              id={styles.prevo}
              ref={this.prevo}
              onClick={this.handleBackwards}
            >
              <i class="fas fa-chevron-left fa-3x"></i>
            </div>
            <div
              id={styles.nexto}
              ref={this.nexto}
              onClick={this.handleForward}
            >
              <i class="fas fa-chevron-right fa-3x"></i>
            </div>
            <div id={styles.slidecontain} ref={this.sliderWidtho}>
              <div
                id={styles.slidetranslate}
                ref={this.parento}
                onTransitionEnd={this.handleTransition}
              >
                {this.state.workers.map((wrk, i) => (
                  <div
                    class={
                      this.state.imageUrl.length === 2
                        ? styles.item2
                        : this.state.imageUrl.length === 1
                        ? styles.item3
                        : styles.item
                    }
                    id={styles.oneo}
                    // key={uuid()}
                    ref={(slide) => {
                      if (
                        this.slides.length < this.slides.length + 1 &&
                        slide &&
                        this.state.init
                      ) {
                        this.slides.push(slide);
                      }
                    }}
                    style={{
                      background: `url(${wrk.imageUrl}) no-repeat center center/cover`,
                    }}
                  >
                    <div class={styles.itemtxtwrap}>
                      <div class={styles.itemtxt}>
                        <h4>{wrk.name}</h4>
                        <p>{wrk.title}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* <div
                  class={styles.item}
                  id={styles.oneo}
                  ref={(slide) => {
                    if (this.slides.length < 10 && slide && this.state.init) {
                      this.slides.push(slide);
                    }
                  }}
                >
                  <div class={styles.itemtxtwrap}>
                    <div class={styles.itemtxt}>
                      <h4>Sanel M.</h4>
                      <p>Električar</p>
                    </div>
                  </div>
                </div>
                <div
                  class={styles.item}
                  id={styles.twoo}
                  ref={(slide) => {
                    if (this.slides.length < 10 && slide && this.state.init) {
                      this.slides.push(slide);
                    }
                  }}
                >
                  <div class={styles.itemtxtwrap}>
                    <div class={styles.itemtxt}>
                      <h4>Sanel M.</h4>
                      <p>Električar</p>
                    </div>
                  </div>
                </div>
                <div
                  class={styles.item}
                  id={styles.threeo}
                  ref={(slide) => {
                    if (this.slides.length < 10 && slide && this.state.init) {
                      this.slides.push(slide);
                    }
                  }}
                >
                  <div class={styles.itemtxtwrap}>
                    <div class={styles.itemtxt}>
                      <h4>Sanel M.</h4>
                      <p>Električar</p>
                    </div>
                  </div>
                </div>

                <div
                  class={styles.item}
                  id={styles.fouro}
                  ref={(slide) => {
                    if (this.slides.length < 10 && slide && this.state.init) {
                      this.slides.push(slide);
                    }
                  }}
                >
                  <div class={styles.itemtxtwrap}>
                    <div class={styles.itemtxt}>
                      <h4>Sanel M.</h4>
                      <p>
                        Ing. Elektroenergetike <br />
                        rukovodilac elektro odjela
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class={styles.item}
                  id={styles.fiveo}
                  ref={(slide) => {
                    if (this.slides.length < 10 && slide && this.state.init) {
                      this.slides.push(slide);
                    }
                  }}
                >
                  <div class={styles.itemtxtwrap}>
                    <div class={styles.itemtxt}>
                      <h4>Sanel M.</h4>
                      <p>Električar</p>
                    </div>
                  </div>
                </div>
                <div
                  class={styles.item}
                  id={styles.sixo}
                  ref={(slide) => {
                    if (this.slides.length < 10 && slide && this.state.init) {
                      this.slides.push(slide);
                    }
                  }}
                >
                  <div class={styles.itemtxtwrap}>
                    <div class={styles.itemtxt}>
                      <h4>Sanel M.</h4>
                      <p>Električar</p>
                    </div>
                  </div>
                </div>
                <div
                  class={styles.item}
                  id={styles.seveno}
                  ref={(slide) => {
                    if (this.slides.length < 10 && slide && this.state.init) {
                      this.slides.push(slide);
                    }
                  }}
                >
                  <div class={styles.itemtxtwrap}>
                    <div class={styles.itemtxt}>
                      <h4>Sanel M.</h4>
                      <p>Električar</p>
                    </div>
                  </div>
                </div>
                <div
                  class={styles.item}
                  id={styles.eighto}
                  ref={(slide) => {
                    if (this.slides.length < 10 && slide && this.state.init) {
                      this.slides.push(slide);
                    }
                  }}
                >
                  <div class={styles.itemtxtwrap}>
                    <div class={styles.itemtxt}>
                      <h4>Sanel M.</h4>
                      <p>Električar</p>
                    </div>
                  </div>
                </div>
                <div
                  class={styles.item}
                  id={styles.nineo}
                  ref={(slide) => {
                    if (this.slides.length < 10 && slide && this.state.init) {
                      this.slides.push(slide);
                    }
                  }}
                >
                  <div class={styles.itemtxtwrap}>
                    <div class={styles.itemtxt}>
                      <h4>Sanel M.</h4>
                      <p>Električar</p>
                    </div>
                  </div>
                </div>
                <div
                  class={styles.item}
                  id={styles.teno}
                  ref={(slide) => {
                    if (this.slides.length < 10 && slide && this.state.init) {
                      this.slides.push(slide);
                    }
                  }}
                >
                  <div class={styles.itemtxtwrap}>
                    <div class={styles.itemtxt}>
                      <h4>Sanel M.</h4>
                      <p>Električar</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Onama;
