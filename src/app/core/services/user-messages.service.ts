import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { UserMessages } from '../models/user-messages.model';
@Injectable()
export class UserMessagesService {

  constructor(public snackBar: MatSnackBar, private translateService: TranslateService) {}

  showUserMessage(userMessages: UserMessages, messageType, err ? ) {
    if (messageType === 'fail') {
      if (userMessages && userMessages.fail === 'NO_ERROR_MESSAGE') {
        return; // do not display an error message
      }
      if (!userMessages || userMessages.fail === undefined) {
        userMessages = this.getFailMessage(userMessages, err);
      }
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

  getFailMessage(userMessages: UserMessages, err): UserMessages {
    const userFailMessage = {
      fail: null
    };
    if (err && err.error && err.error.message) {
      const translationKey = 'BACKEND.'.concat(err.error.message.toUpperCase());
      this.translateService.get('USER_MESSAGES.'.concat(translationKey)).subscribe(
        translatedMessage => {
          if (!translatedMessage.includes(translationKey)) {
            userFailMessage.fail = translationKey;
          }

        }
      );
    }
    if (!userFailMessage.fail) {
      userFailMessage.fail = userMessages && userMessages.failDefault ? userMessages.failDefault : 'SOMETHING_WENT_WRONG';
    }
    return userFailMessage;
  }
}
