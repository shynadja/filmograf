import { Link, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router";

export default function Header() {

  return (
    <Flex gap="28px" mx="135px" my="34px">
      <NavLink to="/">
        {({ isActive }) => (
          <Link
            as="span"
            fontSize="16px"
            fontWeight="500"
            color={isActive ? "#4A61DD" : "#000000"}
       
          >
            Все фильмы
          </Link>
        )}
      </NavLink>
      
      <NavLink to="/saved">
        {({ isActive }) => (
          <Link
            as="span"
            fontSize="16px"
            fontWeight="500"
            color={isActive ? "#4A61DD" : "#000000"}
         
          >
            Избранное
          </Link>
        )}
      </NavLink>
      
      <NavLink to="/film/:id">
        {({ isActive }) => (
          <Link
            as="span"
            fontSize="16px"
            fontWeight="500"
            color={isActive ? "#4A61DD" : "#000000"}
           
          >
            Добавить фильм
          </Link>
        )}
      </NavLink>
    </Flex>
  );
}