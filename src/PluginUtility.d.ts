import { IPluginModule } from './IPluginModule';
import { VueConstructor } from 'vue';
export declare class PluginUtil {
    static configurePlugin(vue: VueConstructor<any>, externalImport: IPluginModule, context: any): void;
}
