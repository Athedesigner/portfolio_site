import Image from "next/image";
import BackgroundImages from "./components/BackgroundImages";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BackgroundImages />
      <div className="relative z-20 p-8">
        <h1 className="text-4xl font-bold">Welcome to My Next.js App</h1>
        <p className="mt-4 text-lg">Scroll down to see the background images disappear.</p>
        {/* Add more content here */}
      </div>

    </main>
  );
}
