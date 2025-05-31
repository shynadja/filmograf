import { 
  Box, Heading, SimpleGrid, Flex, Text, 
  Tag, TagLabel, HStack
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import MovieCard from '../components/MovieCard';

export default function Home({ movies, onToggleFavorite }) {
  const [selectedGenres, setSelectedGenres] = useState(['Боевик', 'Триллер', 'Комедия', 'Драма']);

  const toggleGenreSelection = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const filteredMovies = movies.filter(movie => 
    selectedGenres.includes(movie.genre)
  );

  const getGenreColor = (genre) => {
    switch(genre) {
      case 'Боевик': return 'orange';
      case 'Триллер': return 'green';
      case 'Комедия': return 'blue';
      case 'Драма': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <Box py={8} px={{ base: 4, md: 8 }}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl" color="black">
          Фильмы
        </Heading>
        
        <HStack spacing={2}>
          {['Боевик', 'Триллер', 'Комедия', 'Драма'].map(genre => (
            <Tag
              key={genre}
              size="lg"
              variant={selectedGenres.includes(genre) ? 'solid' : 'outline'}
              colorScheme={getGenreColor(genre)}
              cursor="pointer"
              onClick={() => toggleGenreSelection(genre)}
              borderRadius="full"
            >
              <TagLabel>{genre}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </Flex>

      {filteredMovies.length > 0 ? (
        <>
          <Text mb={4} fontSize="sm" color="gray.500">
            Выбрано жанров: {selectedGenres.length} | Показано фильмов: {filteredMovies.length}
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {filteredMovies.map(movie => (
              <MovieCard 
                key={movie.id}
                movie={movie}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </SimpleGrid>
        </>
      ) : (
        <Box textAlign="center" p={10} bg="white" borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="md" mb={4} color="black">
            Фильмы не выбраны
          </Heading>
        </Box>
      )}
    </Box>
  );
}