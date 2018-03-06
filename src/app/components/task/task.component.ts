import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  
  taskListArray: any[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getAll().snapshotChanges()
    .subscribe(item => {
      this.taskListArray = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.taskListArray.push(x);
      });

      this.taskListArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
      });
    });
  }

  addTask(itemTitle) 
  {
    this.taskService.create(itemTitle.value);
    itemTitle.value = null;
  }

  updateTask($key: string, isChecked: boolean)
  {
    this.taskService.update($key, !isChecked);
  }

  deleteTask($key: string)
  {
    if(confirm('Are you sure you want to delete the record?'))
    {
      this.taskService.destroy($key);
    }
  }

}
