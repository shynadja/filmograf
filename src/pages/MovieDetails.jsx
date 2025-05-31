import { 
  Box, Heading, Text, Badge, Flex, Button,
  Image, VStack, HStack, useToast, Spinner, IconButton
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaArrowLeft, FaStar, FaRegStar } from 'react-icons/fa';
import { CiClock1 } from "react-icons/ci";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const getGenreColor = (genre) => {
  switch(genre) {
    case 'Боевик': return 'orange';
    case 'Триллер': return 'green';
    case 'Комедия': return 'blue';
    case 'Драма': return 'gray';
    default: return 'gray';
  }
};

export default function MovieDetails({ movies, onToggleFavorite, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const foundMovie = movies.find(m => m.id === Number(id));
    
    if (!foundMovie) {
      toast({
        title: 'Фильм не найден',
        description: 'Запрошенный фильм не существует',
        status: 'error',
        duration: 3000,
      });
      navigate('/');
      return;
    }

    setMovie(foundMovie);
    setIsLoading(false);
  }, [id, movies, navigate, toast]);

  const handleDelete = () => {
    onDelete(movie.id);
    toast({
      title: 'Фильм удален',
      description: `${movie.title} успешно удален`,
      status: 'success',
      duration: 3000,
    });
    navigate('/');
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" color="black" thickness="4px" />
      </Flex>
    );
  }

  return (
    <Box py={8} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <Heading as="h1" size="xl" mb={8} color="black">
        {movie.title}
      </Heading>

      <Flex direction={{ base: 'column', md: 'row' }} gap={8} align="flex-start">
        <Box flexShrink={0} w={{ base: '100%', md: '300px' }}>
          <Image
            src={movie.poster}
            alt={movie.title}
            w="100%"
            maxW="300px"
            h="450px"
            objectFit="cover"
            borderRadius="md"
            fallbackSrc="/images/default.jpg"
            boxShadow="lg"
          />
        </Box>

        <Box flex="1">
          <Flex justify="space-between" align="center" mb={6} flexWrap="wrap">
            <HStack spacing={4}>
              <Badge 
                colorScheme={getGenreColor(movie.genre)} 
                fontSize="md" 
                px={3} 
                py={1}
              >
                {movie.genre}
              </Badge>
              <Flex align="center">
                <CiClock1 style={{ marginRight: '8px', color: 'black' }} />
                <Text fontSize="lg">
                  {movie.duration}
                </Text>
              </Flex>
            </HStack>
            
            <IconButton
              aria-label={movie.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
              icon={movie.isFavorite ? <FaStar /> : <FaRegStar />}
              colorScheme="orange"
              variant="ghost"
              onClick={() => onToggleFavorite(movie.id)}
              size="lg"
              _hover={{ transform: 'scale(1.1)' }}
              transition="all 0.2s"
            />
          </Flex>
          
          <Text 
            fontSize="lg" 
            mb={8} 
            whiteSpace="pre-line"
            lineHeight="1.6"
            color="black"
          >
            {movie.description || 'Описание отсутствует'}
          </Text>

          <VStack align="start" spacing={4}>
            <Button
              colorScheme="blue"
              leftIcon={<FaEdit />}
              onClick={() => navigate(`/edit-movie/${movie.id}`)}
              size="lg"
            >
              Редактировать
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              leftIcon={<FaTrash />}
              onClick={handleDelete}
              size="lg"
            >
              Удалить фильм
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}