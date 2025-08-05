import type { User } from '../types';

export interface IPlugin {
  id: string;
  name: string;
  description: string;
  minTier: User['tier'];
  activate(user: User): void;
  UI?: React.FC;
}