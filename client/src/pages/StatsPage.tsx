import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Work as WorkIcon, 
  People as PeopleIcon, 
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon 
} from '@mui/icons-material';
import { jobsApi, Job } from '../api/jobsApi';

interface StatsData {
  totalJobs: number;
  activeJobs: number;
  completedJobs: number;
  totalValue: number;
  avgPrice: number;
  jobsByType: Record<string, number>;
  jobsByStatus: Record<string, number>;
}

const StatsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const jobsData = await jobsApi.getAllJobs();
        setJobs(jobsData);
        
        // Вычисляем статистику
        const totalJobs = jobsData.length;
        const activeJobs = jobsData.filter(job => job.status === 'Active').length;
        const completedJobs = jobsData.filter(job => job.status === 'Completed').length;
        const totalValue = jobsData.reduce((sum, job) => sum + job.price, 0);
        const avgPrice = totalJobs > 0 ? totalValue / totalJobs : 0;
        
        const jobsByType = jobsData.reduce((acc, job) => {
          acc[job.type] = (acc[job.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        const jobsByStatus = jobsData.reduce((acc, job) => {
          acc[job.status] = (acc[job.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        setStats({
          totalJobs,
          activeJobs,
          completedJobs,
          totalValue,
          avgPrice,
          jobsByType,
          jobsByStatus
        });
        
      } catch (error) {
        console.error('Error fetching jobs', error);
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Статистика JobFinder
        </Typography>
        <Typography variant="h6" component="p" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Анализ данных по вакансиям и работникам
        </Typography>

        {/* Основные метрики */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <WorkIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" component="div" color="primary">
                  {stats?.totalJobs || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Всего вакансий
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <TrendingUpIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" component="div" color="success.main">
                  {stats?.activeJobs || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Активных вакансий
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <MoneyIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" component="div" color="warning.main">
                  ${stats?.totalValue.toFixed(0) || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Общая стоимость
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <PeopleIcon color="info" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" component="div" color="info.main">
                  ${stats?.avgPrice.toFixed(0) || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Средняя зарплата
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
          {/* Распределение по типам */}
          <Box sx={{ flex: '1 1 400px', minWidth: 400 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Распределение по типам работы
              </Typography>
              <List>
                {Object.entries(stats?.jobsByType || {}).map(([type, count]) => (
                  <ListItem key={type}>
                    <ListItemText 
                      primary={type}
                      secondary={`${count} вакансий`}
                    />
                    <Chip 
                      label={`${((count / (stats?.totalJobs || 1)) * 100).toFixed(1)}%`}
                      size="small"
                      color="primary"
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>

          {/* Распределение по статусам */}
          <Box sx={{ flex: '1 1 400px', minWidth: 400 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Распределение по статусам
              </Typography>
              <List>
                {Object.entries(stats?.jobsByStatus || {}).map(([status, count]) => (
                  <ListItem key={status}>
                    <ListItemText 
                      primary={status}
                      secondary={`${count} вакансий`}
                    />
                    <Chip 
                      label={`${((count / (stats?.totalJobs || 1)) * 100).toFixed(1)}%`}
                      size="small"
                      color={
                        status === 'Active' ? 'success' :
                        status === 'Completed' ? 'info' :
                        status === 'InProgress' ? 'warning' : 'error'
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Box>

        {/* Последние вакансии */}
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Последние добавленные вакансии
          </Typography>
          <List>
            {jobs.slice(0, 5).map((job, index) => (
              <React.Fragment key={job.id}>
                <ListItem>
                  <ListItemText 
                    primary={job.title}
                    secondary={`${job.workerName} • $${job.price} • ${job.type}`}
                  />
                  <Chip 
                    label={job.status}
                    size="small"
                    color={
                      job.status === 'Active' ? 'success' :
                      job.status === 'Completed' ? 'info' :
                      job.status === 'InProgress' ? 'warning' : 'error'
                    }
                  />
                </ListItem>
                {index < Math.min(jobs.length, 5) - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default StatsPage;
