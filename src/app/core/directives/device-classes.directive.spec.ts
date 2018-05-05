import { DeviceDetectorService } from 'ngx-device-detector';

import { DeviceClassesDirective } from './device-classes.directive';

describe('DeviceClassesDirective', () => {
  it('should create an instance', () => {
    const directive = new DeviceClassesDirective(new DeviceDetectorService);
    expect(directive).toBeTruthy();
  });
});
