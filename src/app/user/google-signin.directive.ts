import { Directive, HostListener } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, sendPasswordResetEmail, signOut } from '@angular/fire/auth';

import firebase from 'firebase/compat/app';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor(public auth: AngularFireAuth, public auth2: Auth) {}

  @HostListener('click')
  onClick() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
