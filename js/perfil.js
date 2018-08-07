var ref = firebase.database().ref('usuario');

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");

var datosPerfil = document.getElementById("datosPerfil");
var formularioPerfil = document.getElementById("formularioPerfil");
var perfilNombre = document.getElementById("perfilNombre");
var perfilEmail = document.getElementById("perfilEmail");

var cancelForm = document.getElementById("cancelForm");
var nombreForm = document.getElementById("nombreForm");
var telefonoForm = document.getElementById("telefonoForm");
var calleForm = document.getElementById("calleForm");
var interiorForm = document.getElementById("interiorForm");
var coloniaForm = document.getElementById("coloniaForm");
var cpForm = document.getElementById("cpForm");

var btnEditar = document.getElementById("perfilEditar");

var usuario = {}

function leerInformacion(uid){
  ref.child(uid).on("value", function(data){
    console.log(data.val())
    llenarInformacion(data.val().nombre, data.val().email)
  })
}

function llenarInformacion(nombre, email){
  perfilNombre.innerHTML = nombre;
  perfilEmail.innerHTML = email
}


firebase.auth().onAuthStateChanged(function(user){
  console.log(user)
  if (user) {
    console.log("tenemos usuario");
    leerInformacion(user.uid);
    mostrarLogout()
  }else{
    window.location.href = "index.html"
    console.log("no tenemos usuario");
    mostrarLogin()
  }
});


btnLogout.addEventListener("click", function(){
  firebase.auth().signOut();
})

function mostrarLogout(){
  console.log("mostrar Logout");
  btnLogout.style.display = "block";
  btnLogin.style.display = "none";
}

function mostrarLogin(){
  console.log("mostrar login");
  btnLogout.style.display = "none";
  btnLogin.style.display = "block";
}

perfilEditar.addEventListener("click", function(){
  datosPerfil.style.display = "none";
  formularioPerfil.style.display = "block";
});

cancelForm.addEventListener("click", function(){
  datosPerfil.style.display = "block";
  formularioPerfil.style.display = "none";
})

function editarDatos(){
  event.preventDefault()
  var uid =firebase.auth().currentUser.uid
  console.log("editar datos")
  var obj = {
    nombre: nombreForm.value,
    email: emailForm.value,
    telefono: telefonoForm.value,
    direccion:{
      calle: calleForm.value,
      interior: interiorForm.value,
      colonia: coloniaForm.value,
      cp: cpForm.value
    }
  }
  ref.child(uid).update(obj)
}


















