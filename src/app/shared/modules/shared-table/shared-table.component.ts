import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';

//package
import { saveAs } from 'file-saver';

//directive
import { HighlightOnHoverDirective } from '@app/shared/directives';


@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    HighlightOnHoverDirective
  ]
})
export class SharedTableComponent<DataList, ColList>   {
  @Input() dataList!: DataList[];
  @Input() cols!: ColList[];

  @Output() onRemove = new EventEmitter<number>();
  constructor() { }

  downloadFile(url: string) {
    saveAs(url, 'filename.ext');

  }

  remove(index: number) {
    this.onRemove.emit(index)
  }

}
