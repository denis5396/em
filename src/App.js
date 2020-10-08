import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import './App.css';
import Usluge from './components/Usluge/Usluge';
import Onama from './components/Onama/Onama';
import Radovi from './components/Radovi/Radovi';
import Kontakt from './components/Kontakt/Kontakt';
import Villas from './components/Radovi/Villas';
import KucnoKino from './components/Radovi/KucnoKino';
import VillaBrugge from './components/Radovi/VillaBrugge';
import PorodicnaKuca from './components/Radovi/PorodicnaKuca';
import Vikendica from './components/Radovi/Vikendica';
import PlaninarskiDom from './components/Radovi/PlaninarskiDom';
import SpaHotel from './components/Radovi/SpaHotel';
import Restoran from './components/Radovi/Restoran';
function App() {
  return (
    <HashRouter basename="/">
      <div className="App" basename="/elektro_plus/">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/usluge" component={Usluge} />
          <Route path="/onama" component={Onama} />
          <Route path="/radovi" component={Radovi} />
          <Route path="/kontakt" component={Kontakt} />
          <Route path="/villasouth" component={Villas} />
          <Route path="/kucnokino" component={KucnoKino} />
          <Route path="/villabrugge" component={VillaBrugge} />
          <Route path="/porodicnakuca" component={PorodicnaKuca} />
          <Route path="/vikendica" component={Vikendica} />
          <Route path="/planinarskidom" component={PlaninarskiDom} />
          <Route path="/spahotel" component={SpaHotel} />
          <Route path="/restoran" component={Restoran} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
