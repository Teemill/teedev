export const devices = [
  {
    id: 'xs',
    width: 480,
  },
  {
    id: 'sm',
    width: 600,
  },
  {
    id: 'md',
    width: 840,
  },
  {
    id: 'lg',
    width: 960,
  },
  {
    id: 'xl',
    width: 1280,
  },
  {
    id: 'xxl',
    width: 1440,
  },
];

export default class Device {
  constructor() {
    this.width = window.innerWidth;

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
    });
  }

  deviceWidth(deviceId) {
    return devices.find(device => device.id === deviceId).width;
  }

  max(device) {
    if (typeof device === 'string') {
      return this.deviceWidth(device) >= this.width;
    }

    return device >= this.width;
  }

  min(device) {
    if (typeof device === 'string') {
      return this.deviceWidth(device) <= this.width;
    }

    return device <= this.width;
  }

  between(minDevice, maxDevice) {
    return this.min(minDevice) && this.max(maxDevice);
  }
}
