import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input() title: string;
  @Input() iconPath?: string;
  @Input() badgeValue?: string;
  @Input() active = false;
  @Input() isDisabled: boolean = false;
}
