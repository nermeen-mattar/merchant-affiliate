import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { UserMessages } from '../models/user-messages.model';

@Injectable()
export class UserMessagesService {

  constructor(public snackBar: MatSnackBar, private translateService: TranslateService) {}

  showUserMessage(userMessages: UserMessages, messageType) {
    if (messageType === 'fail' && !(userMessages && userMessages.fail)) {
      userMessages =  {fail: 'SOMETHING_WENT_WRONG'};
    }
    if (userMessages && userMessages[messageType]) {
      this.translateService.get('USER_MESSAGES.'.concat(userMessages[messageType])).subscribe(
        translatedMessage => {
          this.snackBar.open(translatedMessage, '', {
            duration: 2000,
            panelClass: messageType === 'success' ? 'bg-success' : 'bg-error'
          });
        }
      );
    }
  }
}
