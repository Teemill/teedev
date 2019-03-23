import { PageLoader } from '@/core/loaders';

export default PageLoader.run(require.context('./', true, /.*\/index\.js$/), 'teemill');
