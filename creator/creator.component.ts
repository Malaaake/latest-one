import { Component } from '@angular/core';
import { ListComponent } from './list/list.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './form/form.component';
import { HttpClient } from '@angular/common/http';
import { CreatorService } from './creator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creators',
  standalone: true,
  imports: [ListComponent,CommonModule],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.css'
})
export class CreatorComponent {

	constructor(private modal:NgbModal, private creatorService: CreatorService ) {}

	openModal() {
	  
	  this.modal.open(FormComponent);
	}
}