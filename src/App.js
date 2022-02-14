import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css";
import Usluge from "./components/Usluge/Usluge";
import Onama from "./components/Onama/Onama";
import Radovi from "./components/Radovi/Radovi";
import Kontakt from "./components/Kontakt/Kontakt";
import AdminLogin from "./components/adminLogin/AdminLogin";
import AdminPanel from "./components/adminLogin/adminPanel/AdminPanel";
import "./App.css";
// import Spinner from './components/spinnerComponent/Spinner';
// const Home = React.lazy(() => import('./components/Home/Home'));
// const Usluge = React.lazy(() => import('./components/Usluge/Usluge'));
// const Onama = React.lazy(() => import('./components/Onama/Onama'));
// const Radovi = React.lazy(() => import('./components/Radovi/Radovi'));
// const Kontakt = React.lazy(() => import('./components/Kontakt/Kontakt'));
// const AdminLogin = React.lazy(() =>
//   import('./components/adminLogin/AdminLogin')
// );
// const AdminPanel = React.lazy(() =>
//   import('./components/adminLogin/adminPanel/AdminPanel')
// );

function App() {
  return (
    <HashRouter basename="/">
      <div className="App" basename="/elektromonting/">
        <Switch>
          {/* <React.Suspense fallback={<Spinner />}> */}
          <Route path="/" exact component={Home} />
          <Route path="/usluge" component={Usluge} />
          <Route path="/onama" component={Onama} />
          <Route path="/radovi" component={Radovi} />
          <Route path="/kontakt" component={Kontakt} />
          <Route path="/login" component={AdminLogin} />
          <Route path="/adminPanel" component={AdminPanel} />
          {/* </React.Suspense> */}
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
