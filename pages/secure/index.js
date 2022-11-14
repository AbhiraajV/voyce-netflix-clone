import { useSession, getSession } from "next-auth/client";
import { redirect } from "next/dist/next-server/server/api-utils";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import MoviesCollection from "../../components/MoviesCollection";
import ShowsCollection from "../../components/ShowsCollection";
import Slider from "../../components/slider";
export default function Protected({ popularMovies, top_ratedMovies }) {
  const [session, loading] = useSession();
  return (
    <div className="bg-black text-white h-[110%]">
      <Header session={session} />
      <Slider />
      <MoviesCollection results={popularMovies} title={"Popular Movies"} />
      <MoviesCollection results={top_ratedMovies} title={"Top Rated Movies"} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const [popularMoviesRes, top_ratedMoviesRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    ),
  ]);
  const [popularMovies, top_ratedMovies] = await Promise.all([
    popularMoviesRes.json(),

    top_ratedMoviesRes.json(),
  ]);

  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      top_ratedMovies: top_ratedMovies.results,
    },
  };
}
