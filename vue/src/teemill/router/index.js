import { Router, Guards as GlobalGuards } from '@/global/router';
import LocalGuards from './guards';

const Guards = {
  ...GlobalGuards,
  ...LocalGuards,
};

export {
  Router,
  Guards,
};
