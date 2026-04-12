import api from './APIClient.js';

function displayUserInHeader(user) {
  let profileLink = document.createElement('a');
  profileLink.href = `/profile`;
  profileLink.innerHTML = user.username;
  profileLink.className = "btn btn-sm btn-outline-secondary"

  let logoutLink = document.createElement('a');
  logoutLink.href = '/';
  logoutLink.innerHTML = "Log Out";
  logoutLink.className = "btn btn-sm btn-outline-secondary"
  logoutLink.addEventListener("click", e => {
    e.preventDefault();
    logOut();
  })

  const header = document.getElementById('header');
  document.getElementById('sign-in-button').remove();
  header.appendChild(profileLink);
  header.appendChild(logoutLink);
}

function logOut() {
  api.logOut().then(() => {
    document.location = "./";
  });
}

api.getCurrentUser().then(user => { 
  if (user) {
      displayUserInHeader(user);
  }
})
.catch(error => {
  if(error.status === 401) {
    console.log("We are not logged in");
  }
  else {
    console.log(`${error.status}`, error);
  }
});
