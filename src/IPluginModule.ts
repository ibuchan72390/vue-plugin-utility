import { VueConstructor } from 'vue'

export interface IPluginModule {
  install: (vue: VueConstructor<any>) => void
  configureStores: (context: any, options: any) => void
}
