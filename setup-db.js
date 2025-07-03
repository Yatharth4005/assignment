const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  // Create connection to MySQL without specifying the database
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  try {
    console.log('Creating database if not exists...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log('Database created or already exists');

    // Switch to the created database
    await connection.query(`USE ${process.env.DB_NAME}`);
    
    console.log('Creating schools table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database setup completed successfully!');
    
    // Add some sample data
    console.log('Adding sample data...');
    const sampleSchools = [
      {
        name: 'Central High School',
        address: '123 Education St, Learning City',
        latitude: 12.9716,
        longitude: 77.5946
      },
      {
        name: 'Westside Academy',
        address: '456 Knowledge Ave, Wisdom Town',
        latitude: 12.9816,
        longitude: 77.5846
      },
      {
        name: 'East End Public School',
        address: '789 Learning Blvd, Education City',
        latitude: 12.9616,
        longitude: 77.6046
      }
    ];

    for (const school of sampleSchools) {
      await connection.query(
        'INSERT IGNORE INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [school.name, school.address, school.latitude, school.longitude]
      );
    }
    
    console.log('Sample data added successfully!');
    
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  } finally {
    await connection.end();
    process.exit(0);
  }
}

setupDatabase();
