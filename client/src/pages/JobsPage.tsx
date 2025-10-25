import React, { useState, useEffect } from 'react';
import {
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
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
 
import { Add, Work, LocationOn, LaptopMac, Star, Person } from '@mui/icons-material';
import { servicesApi, Service, CreateServiceRequest, CreateOrderRequest } from '../api/jobsApi';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState<CreateOrderRequest>({
    serviceId: '',
    scheduledDate: '',
    customerNotes: '',
    address: '',
    contactPhone: ''
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading services...');
      const servicesData = await servicesApi.getAllServices();
      console.log('Services loaded:', servicesData);
      setServices(servicesData);
    } catch (err) {
      console.error('Error loading services:', err);
      setError('Ошибка при загрузке услуг: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Unavailable': return 'error';
      case 'Paused': return 'warning';
      default: return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cleaning': return 'primary';
      case 'Repair': return 'secondary';
      case 'Delivery': return 'warning';
      case 'Gardening': return 'success';
      case 'PetCare': return 'info';
      case 'Tutoring': return 'error';
      case 'Photography': return 'default';
      case 'Beauty': return 'primary';
      case 'Other': return 'default';
      default: return 'default';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'Cleaning': return 'Клининг';
      case 'Repair': return 'Ремонт';
      case 'Delivery': return 'Доставка';
      case 'Gardening': return 'Садоводство';
      case 'PetCare': return 'Уход за животными';
      case 'Tutoring': return 'Репетиторство';
      case 'Photography': return 'Фотография';
      case 'Beauty': return 'Красота';
      case 'Other': return 'Другое';
      default: return category;
    }
  };

  const handleOrderService = (service: Service) => {
    setSelectedService(service);
    setOrderForm({
      serviceId: service.id,
      scheduledDate: '',
      customerNotes: '',
      address: '',
      contactPhone: ''
    });
    setOrderDialogOpen(true);
  };

  const handleCreateOrder = async () => {
    try {
      await servicesApi.createOrder(orderForm);
      setOrderDialogOpen(false);
      setSelectedService(null);
      // Показать уведомление об успехе
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Ошибка при создании заказа: ' + (err as Error).message);
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
          Поиск работников
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {/* TODO: Open create service dialog */}}
        >
          Предложить услугу
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Поиск услуг"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 300 }}
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Категория</InputLabel>
          <Select
            value={filterCategory}
            label="Категория"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="all">Все категории</MenuItem>
            <MenuItem value="Cleaning">Клининг</MenuItem>
            <MenuItem value="Repair">Ремонт</MenuItem>
            <MenuItem value="Delivery">Доставка</MenuItem>
            <MenuItem value="Gardening">Садоводство</MenuItem>
            <MenuItem value="PetCare">Уход за животными</MenuItem>
            <MenuItem value="Tutoring">Репетиторство</MenuItem>
            <MenuItem value="Photography">Фотография</MenuItem>
            <MenuItem value="Beauty">Красота</MenuItem>
            <MenuItem value="Other">Другое</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={3}>
        {filteredServices.map((service) => (
          <Box key={service.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                    {service.title}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {service.price} ₽
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {service.description.length > 150 
                    ? `${service.description.substring(0, 150)}...` 
                    : service.description}
                </Typography>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Person fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {service.workerName}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.5} ml={1}>
                    <Star fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {service.rating.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({service.completedOrders} заказов)
                    </Typography>
                  </Box>
                </Box>

                {service.location && (
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {service.location}
                    </Typography>
                  </Box>
                )}

                <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                  <Chip
                    label={getCategoryLabel(service.category)}
                    color={getCategoryColor(service.category) as any}
                    size="small"
                  />
                  <Chip
                    label={service.status === 'Available' ? 'Доступно' : service.status === 'Unavailable' ? 'Недоступно' : 'Приостановлено'}
                    color={getStatusColor(service.status) as any}
                    size="small"
                  />
                  {service.isRemote && (
                    <Chip
                      icon={<LaptopMac fontSize="small" />}
                      label="Удаленно"
                      color="info"
                      size="small"
                    />
                  )}
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                  <Typography variant="caption" color="text.secondary">
                    Создано: {new Date(service.createdAt).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleOrderService(service)}
                    disabled={service.status !== 'Available'}
                  >
                    Заказать
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {filteredServices.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            Услуги не найдены
          </Typography>
        </Box>
      )}

      {/* Order Dialog */}
      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Заказать услугу</DialogTitle>
        <DialogContent>
          {selectedService && (
            <Box mb={2}>
              <Typography variant="h6">{selectedService.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Исполнитель: {selectedService.workerName}
              </Typography>
              <Typography variant="h6" color="primary">
                Цена: {selectedService.price} ₽
              </Typography>
            </Box>
          )}
          <TextField
            fullWidth
            label="Дата и время"
            type="datetime-local"
            value={orderForm.scheduledDate}
            onChange={(e) => setOrderForm({...orderForm, scheduledDate: e.target.value})}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Адрес"
            value={orderForm.address}
            onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Контактный телефон"
            value={orderForm.contactPhone}
            onChange={(e) => setOrderForm({...orderForm, contactPhone: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Дополнительные пожелания"
            multiline
            rows={3}
            value={orderForm.customerNotes}
            onChange={(e) => setOrderForm({...orderForm, customerNotes: e.target.value})}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)}>Отмена</Button>
          <Button onClick={handleCreateOrder} variant="contained">
            Создать заказ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServicesPage; 