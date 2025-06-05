import { Component } from '@angular/core';
import { ListComponent } from "../exam/list/list.component";

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent {
  
}


