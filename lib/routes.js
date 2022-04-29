/* eslint-disable import/no-cycle */
import { Register } from '../Components/Register.js';
import { Login } from '../Components/Login.js';
import { Home } from '../Components/Home.js';

export const routes = (hash) => {
  const containerRoot = document.getElementById('root');
  switch (hash) {
    case '#/login':
      window.location.hash = '#/login';
      Login();
      break;

    case '#/register':
      window.location.hash = '#/register';
      Register();
      break;

    case '#/home':
      window.location.hash = '#/home';
      Home();
      break;

    // Si el url es incorrecto, nos redigire a la página de "Esta página no esta disponible".
    default:
      containerRoot.innerHTML = 'Esta página no esta disponible';
  }
};
