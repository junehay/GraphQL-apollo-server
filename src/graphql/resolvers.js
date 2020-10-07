import movies from '../db/movies';

const resolvers = {
  Query: {
    movies: () => movies,
    movie: (_, { id }) => {
      return movies.filter(movie => movie.id === id)[0];
    }
  },
  Mutation: {
    addMovie: (_, { name, rating }) => {
      // 영화 제목 중복 검사
      if (movies.find(movie => movie.name === name)) return null;
      
      const newMovie = {
        id: movies.length + 1,
        name,
        rating
      };
      movies.push(newMovie);
      return newMovie;
    },

    deleteMovie: (_, { id }) => {
      let targetIndex;
      const cleanedMovies = movies.filter((movie, index) => {
        if (movie.id === id) {
          targetIndex = index;
        }
        return movie.id !== id
      });
      if (movies.length > cleanedMovies.length) {
        movies.splice(targetIndex,1);
        return true;
      } else {
        return false;
      }
    }
  }
};

export default resolvers;