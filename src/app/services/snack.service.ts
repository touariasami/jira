import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private matSnacBark: MatSnackBar, private router: Router) {}

  authError() {
    this.matSnacBark.open('You must be logged in!', 'Ok', {
      duration: 5000,
    });

    return this.matSnacBark._openedSnackBarRef
      ?.onAction()
      .pipe(tap(() => this.router.navigate(['/login'])))
      .subscribe();
  }
}
