import { Component, OnInit } from '@angular/core';

import { ContactService } from './contact.service';
import { ContactInfo } from './models/contact-info.model';

@Component({
  selector: 'tc-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  sendSpinner: boolean;
  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  /**
   * @author Nermeen Mattar
   * @description sending the contact info the user entered.
   * @param {ContactInfo} contactValue
   */
  sendMessage(contactValue: ContactInfo) {
    this.sendSpinner = true;
    this.contactService.sendUserMessage(contactValue);
  }
}
