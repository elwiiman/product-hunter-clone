import app from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
  }
  //register a new user
  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
      displayName: name,
    });
  }

  //login a user
  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  //sign out
  async signout() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();

export default firebase;
