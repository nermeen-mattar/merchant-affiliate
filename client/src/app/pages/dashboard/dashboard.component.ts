import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
  private alive = true;
  // example of busienss info (apparently we do have the type :D)
  businessInfo = {
    id: '3f522ee8-7e69-4d78-aeb5-5278aaf21558',
    name: 'Burger',
    type: 'F&B',
    country: 'JO',
    currency: 'JOD',
    phone: '797405021',
    address: 'Amman, Amman,Jordan',
    image: {
      '256':
        'https://posrocket-production.s3.amazonaws.com:443/3f522ee87e694d78aeb55278aaf21558/6cf8aee0e66a4f40b91539668e67f613-256.png',
    },
    social: {
      id: '5072b345-696d-49c6-9def-e62981be1cde',
      facebook: null,
      instagram: null,
      snapchat: null,
      twitter: null,
    },
    images: {
      receipt_logo: {
        '256':
          'https://posrocket-production.s3.amazonaws.com:443/3f522ee87e694d78aeb55278aaf21558/6cf8aee0e66a4f40b91539668e67f613-256.png',
      },
    },
  };

  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'secondary',
      },
    ],
  };

  constructor(private themeService: NbThemeService) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  // following are for demo just replace them with real data from the SDK
  tableSettings = {
    columns: {
      dealName: {
        title: 'Deal Name',
      },
      name: {
        title: 'Customer Name',
      },
      number: {
        title: 'Customer Number',
      },
      itemName: {
        title: 'Item Name',
      },
    },
  };

  tableData = [
    {
      dealName: 1,
      name: 'Leanne Graham',
      number: '079723761',
      itemName: 'Sincer',
    },
    {
      dealName: 2,
      name: 'Ervin Howell',
      number: '07972313761',
      itemName: 'Shanna',
    },

    {
      dealName: 11,
      name: 'Nicholas DuBuque',
      number: '0797233761',
      itemName: 'Rey.Padber',
    },
  ];
}
