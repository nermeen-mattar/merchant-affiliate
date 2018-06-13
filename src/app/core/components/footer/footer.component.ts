import { Component, OnInit } from '@angular/core';

import { externalUrls } from '../../constants/external-urls.constants';

@Component({
  selector: 'tc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openDonateWindow() {
    window.open(externalUrls.donate, '_blank'); // ,height=500px,width=auto
  }

}
