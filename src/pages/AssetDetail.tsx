import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getAsset, getAssetHistory } from "@/services/api";
import { ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AssetDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: asset } = useQuery({
    queryKey: ['asset', id],
    queryFn: () => getAsset(id!),
    refetchInterval: 30000,
  });

  const { data: history } = useQuery({
    queryKey: ['assetHistory', id],
    queryFn: () => getAssetHistory(id!),
  });

  if (!asset) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="brutalist-card p-8 animate-pulse">
          LOADING ASSET DATA...
        </div>
      </div>
    );
  }

  const formatData = history?.map(point => ({
    time: new Date(point.time).toLocaleTimeString(),
    price: Number(point.priceUsd)
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="brutalist-button inline-flex items-center px-4 py-2 mb-8">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to List
      </Link>

      <div className="brutalist-card p-8 mb-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{asset.name}</h1>
            <p className="text-xl">{asset.symbol}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold mb-2">
              ${Number(asset.priceUsd).toFixed(2)}
            </div>
            <div className={`flex items-center justify-end text-xl ${Number(asset.changePercent24Hr) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Number(asset.changePercent24Hr) >= 0 ? <ArrowUpIcon className="w-6 h-6" /> : <ArrowDownIcon className="w-6 h-6" />}
              {Number(asset.changePercent24Hr).toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="h-[400px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formatData}>
              <XAxis dataKey="time" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#000000" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="brutalist-card p-4">
            <div className="text-sm mb-1">Market Cap</div>
            <div className="text-xl font-bold">
              ${Number(asset.marketCapUsd).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="brutalist-card p-4">
            <div className="text-sm mb-1">Rank</div>
            <div className="text-xl font-bold">#{asset.rank}</div>
          </div>
          <div className="brutalist-card p-4">
            <div className="text-sm mb-1">Symbol</div>
            <div className="text-xl font-bold">{asset.symbol}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;