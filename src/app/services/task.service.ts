import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TaskService {

  taskList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }

  getAll(){
    this.taskList = this.firebasedb.list('titles');
    return this.taskList;
  }

  create(title: string){
    this.taskList.push({
      title: title,
      isChecked: false
    });
  }
  
  update($key: string, flag: boolean){
    this.taskList.update($key, { isChecked: flag });
  }

  destroy($key){
    this.taskList.remove($key);
  }

}
