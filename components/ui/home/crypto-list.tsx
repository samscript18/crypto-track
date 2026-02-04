"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, TrendingUp, TrendingDown, AlertCircle, Loader2 } from "lucide-react";
import { getCryptoAssets } from "@/lib/services/cryptolist.service";
import { formatMarketCap, formatPrice } from "@/lib/helpers";
import Image from "next/image";

export function CryptoList() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: assets,
    isLoading,
    isRefetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-crypto-assets"],
    queryFn: getCryptoAssets,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const filteredAssets = assets?.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading || isRefetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading digital assets...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-destructive/50 bg-destructive/10">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-xl font-semibold text-foreground">Failed to Load Data</h3>
          <p className="mt-2 text-center text-muted-foreground">
            {error instanceof Error ? error.message : "Something went wrong. Please try again later."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search assets by name or symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 pl-10 text-base bg-card border-border placeholder:text-muted-foreground"
        />
      </div>

      {filteredAssets && filteredAssets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg text-muted-foreground">No assets found matching &quot;{searchQuery}&quot;</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium text-muted-foreground">
              {filteredAssets?.length} Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">#</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Asset</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Price</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">24h Change</th>
                    <th className="hidden px-4 py-3 text-right text-sm font-medium text-muted-foreground sm:table-cell">
                      Market Cap
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets?.sort((a, b) => a.market_cap_rank - b.market_cap_rank)?.map((asset) => (
                    <tr
                      key={asset.id}
                      className="border-b border-border/50 transition-colors hover:bg-secondary/50"
                    >
                      <td className="px-4 py-4 text-sm text-muted-foreground">{asset.market_cap_rank}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={asset.image || ''}
                            alt={asset.name}
                            className="h-8 w-8 rounded-full"
                            width={32}
                            height={32}
                          />
                          <div>
                            <p className="font-medium text-foreground">{asset.name}</p>
                            <p className="text-sm uppercase text-muted-foreground">{asset.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-foreground">
                        {formatPrice(asset.current_price)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div
                          className={`inline-flex items-center gap-1 font-medium ${asset.price_change_percentage_24h >= 0
                            ? "text-primary"
                            : "text-destructive"
                            }`}
                        >
                          {asset.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
                        </div>
                      </td>
                      <td className="hidden px-4 py-4 text-right text-sm text-muted-foreground sm:table-cell">
                        {formatMarketCap(asset.market_cap)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
