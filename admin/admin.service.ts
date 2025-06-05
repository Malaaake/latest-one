import { Injectable, signal } from '@angular/core';
import { Creator } from '../creator/creator.modal';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';

/*@Injectable({
  providedIn: 'root'
})
export class AdminService {
  backEndURL="http://localhost:8080/admin/creators"
  creators =signal<Creator[]>([])
    photo: any;
  
  constructor(private http: HttpClient)
  {
    this.getCreators()
  }

 getCreators():void{
  this.http.get<Creator[]>(this.backEndURL).subscribe(data=>{
    this.creators.set(data)
  })
  
 }

 deleteCreator(id:number){
  this.http.delete<boolean>(this.backEndURL+"/"+id).subscribe(retour=>{
    if(retour){
      this.creators.update(state=>state.filter(e=>(e.id!=id)))
    }
  })
  }

}*/
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/admin';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  getAllCreators(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/creators`, { 
      headers: this.loginService.getAuthHeaders() 
    });
  }

  deleteCreator(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/creators/${id}`, {
      headers: this.loginService.getAuthHeaders()
    });
  }

  updateCreator(creator: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/creators`, creator, {
      headers: this.loginService.getAuthHeaders()
    });
  }

  getExamsByCreator(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/exams/creator/${id}`, {
      headers: this.loginService.getAuthHeaders()
    });
  }
}
