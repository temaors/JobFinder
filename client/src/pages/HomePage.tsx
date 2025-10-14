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
import { jobsApi, Job } from '../api/jobsApi';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  
  // Категории работ (соответствуют типам из API)
  const categories = [
    { value: 'FullTime', label: 'Полная занятость' },
    { value: 'PartTime', label: 'Частичная занятость' },
    { value: 'Contract', label: 'Контракт' },
    { value: 'Freelance', label: 'Фриланс' }
  ];

  // Загрузка вакансий
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const jobsData = await jobsApi.getAllJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs', error);
        setError('Ошибка при загрузке вакансий');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = () => {
    console.log('Searching...', { searchTerm, location, category });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleJobSelect = (job: Job) => {
    navigate(`/jobs`);
  };

  // Фильтрация вакансий
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || job.location?.toLowerCase().includes(location.toLowerCase());
    const matchesCategory = !category || job.type === category;
    return matchesSearch && matchesLocation && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'InProgress': return 'warning';
      case 'Completed': return 'info';
      case 'Cancelled': return 'error';
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
          onClick={() => navigate('/jobs')}
          sx={{ mr: 2 }}
        >
          Найти работу
        </Button>
        
        <Button 
          variant="outlined" 
          color="inherit" 
          size="large"
          onClick={() => navigate('/jobs')}
        >
          Посмотреть вакансии
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

      {/* Последние вакансии */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Последние вакансии
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
        ) : filteredJobs.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              {jobs.length === 0 ? 'Вакансии не найдены' : 'Вакансии не найдены по заданным критериям'}
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredJobs.slice(0, 6).map((job) => (
              <Grid item key={job.id} xs={12} sm={6} md={4}>
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
                  onClick={() => handleJobSelect(job)}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flex: 1 }}>
                        {job.title}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                        ${job.price}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
                      {job.description.length > 100 
                        ? `${job.description.substring(0, 100)}...` 
                        : job.description}
                    </Typography>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <WorkIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {job.workerName || 'Не указан'}
                      </Typography>
                    </Box>

                    {job.location && (
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {job.location}
                        </Typography>
                      </Box>
                    )}

                    <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                      <Chip
                        label={job.status}
                        color={getStatusColor(job.status) as any}
                        size="small"
                      />
                      <Chip
                        label={job.type}
                        color="default"
                        size="small"
                      />
                      {job.isRemote && (
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
                        {new Date(job.createdAt).toLocaleDateString()}
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
                        navigate('/jobs');
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