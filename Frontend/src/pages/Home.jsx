import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <Hero />
        <RecentlyAdded />
      </div>
    </div>
  )
}