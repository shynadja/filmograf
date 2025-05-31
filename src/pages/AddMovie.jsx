import { 
  Box, 
  Heading, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea,
  Button, 
  VStack,
  RadioGroup,
  Radio,
  HStack,
  useToast,
  Flex,
  Alert,
  AlertIcon,
  Spinner
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

const genres = ['Боевик', 'Триллер', 'Комедия', 'Драма'];

const getGenreColorScheme = (genre) => {
  switch(genre) {
    case 'Боевик': return 'orange';
    case 'Триллер': return 'green';
    case 'Комедия': return 'blue';
    case 'Драма': return 'gray';
    default: return 'gray';
  }
};

export default function AddMovie({ onAddMovie }) {
  const { 
    register, 
    handleSubmit, 
    control, 
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: {
      title: '',
      genre: 'Боевик',
      duration: '',
      description: '',
      poster: ''
    }
  });
  
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const newMovie = {
        ...data,
        duration: `${data.duration} мин.`

      };

      await onAddMovie(newMovie);

      toast({
        title: 'Фильм добавлен',
        description: `${newMovie.title} успешно добавлен в коллекцию`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось добавить фильм',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box py={8} px={{ base: 4, md: 8 }} maxW="800px" mx="auto">
      <Heading as="h1" size="xl" mb={8} textAlign="center" color="black">
        Добавить фильм
      </Heading>

      <Box 
        as="form" 
        onSubmit={handleSubmit(onSubmit)} 
        bg="white" 
        p={6} 
        borderRadius="lg" 
        boxShadow="md"
      >
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel color="black">Название фильма</FormLabel>
            <Input
              {...register('title', { 
                required: 'Обязательное поле',
                minLength: {
                  value: 2,
                  message: 'Минимум 2 символа'
                }
              })}
              placeholder="Например: Матрица"
              focusBorderColor="blue"
              disabled={isSubmitting}
            />
            {errors.title && (
              <Alert status="error" mt={2} borderRadius="md">
                <AlertIcon />
                {errors.title.message}
              </Alert>
            )}
          </FormControl>

          <FormControl>
            <FormLabel color="black">Жанр</FormLabel>
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack spacing={4} wrap="wrap">
                    {genres.map(genre => (
                      <Radio 
                        key={genre} 
                        value={genre}
                        colorScheme={getGenreColorScheme(genre)}
                        borderColor={`${getGenreColorScheme(genre)}.400`}
                        _checked={{
                          bg: `${getGenreColorScheme(genre)}.400`,
                          borderColor: `${getGenreColorScheme(genre)}.400`
                        }}
                        isDisabled={isSubmitting}
                      >
                        {genre}
                      </Radio>
                    ))}
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          
          <FormControl isInvalid={!!errors.duration}>
            <FormLabel color="black">Длительность (минут)</FormLabel>
            <Input
              type="number"
              {...register('duration', { 
                required: 'Обязательное поле',
                min: { 
                  value: 1, 
                  message: 'Минимум 1 минута' 
                },
                max: {
                  value: 300,
                  message: 'Максимум 300 минут'
                }
              })}
              placeholder="Например: 136"
              focusBorderColor="blue"
              disabled={isSubmitting}
            />
            {errors.duration && (
              <Alert status="error" mt={2} borderRadius="md">
                <AlertIcon />
                {errors.duration.message}
              </Alert>
            )}
          </FormControl>

          <FormControl>
            <FormLabel color="black">Описание</FormLabel>
            <Textarea
              {...register('description')}
              placeholder="Описание фильма..."
              rows={5}
              focusBorderColor="blue"
              disabled={isSubmitting}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="black">Загрузить постер</FormLabel>
            <Controller
              name="poster"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Ссылка на изображение"
                  focusBorderColor="blue"
                  disabled={isSubmitting}
                />
              )}
            />
          </FormControl>

          <Flex justify="flex-end" w="full" gap={4}>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              color="blue.600"
              borderColor="blue.300"
              isDisabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button 
              colorScheme="blue" 
              type="submit" 
              leftIcon={isSubmitting ? <Spinner size="sm" /> : <FaPlus />}
              isLoading={isSubmitting}
              loadingText="Добавление..."
            >
              Добавить фильм
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}