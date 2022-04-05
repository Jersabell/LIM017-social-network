/* eslint-disable no-restricted-syntax */
import {
  loginOutUser, toPost, loadPosts,
} from '../lib/libraries-Firebase.js';
import {
  getCurrent,
} from '../lib/controllers.js';

export const Home = () => {
  const user = getCurrent();
  console.log('del home', getCurrent().email);
  const userName = user.displayName.charAt(0).toUpperCase();
  loadPosts();

  document.getElementById('root').innerHTML = `
  <header class="header">
    <div class="header__logo-div">
      <img class="header__logo" src="../images/icono-header.png">
    </div>
    <div class="header__nav-div">
      <nav class="header__nav">
        <ul class="header__nav-ul>
          <li class="header__nav-ul-li" id="house"><i class="fa-solid fa-house-chimney icon__header"></i></li>
          <li class="header__nav-ul-li" id="friends"><i class="fa-solid fa-users icon__header"></i></li>
          <li class="header__nav-ul-li" id="loginOut"><i class="fa-solid fa-power-off out icon__header"></i></li> 
        </ul>
      </nav>
    </div>
    <div class="header__user-div">
      <button id="userName" title="${user.displayName}">${userName}</button>
    </div>
  </header>
  <aside class="aside_d"></aside>
  <main class="main">
    <div class="main__div" id="post">
      <input class="post__input" type="text" placeholder="Cuéntanos lo que estás pensando . . ."></input>
      <div class="post__div-upPhoto">
        <label class="elements__div-upPhoto" for="upPhoto"><i class="fa-solid fa-images"></i></label>
        <input class="elements__div-upPhoto" type="file" hidden="" id="upPhoto"></input>
        <p>Foto</p>
      </div>
      <button class="post__button">Publicar</button>
    </div>    
    <div class="main__div-postPeople">
    </div>
  </main>`;

  const loginOut = document.getElementById('loginOut');
  loginOut.addEventListener('click', () => loginOutUser());

  // const upPhoto = document.getElementById('upPhoto');

  const userPost = document.querySelector('.post__button');
  userPost.addEventListener('click', () => {
    if (document.querySelector('.post__input').value !== '') {
      toPost();
    }
  });
};

// <label for="upPhoto"><i class="fa-solid fa-images"></i></label>
// <input type="file" hidden="" id="upPhoto"></input>
