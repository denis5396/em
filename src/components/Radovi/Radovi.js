import React, { Component, createRef } from "react";
import { db, storage } from "../../firebase";
import Snav from "../Onama/Snav";
import styles from "./Radovi.module.css";
import { v1 as uuid } from "uuid";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import { browserHistory } from "react-router";

class Radovi extends Component {
  state = {
    init: true,
    projs: [],
    projs2: [],
  };

  static contextType = UserContext;

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
  subTitle = createRef();
  lastItem = createRef();
  testref = createRef();

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

  // portfPar = createRef();
  // callFix = () => {
  // if (this.portfPar.current) {
  // this.portfPar.current.style.gridAutoRows = "34.5rem";
  // this.portfPar.current.children[
  //   this.portfPar.current.children.length - 1
  // ].style.gridColumn = "1/-1";
  // }
  // };
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.context);
    document.title = "ELEKTROMONTING | Radovi";
    // const dbRef = db.ref(`content`);
    // const dbRef = db.ref("/content");
    const dbRef = db.ref("/content");
    console.log(dbRef);
    // dbRef.set({ username: 'hello' });
    dbRef.on("value", (snapshot) => {
      console.log(snapshot);
      const data = snapshot.val();
      console.log(data);
      const copyObj = [];
      let cnt = 0;
      const copyObj2 = [];
      let cnt2 = 0;
      const getLocation = this.props.location.pathname;
      for (let key in data) {
        // if (data[key].imageUrl.length === 1) {
        //   copyObj[cnt] = data[key];
        //   cnt++;
        // } else if (
        //   data[key].imageUrl.length > 1 &&
        //   data[key].title !== "uposlenici"
        // ) {
        //   //get projs with more than 1 pic and put them all in this arr that will get mapped over, each index in the arr represents 1 category like rasvjeta
        //   copyObj2[cnt2] = data[key];
        //   cnt2++;
        // }
        if (getLocation.includes(data[key].title)) {
          for (let i = 0; i < data[key].imageUrl.length; i++) {
            copyObj2.push({
              title: data[key].title,
              imageUrl: data[key].imageUrl[i],
            });
          }
        }
        copyObj[cnt] = data[key];
        cnt++;
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
          window.addEventListener("popstate", this.onBackButtonEvent);
          if (/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.addEventListener("orientationchange", this.fixLastItem);
          }
          // if (
          //   this.portfPar.current.children.length === this.state.projs.length &&
          //   this.state.projs.length % 2
          // ) {
          // console.log(
          //   this.portfPar.current.children[
          //     this.portfPar.current.children.length - 1
          //   ]
          // );
          // this.callFix();
          // this.portfPar.current.children[
          //   this.portfPar.current.children.length - 1
          // ].style.height = '70%';
          // this.portfPar.current.children[
          //   this.portfPar.current.children.length - 1
          // ].style.display = 'none';
          // }
        }
      );
    });
  }

  fixLastItem = () => {
    if (window.innerWidth > window.innerHeight && this.lastItem.current) {
      // should be other way around so idk, cuz on mobile last item overflows to the right and pushes the content of the site to the left
      this.lastItem.current.style.transform = "translateX(0)";
    } else if (
      window.innerWidth < window.innerHeight &&
      this.lastItem.current
    ) {
      this.lastItem.current.style.transform = "translateX(50%)";
    }
  };

  onBackButtonEvent = () => {
    if (
      this.state.projs2.length > 0 &&
      this.props.location.pathname.includes(this.state.projs2[0].title)
    ) {
      this.setState((prevState) => ({
        ...prevState,
        projs2: [],
      }));
      console.log(this.state.projs2);
    }
  };

  clickHandler = (data) => {
    console.log("ssad");
    console.log(this.context.state.dataLabel);
    console.log(data);
    let fin = [];
    let incr = 0;
    if (data.imageUrl.length > 1) {
      for (let ind of data.imageUrl) {
        fin.push({ title: data.title, imageUrl: ind });
      }
      this.setState(
        (prevState) => ({
          ...prevState,
          projs2: [...fin],
        }),
        () => {
          this.subTitle.current.scrollIntoView();
          if (
            !this.props.location.pathname.includes(this.state.projs2[0].title)
          ) {
            const concatStr = this.props.location.pathname.concat(
              `/${this.state.projs2[0].title}`
            );
            console.log(concatStr);
            // this.props.location.pathname = concatStr;
            this.props.history.push(concatStr);
          }
        }
      );
    }
    console.log(fin);
    // this.context.setDataAndLabel({
    //   dataToView: [...fin],
    //   dataLabel: fin.title,
    // });
  };

  componentWillUnmount() {
    document.querySelector("html").style.scrollBehavior = "smooth";
    window.removeEventListener("popstate", this.onBackButtonEvent);
    if (/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.removeEventListener("orientationchange", this.fixLastItem);
    }
  }

  componentDidUpdate() {
    if (this.props.location.state) {
      switch (this.props.location.state.infoId) {
        case "rasvjeta":
          // window.scroll(0, this.findPos(this.knxS.current));
          if (this.rasvj.current) {
            this.rasvj.current.scrollIntoView();
            break;
          }
      }
    }
  }

  trimStr = (str) => {
    let answer = "";
    let bool = false;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "_" && !bool) {
        bool = !bool;
      } else if (bool && str[i] !== "_") {
        answer += str[i];
      } else if (str[i] === "_" && bool) {
        break;
      }
    }
    return answer;
  };

  chevRHandler = () => {
    if (this.getImgId === this.arrImgs.length - 1) {
      this.getImgId = 0;
      let imageVar = this.arrImgs[this.getImgId];
      this.slikeConimg.current.setAttribute("src", imageVar);
    } else {
      let imageVar = this.arrImgs[this.getImgId + 1];
      this.getImgId = this.getImgId + 1;
      this.slikeConimg.current.setAttribute("src", imageVar);
    }
  };

  chevLHandler = () => {
    // console.log(this.portfPar.current.parentElement);
    if (this.getImgId === 0) {
      this.getImgId = this.arrImgs.length - 1;
      let imageVar = this.arrImgs[this.getImgId];
      this.slikeConimg.current.setAttribute("src", imageVar);
    } else {
      let imageVar = this.arrImgs[this.getImgId - 1];
      this.getImgId = this.getImgId - 1;
      this.slikeConimg.current.setAttribute("src", imageVar);
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
        // imageVar =
        //   e.target.parentElement.parentElement.children[i].children[0].src;
        imageVar = this.arrImgs[i];
        this.getImgId = i;
      }
    }

    this.showOverlay.current.style.transition = "opacity 0.5s ease";
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
    this.slikeConimg.current.setAttribute("src", imageVar);
    // }
  };

  xmarkHandler = () => {
    this.showOverlay.current.style.transition = "none";
    this.showOverlay.current.style.opacity = 0;
    this.showOverlay.current.style.zIndex = -1;
    this.xmark.current.style.zIndex = -1;
    this.xmark.current.style.opacity = 0;
    this.chevL.current.style.zIndex = -1;
    this.chevL.current.style.opacity = 0;
    this.chevR.current.style.zIndex = -1;
    this.chevR.current.style.opacity = 0;
    this.slikeConimg.current.setAttribute("src", "#");
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
    if (e.target.tagName === "IMG") {
      for (
        let i = 0;
        i < e.target.parentElement.parentElement.children.length;
        i++
      ) {
        // fillArr[i] =
        // e.target.parentElement.parentElement.children[i].children[0].src;
        fillArr.push(
          this.state.projs2[i].imageUrl.replace(
            "https://firebasestorage.googleapis.com",
            `https://ik.imagekit.io/1cryg5xvxsq/tr:w-${
              window.innerWidth > 600
                ? window.innerWidth * 0.65
                : window.innerWidth * 1.5
            }`
          )
        );
        if (
          e.target.parentElement.parentElement.children[i].children[0].contains(
            e.target
          )
        ) {
          this.getImgId = i;
        }
      }
      this.arrImgs = [...fillArr];
      this.repeat(e);
    }
  };

  fixTitle = (tit) => {
    let newStr = "";
    let newStrSplit = "";
    newStrSplit = tit;
    newStrSplit = newStrSplit.split(" ");
    let cnt = 0;
    for (let i = 0; i < tit.length; i++) {
      newStr += tit[i];
      if (tit[i] === "I") {
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
    newStrSplitCopy = newStrSplitCopy.join(" ");
    return newStrSplitCopy;
  };

  render() {
    return (
      <>
        <section class={styles.radovi}>
          <Snav cur={"radovi"} />
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
          {this.state.projs.length > 0 && this.state.projs2.length === 0 ? (
            <div id={styles.portfb} ref={this.testref}>
              {this.state.projs.map((proj, i) => (
                <div
                  class={styles.portfcol}
                  key={Math.random()}
                  onClick={() => this.clickHandler(proj)}
                  ref={
                    this.state.projs.length % 2 !== 0 &&
                    i === this.state.projs.length - 1 &&
                    this.lastItem
                  }
                  style={
                    this.state.projs.length % 2 !== 0 &&
                    i === this.state.projs.length - 1 &&
                    window.innerWidth > 500
                      ? // !/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)
                        {
                          transform: "translateX(50%)",
                        }
                      : null
                  }
                  // style={{
                  //   gridColumn:
                  //     this.state.projs.length % 2 &&
                  //     i === this.state.projs.length - 1
                  //       ? '1/-1'
                  //       : '1/2',
                  // }}
                >
                  {/* <Link to={`/radovi/${proj.title}`}> */}
                  <img
                    src={proj.imageUrl[0].replace(
                      "https://firebasestorage.googleapis.com",
                      `https://ik.imagekit.io/1cryg5xvxsq/tr:w-${
                        window.innerWidth > 500
                          ? window.innerWidth / 2
                          : window.innerWidth * 0.8
                      }`
                    )}
                    // ref={this.testref}
                    alt={`${proj.title}`}
                  />
                  <div class={styles.portfcoltxt}>
                    <h3>{proj.title}</h3>
                    {/* <p>Rezidencijalni Objekt</p> */}
                  </div>
                  {/* </Link> */}
                </div>
              ))}
            </div>
          ) : null}
          {this.state.projs2.length > 0 ? (
            <div ref={this.subTitle} id={styles.projs2Cnt}>
              <h3>{this.state.projs2[0].title}</h3>
              <div id={styles.rasvjetab2} onClick={(e) => this.handleClick(e)}>
                {this.state.projs2.map((proj2Item) => (
                  <div key={uuid()} className={styles.portfcol}>
                    <img
                      // src={proj2Item.imageUrl}
                      src={proj2Item.imageUrl.replace(
                        "https://firebasestorage.googleapis.com",
                        `https://ik.imagekit.io/1cryg5xvxsq/tr:w-455`
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {/* {this.state.projs2.map((category) => (
            <div id={styles.rasvjeta} key={uuid()}>
              <h3>{this.fixTitle(category.title)}</h3>
              <div
                id={
                  category.title === "rasvjeta"
                    ? styles.rasvjetab
                    : styles.solarb
                }
                ref={category.title === "rasvjeta" ? this.rasvj : null}
                onClick={(e) => this.handleClick(e)}
              >
                {category.imageUrl.map((piece) => (
                  <div class={`${styles.portfcol}`} key={uuid()}>
                    <img
                      src={piece}
                      alt=""
                      onLoad={
                        category.title === "rasvjeta" ? this.onImageLoad : null
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))} */}
        </section>
        {this.state.projs2.length !== 0 ? (
          <>
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
        ) : null}
      </>
    );
  }
}

export default Radovi;
