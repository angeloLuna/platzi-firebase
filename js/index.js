var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");
var ref = firebase.database().ref('usuario');
var refGuitarras = firebase.database().ref("guitarras")
var refImg = imgref = firebase.storage().ref()
var usuario = {}



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
  event.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  
  firebase.auth().signInWithPopup(provider).then(function(datosUsuario){
    console.log(datosUsuario);
    usuario = {
      nombre: datosUsuario.user.displayName,
      email: datosUsuario.user.email,
      uid: datosUsuario.user.uid
    }
    agregarUsuario(usuario, usuario.uid)
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

function agregarUsuario(usuario, uid){
  ref.child(uid).update(usuario)
}


function leerGuitarras(){
  refGuitarras.child("normales").on("child_added", function(datos){
    var guitar = datos.val()
    var nombreGui = datos.val().nombre;
    var contenedorElementos = document.getElementById("guitarrasContent");
    console.log(datos.key,guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key,guitar.nombre, guitar.precio, guitar.descripcion, guitar.img), contenedorElementos.firstChild
      );
  })
}

function leerGuitarrasVip(){
  refGuitarras.child("vip").on("child_added", function(datos){
    var guitar = datos.val()
    var nombreGui = datos.val().nombre;
    var contenedorElementos = document.getElementById("guitarrasContentVip");
    console.log(datos.key,guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key,guitar.nombre, guitar.precio, guitar.descripcion, guitar.img), contenedorElementos.firstChild
      );
  })
}

leerGuitarras();
leerGuitarrasVip()

function crearElementoGuitarra(key, nombre, precio, descripcion, img){

  var uid = firebase.auth().currentUser.uid;

  var html =
    '<article class="guitarra contenedor">' +
      '<img class="derechaa" src="" alt="Guitarra Invie Acustica" width="150"/>'+
      '<div class="contenedor-guitarra-a">'+
        '<h3 class="title-b"></h3>'+
        '<ol>'+
          '<li class="precio-b"></li>'+
          '<li class="descripcion-b"></li>'+
        '</ol>'+
      '</div>'+
      '<button type="button" onclick="comprar('+'`'+key+'`'+')">Comprar</button>'
   '</article>'

  // Create the DOM element from the HTML.
  var div = document.createElement('div');
  div.innerHTML = html;
  var guitarElement = div.firstChild;
  var imgUrl = ""
  refImg.child(img).getDownloadURL().then(function(url){
    imgUrl = url
  }).then(function(){
  // Set values.
  guitarElement.getElementsByClassName('title-b')[0].innerText = nombre;
  guitarElement.getElementsByClassName('precio-b')[0].innerText = "$ "+ precio;
  guitarElement.getElementsByClassName('descripcion-b')[0].innerText =  descripcion;
  guitarElement.getElementsByClassName('derechaa')[0].src = imgUrl
  })
  return guitarElement;
}