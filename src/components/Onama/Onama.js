import React, { Component, createRef } from 'react';
import Snav from './Snav';
import styles from './Onama.module.css';

class Onama extends Component {
  state = {
    init: true,
    unlock: true,
    forward: false,
    backwards: false,
  };

  nexto = createRef();
  prevo = createRef();
  parento = createRef();
  sliderWidtho = createRef();
  slides = createRef();
  setTX = 30;
  componentDidMount() {
    // window.addEventListener('orientationchange', () => {
    //   window.location.reload();
    // });
    let boxWidth = this.slides[0].clientWidth;
    this.slides.forEach((slide) => {
      slide.style.width = `${boxWidth}px`;
    });
    this.sliderWidtho.current.style.width = `${boxWidth * 3 + 12}px`;
    window.scrollTo(0, 0);
    document.title = 'Elektro Plus | O Nama';
  }
  componentWillUnmount() {
    document.querySelector('html').style.scrollBehavior = 'smooth';
  }
  bacaj = async () => {
    let boxWidth = await this.slides[0].clientWidth;
    this.setState({ unlock: false });
    this.parento.current.style.transition = 'transform .5s ease';
    this.parento.current.style.transform = `translateX(${-boxWidth - 10}px)`;
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
    let izbrisi = this.slides[9];
    const sliderParent = izbrisi.parentElement;
    let izbrisii = sliderParent.children[9];
    sliderParent.children[9].remove();
    sliderParent.prepend(izbrisii);
    this.parento.current.style.transition = 'none';
    this.parento.current.style.transform = `translateX(-${this.setTX}vw)`;
    setTimeout(() => {
      this.fixaj();
    }, 1);
  };
  fixaj = () => {
    this.parento.current.style.transition = 'transform 0.5s ease';
    this.parento.current.style.transform = `translateX(0vw)`;
    setTimeout(() => {
      this.setState({ unlock: true });
    }, 500);
  };

  shiftSlide = () => {
    // let izbrisi = this.slides[0];
    let izbrisi = this.slides[0];
    const sliderParent = izbrisi.parentElement;
    let izbrisii = sliderParent.children[0];
    sliderParent.children[0].remove();
    this.parento.current.style.transition = 'none';
    this.parento.current.style.transform = 'translateX(0)';

    sliderParent.appendChild(izbrisii);
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
          <h1>
            Elektro <span id={styles.farbaj}>Plus</span>
          </h1>
          <h2>O nama</h2>
        </section>

        <section id={styles.onama}>
          <p>
            <strong>Elektro Plus d.o.o.</strong> Sarajevo je kompanija koja na
            bosanskohercegovačkom tržištu posluje od 2015. i ove godine slavimo
            5 godina uspješnog poslovanja.
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
              <h3>10</h3>
              <div class={styles.workl}></div>
              <p>Zadovoljnih radnika</p>
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
              <i class="fas fa-building fa-4x"></i>
              <div class={styles.iel}></div>
              <h3>5</h3>
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
                <div
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Onama;
