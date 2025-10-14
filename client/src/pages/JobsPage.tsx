import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  CircularProgress,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add, Work, LocationOn, Remote } from '@mui/icons-material';
import { jobsApi, Job, CreateJobRequest } from '../api/jobsApi';

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading jobs...');
      const jobsData = await jobsApi.getAllJobs();
      console.log('Jobs loaded:', jobsData);
      setJobs(jobsData);
    } catch (err) {
      console.error('Error loading jobs:', err);
      setError('Ошибка при загрузке вакансий: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || job.type === filterType;
    return matchesSearch && matchesType;
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'FullTime': return 'primary';
      case 'PartTime': return 'secondary';
      case 'Contract': return 'warning';
      case 'Freelance': return 'info';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Вакансии
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {/* TODO: Open create job dialog */}}
        >
          Добавить вакансию
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Поиск вакансий"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 300 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Тип работы</InputLabel>
          <Select
            value={filterType}
            label="Тип работы"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="all">Все типы</MenuItem>
            <MenuItem value="FullTime">Полная занятость</MenuItem>
            <MenuItem value="PartTime">Частичная занятость</MenuItem>
            <MenuItem value="Contract">Контракт</MenuItem>
            <MenuItem value="Freelance">Фриланс</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                    {job.title}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    ${job.price}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {job.description.length > 150 
                    ? `${job.description.substring(0, 150)}...` 
                    : job.description}
                </Typography>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Work fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {job.workerName}
                  </Typography>
                </Box>

                {job.location && (
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Box>
                )}

                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    label={job.status}
                    color={getStatusColor(job.status) as any}
                    size="small"
                  />
                  <Chip
                    label={job.type}
                    color={getTypeColor(job.type) as any}
                    size="small"
                  />
                  {job.isRemote && (
                    <Chip
                      icon={<Remote />}
                      label="Удаленно"
                      color="info"
                      size="small"
                    />
                  )}
                </Box>

                <Typography variant="caption" color="text.secondary">
                  Создано: {new Date(job.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredJobs.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            Вакансии не найдены
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default JobsPage; 