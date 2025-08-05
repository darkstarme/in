import type { IPlugin } from './IPlugin';

class PluginRegistry {
  private plugins: Record<string,IPlugin> = {};

  register(plugin: IPlugin) {
    this.plugins[plugin.id] = plugin;
  }

  list() { return Object.values(this.plugins); }

  get(id: string) { return this.plugins[id]; }
}

export const registry = new PluginRegistry();