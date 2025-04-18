import "./globals.css";

export const metadata = {
  title: 'Weather in the World - Compare City Climates',
  description: 'Compare climate data for cities around the world. View temperature, rainfall, and weather patterns for any two cities.',
  keywords: 'weather comparison, city climate, temperature comparison, rainfall data, weather patterns, travel, nomad, digital nomad, remote work, retirement, expat',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-screen w-screen overflow-y-scroll overflow-x-hidden">
      <body className="h-full w-full antialiased flex flex-col overflow-x-hidden">
        <header>
          <nav className="bg-lime-100 p-1 flex align-center w-full">
            <ul className="flex flex-row gap-4 mx-8 my-2">
              <li className="text-xl font-bold hover:text-lime-500 bg-stone-50 px-4 py-2 rounded-md"><a href="/">Home</a></li>
              <li className="text-xl font-bold hover:text-lime-500 bg-stone-50 px-4 py-2 rounded-md"><a href="/cities">Cities</a></li>
            </ul>
          </nav>
        </header>
        {children}
        <footer className="flex items-center justify-center">
          <h3><small>Copyright 2025</small></h3>
        </footer>
      </body>
    </html>
  );
}
