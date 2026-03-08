export type SentimentType = 'bullish' | 'bearish' | 'neutral';
export type RecommendationType = 'strong_buy' | 'buy' | 'hold' | 'sell' | 'strong_sell';

export interface AssetAnalysis {
  id: string;
  ticker: string;
  name: string;
  currentPrice: number;
  priceChangePercent: number;
  sentimentScore: number; // -100 to 100
  recommendation: RecommendationType;
  confidence: number; // 0 to 100
  llmAnalysis: string;
}

export const mockData: AssetAnalysis[] = [
  {
    id: "1",
    name: "IBM Corporation",
    ticker: "IBM",
    currentPrice: 258.85,
    priceChangePercent: 2.30,
    sentimentScore: 81,
    recommendation: "strong_buy",
    confidence: 87,
    llmAnalysis: "IBM has shown solid momentum entering 2026 driven by strong software revenue and AI adoption which helped the company exceed recent analyst earnings expectations"
  }];

