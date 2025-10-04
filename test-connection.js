require('dotenv').config();
const dbConnection = require('./backend/shared/utils/database');

async function testDatabaseConnection() {
  try {
    console.log('🔄 Testing MongoDB connection...');
    
    // Check environment variables
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not found in .env file');
    }

    console.log(`📝 MongoDB URI: ${process.env.MONGODB_URI}`);
    console.log(`📁 Database Name: ${process.env.MONGODB_DB_NAME}`);

    // Connect to database
    const db = await dbConnection.connect();
    
    // List existing collections
    const collections = await db.listCollections().toArray();
    console.log(`� Found ${collections.length} existing collections`);
    
    if (collections.length > 0) {
      console.log('📄 Existing collections:');
      collections.forEach(col => console.log(`   - ${col.name}`));
    }

    // Test write operation
    const testCollection = db.collection('connection_test');
    const testDoc = {
      timestamp: new Date(),
      test: 'MongoDB connection successful',
      environment: process.env.NODE_ENV || 'development',
      platform: process.platform
    };

    const result = await testCollection.insertOne(testDoc);
    console.log(`💾 Test document inserted with ID: ${result.insertedId}`);
    
    // Test read operation
    const foundDoc = await testCollection.findOne({ _id: result.insertedId });
    console.log('📖 Test document retrieved successfully');
    console.log(`   Content: ${foundDoc.test}`);

    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('🧹 Test document cleaned up');

    // Health check
    const healthStatus = await dbConnection.healthCheck();
    console.log(`🏥 Health Status: ${healthStatus.status}`);
    console.log(`   Message: ${healthStatus.message}`);

    console.log('✅ All database tests passed successfully!');

  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    
    // Provide helpful troubleshooting tips
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('   - Make sure MongoDB is installed and running');
      console.log('   - Check if MongoDB service is started');
      console.log('   - Try: net start MongoDB (Windows) or brew services start mongodb (Mac)');
    }
    
    if (error.message.includes('MONGODB_URI not found')) {
      console.log('\n💡 Environment setup:');
      console.log('   - Copy .env.example to .env');
      console.log('   - Update MONGODB_URI in .env file if needed');
    }

    process.exit(1);
  } finally {
    await dbConnection.disconnect();
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nReceived SIGINT, shutting down gracefully...');
  await dbConnection.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nReceived SIGTERM, shutting down gracefully...');
  await dbConnection.disconnect();
  process.exit(0);
});

// Run the test
testDatabaseConnection();