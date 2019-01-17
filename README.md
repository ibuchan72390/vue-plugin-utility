# vue-plugin-utility

This library is simply meant to offer a standardized way of working with and building plugins for Vue / Nuxt

It provides 2 simple classes:
1. IPluginModule - A basic interface that lays out the structure for working with the PluginUtil class
  * install: (vue: VueConstructor<any>) => void
  * configureStores: (context: any, options: any) => void
2. PluginUtil - A basic utility class with a static function for installing an IPluginModule
  * You MUST NOT include a store in the "install" function, as it will not work with HMR
  * Explained [here](https://github.com/nuxt/nuxt.js/issues/2267)


## Building a Component Module
Generally, you will set up your target build as the module Plugin file for component packages
The plugin file should be laid out as follows:

```typescript
import { IPluginModule } from 'vue-plugin-utility'

const install = (vue) => {
  // Vue plugin functionality goes here
}

const configureStores = (context, opts) => {
  // Register your stores in the following manner
  // context.store.registerModule(NamespaceKeys.comment, CommentStore)
}

// Create a named version of your export
export const MyPlugin: IPluginModule = {
  install,
  configureStores
}

export default MyPlugin
```

## Consuming a Component Module
Then in your consuming project, you can do the following:

```typescript
import Vue from 'vue'
import { PluginUtil } from 'vue-plugin-utiltiy'
import { MyPlugin } from 'my-cool-module'

export default async (context) => {
  PluginUtil.configurePlugin(Vue, PhotoPlugin, context)
}
```
