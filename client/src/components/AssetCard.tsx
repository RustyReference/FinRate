import React from 'react';
import { 
  Building2, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ChevronDown,
  Activity,
  Apple
} from 'lucide-react';
import { AssetAnalysis } from '../data';
import './AssetCard.css';

interface AssetCardProps {
  asset: AssetAnalysis;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  // Helpers
  const [expanded, setExpanded] = React.useState(false); // for the click component
  const formatPrice = (price: number, ticker: string) => {
    if (ticker.includes('RE')) {
      return `$${price.toLocaleString()}/sqft`;
    }
    return `$${price.toFixed(2)}`;
  };

  const getPercentageColor = (percent: number) => {
    return percent >= 0 ? 'color-green' : 'color-red';
  };

  const formatPercentage = (percent: number) => {
    return percent > 0 ? `+${percent}%` : `${percent}%`;
  };

  const formatScore = (score: number) => {
    return score > 0 ? `+${score}` : `${score}`;
  };

  const getBadgeContent = (rec: string) => {
    switch(rec) {
      case 'strong_buy': return { text: 'Strong Buy', className: 'badge-strong-buy', Icon: TrendingUp };
      case 'buy': return { text: 'Buy', className: 'badge-buy', Icon: TrendingUp };
      case 'hold': return { text: 'Hold', className: 'badge-hold', Icon: Minus };
      case 'sell': return { text: 'Sell', className: 'badge-sell', Icon: TrendingDown };
      case 'strong_sell': return { text: 'Strong Sell', className: 'badge-strong-sell', Icon: TrendingDown };
      default: return { text: 'Unknown', className: '', Icon: Minus };
    }
  };

  const getAssetIcon = (ticker: string) => {
    if (ticker.includes('RE')) return <Building2 size={16} />;
    if (ticker === 'AAPL') return <BarChart3 size={16} />; 
    // Usually we use specific icons, fallback to BarChart
    return <BarChart3 size={16} />; 
  }

  const badgeInfo = getBadgeContent(asset.recommendation);
  const BadgeIcon = badgeInfo.Icon;

  // Sentiment bar filling logic based on -100 to 100
  // Left half is red, right half is green
  // We can just use a single color fill for simplicity matching the image
  const getSentimentBarColor = (score: number) => {
    if (score >= 50) return 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'; // bright green
    if (score > 0) return '#10b981'; // green
    if (score > -20 && score <= 0) return '#eab308'; // yellow for hold-ish
    return '#ef4444'; // red
  };

  // 0 is middle. -100 width is full left, 100 width is full right.
  // Actually the image shows continuous bars that fill up from left to right.
  // For Positive: fills up to score%.
  // For Negative: also left to right, but red.
  const sentimentFillWidth = `${Math.abs(asset.sentimentScore)}%`;
  const sentimentFillColor = getSentimentBarColor(asset.sentimentScore);

  return (
    <div className="asset-card">
      <div className="ac-header">
        <div className="ac-identity">
          <div className="ac-icon">
            {getAssetIcon(asset.ticker)}
          </div>
          <div className="ac-name-ticker">
            <h3 className="ac-name">{asset.name}</h3>
            <span className="ac-ticker">{asset.ticker}</span>
          </div>
        </div>
        <div className="ac-price-info">
          <div className="font-mono ac-price">{formatPrice(asset.currentPrice, asset.ticker)}</div>
          <div className={`font-mono ac-percent ${getPercentageColor(asset.priceChangePercent)}`}>
            {formatPercentage(asset.priceChangePercent)}
          </div>
        </div>
      </div>

      <div className="ac-metrics">
        <div className="ac-sentiment">
          <div className="sentiment-bar-bg">
            <div 
              className="sentiment-bar-fill" 
              style={{ width: sentimentFillWidth, background: sentimentFillColor }}
            />
          </div>
          <span className="sentiment-score" style={{ color: asset.sentimentScore >= 0 ? 'var(--color-green)' : (asset.sentimentScore < -20 ? 'var(--color-red)' : 'var(--color-yellow)') }}>
             {formatScore(asset.sentimentScore)}
          </span>
        </div>
        
        <div className={`ac-badge ${badgeInfo.className}`}>
           <BadgeIcon size={14} className="badge-icon" />
           {badgeInfo.text}
        </div>
      </div>

      <div className="ac-confidence-row">
        <span className="acf-label">Confidence</span>
        <div className="confidence-bar-bg">
           <div className="confidence-bar-fill" style={{ width: `${asset.confidence}%` }}></div>
        </div>
        <span className="font-mono acf-value">{asset.confidence}%</span>
      </div>

      <div className="ac-analysis">
        <div 
  className="aca-toggle"
  onClick={() => setExpanded(prev => !prev)}
  style={{ cursor: "pointer" }}>
  <span className="aca-label">AI Analysis</span>
  <ChevronDown 
    size={14} 
    className="aca-chevron"
    style={{ 
      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s ease"
    }}
      />
      </div>
      {expanded && (
        <p className="aca-text">{asset.llmAnalysis}</p>
        )}
      </div>
    </div>
  );
};
