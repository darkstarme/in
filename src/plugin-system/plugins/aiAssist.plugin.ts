import { registry } from '../PluginRegistry';
import { IPlugin } from '../IPlugin';
import AIConsole from '../../components/AIConsole';

export const AIPlugin: IPlugin = {
  id: 'ai-assist',
  name: 'AI Assistant',
  description: 'Chat with multiple AI models',
  minTier: 'verified',
  UI: AIConsole,
  activate: (user) => {
    // navigate to AI console
  }
};

registry.register(AIPlugin);