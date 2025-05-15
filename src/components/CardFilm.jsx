import { Box, Text, Image, Icon, HStack } from "@chakra-ui/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import MoviesData from "../data/movies.json";

export default function CardFilm({ movie }) {
  return (
    <Box w="350px" h="325px" my="205px" border="1px" borderColor="#DEE2E6" borderRadius="12px">
      <Image
        src={movie.imageUrl}
        alt={movie.title}
        w="350px"
        h="192px"
        objectFit="cover"
        borderRadius="12px 12px 0 0"
      />
      <Box p="24px" gap="24px" w="350px" h="75px">
        <Text fontSize="22px" fontWeight="600">
          {movie.title}
        </Text>
      </Box>
        <Text fontSize="14px" fontWeight="400">
          {movie.genre} <GoClock /> {movie.duration} мин
        </Text>
        <Icon
          as={movie.isFavorite ? FaStar : FaRegStar}
          color="#F9A62B"
          fontSize="20px"
          cursor=""
        />

    </Box>
  );
}