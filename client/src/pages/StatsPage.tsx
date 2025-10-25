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
import { servicesApi, Service } from '../api/jobsApi';

interface StatsData {
  totalServices: number;
  activeServices: number;
  completedOrders: number;
  totalValue: number;
  avgPrice: number;
  servicesByCategory: Record<string, number>;
  servicesByStatus: Record<string, number>;
}

const StatsPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const servicesData = await servicesApi.getAllServices();
        setServices(servicesData);
        
        // Вычисляем статистику
        const totalServices = servicesData.length;
        const activeServices = servicesData.filter(service => service.status === 'Available').length;
        const completedOrders = servicesData.reduce((sum, service) => sum + service.completedOrders, 0);
        const totalValue = servicesData.reduce((sum, service) => sum + Number(service.price), 0);
        const avgPrice = totalServices > 0 ? totalValue / totalServices : 0;
        
        const servicesByCategory = servicesData.reduce((acc, service) => {
          acc[service.category] = (acc[service.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        const servicesByStatus = servicesData.reduce((acc, service) => {
          acc[service.status] = (acc[service.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        setStats({
          totalServices,
          activeServices,
          completedOrders,
          totalValue,
          avgPrice,
          servicesByCategory,
          servicesByStatus
        });
        
      } catch (error) {
        console.error('Error fetching services', error);
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
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
                  {stats?.totalServices || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Всего услуг
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <TrendingUpIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" component="div" color="success.main">
                  {stats?.activeServices || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Доступных услуг
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <MoneyIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" component="div" color="warning.main">
                  {stats?.totalValue.toFixed(0) || 0} ₽
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
                  {stats?.completedOrders || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Выполнено заказов
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
          {/* Распределение по категориям */}
          <Box sx={{ flex: '1 1 400px', minWidth: 400 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Распределение по категориям
              </Typography>
              <List>
                {Object.entries(stats?.servicesByCategory || {}).map(([category, count]) => (
                  <ListItem key={category}>
                    <ListItemText 
                      primary={category}
                      secondary={`${count} услуг`}
                    />
                    <Chip 
                      label={`${((count / (stats?.totalServices || 1)) * 100).toFixed(1)}%`}
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
                {Object.entries(stats?.servicesByStatus || {}).map(([status, count]) => (
                  <ListItem key={status}>
                    <ListItemText 
                      primary={status}
                      secondary={`${count} услуг`}
                    />
                    <Chip 
                      label={`${((count / (stats?.totalServices || 1)) * 100).toFixed(1)}%`}
                      size="small"
                      color={
                        status === 'Available' ? 'success' :
                        status === 'Unavailable' ? 'error' :
                        status === 'Paused' ? 'warning' : 'default'
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Box>

        {/* Последние услуги */}
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Последние добавленные услуги
          </Typography>
          <List>
            {services.slice(0, 5).map((service, index) => (
              <React.Fragment key={service.id}>
                <ListItem>
                  <ListItemText 
                    primary={service.title}
                    secondary={`${service.workerName} • ${service.price} ₽ • ${service.category}`}
                  />
                  <Chip 
                    label={service.status}
                    size="small"
                    color={
                      service.status === 'Available' ? 'success' :
                      service.status === 'Unavailable' ? 'error' :
                      service.status === 'Paused' ? 'warning' : 'default'
                    }
                  />
                </ListItem>
                {index < Math.min(services.length, 5) - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default StatsPage;
