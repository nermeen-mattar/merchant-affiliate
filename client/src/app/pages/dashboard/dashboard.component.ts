import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { DealApi } from '../../../sdk';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy, OnInit {
  public tableData = [];
  private alive = true;

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

  constructor(private themeService: NbThemeService, private dealApi: DealApi) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  ngOnInit(): void {
    this.dealApi.find().subscribe(data => {
      this.tableData = data;
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  // following are for demo just replace them with real data from the SDK
  tableSettings = {
    editable: false,
    actions: {
      edit: false,
      delete: false,
    },
    hideSubHeader: false,
    columns: {
      dealName: {
        title: 'Deal Name',
      },
      description: {
        title: 'Deal Description',
      },
      limit: {
        title: 'Deal Limit',
      },
      // itemName: {
      //   title: 'Item Name',
      // },
    },
  };

  // tableData = [
  //   {
  //     dealName: 1,
  //     name: 'Leanne Graham',
  //     number: '079723761',
  //     itemName: 'Sincer',
  //   },
  //   {
  //     dealName: 2,
  //     name: 'Ervin Howell',
  //     number: '07972313761',
  //     itemName: 'Shanna',
  //   },

  //   {
  //     dealName: 11,
  //     name: 'Nicholas DuBuque',
  //     number: '0797233761',
  //     itemName: 'Rey.Padber',
  //   },
  // ];
}
