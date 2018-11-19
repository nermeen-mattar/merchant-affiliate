import { Component, OnInit } from '@angular/core';
import { DealApi } from '../../../sdk';

@Component({
  selector: 'ngx-new-deal',
  templateUrl: './new-deal.component.html',
  styleUrls: ['./new-deal.component.scss'],
})
export class NewDealComponent implements OnInit {
  constructor(private dealApi: DealApi) {}

  ngOnInit() {}

  submit(newDealFormValue) {
    this.dealApi.create(newDealFormValue).subscribe(() => {
      console.log('done');
    });
  }
}
