import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'tc-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: [ '../../../../styles/toolkit/_dialog.scss', './confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() confirmMessage;
  @Input() confirmHeader;
  @Output() confirmResponse: EventEmitter<boolean> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}
}
