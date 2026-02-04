import { CryptoList } from "@/components/ui/home/crypto-list";
import { TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <header className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              CryptoTrack
            </h1>
          </div>
          <p className="mt-3 text-muted-foreground">
            Real-time cryptocurrency prices and market data
          </p>
        </header>

        <CryptoList />

        <footer className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>Data provided by CoinGecko API</p>
        </footer>
      </div>
    </main>
  );
}
