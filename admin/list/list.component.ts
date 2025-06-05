/*import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Creator } from '../../creator/creator.modal';
import { CreatorService } from '../../creator/creator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../creator/list/confirm/confirm.component';
import { FormComponent } from '../../creator/form/form.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
creators = signal<Creator[]>([]);
  constructor(
    private creatorService : CreatorService ,
    private modalService: NgbModal 
  ){}
  ngOnInit():void{
  
    //this.creators=this.creatorService.getCreators()
    this.creators = this.creatorService.creators;
  }
  deleteCreator(id:number){
	this.creatorService.deleteCreator(id)
	
  }
openDeleteModal(creator:any){
  const dialogRef = this.modalService.open(ConfirmComponent)
  dialogRef.componentInstance.creatorData=creator
  dialogRef.result.then(data=>{
    if(data=='ok'){
      this.deleteCreator(creator)
    }
  })
}


}
*/