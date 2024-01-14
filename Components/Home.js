/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import { loginOutUser, toFBUpPhoto } from '../lib/libraries-Firebase.js';
import { getCurrentUser } from '../lib/Firebase-Import.js';
import {
  toPostDocument, printPost,
} from '../lib/controllers.js';

// modal
export function toShowModal() {
  // Get the modal
  const modal = document.getElementById('myModal');
  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName('close')[0];
  modal.style.display = 'block';
  span.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      console.log(e.target);
    }
  });
}

export const Home = () => {
  const user = getCurrentUser();
  console.log(user);
  const userName = user.displayName.charAt(0).toUpperCase();
  printPost();
  const abcName = () => {
    const userABC = user.displayName;
    const result = userABC.replace(/\b\w/g, (l) => l.toUpperCase());
    return result;
  };
  const htmlRoot = document.getElementById('root');
  let html = '';
  html += `
  <header class="header">
    <div class="header__logo-div">
      <img class="header__logo" src="images/icono-header.png">
    </div>
    <div class="header__nav-div">
      <nav class="header__nav">
        <ul class="header__nav-ul>
          <li class="header__nav-ul-li" id="loginOut"><i class="fa-solid fa-power-off out icon__header"></i></li> 
        </ul>
      </nav>
    </div>
    <div class="header__user-div">
      <button id="userName" title="${user.displayName}">${userName}</button>
    </div>
  </header>
  <div class="mainandaside">
    <aside class="aside_d">`;

  if (user.photoURL !== null) {
    html += `<img src='${user.photoURL}'>`;
  } else {
    html += `<button id="userName" title="${user.displayName}">${userName}</button>`;
  }

  html += `
      <p>${abcName()}</p>
    </aside>
    <main class="main">
      <div class="main__div" id="post">
        <input cols="5" rows="5" class="post__input__Initial" id="inputPost__editM" type="button" value="Haz una publicación . . ."></input>
      </div> 
      
      <!-- The Modal -->
      <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
          <div class="div__span">
            <span class="close">&times;</span>
          </div>
          <h1 id="EditChange">Crear publicación</h1>
          <br><hr>
          <div class="div__infoUser">
            <h3>${abcName()}</h3>
          </div>
          <div class="main__div__Modal" id="post">
            <textarea cols="5" rows="5" class="post__input" id="inputPost__edit" type="text" placeholder="Cuéntanos lo que estás pensando . . ."></textarea>
            <div class="post__div-upPhoto">
              <label class="elements__div-upPhoto" for="upPhoto"><i class="fa-solid fa-images"></i></label>
              <input class="elements__div-upPhoto" type="file" hidden="" id="upPhoto"></input>
              <p>Foto</p>
              <div id="aquiurl" ></div>
            </div>
            <button class="post__button">Publicar</button>
          </div> 
        </div>

      </div>   
      <div class="main__div-postPeople">
      </div>
    </main>
  </div>`;

  htmlRoot.innerHTML = html;
  // Boton para cerrar sesión
  const loginOutButton = document.getElementById('loginOut');
  loginOutButton.addEventListener('click', () => loginOutUser());
  // // Botón para publicar post
  const userPost = document.querySelector('.post__button');
  userPost.addEventListener('click', () => {
    if (document.querySelector('.post__input').value !== '') {
      toPostDocument();
      document.querySelector('.post__input').value = '';
      const modal = document.getElementById('myModal');
      modal.style.display = 'none';
    }
  });
  // modal
  // click al input boton
  const getInput = document.getElementById('inputPost__editM');
  getInput.addEventListener('click', () => {
    toShowModal();
  });

  // probando subir foto
  function fnUpPhoto() {
    const upPhoto = document.getElementById('upPhoto');
    upPhoto.addEventListener('change', () => {
      console.log('subiendo imagen a firebase');
      const imagenUp = upPhoto.files[0];
      toFBUpPhoto(imagenUp);
    });
  }
  fnUpPhoto();
};
