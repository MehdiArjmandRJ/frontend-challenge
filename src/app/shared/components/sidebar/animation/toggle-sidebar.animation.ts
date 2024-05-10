import { animate, state, style, transition, trigger } from '@angular/animations';

export class SideBarAnimation {
  static ToggleSidebar = trigger('sliderState', [
    state('active', style({
      transform: 'translate(0,0)',
      width: '300px',
    })),
    state('*', style({
      transform: 'translate(20px,0)',
      width: '-63px',
    })),
    state('inactive', style({
      transform: 'translate(0,0)',
    })),
    transition('inactive => *', animate('200ms ease-out')),
    transition('* => active', animate('150ms ease-out')),
    transition('active => *', animate('200ms ease-out')),
    transition('* => inactive', animate('150ms ease-out')),
  ]);

}
