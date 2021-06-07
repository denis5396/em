import React, { Component, createRef } from 'react';
import { db, storage } from '../../firebase';
import Snav from '../Onama/Snav';
import styles from './Radovi.module.css';
import { v1 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
class Radovi extends Component {
  state = {
    init: true,
    projs: [],
    projs2: [],
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
  rasvj = createRef();

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
  parRef = undefined;
  arrImgs = [];

  portfPar = createRef();
  callFix = () => {
    if (this.portfPar.current) {
      this.portfPar.current.style.gridAutoRows = '34.5rem';
      this.portfPar.current.children[
        this.portfPar.current.children.length - 1
      ].style.gridColumn = '1/-1';
    }
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'ELEKTROMONTING | Radovi';
    // const dbRef = db.ref(`content`);
    const dbRef = db.ref('/content');
    // dbRef.set({ username: 'hello' });
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const copyObj = [];
      let cnt = 0;
      const copyObj2 = [];
      let cnt2 = 0;
      for (let key in data) {
        if (data[key].imageUrl.length === 1) {
          copyObj[cnt] = data[key];
          cnt++;
        } else if (
          data[key].imageUrl.length > 1 &&
          data[key].title !== 'uposlenici'
        ) {
          //get projs with more than 1 pic and put them all in this arr that will get mapped over, each index in the arr represents 1 category like rasvjeta
          copyObj2[cnt2] = data[key];
          cnt2++;
        }
      }
      // create dynamic refs
      // copyObj2.forEach((obj) => {
      //   this[`${obj.title}Ref`] = createRef();
      // });
      console.log(copyObj);
      this.setState(
        (state, props) => ({
          ...state,
          projs: [...copyObj],
          projs2: [...copyObj2],
        }),
        () => {
          console.log(this.state);
          if (
            this.portfPar.current.children.length === this.state.projs.length &&
            this.state.projs.length % 2
          ) {
            // console.log(
            //   this.portfPar.current.children[
            //     this.portfPar.current.children.length - 1
            //   ]
            // );
            this.callFix();
            // this.portfPar.current.children[
            //   this.portfPar.current.children.length - 1
            // ].style.height = '70%';
            // this.portfPar.current.children[
            //   this.portfPar.current.children.length - 1
            // ].style.display = 'none';
          }
        }
      );
    });
  }

  componentWillUnmount() {
    document.querySelector('html').style.scrollBehavior = 'smooth';
  }

  componentDidUpdate() {
    if (this.props.location.state) {
      switch (this.props.location.state.infoId) {
        case 'rasvjeta':
          // window.scroll(0, this.findPos(this.knxS.current));
          if (this.rasvj.current) {
            this.rasvj.current.scrollIntoView();
            break;
          }
      }
    }
  }

  trimStr = (str) => {
    let answer = '';
    let bool = false;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '_' && !bool) {
        bool = !bool;
      } else if (bool && str[i] !== '_') {
        answer += str[i];
      } else if (str[i] === '_' && bool) {
        break;
      }
    }
    return answer;
  };

  chevRHandler = () => {
    if (this.getImgId === this.arrImgs.length - 1) {
      this.getImgId = 0;
      let imageVar = this.arrImgs[this.getImgId];
      this.slikeConimg.current.setAttribute('src', imageVar);
    } else {
      let imageVar = this.arrImgs[this.getImgId + 1];
      this.getImgId = this.getImgId + 1;
      this.slikeConimg.current.setAttribute('src', imageVar);
    }
  };

  chevLHandler = () => {
    // console.log(this.portfPar.current.parentElement);
    if (this.getImgId === 0) {
      this.getImgId = this.arrImgs.length - 1;
      let imageVar = this.arrImgs[this.getImgId];
      this.slikeConimg.current.setAttribute('src', imageVar);
    } else {
      let imageVar = this.arrImgs[this.getImgId - 1];
      this.getImgId = this.getImgId - 1;
      this.slikeConimg.current.setAttribute('src', imageVar);
    }
  };

  repeat = (e) => {
    // if (this.imgArray1.length > 0) {
    console.log(e.target.parentElement.parentElement);
    let imageVar;
    for (
      let i = 0;
      i < e.target.parentElement.parentElement.children.length;
      i++
    ) {
      if (e.target.parentElement.parentElement.children[i].contains(e.target)) {
        imageVar =
          e.target.parentElement.parentElement.children[i].children[0].src;
        this.getImgId = i;
      }
    }

    this.showOverlay.current.style.transition = 'opacity 0.5s ease';
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
    this.slikeConimg.current.setAttribute('src', imageVar);
    // }
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

  onImageLoad = ({ target: img }) => {
    // console.log(img.parentElement.className);
    // console.log(img.naturalHeight);
    // console.log(img.naturalWidth);
    if (img.naturalWidth > img.naturalHeight) {
      img.parentElement.className = `${img.parentElement.className} ${styles.horizontal}`;
    } else if (img.naturalWidth < img.naturalHeight) {
      img.parentElement.className = `${img.parentElement.className} ${styles.vertical}`;
    }
  };

  handleClick = (e) => {
    console.log(e.target.tagName);
    let fillArr = [];
    if (e.target.tagName === 'IMG') {
      for (
        let i = 0;
        i < e.target.parentElement.parentElement.children.length;
        i++
      ) {
        fillArr[i] =
          e.target.parentElement.parentElement.children[i].children[0].src;
        if (
          e.target.parentElement.parentElement.children[i].children[0].contains(
            e.target
          )
        ) {
          this.getImgId = i;
        }
      }
    }
    this.arrImgs = [...fillArr];
    this.repeat(e);
  };

  fixTitle = (tit) => {
    let newStr = '';
    let newStrSplit = '';
    newStrSplit = tit;
    newStrSplit = newStrSplit.split(' ');
    let cnt = 0;
    for (let i = 0; i < tit.length; i++) {
      newStr += tit[i];
      if (tit[i] === 'I') {
        newStr[newStr.length - 1] = tit[i].toLowercase();
      }
    }
    let newStrSplitCopy = [...newStrSplit];
    console.log(newStrSplitCopy);
    newStrSplit.forEach((item, i) => {
      if (item.length > 1) {
        item.charAt(0).toUpperCase();
        newStrSplitCopy[i] = item.charAt(0).toUpperCase() + item.substring(1);
      }
    });
    console.log(newStrSplit);
    console.log(newStrSplitCopy);
    newStrSplitCopy = newStrSplitCopy.join(' ');
    return newStrSplitCopy;
  };

  render() {
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
              projektu. Nastojimo da pružamo maksimalni kvalitet u svim vrstama
              elektro radova u cijeloj Bosni i Hercegovini.
            </p>
          </div>
          <div id={styles.portfb} ref={this.portfPar}>
            {this.state.projs.length > 0
              ? this.state.projs.map((proj, i) => (
                  <div
                    class={styles.portfcol}
                    key={Math.random()}
                    // style={{
                    //   gridColumn:
                    //     this.state.projs.length % 2 &&
                    //     i === this.state.projs.length - 1
                    //       ? '1/-1'
                    //       : '1/2',
                    // }}
                  >
                    <img src={proj.imageUrl[0]} alt="" />
                    <div class={styles.portfcoltxt}>
                      <h3>{proj.title}</h3>
                      {/* <p>Rezidencijalni Objekt</p> */}
                    </div>
                  </div>
                ))
              : null}
          </div>
          {this.state.projs2.map((category) => (
            <div id={styles.rasvjeta} key={uuid()}>
              <h3>{this.fixTitle(category.title)}</h3>
              <div
                id={
                  category.title === 'rasvjeta'
                    ? styles.rasvjetab
                    : styles.solarb
                }
                ref={category.title === 'rasvjeta' ? this.rasvj : null}
                onClick={(e) => this.handleClick(e)}
              >
                {category.imageUrl.map((piece) => (
                  <div class={`${styles.portfcol}`} key={uuid()}>
                    <img
                      src={piece}
                      alt=""
                      onLoad={
                        category.title === 'rasvjeta' ? this.onImageLoad : null
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
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
          onClick={(e) => this.chevLHandler(e)}
        ></i>
        <div id={styles.totop1}>
          <i class="fas fa-chevron-up fa-2x"></i>
        </div>
      </>
    );
  }
}

export default Radovi;
