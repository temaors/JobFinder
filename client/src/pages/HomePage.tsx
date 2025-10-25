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
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Alert,
  Avatar,
  Divider
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { servicesApi, Service } from '../api/jobsApi';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  
  // Категории услуг
  const categories = [
    { value: 'Cleaning', label: 'Клининг' },
    { value: 'Repair', label: 'Ремонт' },
    { value: 'Delivery', label: 'Доставка' },
    { value: 'Gardening', label: 'Садоводство' },
    { value: 'PetCare', label: 'Уход за животными' },
    { value: 'Tutoring', label: 'Репетиторство' },
    { value: 'Photography', label: 'Фотография' },
    { value: 'Beauty', label: 'Красота' },
    { value: 'Other', label: 'Другое' }
  ];

  // Загрузка услуг
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const servicesData = await servicesApi.getAllServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services', error);
        setError('Ошибка при загрузке услуг');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSearch = () => {
    console.log('Searching...', { searchTerm, location, category });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleServiceSelect = (service: Service) => {
    navigate(`/services`);
  };

  // Фильтрация услуг
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || service.location?.toLowerCase().includes(location.toLowerCase());
    const matchesCategory = !category || service.category === category;
    return matchesSearch && matchesLocation && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Unavailable': return 'error';
      case 'Paused': return 'warning';
      default: return 'default';
    }
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
        
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => navigate('/services')}
          sx={{ mr: 2 }}
        >
          Найти работника
        </Button>
        
        <Button 
          variant="outlined" 
          color="inherit" 
          size="large"
          onClick={() => navigate('/services')}
        >
          Посмотреть услуги
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
                  <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
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
          {categories.map((cat) => (
            <Chip
              key={cat.value}
              label={cat.label}
              clickable
              onClick={() => setCategory(cat.value)}
              color={category === cat.value ? 'primary' : 'default'}
              sx={{ mb: 1 }}
            />
          ))}
        </Box>
      </Box>

      {/* Последние услуги */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Популярные услуги
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : filteredServices.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              {services.length === 0 ? 'Услуги не найдены' : 'Услуги не найдены по заданным критериям'}
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredServices.slice(0, 6).map((service) => (
              <Grid item key={service.id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                  onClick={() => handleServiceSelect(service)}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flex: 1 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                        {service.price} ₽
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
                      {service.description.length > 100 
                        ? `${service.description.substring(0, 100)}...` 
                        : service.description}
                    </Typography>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <WorkIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {service.workerName || 'Не указан'}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={0.5} ml={1}>
                        <Typography variant="body2" color="text.secondary">
                          ⭐ {service.rating.toFixed(1)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ({service.completedOrders})
                        </Typography>
                      </Box>
                    </Box>

                    {service.location && (
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {service.location}
                        </Typography>
                      </Box>
                    )}

                    <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                      <Chip
                        label={categories.find(c => c.value === service.category)?.label || service.category}
                        color="primary"
                        size="small"
                      />
                      <Chip
                        label={service.status === 'Available' ? 'Доступно' : service.status === 'Unavailable' ? 'Недоступно' : 'Приостановлено'}
                        color={getStatusColor(service.status) as any}
                        size="small"
                      />
                      {service.isRemote && (
                        <Chip
                          label="Удаленно"
                          color="info"
                          size="small"
                        />
                      )}
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <ScheduleIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(service.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/services');
                      }}
                    >
                      Подробнее
                    </Button>
                  </CardActions>
                </Card>
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