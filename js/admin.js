var ref = firebase.database().ref("usuario");
var refGuitarras = firebase.database().ref("guitarras");

var nombre = document.getElementById("nombre");
var precio = document.getElementById("precio");
var descripcion = document.getElementById("descripcion");
var tipo = document.getElementById("tipo");
var imagen = document.getElementById("imagen");



firebase.auth().onAuthStateChanged(function(user){
  if (user) {
    console.log(user)
  }else{
    window.location.href = "index.html"
  }
})

function nuevaGuitarra(){
  event.preventDefault()
  var obj = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    tipo: tipo.value,
    precio: precio.value,
    imgaen: imagen.value
  }
  console.log(obj)

  if (obj.tipo == "normal") {
    subirGuitarra(obj, "normal")
  }else if (obj.tipo == "vip") {
    subirGuitarra(obj, "vip")
  }else{
    console.log("el tipo debe ser normal o vip")
  }
  
}


function subirGuitarra(guitarra, tipo){
  refGuitarras.push(guitarra)
}