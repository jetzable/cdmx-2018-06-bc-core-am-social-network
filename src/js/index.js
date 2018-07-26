// Initialize Firebase //
window.initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyA2_g2xx4nNZIKuqwbaUwk3HaA4mEesgCM',
    authDomain: 'garnachapp-labo.firebaseapp.com',
    databaseURL: 'https://garnachapp-labo.firebaseio.com',
    projectId: 'garnachapp-labo',
    storageBucket: '',
    messagingSenderId: '805982016843'
  });
};

window.newAccount = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      verifyAccountWithEmail();
      alert('Se ha enviado un correo a tu email para verificar tu cuenta.');
      signOutUser();
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorMessage);
      if (errorCode === 'auth/invalid-email') {
        alert('Por favor, ingresa un correo electrónico válido.');
      } else if (errorCode === 'auth/weak-password') {
        alert('Por favor, ingresa una contraseña.');
      } else if (errorCode === 'auth/email-already-in-use') {
        alert('Usuario ya registrado, por favor verifica tus datos.');
      }
    });
};

window.verifyAccountWithEmail = () => {
  let user = firebase.auth().currentUser;

  user.sendEmailVerification()
    .then(() => {
      // Email sent.
      console.log('Se envió mail');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
};


window.loginUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      location.href = ('views/newsfeed.html');
      console.log('siii');
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Por favor, verifica tu contraseña.');
      } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email' || errorCode === 'auth/argument-error') {
        alert('Por favor verifica tu usuario o Registrate para poder iniciar sesión.');
      } else if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('El correo ya ha sido registrado');
      }
    });
};


window.googleUserLogin = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      location.href = ('views/newsfeed.html');
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('El correo ya ha sido registrado');
      }
      // ...
    });
};

window.facebookUserLogin = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      location.href = ('views/newsfeed.html');
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('El correo ya ha sido registrado');
      }
      // ...
    });
};

window.twitterUserLogin = () => {
  let provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      location.href = ('views/newsfeed.html');
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('El correo ya ha sido registrado');
      }
      // ...
    });
};

window.githubUserLogin = () => {
  let provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      location.href = ('views/newsfeed.html');
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      if (credential === 'auth/account-exists-with-different-credential') {
        alert('El correo ya ha sido registrado');
      }
      // ...
    });
};


window.verifyLoginUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      let password = user.password;
      // ...
    } else {
      // User is signed out.
      console.log('nooo');
    }
  });
};

window.addingDataToNewsfeed = (input) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let photoURL = user.photoURL;
      let uid = user.uid;
      let postTime = `${new Date()}`;
      db.collection('posts').add({
        username: displayName,
        postInput: input,
        userEmail: email,
        profilePhoto: photoURL,
        userID: uid,
        time: postTime,
        likes: []
      })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          printUserPost();
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
      // ...
    } else {
      // User is signed out.
      console.log('nooo');
    }
  });
};


window.signOutUser = () => {
  firebase.auth().signOut()
    .then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
};

window.deletePost = (postToDelete, userPost) => {
  let user = firebase.auth().currentUser;
  if (user.email === userPost) {
    let confirmationToDelete = confirm('¿Estás segurx que quieres eliminar esta publicación?');
    if (confirmationToDelete === true) {
      db.collection('posts').doc(postToDelete).delete()
        .then(() => {
          alert('¡Tu publicación fue eliminada exitosamente!');
          printUserPost();
        })
        .catch((error) => {
          console.log(error);
          alert('Hubo un problema al eliminar tu publicación, por favor intenta nuevamente.');
        });
    } else {
      alert('¡Bien pensado, sigue compartiendo tus garnachas favoritas!');
    }
  } else {
    alert('No puedes eliminar publicaciones de otros garnacheros.');
  }
};

window.likePost = (postId, userAddingLike) => {
  db.collection('posts').doc(postId).get()
    .then((post) => {
      let newLike = post.data().likes;
      if (post.data().likes.length === 0) {
        newLike.push(`${userAddingLike}`);
        db.collection('posts').doc(postId).update({
          likes: newLike
        });
      } else {
        for (let i = 0; i < post.data().likes.length; i++) {
          if (post.data().likes[i] === userAddingLike) {
            newLike.splice(i, 1);
            db.collection('posts').doc(postId).update({
              likes: newLike
            });
          } else {
            newLike.push(`${userAddingLike}`);
            console.log(newLike);
            db.collection('posts').doc(postId).update({
              likes: newLike
            });
          }
        }
      }
      printUserPost();
    })
    .catch((error) => {
      console.log(error);
    });
};