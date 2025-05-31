import { 
  Box, Heading, Text, Badge, Flex,
  Image, Stack
} from '@chakra-ui/react';
import { CiClock1 } from "react-icons/ci";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const getGenreColor = (genre) => {
  switch(genre) {
    case 'Боевик': return 'orange';
    case 'Триллер': return 'green';
    case 'Комедия': return 'blue';
    case 'Драма': return 'gray';
    default: return 'gray';
  }
};

export default function MovieCard({ movie, onToggleFavorite }) {
  return (
    <MotionBox
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
      transition="all 0.2s"
      position="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box position="relative">
        <Image
          src={movie.poster}
          alt={movie.title}
          w="100%"
          h="300px"
          objectFit="cover"
          fallbackSrc="/images/default.jpg"
        />
      </Box>

      <Box p={4}>
        <Heading as="h3" size="md" mb={2} noOfLines={1}>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </Heading>
        
        <Flex justify="space-between" align="center">
          <Stack direction="row" spacing={2} align="center">
            <Badge colorScheme={getGenreColor(movie.genre)}>
              {movie.genre}
            </Badge>
            <Flex align="center" color="black">
              <CiClock1 style={{ marginRight: '4px' }} />
              <Text fontSize="sm">{movie.duration}</Text>
            </Flex>
          </Stack>
          
          <Box
            as="button"
            onClick={() => onToggleFavorite(movie.id)}
            color="orange.500"
            transition="all 0.2s"
            _hover={{ transform: 'scale(1.1)' }}
          >
            {movie.isFavorite ? (
              <FaStar size={20} />
            ) : (
              <FaRegStar size={20} />
            )}
          </Box>
        </Flex>
      </Box>
    </MotionBox>
  );
}