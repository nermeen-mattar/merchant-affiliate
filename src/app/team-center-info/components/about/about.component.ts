import { Component, OnInit } from '@angular/core';

import { externalUrls } from '../../../core/constants/external-urls.constants';

@Component({
  selector: 'tc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openDonateWindow() {
    window.open(externalUrls.donate, '_blank'); // ,height=500px,width=auto
  }

  openFacebookWindow() {
    window.open(externalUrls.facebook, '_blank'); // ,height=500px,width=auto
  }

}
