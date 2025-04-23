import Link from 'next/link'
import data from '../../../data.json' 

export async function getStaticPaths() {
  const paths = data.movies.map((movie) => ({
    params: { id: movie.id }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const movie = data.movies.find((m) => m.id === params.id)

  if (!movie) {
    return { notFound: true }
  }

  const director = data.directors.find((d) => d.id === movie.directorId)

  if (!director) {
    return { notFound: true }
  }

  return {
    props: {
      director,
      movieTitle: movie.title,
      movieId: movie.id
    },
    revalidate: 60
  }
}

export default function DirectorPage({ director, movieTitle, movieId }) {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl text-red-500 font-bold mb-6">🎬 Director Info</h1>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">{director.name}</h2>
          <p className="text-gray-300 text-md mb-3">{director.biography}</p>
        </div>

        <div className="mt-8 flex justify-between items-center">
       

          <Link href="/">
            <button className="text-sm text-gray-400 hover:underline">
              🔙 Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
