import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  modal = inject(NgbActiveModal)
  @Input() creatorData: any;

  constructor(public activeModal: NgbActiveModal) {}

  confirm(): void {
    this.activeModal.close('ok');
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }
}
