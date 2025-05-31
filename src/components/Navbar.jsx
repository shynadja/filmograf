import { Flex, Box, Text, IconButton } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FaFilm, FaStar, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Navbar() {
  return (
    <Flex
      as="nav"
      bg="white"
      p={4}
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="sticky"
      boxShadow="md"
    >

      <Flex gap={{ base: 3, md: 6 }}>
        <NavLink 
          to="/"
          style={({ isActive }) => ({
            color: 'black',
            fontWeight: isActive ? 'semibold' : 'normal',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          })}
        >
          <FaFilm />
          <Text display={{ base: 'none', md: 'block' }}>Все фильмы</Text>
        </NavLink>
        
        <NavLink 
          to="/favorites"
          style={({ isActive }) => ({
            color: 'black',
            fontWeight: isActive ? 'semibold' : 'normal',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          })}
        >
          <FaStar />
          <Text display={{ base: 'none', md: 'block' }}>Избранное</Text>
        </NavLink>
        
        <NavLink 
          to="/add-movie"
          style={({ isActive }) => ({
            color: 'black',
            fontWeight: isActive ? 'semibold' : 'normal',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          })}
        >
          <FaPlus />
          <Text display={{ base: 'none', md: 'block' }}>Добавить фильм</Text>
        </NavLink>
      </Flex>
    </Flex>
  );
}