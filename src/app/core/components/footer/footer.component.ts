import { Component, OnInit } from '@angular/core';

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
    window.open('https://paypal.me/coffeeforteamcenter/4', '_blank', 'top=0,left=0,height=500px,width=auto');
  }

}
