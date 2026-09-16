import mysql from 'mysql2/promise';

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL is not set. Production database connection will fail safely.");
}

// Support connection string URL or individual params if provided
const pool = process.env.DATABASE_URL 
  ? mysql.createPool(process.env.DATABASE_URL)
  : mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'manav_dental_care',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

let isInitialized = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function query(sql: string, params?: any[]) {
  if (!process.env.DATABASE_URL && (!process.env.MYSQL_HOST || !process.env.MYSQL_DATABASE)) {
    throw new Error('DATABASE_URL or MYSQL connection parameters are not configured. Cannot connect to production database.');
  }
  
  if (!isInitialized) {
    await initializeDatabase();
    isInitialized = true;
  }

  const [results] = await pool.execute(sql, params);
  return results;
}

export async function initializeDatabase() {
  if (!process.env.DATABASE_URL && (!process.env.MYSQL_HOST || !process.env.MYSQL_DATABASE)) {
    console.warn("Skipping database initialization: Credentials missing.");
    return;
  }
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS appointments (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        preferred_date VARCHAR(255) NOT NULL,
        preferred_time VARCHAR(255) NOT NULL,
        treatment VARCHAR(255) NOT NULL,
        message TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;
    await query(createTableQuery);

    // MySQL 5.7+ syntax for creating indexes safely if not exists is complicated, so we catch errors instead for simple indexes
    try {
      await query(`CREATE INDEX idx_status ON appointments(status);`);
    } catch (e: unknown) {
      const err = e as { code?: string, message?: string };
      if (err.code !== 'ER_DUP_KEYNAME') console.warn(err.message);
    }
    
    try {
      await query(`CREATE INDEX idx_date ON appointments(preferred_date);`);
    } catch (e: unknown) {
      const err = e as { code?: string, message?: string };
      if (err.code !== 'ER_DUP_KEYNAME') console.warn(err.message);
    }

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}
