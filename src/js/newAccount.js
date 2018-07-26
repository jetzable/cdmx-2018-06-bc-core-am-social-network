initializeFirebase();
document.getElementById('new-account-button').addEventListener('click', event => {
  event.preventDefault();
  let newEmail = document.getElementById('email-field').value;
  let newPassword = document.getElementById('password-field').value;
  let newUserName = document.getElementById('name-field').value;
  let newUserLocation = document.getElementById('city-field').value;
  newAccount(newEmail, newPassword);
});