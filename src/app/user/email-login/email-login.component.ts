import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['', []],
  });

  type: 'login' | 'signup' | 'reset' = 'signup';

  loading = false;

  serverMsg = '';

  constructor(private fb: FormBuilder, private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  changeType(val: 'login' | 'signup' | 'reset') {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get passwordConfirmation() {
    return this.loginForm.get('passwordConfirmation');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      if (this.password?.value === this.passwordConfirmation?.value) {
        return true;
      } else {
        return false;
      }
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await this.auth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.auth.createUserWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        await this.auth.sendPasswordResetEmail(email);
        this.serverMsg = 'Check your email';
      }
    } catch (err: any) {
      this.serverMsg = err;
    }

    this.loading = false;
  }
}
