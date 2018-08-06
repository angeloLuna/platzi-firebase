var ref = firebase.database().ref('usuario');

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");

var perfilNombre = document.getElementById("perfilNombre");
var perfilEmail = document.getElementById("perfilEmail");

var usuario = {}

function leerInformacion(){
  // debemos cambiar el uid por uno válido 
  ref.child("0Z6jPxp55raG0y9ruAVYQbm7NHp2").on("value", function(data){
    console.log(data.val())
    llenarInformacion(data.val().nombre, data.val().email)
  })
}

function llenarInformacion(nombre, email){
  perfilNombre.innerHTML = nombre;
  perfilEmail.innerHTML = email
}
leerInformacion()


firebase.auth().onAuthStateChanged(function(user){
  console.log(user)
  if (user) {
    console.log("tenemos usuario");
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

