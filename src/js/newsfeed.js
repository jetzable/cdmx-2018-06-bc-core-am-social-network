initializeFirebase();
let db = firebase.firestore();
let dbSettings = { timestampsInSnapshots: true };
db.settings(dbSettings);
// updateInRealTime();

const printUserPost = () => {
  const postListRef = db.collection('posts').orderBy('time', 'desc');
  postListRef.get()
    .then(element => {
      let nextPost = '';
      let i = 0;
      element.forEach(post => {
        nextPost += `<div class="card-tittle individual-post" id='${post.id}'>
          <div class="card-text-sm">
          <div mb-4 mt-3>${post.data().postInput}</div>
          </div>
          <div class="card-body-sm">
          <i>${post.data().username}</i>
          <span class="card-text font-color">
          <i onclick="likePost('${post.id}' , '${post.userEmail}', '${post.data().userEmail}')" class="fas fa-grin-tongue ml-4" title="Me apetece"></i><span>${post.data().likes.length}</span>
          <i class="fas fa-share ml-4" title="Compartir"></i>
          <i onclick="deletePost('${post.id}' , '${post.data().userEmail}')" class="fas fa-trash-alt ml-4" title="Eliminar"></i>
          <i onclick="editPost('${post.id}' , '${post.data().userEmail}')" class="fas fa-edit ml-4" title="Editar"></i>
      </span>
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

document.getElementById('log-out-btn').addEventListener('click', event => {
  event.preventDefault();
  signOutUser();
  alert('¡Hasta la próxima Garnacha!');
  location.href = ('../index.html');
});

const createUpdateArea = (postID) => {
  db.collection('posts').doc(postID).get()
    .then(post => {
      document.getElementById(postID).innerHTML = `<textarea class="form-control form-textarea" id="post${postID}" rows="4">${post.data().postInput}</textarea><div class="ml-auto text-right"><button class="btn btn-warning" onclick="savePostEdition('${postID}')"><i class="fas fa-save"></i></button><div>`;
    })
    .catch(error => console.log(error));
};