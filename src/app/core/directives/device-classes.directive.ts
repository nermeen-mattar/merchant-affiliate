import { Directive, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Directive({
  selector: '[tcDeviceClasses]'
})
export class DeviceClassesDirective implements OnInit {

  constructor(
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
     // device detector chunk
     const body = document.querySelector('body');
     body.classList.add( this.deviceService.isDesktop() ? 'desktop-device' : 'mobile-device' );
     body.classList.add( `browser-${this.deviceService.browser}` );
     body.classList.add( `device-${this.deviceService.device}` );
     // device detector end
  }

}
