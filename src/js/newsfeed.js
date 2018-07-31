initializeFirebase();
let db = firebase.firestore();
let dbSettings = { timestampsInSnapshots: true };
db.settings(dbSettings);


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.providerData.forEach((profile) => {
      console.log('Sign-in provider: ' + profile.providerId);
      console.log('  Provider-specific UID: ' + profile.uid);
      console.log('  Name: ' + profile.displayName);
      console.log('  Email: ' + profile.email);
      console.log('  Photo URL: ' + profile.photoURL);
      if (profile.displayName === null) {
        db.collection('users').get()
          .then(element => {
            element.forEach(user => {
              if (user.data().userEmail === profile.email) {
                displayName = user.data().userName;
              }
            });
            $(() => {
              $('[data-toggle="popover"]').popover({
                trigger: 'click',
                placement: 'top',
                html: true,
                _content: `<div class="card text-center my-2"><div class="card-header">
                        <h5 class="card-title">${displayName}</h5></div>
                        <a><img class="card-img-top user-image my-3" src="../images/userImage.png"></a><div class="card-body">
                        <h7 class="card-title"><p class="card-text">${profile.email}</p></h7>
                        <h7 class="card-title"><p class="card-text"></p></h7>
                        </div></div></div>`,
                get content() {
                  return this._content;
                },
                set content(value) {
                  this._content = value;
                },
              });
            });
            const profileButton = document.getElementById('popover-button');
            const printProfileButton = `<button class="nav-link no-btn" data-container="body" data-toggle="popover" data-placement="top">
                        <span class="sr-only">(current)</span>
                        <i class="fas fa-user px-3" title="Perfil"></i>
                        </button>`;
            profileButton.innerHTML = printProfileButton;
          });
      } else {
        console.log('Sign-in provider: ' + profile.providerId);
        console.log('  Provider-specific UID: ' + profile.uid);
        console.log('  Name: ' + profile.displayName);
        console.log('  Email: ' + profile.email);
        console.log('  Photo URL: ' + profile.photoURL);
        $(() => {
          $('[data-toggle="popover"]').popover({
            trigger: 'click',
            placement: 'top',
            html: true,
            _content: `<div class="card text-center my-2"><div class="card-header">
                        <h5 class="card-title">${profile.displayName}</h5></div>
                        <a><img class="card-img-top user-image my-3" src="${profile.photoURL}"></a><div class="card-body">
                        <h7 class="card-title"><p class="card-text">${profile.email}</p></h7>
                        <h7 class="card-title"><p class="card-text"></p></h7>
                        </div></div></div>`,
            get content() {
              return this._content;
            },
            set content(value) {
              this._content = value;
            },
          });
        });
        const profileButton = document.getElementById('popover-button');
        const printProfileButton = `<button class="nav-link no-btn" data-container="body" data-toggle="popover" data-placement="top">
                        <span class="sr-only">(current)</span>
                        <i class="fas fa-user px-3" title="Perfil"></i>
                        </button>`;
        profileButton.innerHTML = printProfileButton;
      };
    });
  } else {
    location.href = ('../index.html');
  }
});

const printUserPost = () => {
  const postListRef = db.collection('posts').orderBy('time', 'desc');
  postListRef.get()
    .then(element => {
      let nextPost = '';
      let i = 0;
      element.forEach(post => {
        nextPost += `<div class="col-md-6 mb-4">
          <div class="card-header bg-dark">
          <div class="card-tittle individual-post mx-4 mt-2 bg-dark" id='${post.id}'>
          <div class="card-text bg-light px-4">
          <div>${post.data().postInput}
          </div>
          </div>
          </div>
          </div>
          <div class="card-body bg-dark">
          <p>${post.data().username}
          <span class="pt-1">
          <i onclick="likePost('${post.id}')" class="fas fa-grin-tongue mx-2 mt-2" title="Me apetece"></i><span>${post.data().likes.length}</span>
          <i class="fas fa-share ml-2" title="Compartir"></i>
          <i onclick="deletePost('${post.id}' , '${post.data().userEmail}')" class="fas fa-trash-alt ml-2" title="Eliminar"></i>
          <i onclick="editPost('${post.id}' , '${post.data().userEmail}')" class="fas fa-edit ml-2" title="Editar"></i>
          </span>
          </p>  
          </div>
        </div>`;
        i++;
      });
      document.getElementById('list-post').innerHTML = nextPost;
    });
};
printUserPost();

document.getElementById('user-post-btn').addEventListener('click', event => {
  event.preventDefault();
  let newPost = document.getElementById('user-post').value;
  addingDataToNewsfeed(newPost);
  document.getElementById('user-post').value = '';
});

const createUpdateArea = (postID) => {
  db.collection('posts').doc(postID).get()
    .then(post => {
      document.getElementById(postID).innerHTML = `<textarea class="form-control form-textarea" id="post${postID}" rows="4">${post.data().postInput}</textarea><div class="ml-auto text-right"><button class="btn btn-warning" onclick="savePostEdition('${postID}')"><i class="fas fa-save"></i></button><div>`;
    })
    .catch(error => console.log(error));
};

document.getElementById('log-out-btn').addEventListener('click', event => {
  event.preventDefault();
  signOutUser();
  alert('¡Hasta la próxima Garnacha!');
  location.href = ('../index.html');
});