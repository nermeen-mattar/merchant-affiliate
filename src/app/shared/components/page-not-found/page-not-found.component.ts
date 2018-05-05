import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'tc-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(router: Router, private _location: Location) {
  }

  goToPreviousPage() {
    this._location.back();
  }

  ngOnInit() {
  }

}
