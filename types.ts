
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  industry?: string;
  isExistingCompany: boolean;
}

export interface IdeaEvaluation {
  id: string;
  userId: string;
  timestamp: number;
  ideaTitle: string;
  rawInput: string;
  analysis: EvaluationResult;
}

export interface EvaluationResult {
  summary: string;
  problemRelevance: number;
  marketDemand: number;
  successProbability: number;
  improvedProbability?: number;
  competitors: Competitor[];
  risks: string[];
  strategies: string[];
  flareonixRecommendation: string;
  groundingSources: Array<{ web: { title: string; uri: string } }>;
}

export interface Competitor {
  name: string;
  description: string;
  successRate: string;
  keyStrategy: string;
}

export enum NavigationTab {
  DASHBOARD = 'dashboard',
  EVALUATE = 'evaluate',
  HISTORY = 'history',
  GUIDE = 'guide',
  SETTINGS = 'settings'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
