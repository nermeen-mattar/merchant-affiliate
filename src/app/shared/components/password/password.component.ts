
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tc-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  @Input('passwordControl') passwordControl;
  constructor() { }

  ngOnInit() {
  }

}
