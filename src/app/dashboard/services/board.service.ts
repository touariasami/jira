import { Injectable } from '@angular/core';
//to use firebase app
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import firebase from 'firebase/app'; //older version
import firebase from 'firebase/compat/app'; //v9
import { switchMap } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   *   create new board for the current user
   */
  async createBoard(data: Board) {
    const user = await this.auth.currentUser;

    return this.db.collection('boards').add({
      ...data,
      uid: user?.uid,
      tasks: [{ description: 'Hello!', label: 'yellow' }],
    });
  }

  /**
   * delete board
   */
  deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  /**
   * update tasks
   */
  updateTasks(boardId: string, tasks: Task[]) {
    return this.db.collection('boards').doc(boardId).update({ tasks });
  }

  /**
   * remove task
   */
  removeTask(boardId: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task),
      });
  }

  /**
   * get boards of a specific user
   */
  async getUserBoards() {
    return this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Board>('boards', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
      // map(boards => boards.sort((a, b) => a.priority - b.priority))
    );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((b) => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
