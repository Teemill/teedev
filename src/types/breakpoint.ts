import { minBy } from 'lodash';

export type BreakpointSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export class Breakpoint {
  public size: BreakpointSize;
  public width: number;

  constructor(size: BreakpointSize, width: number) {
    this.size = size;
    this.width = width;
  }

  static get(width: number): Breakpoint
  static get(size: BreakpointSize): Breakpoint

  static get(arg: any): Breakpoint | undefined {
    if (typeof arg === 'number') {

    } else if (typeof arg === 'string') {

    }

    switch (typeof arg) {
      case 'number':
        return undefined;

      case 'string':
        return breakpoints.find(breakpoint => breakpoint.size === arg);
    
      default:
        return undefined;
    }
  }

  static smallest(breakpoints: Breakpoint[]) {
    return minBy(breakpoints, 'width');
  }

  equalTo(width: number): boolean {
    return this.width === width;
  }

  lessThan(width: number): boolean {
    return this.width < width;
  }

  greaterThan(width: number): boolean {
    return this.width > width;
  }
};

const breakpoints: Breakpoint[] = [
  new Breakpoint('xs', 0),
  new Breakpoint('sm', 639),
  new Breakpoint('md', 767),
  new Breakpoint('lg', 1023),
  new Breakpoint('xl', 1279),
];
