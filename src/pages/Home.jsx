import Header from "../components/Header";
import BannerHero from "../components/BannerHero";
import AllVehicles from "../components/AllVehicles";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950">
      <Header />
      <main className="flex-1 bg-neutral-900/98 p-6">
      <BannerHero />
      <AllVehicles />
      </main>

    </div>
  );
}
