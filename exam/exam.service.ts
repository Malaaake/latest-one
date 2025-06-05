
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
 backEndUrl="http://localhost:8081/exams"
 exams:any
 
   constructor(private http:HttpClient) { 
  this.getExams()
   }
 
   getExams(){
  this.http.get(this.backEndUrl).subscribe(data=>{
   this.exams=data
  })
  return this.exams
   }
  addExam(exam:any){
 this.exams.push(exam)
  }
  filtrerExamsByTitle(title:string){
 return this.exams.filter((exam: { title: string; }) =>
  exam.title.toLowerCase().startsWith(title.toLowerCase()));
  }
}