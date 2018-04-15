import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { UserMessages } from '../models/user-messages.model';
@Injectable()
export class UserMessagesService {

  constructor(public snackBar: MatSnackBar, private translateService: TranslateService) {}

  showUserMessage(userMessages: UserMessages, messageType) {
    if (messageType === 'fail') {
      if (userMessages && userMessages.fail === 'NO_ERROR_MESSAGE') {
        return; // do not display an error message
      }
      userMessages = this.addDefaultFailMessageIfNoFailMessage(userMessages);
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
  addDefaultFailMessageIfNoFailMessage(userMessages): UserMessages {
    if (!userMessages || userMessages.fail === undefined) {
      userMessages = {
        fail: 'SOMETHING_WENT_WRONG'
      };
    }
    return userMessages;
  }
}
