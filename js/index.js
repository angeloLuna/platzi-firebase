var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");

firebase.auth().onAuthStateChanged(function(user){
  console.log(user)
  if (user) {
    console.log("tenemos usuario");
    mostrarLogout()
  }else{
    console.log("no tenemos usuario");
    mostrarLogin()
  }
});


btnLogin.addEventListener("click", function(){
  //event.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  //defino en que leguaje le va a salir el Popup de autenticacion
  firebase.auth().languageCode = 'es';
  firebase.auth().signInWithPopup(provider).then(function(datosUsuario){
    console.log(datosUsuario);
  }).catch(function(err){
    console.log(err);
  })
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