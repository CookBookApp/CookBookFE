import firebase from 'firebase'
import 'firebase/storage'

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyA4ilxgi4hhlir3y8ySVRvmPiMLjJ0Tk10",
    authDomain: "cookbookapp-3d0bb.firebaseapp.com",
    databaseURL: "https://cookbookapp-3d0bb.firebaseio.com",
    projectId: "cookbookapp-3d0bb",
    storageBucket: "cookbookapp-3d0bb.appspot.com",
    messagingSenderId: "496813912723",
    appId: "1:496813912723:web:794af24ffcf7de2a361366",
    measurementId: "G-L24WJRYGTY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const storage = firebase.storage()

  export {
      storage, firebase as default
  }