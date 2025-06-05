import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Creator } from './creator.modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {
 
backEndURL="http://localhost:8080/creators"
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
 

  addCreator(creator: any, photo: File){
    const formData=new FormData()
    formData.append('id',creator.get('id')?.value)
    formData.append('fullname',creator.get('fullname')?.value)
    formData.append('username',creator.get('username')?.value)
    formData.append('email',creator.get('email')?.value)
    formData.append('password',creator.get('password')?.value)
    formData.append('file',photo)
  
    this.http.post<Creator>(this.backEndURL,formData).subscribe(newCreator=>{
      this.creators.update((state: any)=>[...state,newCreator])
    })
    }
 /* filtrerCreatorsByNom(fullname:string){
    if ((fullname!="")&&(fullname!=undefined)){
      return this.creators().filter((
        creator: { fullname: string; }
      ) => creator.fullname.toLowerCase().startsWith(fullname.toLowerCase())
    )
    }
 return this.creators
  }
*/
  /*deleteCreator(id:number){
    this.http.delete<boolean>(this.backEndURL+"/"+id).subscribe(retour=>{
      if(retour){
        this.creators.update(state=>state.filter(e=>(e.id!=id)))
      }
    })
    }
   */
  deleteCreator(id: number): Observable<boolean> {
  return this.http.delete<boolean>(this.backEndURL + "/" + id);
}
 
  updateCreator(creator: any){ 
    this.http.put<Creator>(this.backEndURL,creator).subscribe(updatedCreator=>{
     this.creators.update(state=>state.map(e=>(e.id===creator.id)?updatedCreator:e))
    
    })
   } 
  
  
}