import { StoreLoader } from '@/core/loaders';

export default StoreLoader.run(require.context('./', true, /.*\/index\.js$/), 'global');
