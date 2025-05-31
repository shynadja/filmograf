import { 
  Box, Heading, VStack, HStack, Text, Button, 
  Badge, Flex, Alert, AlertIcon, Spinner, Avatar
} from '@chakra-ui/react';
import { FaTrash, FaStar } from 'react-icons/fa';
import { CiClock1 } from "react-icons/ci";
import { useEffect, useState } from 'react';

const getGenreColor = (genre) => {
  switch(genre) {
    case 'Боевик': return 'orange';
    case 'Триллер': return 'green';
    case 'Комедия': return 'blue';
    case 'Драма': return 'gray';
    default: return 'gray';
  }
};

export default function Favorites({ movies, onToggleFavorite }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const favoriteMovies = movies.filter(movie => movie.isFavorite);

  if (isLoading) {
    return (
      <Flex justify="center" mt={20}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box py={8} px={{ base: 4, md: 8 }}>
      <Heading as="h1" size="xl" mb={8}>
        Избранное
      </Heading>

      {favoriteMovies.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {favoriteMovies.map(movie => (
            <Box
              key={movie.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              boxShadow="sm"
            >
              <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                  <Avatar 
                    src={movie.poster} 
                    name={movie.title}
                    size="lg"
                    borderRadius="md"
                    bg="blue.500" // Фиксированный синий цвет для аватара без изображения
                    color="white" // Белый цвет текста для fallback
                  />
                  <Box>
                    <Heading as="h3" size="md" mb={1}>
                      {movie.title}
                    </Heading>
                    <HStack spacing={2} mb={2}>
                      <Badge colorScheme={getGenreColor(movie.genre)}>
                        {movie.genre}
                      </Badge>
                      <Flex align="center">
                        <CiClock1 style={{ marginRight: '4px', color: 'black' }} />
                        <Text fontSize="sm">{movie.duration}</Text>
                      </Flex>
                    </HStack>
                  </Box>
                </HStack>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="gray"
                    leftIcon={<FaTrash />}
                    onClick={() => onToggleFavorite(movie.id)}
                  >
                    Удалить
                  </Button>
                </HStack>
              </Flex>
            </Box>
          ))}
        </VStack>
      ) : (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Нет избранных фильмов. Добавьте их со страницы Все фильмы.
        </Alert>
      )}
    </Box>
  );
}