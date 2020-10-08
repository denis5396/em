import React, { Component, createRef } from 'react';
import showcaseclassic from '../../../assets/img/showcaseclassic.jpg';
import showcaseclassics from '../../../assets/img/showcaseclassicss.jpg';
import smarthome3 from '../../../assets/img/smarthome3.jpg';
import smarthome3s from '../../../assets/img/smarthome3s.jpg';
import ledlighting from '../../../assets/img/LED_Lighting.jpg';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  state = {
    selectedIndex: 3,
    checked1: false,
    checked2: false,
    checked3: true,
    checked4: false,
    checked5: false,
    scount: 0,
  };
  firstShowcase = createRef();
  overlay = createRef();
  slider = createRef();
  componentDidMount() {
    setTimeout(() => {
      this.firstShowcase.current.style.top = '0%';
    }, 200);
    setTimeout(() => {
      this.overlay.current.style.top = '0%';
    }, 500);
    setTimeout(() => {
      this.slider.current.style.transform = 'translateX(0%)';
    }, 900);

    if (window.innerWidth <= 500) {
      this.imgArray = [
        `url(${showcaseclassics}) no-repeat bottom right/cover`,
        `url(${smarthome3s}) no-repeat 20% 10%/cover`,
      ];
    }
    this.callInterval();
  }
  removeInterval = () => {
    clearInterval(this.loop);
  };
  imgArray = [
    `url(${showcaseclassic}) no-repeat left/cover`,
    `url(${smarthome3}) no-repeat 20% 10%/cover`,
  ];

  loop = undefined;
  callInterval = () => {
    this.loop = setInterval(() => {
      this.firstShowcase.current.style.transition = 'background .8s ease-out';
      if (this.state.scount === 1) {
        this.firstShowcase.current.style.background = `url(${ledlighting}) no-repeat center top/cover`;
        this.setState((prevState) => ({ scount: prevState.scount - 1 }));
      } else {
        let rnd = Math.floor(Math.random() * 2);
        this.firstShowcase.current.style.background = this.imgArray[rnd];
        this.setState((prevState) => ({ scount: prevState.scount + 1 }));
      }
    }, 10000);
  };
  componentWillUnmount() {
    this.removeInterval();
    this.loop = undefined;
    this.setState = (state, callback) => {
      return;
    };
  }
  handleChange = async (e) => {
    const val = parseInt(e.target.value);
    let key;

    for (key in this.state) {
      if (this.state[key] === true) {
        break;
      }
    }
    switch (key) {
      case 'checked1':
        this.setState({ checked1: !this.state.checked1 });
        break;
      case 'checked2':
        this.setState({ checked2: !this.state.checked2 });
        break;
      case 'checked3':
        // alert(key);
        await this.setState({ checked3: !this.state.checked3 });
        // await alert(this.state.checked3);
        break;
      case 'checked4':
        this.setState({ checked4: !this.state.checked4 });
        break;
      case 'checked5':
        this.setState({ checked5: !this.state.checked5 });
        // await alert(this.state.checked5);
        break;
    }
    switch (val) {
      case 1:
        this.setState({
          checked1: !this.state.checked1,
        });
        break;
      case 2:
        this.setState({
          checked2: !this.state.checked2,
        });
        break;
      case 3:
        this.setState({
          checked3: !this.state.checked3,
        });
        break;
      case 4:
        this.setState({
          checked4: !this.state.checked4,
        });
        break;
      case 5:
        this.setState({
          checked5: !this.state.checked5,
        });
        break;
    }
  };
  render() {
    let { checked1 } = this.state;
    let { checked2 } = this.state;
    let { checked3 } = this.state;
    let { checked4 } = this.state;
    let { checked5 } = this.state;
    return (
      <div id="header">
        <div id="showcase" ref={this.firstShowcase}></div>
        <div id="showcaseb" ref={this.overlay}></div>

        <section className="slider" ref={this.slider}>
          <input
            type="radio"
            name="slider"
            id="s1"
            value={'1'}
            checked={checked1}
            onChange={this.handleChange}
            // onClick={() => this.check(1)}
          />
          <input
            type="radio"
            name="slider"
            id="s2"
            value={'2'}
            checked={checked2}
            onChange={this.handleChange}
            // onClick={() => this.check(2)}
          />
          <input
            type="radio"
            name="slider"
            id="s3"
            value={'3'}
            checked={checked3}
            onChange={this.handleChange}
            // onClick={() => this.check(3)}
          />
          <input
            type="radio"
            name="slider"
            id="s4"
            value={'4'}
            checked={checked4}
            onChange={this.handleChange}
            // onClick={() => this.check(4)}
          />
          <input
            type="radio"
            name="slider"
            id="s5"
            value={'5'}
            checked={checked5}
            onChange={this.handleChange}
            // onClick={() => this.check(5)}
          />

          <label htmlFor="s1" id="slide1">
            <img
              src={require('../../../assets/img/smarthome.jpg')}
              alt="s"
              style={{ height: '100%', width: '100%' }}
            />
            <div className="s1overlay"></div>
            <div className="text">
              <h2 id="smanjitxt">
                Sistemi <span>automatskog</span> upravavljanja
              </h2>
              <div className="textp">
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> KNX/EIB inteligentna
                  instalacija
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> ušteda od 30% do 50%
                  operativnih troškova
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> UPRAVLJANJE RASVJETNIM
                  TIJELIMA, Klimatizacijom, MULTIMEDIJOM I KUĆANSKIM APARATIMA
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> MOGUĆNOST PROGRAMIRANJA, IP
                  VIDEO NADZORA
                </p>
              </div>
            </div>

            <Link to="usluge#knx">Saznaj više</Link>
          </label>
          <label htmlFor="s2" id="slide2">
            <img
              src={require('../../../assets/img/cameras.jpg')}
              alt="s"
              style={{ height: '100%', width: '100%' }}
            />
            <div className="s2overlay"></div>
            <div className="text" id="kamere1">
              <h2 id="kamere">Video nadzor</h2>
              <div className="textp">
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> profesionalna ugradnja uz
                  minimalne obrade objekta
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> servisiranje
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> savjetovanje
                </p>
              </div>
            </div>
            <Link to="usluge#videonadzor">Saznaj više</Link>
          </label>
          <label htmlFor="s3" id="slide3">
            <img
              src={require('../../../assets/img/showcaseclassic1.jpg')}
              alt="s"
              style={{ height: '100%', width: '100%' }}
            />
            <div className="s3overlay"></div>
            <div className="text">
              <h2>
                <span>Dijagnoza</span> i Popravka
              </h2>
              <div className="textp">
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> otklanjanje problema
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> inspekcije električne
                  sigurnosti
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> zamjena elektroinstalacija
                </p>
              </div>
            </div>
            <Link to="usluge#dijagnoza">Saznaj više</Link>
          </label>
          <label htmlFor="s4" id="slide4">
            <img
              src={require('../../../assets/img/showcaseclassic.jpg')}
              alt="s"
              style={{ height: '100%', width: '100%' }}
            />
            <div className="s4overlay"></div>
            <div className="text">
              <h2>
                Instalacija<span> Jake Struje</span>
              </h2>
              <div className="textp">
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span>
                  <span>
                    Instalacija elektroenergetskih priključaka i montaža
                    razvodnih ormara
                  </span>
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> Polaganje napojnih kablova i
                  instalacionih cijevi
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> Instalacija unutrašnje i
                  vanjske rasvjete
                </p>
              </div>
            </div>
            <Link to="usluge#jakastr">Saznaj više</Link>
          </label>
          <label htmlFor="s5" id="slide5">
            <img
              src={require('../../../assets/img/weakcur.jpg')}
              alt="s"
              style={{ height: '100%', width: '100%' }}
            />
            <div className="s5overlay"></div>
            <div className="text">
              <h2>
                Instalacija<span> Slabe Struje</span>
              </h2>
              <div className="textp">
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> Računarske mreže -
                  projektovanje i izgradnja
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> TV instalacije i antenski
                  sistemi
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span> Izvedba elektroinstalacija za
                  interfone i video-interfonske sisteme
                </p>
                <p style={{ lineHeight: '1.3' }}>
                  <span className="hide">-</span>
                  <span>Ugradnja alarmnih sistema</span>
                </p>
              </div>
            </div>
            <Link to="usluge#slabastr">Saznaj više</Link>
          </label>
        </section>
      </div>
    );
  }
}

export default Header;
