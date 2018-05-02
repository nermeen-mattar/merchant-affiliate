import { Injectable } from '@angular/core';

import { ContactInfo } from './models/contact-info.model';
import { HttpRequestsService } from '../core/services/http-requests.service';

@Injectable()
export class ContactService {

  constructor(private httpRequestsService: HttpRequestsService) {}

  /**
   * @description attemps to send a post request holding the message info to the server.
   * @param {ContactInfo} contactValues
   */
  sendUserMessage(contactValues: ContactInfo): void {
    this.httpRequestsService.httpPost('contact', contactValues, {
      success: 'CONTACT.MESSAGE_SENT_SUCCESSFULY',
      fail: 'CONTACT.UNABLE_TO_SEND_MESSAGE'
    }).subscribe(res => res);
  }
}
