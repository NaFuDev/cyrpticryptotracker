import { useQuery } from "@tanstack/react-query";
import { getAssets } from "@/services/api";
import { Link } from "react-router-dom";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const formatPrice = (price: string) => 
  Number(price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const formatPercent = (percent: string) => 
  Number(percent).toFixed(2) + '%';

const formatMarketCap = (cap: string) => 
  Number(cap).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const Index = () => {
  const { data: assets, isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: getAssets,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="brutalist-card p-8 animate-pulse">
          LOADING CRYPTO DATA...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">TOP 50 CRYPTO ASSETS</h1>
      
      <div className="grid gap-4">
        {assets?.map((asset) => (
          <Link 
            key={asset.id}
            to={`/asset/${asset.id}`}
            className="brutalist-card p-4 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold">{asset.rank}</span>
                <div>
                  <h2 className="text-xl font-bold">{asset.name}</h2>
                  <span className="text-sm">{asset.symbol}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="font-bold">{formatPrice(asset.priceUsd)}</div>
                  <div className={`flex items-center ${Number(asset.changePercent24Hr) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Number(asset.changePercent24Hr) >= 0 ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
                    {formatPercent(asset.changePercent24Hr)}
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-sm text-gray-600">Market Cap</div>
                  <div className="font-bold">{formatMarketCap(asset.marketCapUsd)}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;