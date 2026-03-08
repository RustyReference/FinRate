from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from alpha_vantage.time_series import TimeSeries
from alpha_vantage.fundamentaldata import FundamentalData
import os
from dotenv import load_dotenv

load_dotenv()

alpha_vantage_api_key = os.getenv('ALPHA_API_KEY')

class Item(BaseModel):
    symbol: str

app = FastAPI()

# Initialize alpha client
ts = TimeSeries(key=alpha_vantage_api_key, output_format='pandas')    
fd = FundamentalData(key=alpha_vantage_api_key, output_format='pandas')

@app.get('/')
def read_root():
    return {'message': 'hi there!'}

@app.post('/stock_info')
def search_stock(request: Item):
    symbol = request.symbol.upper()
    
    # Get company overview
    try:
        overview, _ = fd.get_company_overview(symbol)
        market_cap = overview['MarketCapitalization'][0]
        eps = overview['EPS'][0]
        
        # Getting infromation for the day
        daily_data, _ = ts.get_daily(symbol=symbol, outputsize='compact')
        daily_data = daily_data.sort_index() # Oldest -> newest
        latest_close = float(daily_data['4. close'].iloc[-1]) # Stock price for the day
        
        # Use stock price to calculate PE Ratio
        pe_ratio = latest_close / eps

        # output market_cap, eps, and pe_ratio
        return {
            
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching stock info: {e}")

    return symbol