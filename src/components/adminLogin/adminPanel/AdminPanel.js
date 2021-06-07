import React, { useRef, useEffect, useState, useContext } from 'react';
import { auth, storage, db } from '../../../firebase';
import Snav from '../../Onama/Snav';
import s from './AdminPanel.module.css';
import { v1 as uuid } from 'uuid';

const AdminLogin = () => {
  const form = useRef();
  const spinner = useRef();
  const input1 = useRef();
  const input2 = useRef();
  const alertNoImg = useRef();
  const articleForm = useRef();
  const overlay = useRef();
  const spinnerParent = useRef();
  const articleSpinner = useRef();
  const articleUploadText = useRef();
  const removeBtn = useRef();
  const favoriteBtn = useRef();
  const hexOverlay = useRef();
  const hexUl = useRef();
  const addWorkerForm = useRef();

  const [userState, setUserState] = useState(false);
  const [accessToken, setAcessToken] = useState('');

  let labels = useRef();
  let inputs = useRef();

  // useState
  const [init, setInit] = useState(true);
  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [urlHere, setUrlHere] = useState(false);
  const [article, setArticle] = useState({
    title: '',
    favorite: 'false',
    imageUrl: [],
  });
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  // get articles
  const [articles, setArticles] = useState([]);
  const [freeToGet, setFreeToGet] = useState(false);
  const [disableSpinner, setDisableSpinner] = useState(true);
  const [articleIds, setArticleIds] = useState([]);
  const [articleRemoved, setArticleRemoved] = useState(false);

  // removeMode
  const [removeMode, setRemoveMode] = useState(false);

  // favoriteMode
  const [favoriteMode, setFavoriteMode] = useState(false);

  // innerArticle
  const [innerArticle, setInnerArticle] = useState([
    {
      title: '',
      favorite: 'false',
      imageUrl: [],
    },
  ]);
  const [innerId, setInnerId] = useState([]);
  const [openInner, setOpenInner] = useState(false);
  const innT = useRef();

  const [openInnerSet, setOpenInnerSet] = useState(false);

  labels = undefined;
  inputs = undefined;
  if (!labels) {
    labels = [];
  } else {
    setInit(false);
  }
  if (!inputs) {
    inputs = [];
  } else {
    setInit(false);
  }

  useEffect(() => {
    if (loading) {
      articleSpinner.current.style.opacity = '1';
      articleSpinner.current.style.display = 'block';
    }
  }, [loading]);

  useEffect(() => {
    if (articleRemoved) {
      getArticles();
    }
  }, [articleRemoved]);
  useEffect(() => {
    document.title = 'ElektroMonting | Admin Panel';
    // getArticles();

    // auth
    //   .signInWithEmailAndPassword('denis5396@gmail.com', 'jedandvatri')
    //   .then((userCredential) => {
    //     // Signed in
    //     // getArticles();
    //     var user = userCredential.user;
    //     console.log(user);
    //     var accessToken = null;

    //     auth.currentUser.getIdToken().then(function (token) {
    //       accessToken = token;
    //       console.log(accessToken);
    //       setAcessToken(accessToken);
    //     });
    //   })
    //   .then((ds) => {
    //     setUserState(true);
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //   });
    auth.onAuthStateChanged((user) => {
      if (user) {
        // alert('online');
        console.log(user.uid);
        user.getIdToken(true).then(function (idToken) {
          console.log(idToken);
          setAcessToken(idToken);
        });
        setUserState(true);
      } else {
        alert('logged out');
      }
    });
    return () => {
      auth.signOut();
    };
  }, []);

  // comp will unmount
  // const val = useRef();
  // useEffect(() => {
  //   val.current = props;
  // }, [props]);

  useEffect(() => {
    if (userState) {
      setTimeout(() => {
        getArticles();
      }, 100);
      // getArticles();
    }
  }, [userState]);

  useEffect(() => {
    console.log(imageUrl);
    console.log(image);
    // alert(image.length + ' image.length');
    // alert(imageUrl.length + ' imageUrl.length');
    if (userState) {
      if (
        imageUrl.length === image.length &&
        imageUrl !== 0 &&
        image.length !== 0
      ) {
        if (ready && imageUrl.length !== 0 && urlHere) {
          let copyUrls = [];
          console.log(articles);
          for (let key of articles) {
            if (key.uId === innerId[0]) {
              if (key.imageUrl.length === 1) {
                copyUrls = key.imageUrl;
              } else {
                copyUrls = [...key.imageUrl];
              }
            }
          }
          console.log(copyUrls);
          if (image.length === 1) {
            if (!openInner) {
              article.imageUrl[0] = imageUrl[0];
            } else if (openInner) {
              // innerArticle[0].imageUrl.push(imageUrl[0]);
              // copyArt[0].imageUrl.push(imageUrl[0])
              // copyArt[0].imageUrl.push(imageUrl[0]);
              copyUrls.push(imageUrl[0]);
            }
          } else {
            if (!openInner) {
              imageUrl.forEach((url, idx) => {
                article.imageUrl[idx] = url;
              });
            } else if (openInner) {
              imageUrl.forEach((url) => {
                copyUrls.push(url);
              });
            }
          }
          // alert('poslije1')
          console.log(article);
          if (!openInner) {
            // let privateName = uuid().toString();
            // console.log(privateName);
            // const xd = {
            //   [privateName]: article,
            // };
            // console.log(xd.privateName);
            // db.ref('/content').on
            // db.ref('/content')
            //   .set({
            //     ...xd,
            //   })
            //   .then((success) => {
            //     setLoading(false);
            //     articleUploadText.current.style.display = 'block';
            //     spinnerParent.current.style.zIndex = '212';
            //     setTimeout(() => {
            //       articleUploadText.current.style.opacity = '0';
            //     }, 1500);
            //     setTimeout(() => {
            //       spinnerParent.current.style.zIndex = '-1';
            //     }, 1600);
            //     setFreeToGet(true);
            //   });

            fetch(
              `https://elektro-plus-ca75d-default-rtdb.europe-west1.firebasedatabase.app/content.json?auth=${accessToken}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(article),
              }
            )
              .then((response) => {
                response.json();
                console.log(response);

                if (response.statusText !== 'Unauthorized') {
                  setLoading(false);
                  articleUploadText.current.style.display = 'block';
                  spinnerParent.current.style.zIndex = '212';
                  setTimeout(() => {
                    articleUploadText.current.style.opacity = '0';
                  }, 1500);
                  setTimeout(() => {
                    spinnerParent.current.style.zIndex = '-1';
                  }, 1600);
                  setFreeToGet(true);
                }
              })
              .then((article) => {
                console.log('Success:', article);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          } else if (openInner) {
            console.log(copyUrls);
            const dbRef = db.ref(`content/${innerId}`);

            if (innT.current.value === 'uposlenici') {
              console.log(innerArticle);
              console.log(imageUrl.length);
              if (imageUrl.length === 1) {
                innerArticle.push({
                  title: 'uposlenici',
                  favorite: 'false',
                  imageUrl: `${imageUrl[0]}`,
                });
              } else if (imageUrl.length > 1) {
                for (let i = 0; i < imageUrl.length; i++) {
                  innerArticle.push({
                    title: 'uposlenici',
                    favorite: 'false',
                    imageUrl: `${imageUrl[i]}`,
                  });
                }
              }

              dbRef
                .update({
                  title: `uposlenici`,
                  ...innerArticle,
                  imageUrl: [...copyUrls],
                })
                .then((res) => {
                  var ref = db.ref(`content/${innerId}`);
                  ref.once('value').then(function (snapshot) {
                    var key = snapshot.key; // "ada"
                    const arr = snapshot.child(`favorite`).val();
                    console.log(arr);
                    setLoading(false);
                    articleUploadText.current.style.display = 'block';
                    spinnerParent.current.style.zIndex = '212';
                    setTimeout(() => {
                      articleUploadText.current.style.opacity = '0';
                    }, 1500);
                    setTimeout(() => {
                      spinnerParent.current.style.zIndex = '-1';
                    }, 1600);
                    let cpy = [];
                    cpy = [...innerArticle];
                    let cpy2 = [];
                    let cpy3 = [];
                    let titles = [];
                    for (let i = 0; i < innerArticle.length; i++) {
                      cpy3[i] = innerArticle[i].name;
                      titles[i] = innerArticle[i].title;
                    }
                    for (let i = 0; i < copyUrls.length; i++) {
                      cpy2[i] = {
                        title: titles[i],
                        favorite: 'false',
                        imageUrl: copyUrls[i],
                      };
                      if (innerArticle[i].name) {
                        cpy2[i].name = innerArticle[i].name;
                      }
                    }
                    innT.current.value = inputs[0].value;
                    console.log(cpy2);
                    console.log(innerArticle);
                    setInnerArticle([...cpy2]);
                    setArticleRemoved(true);
                    setFreeToGet(true);
                  });
                });
            } else {
              dbRef
                .update({
                  title: `${inputs[0].value}`,
                  imageUrl: [...copyUrls],
                })
                .then((res) => {
                  var ref = db.ref(`content/${innerId}`);
                  ref.once('value').then(function (snapshot) {
                    var key = snapshot.key; // "ada"
                    const arr = snapshot.child(`favorite`).val();
                    console.log(arr);
                    setLoading(false);
                    articleUploadText.current.style.display = 'block';
                    spinnerParent.current.style.zIndex = '212';
                    setTimeout(() => {
                      articleUploadText.current.style.opacity = '0';
                    }, 1500);
                    setTimeout(() => {
                      spinnerParent.current.style.zIndex = '-1';
                    }, 1600);
                    let cpy = [];
                    cpy = [...innerArticle];
                    let cpy2 = [];
                    let cpy3 = [];
                    for (let i = 0; i < innerArticle.length; i++) {
                      cpy3[i] = innerArticle[i].name;
                    }
                    for (let i = 0; i < copyUrls.length; i++) {
                      cpy2[i] = {
                        title:
                          inputs[0].value !== innT.current.value
                            ? inputs[0].value
                            : innT.current.value,
                        favorite: 'false',
                        imageUrl: copyUrls[i],
                      };
                      if (
                        innT.current.value === 'uposlenici' &&
                        innerArticle[i].name
                      ) {
                        cpy2[i].name = innerArticle[i].name;
                      }
                    }
                    innT.current.value = inputs[0].value;
                    console.log(cpy2);
                    setInnerArticle([...cpy2]);
                    setArticleRemoved(true);
                    setFreeToGet(true);
                  });
                });
            }
          }
        }
      }
    }
  }, [imageUrl]);

  useEffect(() => {
    // resetting stuff after uploading imgs is completed
    if (freeToGet) {
      getArticles();
      setFreeToGet(false);
      resetFields();
      setImageUrl([]);
    }
  }, [freeToGet]);

  const getArticles = () => {
    if (userState) {
      fetch(
        'https://elektro-plus-ca75d-default-rtdb.europe-west1.firebasedatabase.app/content.json'
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && !data.error) {
            console.log(data.error);
            console.log(data);
            const keys = Object.keys(data);
            let dataArray = [];
            setArticleIds([...keys]);
            if (articles.length === 0) {
              setArticleRemoved(false);
              for (let id in data) {
                // console.log(data[id])
                dataArray = [{ ...data[id], uId: id }];
                // console.log(dataArray)
                setArticles((oldArray) => [...oldArray, dataArray[0]]);
              }
            } else if (articles.length > 0) {
              dataArray = [
                { ...data[keys[keys.length - 1]], uId: keys[keys.length - 1] },
              ];
              console.log(dataArray);
              if (!articleRemoved) {
                setArticles((oldArray) => [...oldArray, dataArray[0]]);
              } else if (articleRemoved) {
                if (favoriteMode) {
                  let favArr = [];
                  for (let id in data) {
                    favArr.push({ ...data[id], uId: id });
                  }
                  console.log(favArr);
                  setArticles([...favArr]);
                  setArticleRemoved(false);
                } else {
                  console.log(data);
                  let newOldArray = [];
                  let count = 0;
                  console.log(articleIds.length);
                  console.log(articles);

                  // for (let i = 0; i < articles.length; i++) {
                  //   for (let j = 0; j < articleIds.length; j++) {
                  //     if (articles[i].uId === articleIds[j]) {
                  //       newOldArray[count] = { ...articles[i] };
                  //       // console.log(oldArray[i].uId)
                  //       count += 1;
                  //     }
                  //   }
                  // }
                  for (let id in data) {
                    newOldArray.push({ ...data[id], uId: id });
                  }
                  console.log(newOldArray);
                  if (articleIds.length !== 0) {
                    setArticles([...newOldArray]);
                    setArticleRemoved(false);
                  } else {
                    setArticles([]);
                    setArticleRemoved(false);
                  }
                }
              }
            }
          } else if (!data) {
            setArticles([]);
          }
        })
        .then((success) => {
          handleOpenInnerGold();
          setDisableSpinner(false);
          setUrlHere(false);
        });
    }
  };

  useEffect(() => {
    if (articles.length > 0) {
      console.log(articles);
    }
    if (articleRemoved && articles.length === 0) {
      setDisableSpinner(true);
    }
  }, [articles]);

  const handleFocus = (name) => {
    labels.forEach((label, idx) => {
      if (name === 'title' && idx === 0) {
        label.style.marginBottom = '0rem';
        handleFalseInputs(inputs[0]);
        inputs[0].style.borderBottom = '.1rem solid #4353a0';
      }
    });
    if (name === 'textarea') {
      inputs[3].style.border = '.1rem solid #4353a0';
    }
  };
  const handleBlur = (e, name) => {
    labels.forEach((label, idx) => {
      if (!e.target.value && idx === 0 && name === 'title') {
        label.style.marginBottom = '-3rem';
        inputs[0].style.borderBottom = '.1rem solid #ccc';
      }
    });
  };

  const handleFalseInputs = (node) => {
    if (node.value === 'Unesi naziv projekta!') {
      node.value = '';
      node.style.color = 'initial';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let bool = true;
    inputs.forEach((input, idx) => {
      if (idx === 1) {
        console.log(input.value);
      }
      if (
        (input.value === '' && idx !== 1) ||
        input.style.borderBottom === '0.1rem solid red'
      ) {
        input.value = 'Unesi naziv projekta!';
        input.style.color = 'red';
        input.style.borderBottom = '.1rem solid red';
        labels[0].style.marginBottom = '0rem';
        bool = false;
      } else if (input.value === '' && idx === 1) {
        alertNoImg.current.style.display = 'inline-block';
        bool = false;
      }
    });
    if (bool) {
      spinnerParent.current.style.display = 'block';
      spinnerParent.current.style.zIndex = '212';
      if (!openInner) {
        setArticle({
          favorite: 'false',
          title: inputs[0].value.toLowerCase(),
          imageUrl: [],
        });
      }
      handleUpload();
      setReady(true); //for imageUrl useEffect
      setLoading(true); //for spinner in form when submitting
    }
  };

  const handleUpload = () => {
    if (image) {
      console.log(image);
      if (image.length > 1) {
        image.forEach((img) => {
          const uploadTask = storage.ref(`images/${img.name}`).put(img);
          uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
              console.log(error);
            },
            () => {
              storage
                .ref('images')
                .child(img.name)
                .getDownloadURL()
                .then((url) => {
                  setImageUrl((prevUrl) => {
                    return [...prevUrl, url];
                  });
                  setUrlHere(true);
                });
            }
          );
        });
      } else {
        const uploadTask = storage.ref(`images/${image[0].name}`).put(image[0]);
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref('images')
              .child(image[0].name)
              .getDownloadURL()
              .then((url) => {
                setUrlHere(true);
                setImageUrl([url]);
              });
          }
        );
      }
    }
  };

  const resetFields = () => {
    inputs.forEach((input, idx) => {
      if (idx !== 1) {
        if (innT.current.value !== 'uposlenici') {
          input.value = '';
          input.style.color = 'initial';
          input.style.borderBottom = '.1rem solid #ccc';
          labels[0].style.marginBottom = '-3rem';
        }
      } else if (idx === 1) {
        input.value = '';
        alertNoImg.current.style.display = 'none';
      }
    });
  };

  const handleAddArticle = (e) => {
    if (!openInner) {
      document.querySelector('html').style.scrollBehavior = 'smooth';
      // bgParent.current.style.overflowY = 'hidden'

      disableScroll();
      // bgParent.current.style.overflowY = 'hidden'
      articleForm.current.style.transform = 'translate(-50%, -90%)';
      articleForm.current.style.opacity = '1';
      articleForm.current.style.zIndex = '211';
      overlay.current.style.zIndex = '210';
      overlay.current.style.display = 'block';
      if (removeMode) {
        handleRemoveMode();
      }
      if (favoriteMode) {
        handleFavoriteMode();
      }
    }
    if (openInner && !e.target.className.includes('innerPlus')) {
      setOpenInner(false); //clicking plus in openInner and going backwards and removing title
      innT.current.value = '';
      articleForm.current.children[2].style.cursor = 'auto';
    } else if (openInner && e.target.className.includes('innerPlus')) {
      articleForm.current.style.transform = 'translate(-50%, -90%)';
      articleForm.current.style.opacity = '1';
      articleForm.current.style.zIndex = '211';
      overlay.current.style.display = 'block';
      overlay.current.style.zIndex = '210';

      inputs[0].value = innerArticle[0].title;
      if (innT.current && innT.current.value === 'uposlenici') {
        inputs[0].value = 'uposlenici';
        articleForm.current.children[1].style.marginBottom = '0rem';
        articleForm.current.children[2].style.cursor = 'not-allowed';
      }
      inputs[0].focus();
      if (removeMode) {
        handleRemoveMode();
      }
      if (favoriteMode) {
        handleFavoriteMode();
      }
    }
    if (openInner && e.target.className.includes('fa-long-arrow-alt-left')) {
      if (removeMode) {
        handleRemoveMode();
      }
      if (favoriteMode) {
        handleFavoriteMode();
      }
    }
  };

  const closeEverything = () => {
    if (!loading) {
      enableScroll();
      inputs.forEach((input, idx) => {
        if (idx !== 1) {
          if (innT.current.value === 'uposlenici') {
            input.value = '';
            input.style.color = 'initial';
            input.style.borderBottom = '.1rem solid #ccc';
            labels[0].style.marginBottom = '-3rem';
          }
        } else if (idx === 1) {
          input.value = '';
          alertNoImg.current.style.display = 'none';
        }
      });
      articleForm.current.style.opacity = 0;
      articleForm.current.style.transform = 'translate(-50%, -100%)';
      articleForm.current.style.zIndex = -1;
      overlay.current.style.display = 'none';
      spinnerParent.current.style.display = 'none';
      resetFields();
    }
  };

  // firebase img upload
  const handleChange = (e) => {
    if (!openInner) {
      alertNoImg.current.style.display = 'none';
    }
    let { files } = e.target;
    console.log(files);
    const arr = [];
    let count = 0;
    if (!openInner) {
      let fileList = Array.from(files);
      console.log(fileList);
      console.log(articles);
      articles.forEach((art, k) => {
        art.imageUrl.forEach((artUrl, i) => {
          for (let j = 0; j < fileList.length; j++) {
            if (artUrl.indexOf(fileList[j].name) !== -1) {
              fileList.splice(j, 1);
            }
          }
        });
      });
      console.log(fileList);
      let list = new DataTransfer();
      fileList.forEach((fl) => {
        // let file = new File(['content'], `${fl.name}`);
        let file = fl;
        list.items.add(file);
      });
      let myFileList = list.files;
      inputs[1].files = myFileList;
      if (openInner && inputs[1].files.length !== 0) {
        alertNoImg.current.style.display = 'none';
      }
      // if (files) {
      //   for (let file in files) {
      //     console.log(files[file]);
      //     if (count < files.length) {
      //       arr.push(files[file]);
      //     }
      //     count++;
      //   }
      //   setImage(arr);
      //   console.log(arr);
      // }
      if (myFileList.length > 0) {
        for (let file in myFileList) {
          if (count < myFileList.length) {
            arr.push(myFileList[file]);
          }
          count++;
        }
        setImage(arr);
      }
      console.log(arr);
      console.log(myFileList);
    } else if (openInner) {
      let fileList = Array.from(files);
      for (let key of articles) {
        if (key.uId === innerId[0]) {
          key.imageUrl.forEach((img) => {
            for (let i = 0; i < fileList.length; i++) {
              if (img.indexOf(fileList[i].name) !== -1) {
                const indPos = img.indexOf(fileList[i].name);
                if (
                  img[indPos - 1] === 'F' &&
                  img[indPos + fileList[i].name.length] === '?'
                ) {
                  fileList.splice(i, 1);
                }
              }
            }
            console.log(files);
            console.log(fileList);
          });
          articles.forEach((art, k) => {
            art.imageUrl.forEach((artUrl, i) => {
              for (let j = 0; j < fileList.length; j++) {
                if (artUrl.indexOf(fileList[j].name) !== -1) {
                  fileList.splice(j, 1);
                }
              }
            });
          });
          let list = new DataTransfer();
          fileList.forEach((fl) => {
            // let file = new File(['content'], `${fl.name}`);
            let file = fl;
            if (fl.name) {
              list.items.add(file);
            }
          });
          let myFileList = list.files;
          files = myFileList;
          inputs[1].files = myFileList;
          if (openInner && inputs[1].files.length !== 0) {
            alertNoImg.current.style.display = 'none';
          }
          console.log(files);
          if (files) {
            for (let file in files) {
              console.log(files[file]);
              if (count < files.length) {
                arr.push(files[file]);
              }
              count++;
            }
            setImage(arr);
            console.log(arr);
          }
        }
      }
    }
  };

  function preventDefault(e) {
    e.preventDefault();
  }

  function disableScroll() {
    // document.body.addEventListener('touchmove', preventDefault, {
    //   passive: false,
    // });
  }
  function enableScroll() {
    // document.body.removeEventListener('touchmove', preventDefault, {
    //   passive: false,
    // });
  }

  const handleRemoveMode = () => {
    if (favoriteMode) {
      handleFavoriteMode();
    }

    if (removeMode) {
      removeBtn.current.style.background = '#dee5e5';
      removeBtn.current.children[0].style.color = 'teal';
      setRemoveMode(false);
    } else {
      removeBtn.current.style.background = 'teal';
      removeBtn.current.children[0].style.color = '#293042';
      setRemoveMode(true);
    }
  };

  const handleFavoriteMode = () => {
    if (!openInner) {
      if (removeMode) {
        handleRemoveMode();
      }

      if (favoriteMode) {
        favoriteBtn.current.style.background = '#dee5e5';
        favoriteBtn.current.children[0].style.color = 'teal';
        setFavoriteMode(false);
      } else {
        favoriteBtn.current.style.background = 'teal';
        favoriteBtn.current.children[0].style.color = 'gold';
        setFavoriteMode(true);
      }
    }
  };

  const handleRemoveModeME = () => {
    if (!removeMode) {
      removeBtn.current.style.background = 'teal';
      removeBtn.current.children[0].style.color = '#293042';
    }
  };
  const handleRemoveModeML = () => {
    if (!removeMode) {
      removeBtn.current.style.background = '#dee5e5';
      removeBtn.current.children[0].style.color = 'teal';
    }
  };
  const handleFavoriteModeME = () => {
    if (!openInner) {
      if (!favoriteMode) {
        favoriteBtn.current.style.background = 'teal';
        favoriteBtn.current.children[0].style.color = 'gold';
      }
    }
  };
  const handleFavoriteModeML = () => {
    if (!openInner) {
      if (!favoriteMode) {
        favoriteBtn.current.style.background = '#dee5e5';
        favoriteBtn.current.children[0].style.color = 'teal';
      }
    }
  };

  const handleClickUl = (e) => {
    console.log(e.target);
    console.log(e.target.className);
    const strValCl = e.target.className;
    const strVal = e.target.id;
    console.log(strVal);
    if (removeMode) {
      if (strVal.includes('hexOverlay')) {
        if (
          e.target.style.backgroundColor === 'transparent' ||
          e.target.style.backgroundColor === ''
        ) {
          e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
          e.target.children[0].style.display = 'block';
          e.target.nextSibling.style.display = 'none';
          if (e.target.nextSibling.nextSibling) {
            e.target.nextSibling.nextSibling.style.display = 'none';
          }
        } else {
          e.target.style.backgroundColor = 'transparent';
          e.target.children[0].style.display = 'none';
          e.target.nextSibling.style.display = 'block';
          if (e.target.nextSibling.nextSibling) {
            e.target.nextSibling.nextSibling.style.display = 'block';
          }
        }
      }
      if (strValCl.includes('fa-trash')) {
        if (
          e.target.parentElement.style.backgroundColor === 'transparent' ||
          e.target.parentElement.style.backgroundColor === ''
        ) {
          e.target.parentElement.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
          e.target.parentElement.children[0].style.display = 'block';
          e.target.parentElement.nextSibling.style.display = 'none';
          if (e.target.parentElement.nextSibling.nextSibling) {
            e.target.parentElement.nextSibling.nextSibling.style.display =
              'none';
          }
        } else {
          e.target.parentElement.style.backgroundColor = 'transparent';
          e.target.parentElement.children[0].style.display = 'none';
          e.target.parentElement.nextSibling.style.display = 'block';
          if (e.target.parentElement.nextSibling.nextSibling) {
            e.target.parentElement.nextSibling.nextSibling.style.display =
              'block';
          }
        }
      }
      if (strValCl.includes('hexCellTitle')) {
        if (
          e.target.previousSibling.style.backgroundColor === 'transparent' ||
          e.target.previousSibling.style.backgroundColor === ''
        ) {
          e.target.previousSibling.style.backgroundColor =
            'rgba(255, 0, 0, 0.6)';
          e.target.previousSibling.children[0].style.display = 'block';
          e.target.previousSibling.nextSibling.style.display = 'none';
          if (e.target.previousSibling.nextSibling.nextSibling) {
            e.target.previousSibling.nextSibling.nextSibling.style.display =
              'none';
          }
        } else {
          e.target.previousSibling.style.backgroundColor = 'transparent';
          e.target.previousSibling.children[0].style.display = 'none';
          e.target.previousSibling.nextSibling.style.display = 'block';
          if (e.target.previousSibling.nextSibling.nextSibling) {
            e.target.previousSibling.nextSibling.nextSibling.style.display =
              'block';
          }
        }
      }
      if (
        strValCl.includes('hexCellName') &&
        innT.current.value === 'uposlenici'
      ) {
        if (
          e.target.previousSibling.previousSibling.style.backgroundColor ===
            'transparent' ||
          e.target.previousSibling.previousSibling.style.backgroundColor === ''
        ) {
          e.target.previousSibling.previousSibling.style.backgroundColor =
            'rgba(255, 0, 0, 0.6)';
          e.target.previousSibling.previousSibling.children[0].style.display =
            'block';
          e.target.previousSibling.previousSibling.nextSibling.style.display =
            'none';
          if (
            e.target.previousSibling.previousSibling.nextSibling.nextSibling
          ) {
            e.target.previousSibling.previousSibling.nextSibling.nextSibling.style.display =
              'none';
          }
        } else {
          e.target.previousSibling.previousSibling.style.backgroundColor =
            'transparent';
          e.target.previousSibling.previousSibling.children[0].style.display =
            'none';
          e.target.previousSibling.previousSibling.nextSibling.style.display =
            'block';
          if (
            e.target.previousSibling.previousSibling.nextSibling.nextSibling
          ) {
            e.target.previousSibling.previousSibling.nextSibling.nextSibling.style.display =
              'block';
          }
        }
      }
    } else if (favoriteMode) {
      if (strVal.includes('hexOverlay')) {
        if (
          e.target.style.backgroundColor === 'transparent' ||
          e.target.style.backgroundColor === ''
        ) {
          e.target.style.backgroundColor = 'rgba(0, 128, 128, 0.6)';
          e.target.children[0].style.display = 'block';
          e.target.nextSibling.style.display = 'none';
        } else {
          e.target.style.backgroundColor = 'transparent';
          e.target.children[0].style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }
      }
      if (strValCl.includes('fa-star')) {
        if (
          e.target.parentElement.style.backgroundColor === 'transparent' ||
          e.target.parentElement.style.backgroundColor === ''
        ) {
          e.target.parentElement.style.backgroundColor =
            'rgba(0, 128, 128, 0.6)';
          e.target.parentElement.children[0].style.display = 'block';
          e.target.parentElement.nextSibling.style.display = 'none';
        } else {
          e.target.parentElement.style.backgroundColor = 'transparent';
          e.target.parentElement.children[0].style.display = 'none';
          e.target.parentElement.nextSibling.style.display = 'block';
        }
      }
      if (strValCl.includes('hexCellTitle')) {
        if (
          e.target.previousSibling.style.backgroundColor === 'transparent' ||
          e.target.previousSibling.style.backgroundColor === ''
        ) {
          e.target.previousSibling.style.backgroundColor =
            'rgba(0, 128, 128, 0.6)';
          e.target.previousSibling.children[0].style.display = 'block';
          e.target.previousSibling.nextSibling.style.display = 'none';
        } else {
          e.target.previousSibling.style.backgroundColor = 'transparent';
          e.target.previousSibling.children[0].style.display = 'none';
          e.target.previousSibling.nextSibling.style.display = 'block';
        }
      }
    }
  };

  const handleConfirm = () => {
    if (removeMode) {
      deleteArticleHandler();
    } else if (favoriteMode) {
      favoriteArticleHandler();
    } else if (openInner && !removeMode) {
      shiftArrHandler();
    }
    if (drag && !openInner) {
      let arrSwap = [];
      let arrSwapContent = [];
      let endResult = {};
      console.log(articles);
      articles.forEach((article, i) => {
        arrSwapContent[i] = {
          // favorite: article.favorite,
          // imageUrl: article.imageUrl,
          // title: article.title,
          ...article,
        };
        arrSwap[i] = {
          uId: article.uId,
        };
      });
      console.log(arrSwapContent);
      articleIds.forEach((arr, i) => {
        endResult = { ...endResult, [arr]: arrSwapContent[i] };
        console.log(arr.uId);
      });
      console.log(arrSwapContent);
      console.log(arrSwap);
      console.log(endResult);
      const dbRef = db.ref('content');
      dbRef.update({ ...endResult }).then((res) => {
        var ref = db.ref('content');
        ref.once('value').then((snapshot) => {
          setArticleRemoved(true);
          setDrag(false);
        });
      });
    } else if (drag && openInner) {
      console.log(hexUl.current.children);
      console.log(innerArticle);
      const dbRef = db.ref(`content/${innerId}`);
      dbRef.update({ ...innerArticle }).then((res) => {
        var ref = db.ref(`content/${innerId}`);
        ref.once('value').then((snapshot) => {
          setArticleRemoved(true);
          setDrag(false);
        });
      });
    }
  };

  const handleTitleChange = () => {
    const dbRef = db.ref(`content/${innerId}`);
    const tit = innT.current.value;
    dbRef.update({ title: tit }).then((res) => {
      var ref = db.ref(`content/${innerId}`);
      console.log(ref);
      ref.once('value').then(function (snapshot) {
        var key = snapshot.key; // "ada"
        const arr = snapshot.child(`title`).val();
        console.log(arr);
        let cpy2 = [];
        let ids2 = [];
        for (let i = 0; i < innerArticle.length; i++) {
          ids2[i] = innerArticle[i].imageUrl;
        }
        for (let i = 0; i < ids2.length; i++) {
          cpy2[i] = {
            title: tit,
            favorite: 'false',
            imageUrl: ids2[i],
          };
        }
        setInnerArticle([...cpy2]);
        setArticleRemoved(true);
      });
    });
  };

  const deleteArticleHandler = () => {
    const ids = []; //to be delted arr
    const oldIds = []; //all ids before deletion
    const newIds = []; //leftover that should not be deleted
    if (!openInner) {
      for (let i = 0; i < hexUl.current.children.length; i++) {
        if (
          hexUl.current.children[i].children[0].children[0].children[1].style
            .backgroundColor !== 'transparent'
        ) {
          if (
            hexUl.current.children[i].children[0].children[0].children[2]
              .textContent !== 'uposlenici'
          ) {
            ids.push(hexUl.current.children[i].id);
          }
        } else {
          newIds.push(hexUl.current.children[i].id);
        }
        oldIds.push(hexUl.current.children[i].id);
      }
      console.log(
        hexUl.current.children[0].children[0].children[0].children[1].style
          .backgroundColor
      );
      console.log(oldIds);
      console.log(ids);

      ids.forEach((id) => {
        const projectRef = db.ref(`/content/${id}`);
        console.log(projectRef);
        projectRef.remove().then((res) => {
          setArticleIds([...newIds]);
          setArticleRemoved(true);
        });
      });
    } else if (openInner) {
      for (let i = 0; i < hexUl.current.children.length; i++) {
        if (
          hexUl.current.children[i].children[0].children[0].children[1].style
            .backgroundColor !== 'transparent'
        ) {
          // hexUl.current.children[i].children[0].style.display = 'none';
          //get articles that are going to be deleted(marked by red bg and trash icon)
          ids.push(
            hexUl.current.children[i].children[0].children[0].children[0].style
              .backgroundImage
          );
          // alert(i);
          innerArticle.splice(i, 1);
          console.log(innerArticle);
        } else {
          newIds.push(
            hexUl.current.children[i].children[0].children[0].children[0].style
              .backgroundImage
          );
        }
        oldIds.push(hexUl.current.children[i].id);
      }
      let ids2 = [];
      newIds.forEach((id, i) => {
        console.log(id.replace('url(', ''));
        ids2[i] = id.replace('url("', '').replace('")', '');
        console.log(ids2[i][ids2[i].length - 1]);
        // ids2[i][ids2[i].length - 1] = '';
      });
      console.log(ids2);
      // for (let i = 0; i < oldIds.length; i++) {
      //   const projectRef = db.ref(`/content/${innerId}/imageUrl/${i}`);
      //   console.log(projectRef);
      //   projectRef.once('value').then(function (snapshot) {
      //     var key = snapshot.key; // "ada"
      //     const arr = snapshot.val();
      //     ids2.forEach((i) => {
      //       if (i === arr) {
      //         projectRef.remove().then((res) => {
      //           // setArticleIds([...newIds]);
      //           // setArticleRemoved(true);
      //           alert('yes');
      //         });
      //       }
      //     });
      //   });
      // }
      if (newIds.length !== 0) {
        const dbRef = db.ref(`content/${innerId}`);
        if (innT.current.value === 'uposlenici') {
          dbRef
            .set({
              imageUrl: [...ids2],
              ...innerArticle,
              favorite: 'false',
              title: 'uposlenici',
              uId: innerId,
            })
            .then((res) => {
              var ref = db.ref(`content/${innerId}/imageUrl`);
              console.log(ref);
              ref.once('value').then(function (snapshot) {
                var key = snapshot.key; // "ada"
                const arr = snapshot.child(`favorite`).val();
                console.log(arr);
                let cpy2 = [];
                for (let i = 0; i < ids2.length; i++) {
                  cpy2[i] = {
                    title: innerArticle[i].title,
                    favorite: 'false',
                    imageUrl: ids2[i],
                  };
                  if (
                    innT.current.value === 'uposlenici' &&
                    innerArticle[i].name
                  ) {
                    cpy2[i].name = innerArticle[i].name;
                  }
                }
                setInnerArticle([...cpy2]);
                setArticleRemoved(true);
              });
            });
        } else {
          dbRef.update({ imageUrl: [...ids2] }).then((res) => {
            var ref = db.ref(`content/${innerId}/imageUrl`);
            console.log(ref);
            ref.once('value').then(function (snapshot) {
              var key = snapshot.key; // "ada"
              const arr = snapshot.child(`favorite`).val();
              console.log(arr);
              let cpy2 = [];
              for (let i = 0; i < ids2.length; i++) {
                cpy2[i] = {
                  title: innerArticle[i].title,
                  favorite: 'false',
                  imageUrl: ids2[i],
                };
                if (
                  innT.current.value === 'uposlenici' &&
                  innerArticle[i].name
                ) {
                  cpy2[i].name = innerArticle[i].name;
                }
              }
              setInnerArticle([...cpy2]);
              setArticleRemoved(true);
            });
          });
        }
      } else if (newIds.length === 0) {
        const projectRef = db.ref(`/content/${innerId}`);
        console.log(projectRef);
        if (innT.current.value === 'uposlenici') {
          alert('Ne mozes sve radnike odjednom izbrisati.');
        } else {
          projectRef.once('value').then(function (snapshot) {
            var key = snapshot.key; // "ada"
            const arr = snapshot.val();

            projectRef.remove().then((res) => {
              // setArticleIds([...newIds]);
              setArticleRemoved(true);
              innT.current.value = '';
              removeBtn.current.style.backgroundColor = '#dee5e5';
              removeBtn.current.children[0].style.color = 'teal';
              setRemoveMode(false);
              setOpenInner(false);
            });
          });
        }
      }
    }
  };

  const favoriteArticleHandler = () => {
    const ids = [];
    const oldIds = [];
    const newIds = [];
    for (let i = 0; i < hexUl.current.children.length; i++) {
      if (
        hexUl.current.children[i].children[0].children[0].children[1].style
          .backgroundColor !== 'transparent'
      ) {
        ids.push(hexUl.current.children[i].id);
        const dbRef = db.ref(`content/${hexUl.current.children[i].id}`);
        dbRef.update({ favorite: 'true' }).then((res) => {
          var ref = db.ref(`content/${hexUl.current.children[i].id}`);
          console.log(ref);
          ref.once('value').then(function (snapshot) {
            var key = snapshot.key; // "ada"
            let comL = 0;
            console.log(key);
            const arr = snapshot.child(`favorite`).val();
            console.log(arr);

            if (i === hexUl.current.children.length - 1 && hexUl.current) {
              setArticleIds([...newIds]);
              setArticleRemoved(true);
            }
          });
        });
      } else {
        newIds.push(hexUl.current.children[i].id);
        oldIds.push(hexUl.current.children[i].id);
        const dbRef = db.ref(`content/${hexUl.current.children[i].id}`);
        dbRef.update({ favorite: 'false' }).then((res) => {
          var ref = db.ref(`content/${hexUl.current.children[i].id}`);
          console.log(ref);
          ref.once('value').then(function (snapshot) {
            var key = snapshot.key; // "ada"
            let comL = 0;
            console.log(key);
            const arr = snapshot.child(`favorite`).val();
            console.log(arr);

            if (i === hexUl.current.children.length - 1 && hexUl.current) {
              setArticleIds([...newIds]);
              setArticleRemoved(true);
            }
          });
        });
      }
    }
    console.log(
      hexUl.current.children[0].children[0].children[0].children[1].style
        .backgroundColor
    );
    console.log(oldIds);
    console.log(ids);
  };

  const shiftArrHandler = () => {
    let newArr = [];
    if (hexUl.current) {
      if (innT.current.value === innerArticle[0].title) {
        for (let i = 0; i < hexUl.current.children.length; i++) {
          newArr[i] = innerArticle[i].imageUrl;
          if (
            hexUl.current.children[i].children[0].children[0].children[1]
              .children[0].style.color === 'gold'
          ) {
            // e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[
            //   i
            // ].children[0].children[0].children[1].children[0].style.color =
            //   '#1c2431';
            newArr[0] = innerArticle[i].imageUrl;
            newArr[i] = innerArticle[0].imageUrl;
          }
        }
        const dbRef = db.ref(`content/${innerId}/imageUrl`);
        dbRef.update([...newArr]).then((res) => {
          var ref = db.ref(`content/${innerId}/imageUrl`);
          console.log(ref);
          ref.once('value').then(function (snapshot) {
            var key = snapshot.key; // "ada"
            const arr = snapshot.child(`favorite`).val();
            console.log(arr);
            let cpy2 = [];
            for (let i = 0; i < newArr.length; i++) {
              cpy2[i] = {
                title: innerArticle[i].title,
                favorite: 'false',
                imageUrl: newArr[i],
              };
              if (innerArticle[i].name) {
                cpy2[i].name = innerArticle[i].name;
              }
            }
            setInnerArticle([...cpy2]);
            setArticleRemoved(true);
          });
        });

        console.log(newArr);
      } else {
        // handleTitleChange();
        for (let i = 0; i < hexUl.current.children.length; i++) {
          newArr[i] = innerArticle[i].imageUrl;
          if (
            hexUl.current.children[i].children[0].children[0].children[1]
              .children[0].style.color === 'gold'
          ) {
            // e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[
            //   i
            // ].children[0].children[0].children[1].children[0].style.color =
            //   '#1c2431';
            newArr[0] = innerArticle[i].imageUrl;
            newArr[i] = innerArticle[0].imageUrl;
          }
        }
        const dbRef = db.ref(`content/${innerId}`);
        const tit = innT.current.value;
        dbRef.update({ title: tit, imageUrl: [...newArr] }).then((res) => {
          var ref = db.ref(`content/${innerId}`);
          console.log(ref);
          ref.once('value').then(function (snapshot) {
            var key = snapshot.key; // "ada"
            const arr = snapshot.child(`title`).val();
            console.log(arr);
            let cpy2 = [];
            let ids2 = [];
            let names = [];
            let titles = [];

            for (let i = 0; i < innerArticle.length; i++) {
              ids2[i] = innerArticle[i].imageUrl;
              titles[i] = innerArticle[i].title;
            }
            for (let i = 0; i < newArr.length; i++) {
              cpy2[i] = {
                title: tit === 'uposlenici' ? titles[i] : tit,
                favorite: 'false',
                imageUrl: newArr[i],
              };
              if (innerArticle[i].name) {
                cpy2[i].name = innerArticle[i].name;
              }
            }
            setInnerArticle([...cpy2]);
            setArticleRemoved(true);
          });
        });
      }
    }
  };

  const removeInnerClick = (node) => {
    setTimeout(() => {
      console.log(node);
      node.children[0].style.transform = 'translateY(-10px)';
      node.children[1].style.transform = 'translateY(10px)';
      node.children[0].style.opacity = '0';
      node.children[1].style.opacity = '0';
    }, 100);
    setTimeout(() => {
      node.style.display = 'flex';
      node.style.backgroundColor = 'transparent';
      node.children[0].style.display = 'none';
      node.children[1].style.display = 'none';
      node.nextSibling.style.display = 'block';
      if (node.nextSibling.nextSibling) {
        node.nextSibling.nextSibling.style.display = 'block';
      }
    }, 300);
  };

  const handleWorker = (mode) => {
    if (mode === 'add') {
      addWorkerForm.current.style.opacity = '1';
      addWorkerForm.current.style.transform = 'translateY(0)';
      addWorkerForm.current.parentElement.style.zIndex = '300';
      addWorkerForm.current.children[1].focus();
    } else if (mode === 'close') {
      addWorkerForm.current.style.opacity = '0';
      addWorkerForm.current.style.transform = 'translateY(-100vh)';
      addWorkerForm.current.parentElement.style.zIndex = '-1';
      addWorkerForm.current.children[1].value = '';
      addWorkerForm.current.children[3].value = '';
      if (hexUl.current) {
        for (let i = 0; i < hexUl.current.children.length; i++) {
          if (
            hexUl.current.children[i].children[0].children[0].children[1].style
              .backgroundColor !== 'transparent'
          ) {
            hexUl.current.children[
              i
            ].children[0].children[0].children[1].style.backgroundColor =
              'transparent';
            hexUl.current.children[
              i
            ].children[0].children[0].children[1].children[0].style.display =
              'none';
            hexUl.current.children[
              i
            ].children[0].children[0].children[1].children[1].style.display =
              'none';
            hexUl.current.children[
              i
            ].children[0].children[0].children[1].children[0].style.opacity =
              '0';
            hexUl.current.children[
              i
            ].children[0].children[0].children[1].children[1].style.opacity =
              '0';
            hexUl.current.children[
              i
            ].children[0].children[0].children[1].children[0].style.transform =
              'translateY(-10px)';
            hexUl.current.children[
              i
            ].children[0].children[0].children[1].children[1].style.transform =
              'translateY(10px)';
          }
        }
      }
    }
  };

  const submitWorker = (e) => {
    e.preventDefault();
    console.log(hexUl.current.children[0]);
    if (
      addWorkerForm.current.children[1].value &&
      addWorkerForm.current.children[3].value
    ) {
      for (let i = 0; i < hexUl.current.children.length; i++) {
        if (
          hexUl.current.children[i].children[0].children[0].children[1]
            .children[0].style.display !== 'none'
        ) {
          console.log(i);
          console.log(e.target.children[1].value);
          const name = e.target.children[1].value;
          const num = i;
          console.log(e.target.children[3].value);
          const tit = e.target.children[3].value;
          console.log(innerArticle);
          const dbRef = db.ref(`content/${innerId}/${i}`);
          dbRef.update({ title: tit, name: name }).then((res) => {
            var ref = db.ref(`content/${innerId}/${i}`);
            console.log(ref);
            ref.once('value').then(function (snapshot) {
              var key = snapshot.key; // "ada"
              const arr = snapshot.child(`title`).val();
              console.log(arr);
              let cpy2 = [];
              let newArr = [...innerArticle];
              console.log(newArr);
              // let ids2 = [];
              // for (let i = 0; i < innerArticle.length; i++) {
              //   ids2[i] = innerArticle[i].imageUrl;
              // }
              for (let i = 0; i < newArr.length; i++) {
                if (i === num) {
                  newArr[i] = {
                    title: tit,
                    name: name,
                    favorite: 'false',
                    imageUrl: newArr[i].imageUrl,
                  };
                }
              }
              console.log(newArr);
              setInnerArticle([...newArr]);
              setArticleRemoved(true);
              handleWorker('close');
              addWorkerForm.current.children[1].value = '';
              addWorkerForm.current.children[3].value = '';
            });
          });
        }
      }
    }
  };

  const handleInner = (e) => {
    if (
      openInner &&
      !favoriteMode &&
      !removeMode &&
      e.target.id.includes('hexOverlay')
    ) {
      //open up thumbnails when clicking on a hex cell
      // e.target.children[0].children[0].children[1].children[0].style.display =
      //   'block';
      for (let i = 0; i < hexUl.current.children.length; i++) {
        if (
          hexUl.current.children[i].children[0].children[0].children[1].style
            .backgroundColor !== 'transparent'
        ) {
          e.target.parentElement.parentElement.parentElement.parentElement.children[
            i
          ].children[0].children[0].children[1].style.backgroundColor =
            'transparent';

          removeInnerClick(
            e.target.parentElement.parentElement.parentElement.parentElement
              .children[i].children[0].children[0].children[1]
          );
        }
      }
      console.log(e.target);
      console.log(e.target.children[0]);
      e.target.children[0].style.display = 'block';
      e.target.children[0].style.backgroundColor = 'rgba(21, 170, 191, 0.7)';
      e.target.children[0].style.width = '50%';
      e.target.children[0].style.height = '100%';
      const { target } = e; //save because event gets lost in async calls like setTimeout
      setTimeout(() => {
        console.log(target);
        target.children[0].style.transform = 'translateY(0)';
        target.children[1].style.transform = 'translateY(0)';
        target.children[0].style.opacity = '1';
        target.children[1].style.opacity = '1';
      }, 100);
      e.target.style.display = 'grid';
      e.target.style.gridTemplateColumns = '1fr 1fr';
      e.target.children[0].style.display = 'flex';
      e.target.children[0].style.alignItems = 'center';
      e.target.children[0].style.justifyContent = 'center';
      e.target.children[1].style.display = 'flex';
      e.target.children[1].style.gridColumn = '2/3';
      e.target.children[1].style.alignItems = 'center';
      e.target.children[1].style.justifyContent = 'center';
      e.target.children[1].style.width = '100%';
      e.target.children[1].style.height = '100%';

      e.target.nextSibling.style.display = 'none';
      if (e.target.nextSibling.nextSibling) {
        e.target.nextSibling.nextSibling.style.display = 'none';
      }
      e.target.style.backgroundColor = 'rgba(21, 170, 191, 0.5)';
    } else if (
      openInner &&
      !favoriteMode &&
      !removeMode &&
      e.target.tagName === 'H1'
    ) {
      for (let i = 0; i < hexUl.current.children.length; i++) {
        if (
          hexUl.current.children[i].children[0].children[0].children[1].style
            .backgroundColor !== 'transparent'
        ) {
          e.target.parentElement.parentElement.parentElement.parentElement.children[
            i
          ].children[0].children[0].children[1].style.backgroundColor =
            'transparent';

          removeInnerClick(
            e.target.parentElement.parentElement.parentElement.parentElement
              .children[i].children[0].children[0].children[1]
          );
        }
      }
      e.target.previousSibling.children[0].style.display = 'block';
      e.target.previousSibling.children[0].style.backgroundColor =
        'rgba(21, 170, 191, 0.7)';
      e.target.previousSibling.children[0].style.width = '50%';
      e.target.previousSibling.children[0].style.height = '100%';
      const { target } = e; //save because event gets lost in async calls like setTimeout
      setTimeout(() => {
        target.previousSibling.children[0].style.transform = 'translateY(0)';
        target.previousSibling.children[1].style.transform = 'translateY(0)';
        target.previousSibling.children[0].style.opacity = '1';
        target.previousSibling.children[1].style.opacity = '1';
      }, 100);
      e.target.previousSibling.style.display = 'grid';
      e.target.previousSibling.style.gridTemplateColumns = '1fr 1fr';
      e.target.previousSibling.children[0].style.display = 'flex';
      e.target.previousSibling.children[0].style.alignItems = 'center';
      e.target.previousSibling.children[0].style.justifyContent = 'center';
      e.target.previousSibling.children[1].style.display = 'flex';
      e.target.previousSibling.children[1].style.gridColumn = '2/3';
      e.target.previousSibling.children[1].style.alignItems = 'center';
      e.target.previousSibling.children[1].style.justifyContent = 'center';
      e.target.previousSibling.children[1].style.width = '100%';
      e.target.previousSibling.children[1].style.height = '100%';

      e.target.previousSibling.nextSibling.style.display = 'none';
      if (e.target.previousSibling.nextSibling.nextSibling) {
        e.target.previousSibling.nextSibling.nextSibling.style.display = 'none';
      }
      e.target.previousSibling.style.backgroundColor =
        'rgba(21, 170, 191, 0.5)';
    } else if (
      openInner &&
      !favoriteMode &&
      !removeMode &&
      e.target.tagName === 'H2'
    ) {
      for (let i = 0; i < hexUl.current.children.length; i++) {
        if (
          hexUl.current.children[i].children[0].children[0].children[1].style
            .backgroundColor !== 'transparent'
        ) {
          e.target.parentElement.parentElement.parentElement.parentElement.children[
            i
          ].children[0].children[0].children[1].style.backgroundColor =
            'transparent';

          removeInnerClick(
            e.target.parentElement.parentElement.parentElement.parentElement
              .children[i].children[0].children[0].children[1]
          );
        }
      }
      e.target.previousSibling.previousSibling.children[0].style.display =
        'block';
      e.target.previousSibling.previousSibling.children[0].style.backgroundColor =
        'rgba(21, 170, 191, 0.7)';
      e.target.previousSibling.previousSibling.children[0].style.width = '50%';
      e.target.previousSibling.previousSibling.children[0].style.height =
        '100%';
      const { target } = e; //save because event gets lost in async calls like setTimeout
      setTimeout(() => {
        target.previousSibling.previousSibling.children[0].style.transform =
          'translateY(0)';
        target.previousSibling.previousSibling.children[1].style.transform =
          'translateY(0)';
        target.previousSibling.previousSibling.children[0].style.opacity = '1';
        target.previousSibling.previousSibling.children[1].style.opacity = '1';
      }, 100);
      e.target.previousSibling.previousSibling.style.display = 'grid';
      e.target.previousSibling.previousSibling.style.gridTemplateColumns =
        '1fr 1fr';
      e.target.previousSibling.previousSibling.children[0].style.display =
        'flex';
      e.target.previousSibling.previousSibling.children[0].style.alignItems =
        'center';
      e.target.previousSibling.previousSibling.children[0].style.justifyContent =
        'center';
      e.target.previousSibling.previousSibling.children[1].style.display =
        'flex';
      e.target.previousSibling.previousSibling.children[1].style.gridColumn =
        '2/3';
      e.target.previousSibling.previousSibling.children[1].style.alignItems =
        'center';
      e.target.previousSibling.previousSibling.children[1].style.justifyContent =
        'center';
      e.target.previousSibling.previousSibling.children[1].style.width = '100%';
      e.target.previousSibling.previousSibling.children[1].style.height =
        '100%';

      e.target.previousSibling.previousSibling.nextSibling.style.display =
        'none';
      if (e.target.previousSibling.previousSibling.nextSibling.nextSibling) {
        e.target.previousSibling.previousSibling.nextSibling.nextSibling.style.display =
          'none';
      }
      e.target.previousSibling.previousSibling.style.backgroundColor =
        'rgba(21, 170, 191, 0.5)';
    } else if (
      openInner &&
      !favoriteMode &&
      !removeMode &&
      e.target.className.includes('fa-crown')
    ) {
      const { target } = e;
      if (e.target.style.color === 'rgb(28, 36, 49)') {
        // e.target.parentElement.parentElement.parentElement.parentElement.parentElement
        for (let i = 0; i < hexUl.current.children.length; i++) {
          if (
            hexUl.current.children[i].children[0].children[0].children[1]
              .children[0].style.color === 'gold'
          ) {
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[
              i
            ].children[0].children[0].children[1].children[0].style.color =
              '#1c2431';
          }
        }
        e.target.style.color = 'gold';
      } else {
        setTimeout(() => {
          console.log(target);
          target.style.transform = 'translateY(-10px)';
          target.nextSibling.style.transform = 'translateY(10px)';
          target.style.opacity = '0';
          target.nextSibling.style.opacity = '0';
        }, 100);
        setTimeout(() => {
          target.parentElement.style.display = 'flex';
          target.parentElement.style.backgroundColor = 'transparent';
          target.style.display = 'none';
          target.nextSibling.style.display = 'none';
          target.parentElement.nextSibling.style.display = 'block';
        }, 300);
      }
    } else if (
      openInner &&
      !favoriteMode &&
      !removeMode &&
      e.target.className.includes('fa-user-edit')
    ) {
      const { target } = e;
      handleWorker('add');
      // setTimeout(() => {
      //   console.log(target);
      //   target.style.transform = 'translateY(-10px)';
      //   target.nextSibling.style.transform = 'translateY(10px)';
      //   target.style.opacity = '0';
      //   target.nextSibling.style.opacity = '0';
      // }, 100);
      // setTimeout(() => {
      //   target.parentElement.style.display = 'flex';
      //   target.parentElement.style.backgroundColor = 'transparent';
      //   target.style.display = 'none';
      //   target.nextSibling.style.display = 'none';
      //   target.parentElement.nextSibling.style.display = 'block';
      //   target.parentElement.nextSibling.nextSibling.style.display = 'block';
      // }, 300);
      setTimeout(() => {
        target.parentElement.nextSibling.style.display = 'block';
        target.parentElement.nextSibling.nextSibling.style.display = 'block';
      }, 300);
    } else if (
      openInner &&
      !favoriteMode &&
      !removeMode &&
      e.target.className.includes('fa-eye')
    ) {
      const { target } = e;
      setTimeout(() => {
        console.log(target);
        target.style.transform = 'translateY(-10px)';
        target.previousSibling.style.transform = 'translateY(10px)';
        target.style.opacity = '0';
        target.previousSibling.style.opacity = '0';
      }, 100);
      setTimeout(() => {
        target.parentElement.style.display = 'flex';
        target.parentElement.style.backgroundColor = 'transparent';
        target.style.display = 'none';
        target.previousSibling.style.display = 'none';
        target.parentElement.nextSibling.style.display = 'block';
        if (target.parentElement.nextSibling.nextSibling) {
          target.parentElement.nextSibling.nextSibling.style.display = 'block';
        }
      }, 300);
      overlay.current.nextSibling.style.display = 'block';
      let transfImg =
        target.parentElement.previousSibling.style.backgroundImage;
      transfImg = transfImg.replace('url("', '').replace('")', '');
      overlay.current.nextSibling.children[0].src = transfImg;
    }
    const idVal = e.target.id;
    if (
      idVal.includes('hexOverlay') &&
      !favoriteMode &&
      !removeMode &&
      !openInner
    ) {
      const innId = e.target.parentElement.parentElement.parentElement.id;
      setInnerId([innId]);
    } else if (
      //clicking on h1 instead of hexoverlay and opening inner
      !favoriteMode &&
      !removeMode &&
      !openInner &&
      e.target.className.includes('hexCellTitle')
    ) {
      const innId = e.target.parentElement.parentElement.parentElement.id;
      setInnerId([innId]);
    }
  };

  useEffect(() => {
    if (innerId.length !== 0) {
      console.log(innerId);
      fetch(
        `https://elektro-plus-ca75d-default-rtdb.europe-west1.firebasedatabase.app/content/${innerId[0]}.json`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log(data);
            const newArr = [];
            // if(data.title !== 'uposlenici'){
            //   for (let i = 0; i < data.imageUrl.length; i++) {
            //     newArr[i] = {
            //       title: data.title,
            //       favorite: data.favorite,
            //       imageUrl: data.imageUrl[i],
            //     };
            //   }
            //   innT.current.value = data.title;
            //   setInnerArticle([...newArr]);
            //   setOpenInner(true);
            // } else if(data.title === 'uposlenici') {

            // }
            let cntName = 0;
            for (let i = 0; i < data.imageUrl.length; i++) {
              newArr[i] = {
                // title: data.title,
                title: data.title === 'uposlenici' ? data[i].title : data.title,
                favorite: data.favorite,
                imageUrl: data.imageUrl[i],
              };
              if (data.title === 'uposlenici' && data[i].name) {
                newArr[i].name = data[i].name;
              }
            }
            innT.current.value = data.title;
            setInnerArticle([...newArr]);
            setOpenInner(true);
          }
        });
    }
  }, [innerId]);
  useEffect(() => {
    if (innerArticle) {
    }
  }, [innerArticle]);

  const handleBackME = (e) => {
    if (openInner) {
      e.target.style.backgroundColor = 'teal';
      e.target.style.color = '#1c2431';
    }
  };

  const handleBackML = (e) => {
    console.log(e.target.className);
    if (openInner) {
      e.target.style.backgroundColor = '#dee5e5';
      e.target.style.color = 'teal';
    }
  };

  const handleBackPlusME = (e) => {
    if (openInner) {
      e.target.style.backgroundColor = 'teal';
      e.target.style.color = '#dee5e5';
    }
  };

  const handleBackPlusML = (e) => {
    if (openInner) {
      e.target.style.backgroundColor = '#dee5e5';
      e.target.style.color = 'teal';
    }
  };

  const handleAddMOver = (e) => {
    if (!openInner) {
      e.target.style.backgroundColor = 'teal';
      e.target.style.color = '#dee5e5';
    }
  };
  const handleAddMOut = (e) => {
    if (!openInner) {
      e.target.style.backgroundColor = '#dee5e5';
      e.target.style.color = 'teal';
    }
  };

  const handleOpenInnerGold = () => {
    if (openInner) {
      console.log(innerArticle);
      if (hexUl.current) {
        for (let i = 0; i < hexUl.current.children.length; i++) {
          if (hexUl.current.children.length > 0) {
            if (
              hexUl.current.children[i].children[0].children[0].children[1]
                .children[0]
            ) {
              if (
                hexUl.current.children[i].children[0].children[0].children[1]
                  .children[0].style.color !== 'gold' &&
                innT.current.value !== 'uposlenici'
              ) {
                hexUl.current.children[0].children[0].children[0].children[1].children[0].style.color =
                  'gold';
              }
            }
          } else return;
        }
      }
    }
  };

  useEffect(() => {
    if (openInner) {
      handleOpenInnerGold();
    }
  }, [openInner]);

  useEffect(() => {
    if (openInnerSet) {
    }
  }, [openInnerSet]);

  useEffect(() => {
    if (openInner && !favoriteMode) {
      handleOpenInnerGold();
    }
  }, [favoriteMode]);
  useEffect(() => {
    if (openInner && !removeMode) {
      handleOpenInnerGold();
    }
  }, [removeMode]);

  const handleLefRight = (direction) => {
    for (let i = 0; i < innerArticle.length; i++) {
      if (direction === 'left') {
        if (
          innerArticle[i].imageUrl ===
          overlay.current.nextSibling.children[0].src
        ) {
          if (i === 0) {
            // overlay.current.nextSibling.children[0].src =
            // innerArticle[i + 1].imageUrl;
            overlay.current.nextSibling.children[0].src =
              innerArticle[innerArticle.length - 1].imageUrl;
          } else {
            overlay.current.nextSibling.children[0].src =
              innerArticle[i - 1].imageUrl;
          }
          break;
        }
      } else if (direction === 'right') {
        if (
          innerArticle[i].imageUrl ===
          overlay.current.nextSibling.children[0].src
        ) {
          if (i === innerArticle.length - 1) {
            // overlay.current.nextSibling.children[0].src =
            // innerArticle[i + 1].imageUrl;
            overlay.current.nextSibling.children[0].src =
              innerArticle[0].imageUrl;
          } else {
            overlay.current.nextSibling.children[0].src =
              innerArticle[i + 1].imageUrl;
          }
          break;
        }
      }
    }
  };

  const closeOverlaySlider = (e) => {
    // overlay.current.nextSibling.style.display = 'none';
    if (e.target.className.includes('fa-caret-right')) {
      handleLefRight('right');
    } else if (e.target.className.includes('fa-caret-left')) {
      handleLefRight('left');
    }
    if (e.target.id.includes('overlaySlider')) {
      overlay.current.nextSibling.style.display = 'none';
    }
  };

  // dragging

  const [dragIndex, setDragIndex] = useState(0);
  const [replacedIdx, setReplacedIdx] = useState(0);
  const [clone, setClone] = useState(null);
  const [storeRef, setStoreRef] = useState(null);
  const [drag, setDrag] = useState(false);
  const dragStart = (e) => {
    console.log(e.target.id);
    console.log(e.target);
    e.dataTransfer.setData('text', e.target.id);
    if (openInner) {
      console.log(
        e.target.children[0].children[0].children[0].style.backgroundImage
      );
      console.log(e.target.children[0].children[0].children[2].textContent);
      const workerName =
        e.target.children[0].children[0].children[2].textContent;
      let imgName =
        e.target.children[0].children[0].children[0].style.backgroundImage;
      imgName = imgName.replace('url("', '').replace('")', '');

      if (innT.current.value === 'uposlenici') {
        console.log(e.target.children[0].children[0].children[3].textContent);
        const workerTitle =
          e.target.children[0].children[0].children[3].textContent;
        const xferObj = {
          img: imgName,
          name: workerName,
          title: workerTitle,
        };
        e.dataTransfer.setData('text', JSON.stringify(xferObj));
      } else {
        e.dataTransfer.setData('text', imgName);
      }
      console.log(imgName);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   if (clone) {
  //     console.log(clone);
  //   }
  // }, [clone]);

  const drop = (e) => {
    e.preventDefault();
    if (!openInner) {
      setClone(
        e.target.parentElement.parentElement.parentElement.cloneNode(true)
      );
      let data = e.dataTransfer.getData('text');
      let nodeList = hexUl.current.childNodes;
      let drgIdx = 0;
      let replacedIdx = 0;
      console.log(nodeList);
      if (data === e.target.parentElement.parentElement.parentElement.id)
        return;
      for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].id == data) {
          setDragIndex(i);
          drgIdx = i;
        } else if (
          nodeList[i].id ===
          e.target.parentElement.parentElement.parentElement.id
        ) {
          setReplacedIdx(i);
          replacedIdx = i;
        }
      }

      // document
      //   .getElementById('parent')
      //   .replaceChild(document.getElementById(data), e.target);

      // hexUl.current.replaceChild(
      //   hexUl.current.children[drgIdx],
      //   hexUl.current.children[replacedIdx]
      // );
      const idk = articles[replacedIdx];
      articles[replacedIdx] = articles[drgIdx];
      articles[drgIdx] = idk;
      // document
      //   .getElementById('parent')
      //   .insertBefore(
      //     clone,
      //     document.getElementById('parent').childNodes[dragindex]
      //   );
      console.log(hexUl.current.children);
      console.log(articles);
      // hexUl.current.insertBefore(clone, nodeList[dragIndex]);
      setDrag(true);
    } else if (openInner) {
      let data = e.dataTransfer.getData('text');
      let workerTitle = undefined;
      if (innT.current.value === 'uposlenici') {
        data = JSON.parse(data);
        workerTitle =
          e.target.parentElement.parentElement.parentElement.children[0]
            .children[0].children[3].textContent;
      }
      console.log(data);
      // console.log(
      //   e.target.parentElement.parentElement.parentElement.children[0]
      //     .children[0].children[0].style.backgroundImage
      // );
      let imgName =
        e.target.parentElement.parentElement.parentElement.children[0]
          .children[0].children[0].style.backgroundImage;
      const workerName =
        e.target.parentElement.parentElement.parentElement.children[0]
          .children[0].children[2].textContent;
      imgName = imgName.replace('url("', '').replace('")', '');
      console.log(imgName);
      console.log(workerName);
      console.log(workerTitle);
      if (innT.current.value !== 'uposlenici') {
        if (imgName === data) return;
      } else {
        if (imgName === data.img) return;
      }
      let nodeList = hexUl.current.childNodes;
      let drgIdx = 0;
      let replacedIdx = 0;
      console.log(data);
      if (innT.current.value !== 'uposlenici') {
        for (let i = 0; i < innerArticle.length; i++) {
          if (innerArticle[i].imageUrl === data) {
            setDragIndex(i);
            drgIdx = i;
          } else if (innerArticle[i].imageUrl === imgName) {
            setReplacedIdx(i);
            replacedIdx = i;
          }
        }
      } else {
        for (let i = 0; i < innerArticle.length; i++) {
          if (innerArticle[i].imageUrl === data.img) {
            setDragIndex(i);
            drgIdx = i;
          } else if (innerArticle[i].imageUrl === imgName) {
            setReplacedIdx(i);
            replacedIdx = i;
          }
        }
      }
      console.log(drgIdx);
      console.log(replacedIdx);
      const idk = innerArticle[replacedIdx].imageUrl;
      const idkt = innerArticle[replacedIdx].title;
      const idkt2 = innerArticle[drgIdx].title;
      innerArticle[replacedIdx].imageUrl = innerArticle[drgIdx].imageUrl;
      innerArticle[drgIdx].imageUrl = idk;
      if (innT.current.value === 'uposlenici') {
        let nameDrag = '';
        let nameReplaced = '';
        if (innerArticle[drgIdx].name) {
          nameDrag = innerArticle[drgIdx].name;
        }
        if (innerArticle[replacedIdx].name) {
          nameReplaced = innerArticle[replacedIdx].name;
        }
        innerArticle[drgIdx].title = idkt;
        innerArticle[replacedIdx].title = idkt2;
        if (nameDrag) {
          innerArticle[replacedIdx].name = nameDrag;
        } else if (!nameDrag) {
          innerArticle[replacedIdx].name = '';
        }
        if (nameReplaced) {
          innerArticle[drgIdx].name = nameReplaced;
        } else if (!nameReplaced) {
          innerArticle[drgIdx].name = '';
        }
        // innerArticle[replacedIdx].title = innerArticle[drgIdx].title;
      }
      console.log(innerArticle);

      setDrag(true);

      console.log(e.target.parentElement.parentElement.parentElement);
    }
  };

  return (
    <div id={s.bgClr}>
      <div id={s.overlay} ref={overlay} onClick={closeEverything} />
      <div id={s.overlaySlider} onClick={(e) => closeOverlaySlider(e)}>
        <img src={require('../../../assets/img/admin/bulb1.jpg')} />
        <i id={s.imgOL} class="fas fa-caret-left"></i>
        <i id={s.imgOR} class="fas fa-caret-right"></i>
      </div>
      <div
        id={s.addWorkerOverlay}
        onClick={(e) =>
          e.target.id.includes('addWorker') ? handleWorker('close') : null
        }
      >
        <form
          id={s.addWorker}
          ref={addWorkerForm}
          onSubmit={(e) => submitWorker(e)}
        >
          <label>Ime i Prezime</label>
          <input />
          <label>Zanimanje</label>
          <input />
          <input type="submit" />
        </form>
      </div>
      <div id={s.spinnerParent} ref={spinnerParent}>
        {loading ? (
          <div id={s.articleSpinner} ref={articleSpinner}></div>
        ) : (
          <div id={s.articleUploaded} ref={articleUploadText}>
            <i className="fas fa-check"></i>Your article has been created!
          </div>
        )}
      </div>
      <section id={s.adminPanelShowcase}>
        <Snav cur={'adminP'} />
      </section>
      <form
        id={s.createArticle}
        onSubmit={(e) => handleSubmit(e)}
        ref={articleForm}
      >
        <h2>{openInner ? 'Edituj projekat' : 'Postavi projekat'}</h2>
        <label
          ref={(label) => {
            if (labels.length < 2 && label && init) {
              labels.push(label);
            }
          }}
          class={s.nl}
          htmlFor="title"
          style={{
            marginBottom: !innT.current
              ? null
              : innT.current.value === 'uposlenici'
              ? '0rem'
              : null,
          }}
        >
          {' '}
          {openInner ? 'Promijeni naziv projekta' : 'Naziv projekta'}
        </label>
        <input
          ref={(input) => {
            if (inputs.length < 4 && input && init) {
              inputs.push(input);
            }
          }}
          autoComplete="off"
          spellCheck={false}
          onBlur={(e) => handleBlur(e, 'title')}
          onFocus={() => handleFocus('title')}
          type="text"
          name="title"
          disabled={
            !innT.current
              ? true
              : innT.current.value === 'uposlenici'
              ? true
              : loading
              ? true
              : false
          }
        />
        <label htmlFor="img">Postavi sliku ili slike:</label>
        <input
          onChange={(e) => handleChange(e)}
          ref={(input) => {
            if (inputs.length < 4 && input && init) {
              inputs.push(input);
            }
          }}
          type="file"
          id={s.imgUpload}
          name="img"
          accept="image/*"
          multiple={true}
          disabled={loading ? true : false}
        />
        <span id={s.showNoImg} ref={alertNoImg}>
          Izaberi sliku.
        </span>
        <input
          id={s.submitArticle}
          type="submit"
          value="Submit"
          disabled={loading ? true : false}
          style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
        />
      </form>
      <div id={s.Bg}>
        <div id={s.hexagonP}>
          <div id={s.innerTitle}>
            <input
              ref={innT}
              style={{ fontSize: '30px', textTransform: 'capitalize' }}
              type="text"
              spellCheck={false}
              disabled={
                openInner && innT.current.value === 'uposlenici'
                  ? true
                  : !openInner
                  ? true
                  : false
              }
            />
          </div>
          <div id={s.hexagonTitle}>
            <h1>
              Projekti<span>{articles ? articles.length : 0}</span>
            </h1>
          </div>
          <div id={s.btnCtrl}>
            <div
              id={s.add}
              onClick={(e) => handleAddArticle(e)}
              onMouseOver={(e) => handleAddMOver(e)}
              onMouseOut={(e) => handleAddMOut(e)}
            >
              {!openInner ? (
                '+'
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <i
                    style={{
                      color: 'teal',
                      height: '50%',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    class="fas fa-long-arrow-alt-left"
                    onMouseEnter={(e) => handleBackME(e)}
                    onMouseLeave={(e) => handleBackML(e)}
                  ></i>
                  <span
                    className={s.innerPlus}
                    style={{
                      width: '100%',
                      height: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTop: '5px solid #1c2431',
                      transition:
                        'color 0.3s ease-in-out, background-color 0.3s ease-in-out',
                    }}
                    onMouseEnter={(e) => handleBackPlusME(e)}
                    onMouseLeave={(e) => handleBackPlusML(e)}
                  >
                    +
                  </span>
                </div>
              )}
            </div>
            <div
              id={s.remove}
              onClick={handleRemoveMode}
              onMouseEnter={handleRemoveModeME}
              onMouseLeave={handleRemoveModeML}
              ref={removeBtn}
            >
              <i class="fas fa-trash"></i>
            </div>
            <div
              id={s.favorite}
              onClick={handleFavoriteMode}
              onMouseEnter={handleFavoriteModeME}
              onMouseLeave={handleFavoriteModeML}
              ref={favoriteBtn}
            >
              <i
                style={{ color: openInner ? 'grey' : 'teal' }}
                class="fas fa-star"
              ></i>
            </div>
            <div id={s.confirm} onClick={handleConfirm}>
              <i class="fas fa-check"></i>
            </div>
          </div>
          <div id={s.hexagonBody}>
            {!disableSpinner && !articleRemoved ? (
              <ul id={s.hexGrid} onClick={(e) => handleClickUl(e)} ref={hexUl}>
                {articles && !openInner
                  ? articles.map((art, idx) => (
                      <li
                        class={s.hex}
                        id={art.uId ? art.uId : articleIds[idx]}
                        key={Math.random()}
                        onClick={(e) => handleInner(e)}
                        draggable={true}
                        onDragStart={(e) => dragStart(e)}
                        onDrop={(e) => drop(e)}
                        onDragOver={(e) => allowDrop(e)}
                      >
                        <div class={s.hexIn}>
                          <div class={s.hexLink} href="#">
                            <div
                              class={s.hexImg}
                              style={{
                                backgroundImage: `url(${
                                  art.imageUrl ? art.imageUrl[0] : ''
                                })`,
                              }}
                            ></div>
                            <div
                              id={s.hexOverlay}
                              ref={hexOverlay}
                              style={{
                                backgroundColor:
                                  art.favorite === 'true' && favoriteMode
                                    ? 'rgba(0, 128, 128, 0.6)'
                                    : articleRemoved && favoriteMode
                                    ? 'rgba(0, 128, 128, 0.6)'
                                    : 'transparent',
                              }}
                            >
                              {removeMode ? (
                                <i class="fas fa-trash"></i>
                              ) : favoriteMode ? (
                                <i
                                  class="fas fa-star"
                                  style={{
                                    color: 'gold',
                                    display:
                                      art.favorite === 'true'
                                        ? 'block'
                                        : articleRemoved && favoriteMode
                                        ? 'block'
                                        : 'none',
                                  }}
                                ></i>
                              ) : null}
                            </div>
                            <h1 className={s.hexCellTitle}>{art.title}</h1>
                          </div>
                        </div>
                      </li>
                    ))
                  : openInner && innerArticle.length > 0
                  ? innerArticle.map((inn, i) => (
                      <li
                        class={s.hex}
                        key={Math.random()}
                        onClick={(e) => handleInner(e)}
                        draggable={true}
                        onDragStart={(e) => dragStart(e)}
                        onDrop={(e) => drop(e)}
                        onDragOver={(e) => allowDrop(e)}
                      >
                        <div class={s.hexIn}>
                          <div class={s.hexLink} href="#">
                            <div
                              class={s.hexImg}
                              style={{
                                backgroundImage: `url(${
                                  inn ? inn.imageUrl : ''
                                })`,
                              }}
                            ></div>
                            <div
                              id={s.hexOverlay}
                              ref={hexOverlay}
                              style={{
                                backgroundColor:
                                  inn.favorite === 'true' && favoriteMode
                                    ? 'rgba(0, 128, 128, 0.6)'
                                    : articleRemoved && favoriteMode
                                    ? 'rgba(0, 128, 128, 0.6)'
                                    : 'transparent',
                              }}
                            >
                              {removeMode ? (
                                <i class="fas fa-trash"></i>
                              ) : favoriteMode ? (
                                <i
                                  class="fas fa-star"
                                  style={{
                                    color: 'gold',
                                    display:
                                      inn.favorite === 'true'
                                        ? 'block'
                                        : articleRemoved && favoriteMode
                                        ? 'block'
                                        : 'none',
                                  }}
                                ></i>
                              ) : openInner ? (
                                <>
                                  <i
                                    class={
                                      innT.current.value === 'uposlenici'
                                        ? 'fas fa-user-edit'
                                        : 'fas fa-crown'
                                    }
                                    style={{
                                      color: '#1c2431',
                                      display: 'none',
                                      fontSize: '30px',
                                      opacity: '0',
                                      transform: 'translateY(-10px)',
                                      transition:
                                        'transform 300ms ease-in-out, opacity 300ms ease-in-out',
                                    }}
                                  ></i>
                                  <i
                                    class="fas fa-eye"
                                    style={{
                                      color: '#1c2431',
                                      display: 'none',
                                      fontSize: '30px',
                                      opacity: '0',
                                      transform: 'translateY(10px)',
                                      transition:
                                        'transform 300ms ease-in-out, opacity 300ms ease-in-out',
                                    }}
                                  ></i>
                                </>
                              ) : null}
                            </div>
                            <h1 className={s.hexCellTitle}>
                              {innT.current.value === 'uposlenici'
                                ? inn.name
                                : inn.title}
                            </h1>
                            {!innT.current ? null : innT.current.value ===
                              'uposlenici' ? (
                              <h2 className={s.hexCellName}>{inn.title}</h2>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
            ) : articleRemoved && disableSpinner ? null : (
              <div id={s.preLoad}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
