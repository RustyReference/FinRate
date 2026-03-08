import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, FileText, BarChart2 } from 'lucide-react';
import { AssetCard } from './AssetCard';
import { mockData, AssetAnalysis } from '../data';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredData = mockData.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.ticker.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      {/* Header Area */}
      <header className="db-header">
        <div className="db-brand">
          <div className="db-logo">
             <span className="logo-letter">$</span>
          </div>
          <div className="db-brand-text">
            <h1>FinRate Dashboard</h1>
            <span className="db-subtitle">FINANCIAL AI ANALYSIS</span>
          </div>
        </div>
        
        <div className="db-status-badge">
          <span className="live-indicator">LIVE</span>
          <span className="last-scan"> 2 min ago</span> {/* last scan will change when the api updates */}
        </div>
      </header>

      {/* Description */}
      <div className="db-description">  
        AI-powered analysis of financial articles across stocks and real estate. Search for any asset to see sentiment scores and actionable recommendations.
      </div>

      {/* Search Bar */}
      <div className="db-search-bar">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search assets by name or ticker..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Top Stats Cards */}
      <div className="db-stats-grid">
        <div className="stat-card">
          <TrendingUp className="stat-icon icon-bullish" size={20} />
          <div className="stat-content">
            <span className="stat-value">?</span>
            <span className="stat-label">BULLISH</span>
          </div>
        </div>
        <div className="stat-card">
          <TrendingDown className="stat-icon icon-bearish" size={20} />
          <div className="stat-content">
            <span className="stat-value">?</span>
            <span className="stat-label">BEARISH</span>
          </div>
        </div>
        <div className="stat-card">
          <FileText className="stat-icon icon-neutral" size={20} />
          <div className="stat-content">
            <span className="stat-value">?</span>
            <span className="stat-label">ARTICLES</span>
          </div>
        </div>
        <div className="stat-card">
          <BarChart2 className="stat-icon icon-green" size={20} />
          <div className="stat-content">
            <span className="stat-value">87%</span>
            <span className="stat-label">AVG CONFIDENCE</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="db-list-header">
        <h2>ASSET ANALYSIS ({filteredData.length})</h2>
      </div>

      <div className="db-asset-grid">
         {filteredData.map(asset => (
           <AssetCard key={asset.id} asset={asset} />
         ))}
      </div>
    </div>
  );
};

export default Dashboard;
