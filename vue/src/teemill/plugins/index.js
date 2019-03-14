import { PluginLoader } from '@/core/loaders';

export default PluginLoader.run(require.context('./', true, /.*\/index\.js$/));
