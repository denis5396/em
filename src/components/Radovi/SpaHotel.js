import React, { Component, createRef } from 'react';
import Snav from '../Onama/Snav';
import styles from './Radovi.module.css';

export default class SpaHotel extends Component {
  state = {
    init: true,
  };
  showOverlay = createRef();
  parentCon = createRef();
  xmark = createRef();
  slikeCon = createRef();
  slikeConimg = createRef();
  chevL = createRef();
  chevR = createRef();

  imgArray1 = undefined;
  arr1Imgs = [];
  idName = undefined;
  getImgId = undefined;

  componentDidMount() {
    this.repeat2(this.parentCon.current);
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
      this.repeat(e);
    });
  };

  chevRHandler = () => {
    if (this.getImgId === this.arr1Imgs.length - 1) {
      this.getImgId = 0;
    } else {
      this.getImgId++;
    }
    this.slikeConimg.current.setAttribute('src', this.arr1Imgs[this.getImgId]);
  };
  chevLHandler = () => {
    if (this.getImgId === 0) {
      this.getImgId = this.arr1Imgs.length - 1;
    } else {
      this.getImgId--;
    }
    this.slikeConimg.current.setAttribute('src', this.arr1Imgs[this.getImgId]);
  };

  repeat = (e) => {
    this.imgArray1.forEach((img, idx) => {
      img.id = idx;
    });
    this.imgArray1.forEach((img, idx) => {
      this.arr1Imgs[idx] = img.getAttribute('src');
    });

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
    return (
      <>
        <section class={styles.radovi}>
          <Snav cur={'radovi'} />
        </section>
        <section id={styles.port2}>
          <h1>SPA HOTEL</h1>
          <div id={styles.port1b} ref={this.parentCon}>
            <div class={styles.port1bimg}>
              <img
                id="0"
                src={require('../../assets/img/spahotel.jpg')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
            </div>
            <div class={styles.port1bimg}>
              <img
                id="1"
                src={require('../../assets/img/spa1.jpg')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
            </div>
            <div class={styles.port1bimg}>
              <img
                id="2"
                src={require('../../assets/img/spa1.jpg')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
            </div>
            <div class={styles.port1bimg}>
              <img
                id="3"
                src={require('../../assets/img/spa3.jpg')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
            </div>
            <div class={styles.port1bimg}>
              <img
                id="4"
                src={require('../../assets/img/spa4.jpg')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
            </div>
            <div class={styles.port1bimg}>
              <img
                id="5"
                src={require('../../assets/img/spa5.webp')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
            </div>
            <div class={styles.port1bimg}>
              <img
                id="6"
                src={require('../../assets/img/spa6.jpg')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
            </div>
            <div class={styles.port1bimg}>
              <img
                id="7"
                src={require('../../assets/img/spa7.jpg')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
            </div>
            <div class={styles.port1bimg}>
              <img
                id="8"
                src={require('../../assets/img/spa8.jpg')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
            </div>
            <div class={styles.port1bimg}>
              <img
                id="9"
                src={require('../../assets/img/spa9.jpg')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
            </div>
            <div class={styles.port1bimg}>
              <img
                id="9"
                src={require('../../assets/img/spa10.jpg')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
            </div>
            <div class={styles.port1bimg}>
              <img
                id="9"
                src={require('../../assets/img/spa11.jpg')}
                alt=""
                ref={(node) => {
                  if (this.imgArray1.length < 13 && node && this.state.init) {
                    this.imgArray1.push(node);
                  }
                }}
              />
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
      </>
    );
  }
}
