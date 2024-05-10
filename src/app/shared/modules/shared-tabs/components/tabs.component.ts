import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  AfterViewInit,
  AfterContentInit,
  HostListener,
  OnInit
} from '@angular/core';

import { Subject } from 'rxjs';

import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit, AfterViewInit, OnInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @Output() onSelect = new EventEmitter();
  @Output() activeTabIndex = new EventEmitter();

  @Input() width: string;
  @Input() height: string;
  @Input() margin: string;
  @Input() changeTab: Subject<number>;
  @Input() justifyContent: string = 'flex-start';
  @Input() fontSize: string;
  @Input() textColor: string;
  @Input() tabsBgColor: string;
  @Input() tabsBgBorderRadius: string;
  @Input() fontWeight: string;
  @Input() tabMinWidth: string;
  @Input() tabsHeadCssClass: string;

  @ViewChild('tabsUl') tabsUlElement: ElementRef;
  @ViewChild('tabItem') tabItemElement: ElementRef;

  tabWidth;
  tabIndex;
  styleObj;
  tabHeight;

  ngOnInit(): void {
    this.setCustomBorder();
  }

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter(tab => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  ngAfterViewInit(): void {
    this.setCustomBorder();
  }

  selectTab(selectedTab) {
    // deactivate all tabs
    this.tabs
      .toArray()
      .forEach(currentActiveTab => (currentActiveTab.active = false));
    // activate the tab the user has clicked on.
    selectedTab.active = true;
    this.onSelect.emit(selectedTab.title);
  }

  changeTabFunction(index) {
    this.tabs?.toArray().forEach(tab => (tab.active = false));
    if (this.tabs) {
      this.tabs.toArray()[index].active = true;
      this.onSelect.emit(this.tabs.toArray()[index].title);
    }
  }

  onTabClick(event, index) {
    this.tabIndex = index;

    this.styleObj.right = this.tabIndex * event.width + 'px';
    this.activeTabIndex.emit(index);
  }

  setCustomBorder() {
    const tab_width = this.tabItemElement?.nativeElement?.offsetWidth;
    this.tabWidth = `${tab_width}px`;
    this.tabHeight = `${this.tabsUlElement?.nativeElement?.offsetHeight - 4}px`;

    this.styleObj = {
      right: '0',
      width: this.tabWidth,
      bottom: '-4px'
    };

    const tabElementList = this.tabItemElement?.nativeElement?.parentNode?.querySelectorAll(
      'li'
    );
    tabElementList?.forEach((elem, index) => {
      if (elem.classList.value.includes('active'))
        this.styleObj.right = index * tab_width + 'px';
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.styleObj.width = `${this.tabItemElement.nativeElement.offsetWidth}px`;
    this.styleObj.right =
      this.tabIndex * this.tabItemElement.nativeElement.offsetWidth + 'px';
  }
}
