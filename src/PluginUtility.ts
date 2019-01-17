
import { IPluginModule } from './IPluginModule'
import { VueConstructor } from 'vue';

/*
 * You can NOT register the store functionality in an "install" method
 * These methods are executed only once and ruins your HMR environment.
 * By registering your stores outside of the "install" method, you guarantee
 * they will be populated upon your hot module replacement refreshes.
 * https://github.com/nuxt/nuxt.js/issues/2267
 */
export class PluginUtil {
  public static configurePlugin(
    vue: VueConstructor<any>,
    externalImport: IPluginModule,
    context: any
  ): void {
    // This will work because externalImport has an install function
    // Install is only EVER executed once, so do NOT register Store classes in here
    vue.use(externalImport)

    // If we want to configure extra items outside the install
    // For working inside of HMR functionality
    if (externalImport.configureStores) {
      const opts: any = {}
      if (context.isClient) {
        opts.preserveState = true
      }

      externalImport.configureStores(context, opts)
    }
  }
}