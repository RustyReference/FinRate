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
    name: "NVIDIA Corporation",
    ticker: "NVDA",
    currentPrice: 892.40,
    priceChangePercent: 3.24,
    sentimentScore: 78,
    recommendation: "strong_buy",
    confidence: 87,
    llmAnalysis: "Overwhelmingly positive sentiment across 24 analyzed articles. AI infrastructure demand continues to surge with major cloud..."
  }];
