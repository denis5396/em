import React, { useRef, useEffect, useState, useContext } from 'react';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';
import s from './AdminLogin.module.css';

const AdminLogin = () => {
  const form = useRef();
  const spinner = useRef();
  const input1 = useRef();
  const input2 = useRef();
  const spinPar = useRef();

  // useState
  const [loggingIn, setLoggingIn] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const history = useHistory();
  const handleSignIn = () => {
    if (input1.current.value !== '' && input2.current.value !== '') {
      setLoggingIn(true);
      auth
        .signInWithEmailAndPassword(input1.current.value, input2.current.value)
        .then((userCredential) => {
          // Signed in
          setTimeout(() => {
            history.push('/adminPanel');
          }, 1500);
          // console.log(userCredential.user);
          var user = userCredential.user;
          // // ...
        })
        .catch((error) => {
          console.log(error);
          console.log(spinPar.current.children[0].innerText);
          setErrMsg(error.message);
          setTimeout(() => {
            setLoggingIn(false);
          }, 1500);
          setTimeout(() => {
            spinPar.current.style.display = 'none';
          }, 4000);
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
  };
  useEffect(() => {
    if (loggingIn) {
      spinPar.current.style.display = 'grid';
    }
  }, [loggingIn]);
  useEffect(() => {
    document.title = 'ElektroMonting | Login';
  }, []);

  return (
    <div id={s.adminBg}>
      <form ref={form} id={s.formAdmin} onSubmit={(e) => e.preventDefault()}>
        <h3 id={s.formTitle}>Admin Panel</h3>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          // onChange={() => onChangeHandler(input11.current.value)}
          ref={input1}
          // onFocus={(e) => onInputFocus(e, input11)}
          // onBlur={() => onInputBlur(input1)}
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          // onChange={() => onChangeHandler(input21.current.value)}
          ref={input2}
          // name="password"
          // onFocus={(e) => onInputFocus(e, input21)}
          // onBlur={() => onInputBlur(input2)}
        />
        <input
          type="Submit"
          value="Sign In"
          onClick={handleSignIn}
          id={s.signInBtn}
          // ref={signInBtn}
        />
      </form>

      <div id={s.spinnerParent} ref={spinPar}>
        {loggingIn ? (
          <>
            <div id={s.notification}>
              <span style={{ '--i': 1 }}>L</span>
              <span style={{ '--i': 2 }}>o</span>
              <span style={{ '--i': 3 }}>a</span>
              <span style={{ '--i': 4 }}>d</span>
              <span style={{ '--i': 5 }}>i</span>
              <span style={{ '--i': 6 }}>n</span>
              <span style={{ '--i': 7 }}>g</span>
              <span style={{ '--i': 8 }}>.</span>
              <span style={{ '--i': 9 }}>.</span>
              <span style={{ '--i': 10 }}>.</span>
            </div>
            <div ref={spinner} class={s.loader}></div>
          </>
        ) : (
          <div id={s.errorParent}>
            <h1 id={s.errorTxt}>{errMsg.length > 0 ? errMsg : ''}</h1>
            <i id={s.error} class="fas fa-exclamation-circle"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
