import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { TooltipOptions } from 'primeng/api';
import { interval, take } from 'rxjs';
import { SideBarAnimation } from './animation/toggle-sidebar.animation';
import { MenusModel } from './models/menus.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [SideBarAnimation.ToggleSidebar],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  toggleSideBar = false;
  sliderToggleState = 'inactive';
  menus: MenusModel[] = [
    {
      title: 'Home',
      icon: 'home',
      active: false,
      route: '/panel/home'
    },
  ];
  tooltipOptions: TooltipOptions = {
    showDelay: 400,
    tooltipEvent: 'hover',
    tooltipPosition: 'left',
  };

  constructor(
    private router: Router,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      this.ngZone.run(() => {
        if (this.toggleSideBar && !this.el.nativeElement.contains(event.target)) {
          this.onToggleSideBar();
        }
      });
    });
  }

  changeRoute(menu: MenusModel) {
    this.menus.forEach(item => (item.active = item === menu));
    this.router.navigate([menu.route]);
  }

  onToggleSideBar() {
    interval(100).pipe(take(1)).subscribe(() => {
      this.toggleSideBar = !this.toggleSideBar;
      this.sliderToggleState = this.toggleSideBar ? 'active' : 'inactive';
      this.cdr.detectChanges();
    });
  }

}
