
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tc-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  @Input('passwordControl') passwordControl;
  @Input('fieldLabel') fieldLabel = 'USER.PASSWORD';

  constructor() { }

  ngOnInit() {
  }

}
