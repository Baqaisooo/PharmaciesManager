

function login() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          console.log(uid);
          // ...
        } else {
            console.log("asfa agfdsdfsd sd sdfsdf sdfdf");
          // User is signed out
          // ...
        }
      });
}