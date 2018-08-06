var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");
var refTest = firebase.database().ref('test');
var ref = firebase.database().ref('usuario');
var usuario = {}

var btnPush = document.getElementById("btnPush");
var btnUpdate = document.getElementById("btnUpdate");
var btnSet = document.getElementById("btnSet");
var btnRemove = document.getElementById("btnRemove");


btnRemove.addEventListener("click", function(){
  console.log("remove");
  // Poner un uid valido para este método
  refTest.child("jjsTf12jayis3yaod0kas").remove()
})

btnSet.addEventListener("click", function(){
  var obj = {
    lugarPlatziconf: "ciudad de México"
  }
  refTest.set(obj).then(function(){
    alert("set")
  }).catch(function(err){
    console.log(err)
    alert("falló el set")
  })
})

btnPush.addEventListener("click", function(){
  var obj = {
    curso: "firebase",
    profesor: "angel",
    contenidos: {
      primero: "autenticación"
    }
  }
  refTest.push(obj).then(function(){
    alert("se subió correctamente la información")
  }).catch(function(err){
    console.log(err);
    console.log("hubo un error");
  })
})

btnUpdate.addEventListener("click", function(){
  var obj = {
    curso: "desarrollo web",
    profesor: "Leonidas",
    contenidos: {
      primero: "formularios"
    }
  }
  // Debemos cambiar el child por un nodo existente en la base de datos
  refTest.child("LDI0yfcpqsju284DIE").update(obj)
})




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
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  
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