import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'tc-under-maintenance',
  templateUrl: './under-maintenance.component.html',
  styleUrls: ['./under-maintenance.component.scss']
})
export class UnderMaintenanceComponent implements OnInit {
  constructor(private _location: Location) {
  }

  goToPreviousPage() {
    this._location.back();
  }

  ngOnInit() {
  }


}
