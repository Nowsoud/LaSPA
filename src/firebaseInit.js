import firebase from 'firebase/app'
// 
//                                            ///
//                                           (o o)
//---- Go away! This is private data! ---o00--( )--00o----
//
const config = {
  apiKey: "AIzaSyBqtNhXaM4k1nS2rf7607uvTtWtxytFhIA",
  authDomain: "sneep-it.firebaseapp.com",
  databaseURL: "https://sneep-it.firebaseio.com",
  projectId: "sneep-it",
  storageBucket: "sneep-it.appspot.com",
  messagingSenderId: "346393958287"
}
const firebaseApp = firebase.initializeApp(config)
export default firebaseApp.firestore()
