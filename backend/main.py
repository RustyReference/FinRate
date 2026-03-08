from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.fundamentaldata import FundamentalData
import os
from dotenv import load_dotenv

load_dotenv()

alpha_vantage_api_key = os.getenv('ALPHA_API_KEY')

class Item(BaseModel):
    symbol: str

app = FastAPI()

# Initialize alpha client
'''
ts = TimeSeries(key=alpha_vantage_api_key, output_format='pandas')    
fd = FundamentalData(key=alpha_vantage_api_key, output_format='pandas')
'''

@app.get('/')
def read_root():
    return {'message': 'hi there!'}




@app.post('/stock_info')
def search_stock(request: Item):
    symbol = request.symbol.upper()
    '''
    UNCOMMENT THIS CODE LATER
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
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching stock info: {e}")
    '''

    # return market_cap, eps, and pe_ratio in json
    # NOTE: this is BS-ed data because the API key unexpectedly didn't work

    stock_info = {
        'market_cap': 260000000000,
        'eps': 8.3,
        'pe_ratio': 33 
    }

    BS_sentiment_scorelol = .71

    investment_score = 0.6 * BS_sentiment_scorelol + 0.3 * stock_info['eps'] + 0.1 * stock_info['market_cap']

    if investment_score > 0.5:
        action = "buy"
    elif investment_score < -0.2:
        action = "sell"
    else:
        action = "hold"

    return {
        'action': action
    }
