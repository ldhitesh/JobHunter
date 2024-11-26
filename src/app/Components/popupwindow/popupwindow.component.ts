import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'popupwindow',
  templateUrl: './popupwindow.component.html',
  styleUrls: ['./popupwindow.component.css']
})
export class PopupwindowComponent {
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  closeModal() {
    this.onClose.emit();
  }
}
