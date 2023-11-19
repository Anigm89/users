const listaUsuarios = document.getElementById('listaUsuarios');

  // Obtener datos de la API de usuarios (simulado)
  fetch('https://jsonplaceholder.typicode.com/users')
      .then((respuesta) => {
          if (!respuesta.ok) {
              throw new Error('La solicitud no fue exitosa');
          }
          return respuesta.json();
      })
      .then((usuarios) => {
          // Crear un nuevo array con spread y añadir edades aleatorias
          console.log('USERS',usuarios)
          
          const usuariosConEdades = usuarios.map((usuario) => {
            const {id, company, address} = usuario;
            const {name} = company;
            const {street, suite, city} = address;
              return {
                  ...usuario,
                  age: generarEdadAleatoria(18, 50),
                  img: id,
                  company: name,
                  address: `${street}, ${suite}, ${city}`
              };
          });

          // Mostrar detalles de cada usuario
          usuariosConEdades.forEach((usuario) =>{
              mostrarDetallesUsuario(usuario);
              console.log(usuario)
          });
      })
      .catch((error) => {
          console.error('Error al obtener datos de usuarios:', error.message);
      });

  // Función para generar una edad aleatoria entre min y max
  function generarEdadAleatoria(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Mostrar detalles de un usuario en la lista
  function mostrarDetallesUsuario({ name, age, username,img, phone, email, company, address }) {

      const infoUsuario = `
      <li class="usuario">
      <div class="usuario-data">
        <div class="usuario">
            <strong>Nombre:</strong> ${name}<br>
            <strong>Edad:</strong> ${age}<br>
            <strong>Username:</strong> ${username}<br>
            <strong>Teléfono:</strong> ${phone}<br>
            <strong>Email:</strong> ${email}
            </div>
            <img src="./assets/img/${img}.jpeg" alt=""/>
            </div>
        <div>
          <strong>Compañía:</strong> ${company}<br>
          <strong>Dirección:</strong> ${address}
        </div>
      </li>
      `;

      listaUsuarios.innerHTML += infoUsuario;
  }