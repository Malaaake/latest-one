import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule, NgbModalModule, SignupComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  


  constructor( private router: Router, private modalService : NgbModal ){}

  
  openSignupModal() {
    this.modalService.open(SignupComponent);
  }

  logout(): void {
  localStorage.clear();
  this.router.navigate(['/login']);
}



}