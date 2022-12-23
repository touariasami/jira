import { Directive, HostListener } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import firebase from 'firebase/compat/app';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor(public auth: AngularFireAuth) {}

  @HostListener('click')
  onClick() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
