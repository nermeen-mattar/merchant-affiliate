import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Services
import { DealApi } from '../../sdk';

@Component({
  selector: 'ngx-deal-details',
  templateUrl: './ngx-deal-details.component.html',
  styleUrls: ['./ngx-deal-details.component.scss'],
})
export class NgxDealDetailsComponent implements OnInit {
  public dealInfo;
  public dealLimit: any;
  private dealId: string;

  constructor(private route: ActivatedRoute, private dealApi: DealApi) {
    this.route.url.subscribe(values => {
      this.dealId = values[1].path;
    });
  }

  ngOnInit() {
    if (this.dealId) {
      this.dealApi.findById(this.dealId).subscribe(data => {
        this.dealInfo = data;
        if (data['target_businesses'] !== null) {
          this.dealLimit =
            Number(data['limit']) - data['target_businesses'].length;
        } else {
          this.dealLimit = data['limit'];
        }
      });
    }
  }
}
