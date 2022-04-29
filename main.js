// Este es el punto de entrada de tu aplicacion
import { routes } from './lib/routes.js';
import { observatorIt } from './lib/controllers.js';
import { observator } from './lib/libraries-Firebase.js';

window.addEventListener('DOMContentLoaded', () => {
  observatorIt();
});

/*  El evento hashchange es ejecutado cuando el fragmento identificador de la URL ha cambiado. */
window.addEventListener('hashchange', () => {
  observator((user) => {
    if (user) {
      routes('#/home');
    } else if (!user && window.location.hash === '#/home') {
      routes('#/login');
    } else {
      routes(window.location.hash);
    }
  });
});
