// eslint-disable-next-line import/no-cycle
import { register } from '../lib/controllers.js';

export const Register = () => {
  document.getElementById('root').innerHTML = `
  <div class="div__imageLogin"><img src="images/fondoInicio5.png" class="imageLogin"/></div>
    <div id="divIngresar">
      <div id="divLogo">
        <img src="images/logo-fit-women.png" class="logo"/>
      </div>
      <div class="div__Username">
        <i class="fa-solid fa-circle-info e-mailIcon"></i>
        <input type="text" class="Register__input"  id="name" placeholder="Nombres y apellidos"></input>
      </div>
      <div class="div__Username">
        <i class="fa-solid fa-envelope e-mailIcon"></i>
        <input type="email" class="Register__input" id="e-mail" placeholder="Correo electrónico"></input>
      </div>
      <div class="alertError"><p id="alertErrorEmail-Register"></p></div>
      <div class="div__Username-afterError">
        <i class="fa-solid fa-lock passwordIcon"></i>
        <input type="password" class="Register__input" id="password" placeholder="Contraseña"></input>
      </div>
      <div class="div__Username">
        <i class="fa-solid fa-lock passwordIcon"></i>
        <input type="password" class="Register__input" id="confirmPassword" placeholder="Confirmar contraseña"></input>
      </div>
      <div class="alertError"><p id="alertErrorPassword-Register"></p></div>
    <button class="Register__button" id="register">Registrarse</button><br>
    <i class="fa-solid fa-circle-chevron-left" id="Register__iconBack"></i>
  </div>
  `;
  // Botón de volver a login
  document.getElementById('Register__iconBack').addEventListener('click', () => {
    window.location.hash = '#/login';
  });
  // Boton de registrar usuario
  document.getElementById('register').addEventListener('click', register);
};
