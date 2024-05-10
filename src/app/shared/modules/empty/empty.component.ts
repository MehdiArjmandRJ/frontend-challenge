import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIcons } from '@ngneat/svg-icon';
import { IconsModule } from '../custom-icons/icons.module';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IconsModule,
  ],
})
export class EmptyComponent {
  @Input() message = 'موردی یافت نشد';
  @Input() icon: SvgIcons = 'c-empty';
  @Input() iconStyle = 'width: 70px;height: 70px;';
}
