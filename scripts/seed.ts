import { initializeDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

async function seed() {
  console.log('Seeding database...');

  const dbDir = path.join(process.cwd(), 'data');
  const dbPath = path.join(dbDir, 'db.json');

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  initializeDatabase();

  // Check if database file exists and has data
  let dbData: any = { users: [], students: [] };
  if (fs.existsSync(dbPath)) {
    try {
      const data = fs.readFileSync(dbPath, 'utf-8');
      dbData = JSON.parse(data);
    } catch (e) {
      console.log('Creating new database file...');
    }
  }

  // Add admin user if doesn't exist
  if (!dbData.users.some((u: any) => u.email === 'admin@example.com')) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    dbData.users.push({
      id: 1,
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      created_at: new Date().toISOString(),
    });
    console.log('✅ Admin user created (email: admin@example.com, password: admin123)');
  } else {
    console.log('✅ Admin user already exists');
  }

  // Add sample students
  const sampleStudents = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1234567890',
      address: '123 Main St',
      date_of_birth: '2002-05-15',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '+1234567891',
      address: '456 Oak Ave',
      date_of_birth: '2003-08-22',
    },
    {
      name: 'Carol White',
      email: 'carol@example.com',
      phone: '+1234567892',
      address: '789 Pine Rd',
      date_of_birth: '2001-12-10',
    },
  ];

  for (const student of sampleStudents) {
    if (!dbData.students.some((s: any) => s.email === student.email)) {
      const id = Math.max(0, ...dbData.students.map((s: any) => s.id)) + 1;
      const now = new Date().toISOString();
      dbData.students.push({
        id,
        ...student,
        enrollment_date: now,
        status: 'active',
        created_at: now,
        updated_at: now,
      });
    }
  }

  // Save to file
  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
  console.log('✅ Database seeded successfully');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
