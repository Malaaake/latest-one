import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, signal  } from '@angular/core';
import { CreatorService } from '../creator.service';

import { ConfirmComponent } from './confirm/confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../form/form.component';
import { Creator } from '../creator.modal';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule , FormsModule], 
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent implements OnInit {

	creators = signal<Creator[]>([]);
	filteredCreators: any[] = [];  // zitom so admin can see creators list 
	searchTerm: string = '';     //creators list 

	

	constructor(
		private creatorService : CreatorService ,
		private modalService: NgbModal , private loginService: LoginService,
		private router: Router
	){}
	ngOnInit():void{
	
		 // Simple admin check - redirect if not admin
		 if (!this.loginService.isAdmin()) {
			this.router.navigate(['/home']);
			return;
		  }
		this.creators = this.creatorService.creators;
	}

	openModal(){
		this.modalService.open(FormComponent)
	}
	
deleteCreator(id: number) {
  const confirmed = confirm('Are you sure you want to delete this creator?');
  if (confirmed) {
    this.creatorService.deleteCreator(id).subscribe(() => {
      // optionally refresh the list or show a success message
      console.log('Creator deleted');
    });
  }
}
openDeleteModal(creator: any): void {
  const dialogRef = this.modalService.open(ConfirmComponent);
  dialogRef.componentInstance.creatorData = creator;

  dialogRef.result.then(result => {
    if (result === 'ok') {
      this.deleteCreator(creator.id); // proceed with deletion
    }
  }).catch(() => {
    // User cancelled
  });
}

  //  toggle method  zidta
  toggleStatus(creator: any) {
    creator.active = !creator.active;
    this.creatorService.updateCreator(creator); // Assuming your service handles this
  }
/// zidta 
  filterCreators(): void {
    if (!this.searchTerm) {
	  this.filteredCreators = [...this.creators()];
      return;
    }
    
	this.filteredCreators = this.creators().filter(creator =>
	  creator.fullname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
	  creator.email.toLowerCase().includes(this.searchTerm.toLowerCase())
	);
  }

/*updateCreator(creator:any){
	const dialogRef=this.modalService.open(FormComponent)
	dialogRef.componentInstance.creatorData=creator
	dialogRef.componentInstance.action="Modifier"
}*/
}