import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tc-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: [ '../../../styles/toolkit/_dialog.scss', './confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() confirmMessage;
  @Input() confirmHeader;
  @Output() confirmResponse: EventEmitter<boolean> = new EventEmitter();
  windowClicked: boolean;
  constructor() { }

  ngOnInit() {
  }

}
