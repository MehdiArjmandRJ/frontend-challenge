import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[appTabActivation]',
})
export class TabActivationDirective {
  @Output() onClickTab = new EventEmitter<any>();

  constructor(public el: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(e) {
    const width = this.el.nativeElement.clientWidth;

    this.onClickTab.emit({ width });
  }
}
