import { Heading, Flex, Grid, Box, Checkbox, HStack, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CardFilm from "../components/CardFilm";
import moviesData from "../data/movies.json";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const updatedMovies = await Promise.all(
          moviesData.map(async (movie) => {
            try {
              const image = await import(`../assets/${movie.image}`);
              return { ...movie, imageUrl: image.default };
            } catch (error) {
              console.error("Ошибка загрузки изображения:", movie.image, error);
              return { ...movie, imageUrl: "" };
            }
          })
        );
        setMovies(updatedMovies);
        setFilteredMovies(updatedMovies);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (selectedGenres.length === 0) {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter((movie) => selectedGenres.includes(movie.genre)));
    }
  }, [selectedGenres, movies]);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box w="1440px" minH="100vh">
      <Flex justify="space-between" mx="133px" align="center">
        <Heading fontSize="40px" fontWeight="700" color="#000000" my="94px">
          Фильмы
        </Heading>
        
        <HStack spacing="20px">
          {[
            { genre: "Боевик", color: "#EA580B" },
            { genre: "Триллер", color: "#17A34A" },
            { genre: "Комедия", color: "#2463EB" },
            { genre: "Драма", color: "#18181B" }
          ].map(({ genre, color }) => (
            <Checkbox.Root
              key={genre}
              isChecked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control 
                borderRadius="full"
                borderColor={color}
                _checked={{
                  bg: color,
                  borderColor: color,
                  color: "white"
                }}
              />
              <Checkbox.Label ml="8px">{genre}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </HStack>
      </Flex>

      <Grid
        templateColumns="repeat(3, 1fr)"
        columnGap="60px"
        rowGap="45px"
        mx="135px"
        mb="50px"
      >
        {filteredMovies.map((movie) => (
          <CardFilm key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Box>
  );
}