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
  },
  {
    id: "2",
    name: "Tesla, Inc.",
    ticker: "TSLA",
    currentPrice: 248.15,
    priceChangePercent: -1.87,
    sentimentScore: 12,
    recommendation: "hold",
    confidence: 62,
    llmAnalysis: "Mixed sentiment with nearly equal bullish and bearish coverage. While the Robotaxi unveil generated excitement, production..."
  },
  {
    id: "3",
    name: "Manhattan Real Estate",
    ticker: "NYC-RE",
    currentPrice: 1245, // treating as price for simplicity
    priceChangePercent: -2.1,
    sentimentScore: -45,
    recommendation: "sell",
    confidence: 74,
    llmAnalysis: "Commercial real estate in Manhattan faces continued pressure from remote work trends and rising interest rates. Office..."
  },
  {
    id: "4",
    name: "Apple Inc.",
    ticker: "AAPL",
    currentPrice: 198.50,
    priceChangePercent: 0.85,
    sentimentScore: 52,
    recommendation: "buy",
    confidence: 71,
    llmAnalysis: "Positive sentiment driven by Apple Intelligence rollout and strong Services revenue growth of 14% YoY. iPhone 16 cycle..."
  },
  {
    id: "5",
    name: "Austin TX Housing",
    ticker: "ATX-RE",
    currentPrice: 385,
    priceChangePercent: 1.2,
    sentimentScore: 38,
    recommendation: "buy",
    confidence: 65,
    llmAnalysis: "Austin continues to attract tech relocations and population growth. Despite recent price corrections from 2022 peaks,..."
  },
  {
    id: "6",
    name: "Boeing Company",
    ticker: "BA",
    currentPrice: 178.30,
    priceChangePercent: -4.52,
    sentimentScore: -68,
    recommendation: "strong_sell",
    confidence: 82,
    llmAnalysis: "Severely negative sentiment following latest quality control incidents and FAA scrutiny. Production delays on 737 MAX and..."
  }
];
