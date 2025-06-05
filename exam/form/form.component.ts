import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  formexam: any; 

  constructor(
    private fb: FormBuilder, 
    private examService: ExamService, 
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    // Initialize form in ngOnInit
    this.formexam = this.fb.group({
      "id": ['', Validators.required],
      "title": ['', Validators.required],
      "duration": ['', Validators.required],
      "description": ['', Validators.required],
      "passingscore": ['', Validators.required],
    });
  }
  
  // Renamed to match template
  ajouterexam(): void {
    this.examService.addExam(this.formexam.value);
    this.activeModal.close();
  }
  
  fermer(): void {
    this.activeModal.close();
  }
}