import { Register } from './Register.js';

export const Login = () => {
  document.getElementById('root').innerHTML = `
  <div id="divLogo">
  <img src="images/logo-fit-women.png" class="logo"/>
  </div>
  <div id="divIngresar">
  <div class="ingresarE-mail">
  <i class="fa-solid fa-envelope e-mailIcon"></i>
  <input type="email" class="e-mail" id="correo" placeholder="Correo electrónico"></input><br><br>
  </div>
  <div class="writePassword">
  <i class="fa-solid fa-lock passwordIcon"></i>
  <input type=password class="password" id="contraseña" placeholder="Contraseña"></input><br><br>
  </div>
  <button id="iniciar">Iniciar sesión</button> <br><br><br><br><br>
  <button id="google"><img src="images/google-img.png" class="imageGoogle"/><p>Continuar con Google</p></button> <br><br>
  <p id="o">ó</p><br>
  <p id="registro">Registrate en FitWoman</p><br><br>
  </div>`;

  // Función para carga de registro
  const scrRegister = document.querySelector('#registro');
  scrRegister.addEventListener('click', () => Register());
};










// eslint-disable-next-line import/no-cycle
// import { onNavigate } from '../main.js';

// export const Login = () => {
//   const HomeDiv = document.createElement('div');
//   HomeDiv.textContent = 'Bienvenida al Login';
//   const buttonHome = document.createElement('button');

//   buttonHome.textContent = 'Regresar al Home';

//   buttonHome.addEventListener('click', () => onNavigate('/'));

//   HomeDiv.appendChild(buttonHome);

//   return HomeDiv;
// };
