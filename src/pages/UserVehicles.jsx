import Header from "../components/Header";
import UserVehicleList from "../components/UserVehicleList";

export default function UserVehicles() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950">
      <Header />
      <main className="flex-1 bg-neutral-900/98 px-6">
          <UserVehicleList />
      </main>
    </div>
  );
}
