import { ComponentLoader } from '@/core/loaders';

export default ComponentLoader.run(require.context('./', true, /.*\/[^/]+\/index\.js$/), 'global');
