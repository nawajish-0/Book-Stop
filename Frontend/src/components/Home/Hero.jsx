import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <div className="min-h-[75vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-12 py-16">
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground text-center lg:text-left leading-tight">
          Discover Your Next Great Read
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center lg:text-left max-w-2xl">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collections of books.
        </p>
        <Link
          to="/all-books"
          className="inline-flex items-center px-6 py-3 text-lg font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-full transition-colors duration-300 ease-in-out group"
        >
          Discover Books
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
        </Link>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img
          className="rounded-3xl shadow-2xl max-w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          src="./hero.png"
          alt="Bookstore hero image"
          width={600}
          height={400}
        />
      </div>
    </div>
  )
}