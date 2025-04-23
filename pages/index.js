'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home({ movies }) {
  const router = useRouter()

  if (!movies) {
    return (
      <main className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <h2 className="text-2xl text-red-500">No movie data found!</h2>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl text-red-600 font-bold text-center mb-10">🎬 Trending Movies</h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => router.push('/genres')}
            className="bg-red-600 text-white px-8 py-3 rounded-lg shadow-xl hover:bg-red-700 transition duration-300 transform hover:scale-105"
          > 
            Browse Genres
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <div className="cursor-pointer bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-bold mb-3 text-red-500">{movie.title}</h2>
                <p className="text-gray-400 text-sm mb-2">{movie.description}</p>
                <p className="text-gray-300 text-xs">
                  Released: {movie.releaseYear} | Rating: {movie.rating}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000/api/movies')
    const data = await res.json()
    if (!data.movies || data.movies.length === 0) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        movies: data.movies,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching movie data:', error)
    return {
      notFound: true,
    }
  }
}
