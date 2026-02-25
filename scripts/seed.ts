import { initializeDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

async function seed() {
  console.log('Seeding database...');

  const dbDir = path.join(process.cwd(), 'data');
  const dbPath = path.join(dbDir, 'students.db');

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const db = new Database(dbPath);
  db.pragma('foreign_keys = ON');

  initializeDatabase();

  // Check if admin user already exists
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@example.com');

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)').run(
      'admin@example.com',
      hashedPassword,
      'Admin User'
    );
    console.log('✅ Admin user created (email: admin@example.com, password: admin123)');
  } else {
    console.log('✅ Admin user already exists');
  }

  // Add sample students
  const sampleStudents = [
    { name: 'Alice Johnson', email: 'alice@example.com', phone: '+1234567890', address: '123 Main St', date_of_birth: '2002-05-15' },
    { name: 'Bob Smith', email: 'bob@example.com', phone: '+1234567891', address: '456 Oak Ave', date_of_birth: '2003-08-22' },
    { name: 'Carol White', email: 'carol@example.com', phone: '+1234567892', address: '789 Pine Rd', date_of_birth: '2001-12-10' },
  ];

  for (const student of sampleStudents) {
    const exists = db.prepare('SELECT id FROM students WHERE email = ?').get(student.email);
    if (!exists) {
      db.prepare('INSERT INTO students (name, email, phone, address, date_of_birth) VALUES (?, ?, ?, ?, ?)').run(
        student.name,
        student.email,
        student.phone,
        student.address,
        student.date_of_birth
      );
    }
  }

  console.log('✅ Database seeded successfully');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
