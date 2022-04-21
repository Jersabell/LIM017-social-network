import {
  // eslint-disable-next-line import/named
  registerUser,
  loginUser,
  updater, sendMail, toPost, loadPosts, deletePost, editPost, observator,
  updatePost, arrayR, arrayU, loginOutUser,
} from './libraries-Firebase.js';
import { getCurrentUser } from './Firebase-Import.js';

// eslint-disable-next-line import/no-cycle
import { routes } from './routes.js';

// Registra nuevos usuarios
export const register = () => {
  const email = document.getElementById('e-mail').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const fullName = document.getElementById('name').value;
  if (password === confirmPassword) {
    registerUser(email, password, fullName)
      .then((userCredential) => {
        updater(fullName);
        sendMail();
        routes('#/login');
        return userCredential.user;
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          document.getElementById('alertErrorPassword-Register').innerHTML = '';
          document.getElementById('alertErrorPassword-Register').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> La contraseña debe tener mínimo 6 caracteres';
        }
        if (error.code === 'auth/email-already-in-use') {
          document.getElementById('alertErrorPassword-Register').innerHTML = '';
          document.getElementById('alertErrorEmail-Register').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Cuenta de usuario en uso';
        }
      });
  } else {
    document.getElementById('alertErrorPassword-Register').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> La contraseña no coincide';
  }
};

// Iniciar sesión: usuarios registrados
export const login = () => {
  const email = document.getElementById('e-mailLogin').value;
  const password = document.getElementById('passwordLogin').value;
  loginUser(email, password)
    .then((userCredential) => userCredential)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (error.code === 'auth/user-not-found') {
        document.getElementById('alertErrorPassword-Login').innerHTML = '';
        document.getElementById('alertErrorEmail-Login').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> El usuario no ha sido encontrado';
      } else if (error.code === 'auth/wrong-password') {
        document.getElementById('alertErrorEmail-Login').innerHTML = '';
        document.getElementById('alertErrorPassword-Login').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Contraseña incorrecta';
      } else if (error.code === 'auth/too-many-requests') {
        loginOutUser();
        document.getElementById('alertErrorEmail-Login').innerHTML = '';
        document.getElementById('alertErrorPassword-Login').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Cuenta bloqueada por muchos intentos, registrate con otra cuenta.';
      }
      console.log(errorCode);
      console.log(errorMessage);
    });
};

// publica el post
// statusOfEdition: ve el estado de la edición(actualización) y/o creción del documento de firestore
let statusOfEdition = false;
let id = '';

const qSnapshot = (querySnapshot) => {
  const containerPost = document.querySelector('.main__div-postPeople');
  let html = '';
  querySnapshot.forEach((doc) => {
    // console.log(doc.data());
    const dataDoc = doc.data();
    // dataDoc.photo
    html += `
      <article class="main__section-postPeople" id="">
        <h3>${dataDoc.user.replace(/\b\w/g, (l) => l.toUpperCase())}.</h3>
        <p id="postHour">Publicado ${dataDoc.dateTime.toDate().toDateString()} a las ${dataDoc.dateTime.toDate().toLocaleTimeString('es-PE')} hrs.</p>
        <p id="content-p">${dataDoc.content}</p><input type="text" hidden="true" id="edit-post">
        <figure>
          <img class="post2Img" src="../images/foto-post.jpg">
        </figure>
        <div>
        <div class="likePost__div">
          <button class="likePost" data-id='${doc.id}'><i class="fa-solid fa-thumbs-up"></i></i> ${dataDoc.likesNumber} Like</button>
        </div>`;
    if (dataDoc.uid === getCurrentUser().uid) {
      html += `
        <div class="bottonPostUser__div">
          <button class="deletePost bottonPostUser" data-id='${doc.id}'>Eliminar</button>
          <button class="editPost bottonPostUser" data-id='${doc.id}'>Editar</button>
        </div>
        </div>
      </article>`;
    } else {
      html += `
        </article>`;
    }
  });
  containerPost.innerHTML = html;

  // Borra documento del post
  const buttonDelete = containerPost.querySelectorAll('.deletePost');
  buttonDelete.forEach((abc) => {
    abc.addEventListener('click', ({ target: { dataset } }) => {
      // podemos usar un modal aquí :3
      // eslint-disable-next-line no-alert
      if (window.confirm('¿Seguro deseas eliminar tu publicación?')) {
        deletePost(dataset.id);
      }
    });
  });

  // const buttonDelete = containerPost.querySelectorAll('.deletePost');
  // const divConfirm = containerPost.querySelectorAll('#divConfirm');
  // const buttonDeleteConfirm = containerPost.querySelectorAll('#confirmar');
  // buttonDelete.forEach((btn) => {
  //   btn.addEventListener('click', () => {
  //     divConfirm.forEach((conf) => {
  //       conf.removeAttribute('hidden');
  //       buttonDeleteConfirm.forEach((abc) => {
  //         abc.addEventListener('click', ({ target: { dataset } }) => {
  //           deletePost(dataset.id);
  //         });
  //       });
  //     });
  //   });
  // });
  // <div hidden="" id="divConfirm">
  //   <p>Seguro deseas eliminar el post</p>
  //   <button id="confirmar">Eliminar</button>
  //   <button id="cancelar">Cancelar</button>
  // </div>

  // editar post
  const buttonEdit = containerPost.querySelectorAll('.editPost');
  buttonEdit.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const doc = await editPost(e.target.dataset.id);
      // devuelve los datos del documento de firestore
      const infoDocToEdit = doc.data();
      const contentPost = document.querySelector('.post__input');
      // consigue el valor del input y lo devuelve como dice en el documento de firestore
      contentPost.value = infoDocToEdit.content;
      //
      const editInput = document.getElementById('edit-post');
      editInput.value = infoDocToEdit.content;
      editInput.hidden = false;
      document.getElementById('content-p').hidden = true;
      editInput.focus();
      editInput.scrollIntoView({ behavior: 'smooth', block: 'end' });
      // cambia el estado de la edición a true
      statusOfEdition = true;
      id = doc.id;
    });
  });

  // Dar like a la publicación
  const buttonLike = containerPost.querySelectorAll('.likePost');
  buttonLike.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const user = getCurrentUser().uid;
      const doc = await editPost(e.target.dataset.id);
      id = doc.id;
      const docData = doc.data();
      const likesN = docData.likesNumber;
      if (docData.likes.includes(user)) {
        await updatePost(id, {
          likes: arrayR(user),
          likesNumber: likesN - 1,
        });
      } else {
        await updatePost(id, {
          likes: arrayU(user),
          likesNumber: likesN + 1,
        });
      }
    });
  });
};

export const printPost = () => {
  loadPosts(qSnapshot);
};

// Crea un documento en la coleccion de firestore
export const toPostDocument = async () => {
  // const user = auth.currentUser;
  const contentPost = document.querySelector('.post__input').value;
  if (!statusOfEdition) {
    const docRef = await toPost(contentPost);
    // eslint-disable-next-line no-console
    console.log(docRef.id);
  // console.log(docRef.data().uid);
  } else {
    updatePost(id, { content: contentPost });
  }
};

// // observator
export const observatorIt = () => {
  observator((user) => {
    if (user) {
      console.log(user.uid, user.displayName, user.emailVerified);
      routes('#/home');
    } else {
      console.log('no');
      routes('#/login');
    }
    return user;
  });
};
