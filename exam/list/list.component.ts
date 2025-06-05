import { Component,OnInit } from '@angular/core';
import { ExamService } from '../exam.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../form/form.component';
import { DeletemodalComponent } from '../../creator/list/deletemodal/deletemodal.component';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  exams: any[] = [];
    constructor(
    private examService:ExamService,
    private modal:NgbModal
  ){}
  ngOnInit(){
    this.exams = this.examService.getExams();
  }

  openModal(){
    this.modal.open(FormComponent)
  }

 

  updateExam(exam:any){
    const ref=this.modal.open(FormComponent)
    ref.componentInstance.examData=exam
    ref.componentInstance.action="Modifier"
  }
  
}


