// MongoDB initialization script for Car Rental Platform
// This script runs when the MongoDB container starts for the first time

print('Starting Car Rental Platform database initialization...');

// Switch to the car_rental_platform database
db = db.getSiblingDB('car_rental_platform');

// Create collections with validation schemas
print('Creating collections with validation schemas...');

// Users collection
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'password', 'firstName', 'lastName', 'role'],
      properties: {
        email: { bsonType: 'string', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
        password: { bsonType: 'string', minLength: 6 },
        firstName: { bsonType: 'string', minLength: 1 },
        lastName: { bsonType: 'string', minLength: 1 },
        role: { bsonType: 'string', enum: ['customer', 'agency_admin', 'super_admin'] },
        phoneNumber: { bsonType: 'string' },
        dateOfBirth: { bsonType: 'date' },
        drivingLicense: {
          bsonType: 'object',
          properties: {
            number: { bsonType: 'string' },
            expiryDate: { bsonType: 'date' },
            country: { bsonType: 'string' }
          }
        },
        isActive: { bsonType: 'bool' },
        emailVerified: { bsonType: 'bool' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Agencies collection
db.createCollection('agencies', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'address', 'ownerId', 'status'],
      properties: {
        name: { bsonType: 'string', minLength: 1 },
        email: { bsonType: 'string', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
        phoneNumber: { bsonType: 'string' },
        address: {
          bsonType: 'object',
          required: ['street', 'city', 'country'],
          properties: {
            street: { bsonType: 'string' },
            city: { bsonType: 'string' },
            state: { bsonType: 'string' },
            country: { bsonType: 'string' },
            zipCode: { bsonType: 'string' },
            coordinates: {
              bsonType: 'object',
              properties: {
                latitude: { bsonType: 'double' },
                longitude: { bsonType: 'double' }
              }
            }
          }
        },
        ownerId: { bsonType: 'objectId' },
        status: { bsonType: 'string', enum: ['pending', 'approved', 'suspended', 'rejected'] },
        businessLicense: { bsonType: 'string' },
        description: { bsonType: 'string' },
        website: { bsonType: 'string' },
        rating: { bsonType: 'double', minimum: 0, maximum: 5 },
        totalReviews: { bsonType: 'int', minimum: 0 },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Vehicles collection
db.createCollection('vehicles', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['agencyId', 'make', 'model', 'year', 'category', 'pricePerDay', 'status'],
      properties: {
        agencyId: { bsonType: 'objectId' },
        make: { bsonType: 'string', minLength: 1 },
        model: { bsonType: 'string', minLength: 1 },
        year: { bsonType: 'int', minimum: 1990, maximum: 2030 },
        category: { bsonType: 'string', enum: ['economy', 'compact', 'midsize', 'fullsize', 'luxury', 'suv', 'van', 'truck'] },
        pricePerDay: { bsonType: 'double', minimum: 0 },
        status: { bsonType: 'string', enum: ['available', 'rented', 'maintenance', 'retired'] },
        licensePlate: { bsonType: 'string' },
        vin: { bsonType: 'string' },
        color: { bsonType: 'string' },
        fuelType: { bsonType: 'string', enum: ['gasoline', 'diesel', 'electric', 'hybrid'] },
        transmission: { bsonType: 'string', enum: ['manual', 'automatic'] },
        seats: { bsonType: 'int', minimum: 1, maximum: 20 },
        mileage: { bsonType: 'int', minimum: 0 },
        features: { bsonType: 'array', items: { bsonType: 'string' } },
        images: { bsonType: 'array', items: { bsonType: 'string' } },
        location: {
          bsonType: 'object',
          properties: {
            coordinates: {
              bsonType: 'array',
              items: { bsonType: 'double' }
            },
            address: { bsonType: 'string' }
          }
        },
        rating: { bsonType: 'double', minimum: 0, maximum: 5 },
        totalReviews: { bsonType: 'int', minimum: 0 },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Reservations collection
db.createCollection('reservations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'vehicleId', 'agencyId', 'startDate', 'endDate', 'status', 'totalAmount'],
      properties: {
        userId: { bsonType: 'objectId' },
        vehicleId: { bsonType: 'objectId' },
        agencyId: { bsonType: 'objectId' },
        startDate: { bsonType: 'date' },
        endDate: { bsonType: 'date' },
        status: { bsonType: 'string', enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled', 'no_show'] },
        totalAmount: { bsonType: 'double', minimum: 0 },
        pickupLocation: {
          bsonType: 'object',
          properties: {
            address: { bsonType: 'string' },
            coordinates: {
              bsonType: 'array',
              items: { bsonType: 'double' }
            }
          }
        },
        dropoffLocation: {
          bsonType: 'object',
          properties: {
            address: { bsonType: 'string' },
            coordinates: {
              bsonType: 'array',
              items: { bsonType: 'double' }
            }
          }
        },
        additionalDrivers: { bsonType: 'array' },
        specialRequests: { bsonType: 'string' },
        paymentStatus: { bsonType: 'string', enum: ['pending', 'paid', 'refunded', 'failed'] },
        contractId: { bsonType: 'objectId' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Payments collection
db.createCollection('payments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['reservationId', 'userId', 'amount', 'currency', 'status', 'paymentMethod'],
      properties: {
        reservationId: { bsonType: 'objectId' },
        userId: { bsonType: 'objectId' },
        amount: { bsonType: 'double', minimum: 0 },
        currency: { bsonType: 'string', enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'] },
        status: { bsonType: 'string', enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'] },
        paymentMethod: { bsonType: 'string', enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'cash'] },
        transactionId: { bsonType: 'string' },
        gatewayResponse: { bsonType: 'object' },
        refundAmount: { bsonType: 'double', minimum: 0 },
        refundReason: { bsonType: 'string' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Reviews collection
db.createCollection('reviews', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'targetType', 'targetId', 'rating', 'status'],
      properties: {
        userId: { bsonType: 'objectId' },
        targetType: { bsonType: 'string', enum: ['vehicle', 'agency'] },
        targetId: { bsonType: 'objectId' },
        reservationId: { bsonType: 'objectId' },
        rating: { bsonType: 'int', minimum: 1, maximum: 5 },
        title: { bsonType: 'string' },
        comment: { bsonType: 'string' },
        status: { bsonType: 'string', enum: ['pending', 'approved', 'rejected'] },
        images: { bsonType: 'array', items: { bsonType: 'string' } },
        helpfulVotes: { bsonType: 'int', minimum: 0 },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Support Tickets collection
db.createCollection('supportTickets', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'subject', 'status', 'priority'],
      properties: {
        userId: { bsonType: 'objectId' },
        subject: { bsonType: 'string', minLength: 1 },
        description: { bsonType: 'string' },
        status: { bsonType: 'string', enum: ['open', 'in_progress', 'resolved', 'closed'] },
        priority: { bsonType: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
        category: { bsonType: 'string', enum: ['booking', 'payment', 'vehicle', 'account', 'technical', 'other'] },
        assignedTo: { bsonType: 'objectId' },
        reservationId: { bsonType: 'objectId' },
        messages: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            properties: {
              fromUserId: { bsonType: 'objectId' },
              message: { bsonType: 'string' },
              timestamp: { bsonType: 'date' },
              attachments: { bsonType: 'array' }
            }
          }
        },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

print('Creating indexes for better performance...');

// Users indexes
db.users.createIndex({ 'email': 1 }, { unique: true });
db.users.createIndex({ 'role': 1 });
db.users.createIndex({ 'isActive': 1 });
db.users.createIndex({ 'createdAt': 1 });

// Agencies indexes
db.agencies.createIndex({ 'ownerId': 1 });
db.agencies.createIndex({ 'status': 1 });
db.agencies.createIndex({ 'address.coordinates': '2dsphere' });
db.agencies.createIndex({ 'name': 'text', 'description': 'text' });
db.agencies.createIndex({ 'rating': -1 });

// Vehicles indexes
db.vehicles.createIndex({ 'agencyId': 1 });
db.vehicles.createIndex({ 'category': 1 });
db.vehicles.createIndex({ 'status': 1 });
db.vehicles.createIndex({ 'pricePerDay': 1 });
db.vehicles.createIndex({ 'location.coordinates': '2dsphere' });
db.vehicles.createIndex({ 'make': 1, 'model': 1 });
db.vehicles.createIndex({ 'rating': -1 });
db.vehicles.createIndex({ 'agencyId': 1, 'status': 1, 'category': 1 });

// Reservations indexes
db.reservations.createIndex({ 'userId': 1 });
db.reservations.createIndex({ 'vehicleId': 1 });
db.reservations.createIndex({ 'agencyId': 1 });
db.reservations.createIndex({ 'status': 1 });
db.reservations.createIndex({ 'startDate': 1, 'endDate': 1 });
db.reservations.createIndex({ 'paymentStatus': 1 });
db.reservations.createIndex({ 'vehicleId': 1, 'startDate': 1, 'endDate': 1 });

// Payments indexes
db.payments.createIndex({ 'reservationId': 1 });
db.payments.createIndex({ 'userId': 1 });
db.payments.createIndex({ 'status': 1 });
db.payments.createIndex({ 'transactionId': 1 });
db.payments.createIndex({ 'createdAt': 1 });

// Reviews indexes
db.reviews.createIndex({ 'targetType': 1, 'targetId': 1 });
db.reviews.createIndex({ 'userId': 1 });
db.reviews.createIndex({ 'status': 1 });
db.reviews.createIndex({ 'rating': 1 });
db.reviews.createIndex({ 'createdAt': -1 });

// Support Tickets indexes
db.supportTickets.createIndex({ 'userId': 1 });
db.supportTickets.createIndex({ 'status': 1 });
db.supportTickets.createIndex({ 'priority': 1 });
db.supportTickets.createIndex({ 'assignedTo': 1 });
db.supportTickets.createIndex({ 'category': 1 });
db.supportTickets.createIndex({ 'createdAt': -1 });

print('Creating sample data...');

// Insert sample admin user
const adminUser = {
  email: 'admin@carrentalplatform.com',
  password: '$2b$10$example.hash.here', // In production, use proper bcrypt hash
  firstName: 'System',
  lastName: 'Administrator',
  role: 'super_admin',
  isActive: true,
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

const adminResult = db.users.insertOne(adminUser);
print('Created admin user with ID: ' + adminResult.insertedId);

// Insert sample agency
const sampleAgency = {
  name: 'Premium Car Rentals',
  email: 'info@premiumcars.com',
  phoneNumber: '+1-555-0123',
  address: {
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    zipCode: '10001',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    }
  },
  ownerId: adminResult.insertedId,
  status: 'approved',
  businessLicense: 'BL123456789',
  description: 'Premium car rental service with luxury vehicles',
  website: 'https://premiumcars.com',
  rating: 4.5,
  totalReviews: 0,
  createdAt: new Date(),
  updatedAt: new Date()
};

const agencyResult = db.agencies.insertOne(sampleAgency);
print('Created sample agency with ID: ' + agencyResult.insertedId);

// Insert sample vehicles
const sampleVehicles = [
  {
    agencyId: agencyResult.insertedId,
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    category: 'midsize',
    pricePerDay: 45.00,
    status: 'available',
    licensePlate: 'ABC-123',
    vin: '1HGBH41JXMN109186',
    color: 'Silver',
    fuelType: 'gasoline',
    transmission: 'automatic',
    seats: 5,
    mileage: 15000,
    features: ['Air Conditioning', 'Bluetooth', 'Backup Camera'],
    images: [],
    location: {
      coordinates: [-74.0060, 40.7128],
      address: '123 Main Street, New York, NY'
    },
    rating: 4.2,
    totalReviews: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    agencyId: agencyResult.insertedId,
    make: 'BMW',
    model: 'X5',
    year: 2023,
    category: 'luxury',
    pricePerDay: 95.00,
    status: 'available',
    licensePlate: 'XYZ-789',
    vin: '5UXCR6C0XL9B12345',
    color: 'Black',
    fuelType: 'gasoline',
    transmission: 'automatic',
    seats: 7,
    mileage: 8000,
    features: ['Leather Seats', 'Sunroof', 'Navigation', 'Premium Sound'],
    images: [],
    location: {
      coordinates: [-74.0060, 40.7128],
      address: '123 Main Street, New York, NY'
    },
    rating: 4.8,
    totalReviews: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const vehicleResults = db.vehicles.insertMany(sampleVehicles);
print('Created ' + vehicleResults.insertedIds.length + ' sample vehicles');

print('Database initialization completed successfully!');
print('Collections created: users, agencies, vehicles, reservations, payments, reviews, supportTickets');
print('Indexes created for optimal performance');
print('Sample data inserted for testing');

// Log the summary
print('\n=== Car Rental Platform Database Setup Complete ===');
print('Database: car_rental_platform');
print('Admin user email: admin@carrentalplatform.com');
print('Sample agency: Premium Car Rentals');
print('Sample vehicles: 2 vehicles created');
print('Ready for application connection!');