import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  TextField, 
  InputAdornment,
  FormControl,
  InputLabel,
  Chip,
  Rating,
  Grid // Импортируем Grid здесь
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Импортируем Select отдельно
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { WorkerCard } from '../components/workers/WorkerCard';
// import { WorkerDto } from '../types/workerTypes';
// import { useApi } from '../hooks/useApi';
// import { useAuth } from '../hooks/useAuth';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const api = useApi();
  const [workers, setWorkers] = useState<WorkerDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  
  // Категории работ
  const categories = [
    'Сантехника',
    'Электрика',
    'Уборка',
    'Ремонт',
    'Грузоперевозки',
    'Клининг',
    'Строительство',
    'Домохозяйки'
  ];

  // Загрузка работников
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/workers', {
          params: { 
            search: searchTerm, 
            location, 
            category 
          }
        });
        setWorkers(response.data);
      } catch (error) {
        console.error('Error fetching workers', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [searchTerm, location, category]);

  const handleSearch = () => {
    console.log('Searching...', { searchTerm, location, category });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleWorkerSelect = (worker: WorkerDto) => {
    navigate(`/workers/${worker.id}`);
  };

  return (
    <Container maxWidth="lg">
      {/* Герой-секция */}
      <Box 
        sx={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/home-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          py: 10,
          px: 4,
          borderRadius: 2,
          textAlign: 'center',
          mb: 4
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Найдите профессионала для любой задачи
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ mb: 3 }}>
          Сантехники, электрики, уборщики и другие специалисты готовы помочь прямо сейчас
        </Typography>
        
        {!user && (
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            Зарегистрироваться
          </Button>
        )}
        
        <Button 
          variant="outlined" 
          color="inherit" 
          size="large"
          onClick={() => navigate('/workers')}
        >
          Найти работника
        </Button>
      </Box>

      {/* Поисковая панель */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Что нужно сделать?"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Местоположение"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                value={category}
                label="Категория"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">Все категории</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
              Найти
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Популярные категории */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Популярные категории
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {categories.slice(0, 6).map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              onClick={() => setCategory(cat)}
              color={category === cat ? 'primary' : 'default'}
              sx={{ mb: 1 }}
            />
          ))}
        </Box>
      </Box>

      {/* Рекомендуемые работники */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Рекомендуемые работники
        </Typography>
        
        {loading ? (
          <Typography>Загрузка...</Typography>
        ) : workers.length === 0 ? (
          <Typography>Работники не найдены</Typography>
        ) : (
          <Grid container spacing={3}>
            {workers.slice(0, 6).map((worker) => (
              <Grid item key={worker.id} xs={12} sm={6} md={4}>
                <WorkerCard 
                  worker={worker} 
                  onSelect={handleWorkerSelect} 
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Преимущества сервиса */}
      <Box sx={{ py: 4, backgroundColor: '#f5f5f5', borderRadius: 2, px: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Почему выбирают нас
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Box fontSize={40} mb={1}>⭐</Box>
              <Typography variant="h6" gutterBottom>Проверенные работники</Typography>
              <Typography>Все специалисты проходят верификацию и проверку отзывов</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Box fontSize={40} mb={1}>💸</Box>
              <Typography variant="h6" gutterBottom>Фиксированные цены</Typography>
              <Typography>Цены указаны заранее, без скрытых комиссий</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Box fontSize={40} mb={1}>🛡️</Box>
              <Typography variant="h6" gutterBottom>Гарантия качества</Typography>
              <Typography>Возврат средств при некачественном выполнении работы</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Отзывы клиентов */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Отзывы наших клиентов
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} md={4} key={item}>
              <Paper sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box 
                    sx={{ 
                      width: 50, 
                      height: 50, 
                      borderRadius: '50%', 
                      backgroundColor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    U
                  </Box>
                  <Box>
                    <Typography fontWeight="bold">Иван Иванов</Typography>
                    <Typography color="text.secondary">Клиент</Typography>
                  </Box>
                </Box>
                <Rating value={5} readOnly sx={{ mb: 1 }} />
                <Typography>
                  "Нашел отличного сантехника за 15 минут! Приехал через час, все починил быстро и качественно."
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;