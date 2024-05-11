import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '../custom-icons/icons.module';

@Component({
  selector: 'app-shared-button',
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.scss'],
  standalone: true,
  imports: [
    IconsModule,
    CommonModule,
  ]
})
export class SharedButtonComponent {
  @Input() type = 'button';
  @Input() title = 'Button Name';
  @Input() outline = false;
  @Input() disabled = false;
  @Input() isPending = false;
  @Input() color = 'success';
  @Input() loadingSrc = 'primary';
  @Input() icon: any;

  @Output() onClick: EventEmitter<unknown> = new EventEmitter();

  onClickAction (){
    this.onClick.emit();
  }
}
