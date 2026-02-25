// Initialize in-memory database mock
interface Student {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  enrollment_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: string;
}

interface DatabaseState {
  users: User[];
  students: Student[];
}

let dbState: DatabaseState = {
  users: [],
  students: [],
};

// Load database from file
function loadDB() {
  try {
    // Only load on server side
    if (typeof window === 'undefined') {
      const path = require('path');
      const fs = require('fs');
      const dbDir = path.join(process.cwd(), 'data');
      const dbPath = path.join(dbDir, 'db.json');
      
      if (fs.existsSync(dbPath)) {
        const data = fs.readFileSync(dbPath, 'utf-8');
        dbState = JSON.parse(data);
      }
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
}

// Save database to file
function saveDB() {
  try {
    // Only save on server side
    if (typeof window === 'undefined') {
      const path = require('path');
      const fs = require('fs');
      const dbDir = path.join(process.cwd(), 'data');
      const dbPath = path.join(dbDir, 'db.json');
      
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }
      fs.writeFileSync(dbPath, JSON.stringify(dbState, null, 2));
    }
  } catch (error) {
    console.error('Error saving database:', error);
  }
}

// Initialize database
export function initializeDatabase() {
  loadDB();
  // Database is already initialized on first load
}

// Database interface matching better-sqlite3 style
class Database {
  prepare(sql: string) {
    return {
      run: (...params: any[]) => {
        return this.executeRun(sql, params);
      },
      get: (...params: any[]) => {
        return this.executeGet(sql, params);
      },
      all: (...params: any[]) => {
        return this.executeAll(sql, params);
      },
    };
  }

  private executeRun(sql: string, params: any[]) {
    const normalized = sql.toLowerCase();

    if (normalized.includes('insert into users')) {
      const [email, password, name] = params;
      const id = Math.max(0, ...dbState.users.map((u) => u.id)) + 1;
      const newUser: User = {
        id,
        email,
        password,
        name,
        created_at: new Date().toISOString(),
      };
      dbState.users.push(newUser);
      saveDB();
      return { lastInsertRowid: id };
    }

    if (normalized.includes('insert into students')) {
      const [name, email, phone, address, date_of_birth] = params;
      const id = Math.max(0, ...dbState.students.map((s) => s.id)) + 1;
      const now = new Date().toISOString();
      const newStudent: Student = {
        id,
        name,
        email,
        phone: phone || '',
        address: address || '',
        date_of_birth: date_of_birth || '',
        enrollment_date: now,
        status: 'active',
        created_at: now,
        updated_at: now,
      };
      dbState.students.push(newStudent);
      saveDB();
      return { lastInsertRowid: id };
    }

    if (normalized.includes('update students')) {
      const [name, email, phone, address, date_of_birth, status, id] = params;
      const student = dbState.students.find((s) => s.id === parseInt(id));
      if (student) {
        student.name = name;
        student.email = email;
        student.phone = phone || '';
        student.address = address || '';
        student.date_of_birth = date_of_birth || '';
        student.status = status;
        student.updated_at = new Date().toISOString();
        saveDB();
      }
      return { changes: 1 };
    }

    if (normalized.includes('delete from students')) {
      const [id] = params;
      const index = dbState.students.findIndex((s) => s.id === parseInt(id));
      if (index !== -1) {
        dbState.students.splice(index, 1);
        saveDB();
      }
      return { changes: 1 };
    }

    return { lastInsertRowid: 0, changes: 0 };
  }

  private executeGet(sql: string, params: any[]) {
    const normalized = sql.toLowerCase();

    if (normalized.includes('select') && normalized.includes('from users')) {
      const [email] = params;
      return dbState.users.find((u) => u.email === email);
    }

    if (normalized.includes('select') && normalized.includes('from students')) {
      const param = params[0];
      return dbState.students.find((s) => s.id === parseInt(param));
    }

    return null;
  }

  private executeAll(sql: string, params: any[]) {
    const normalized = sql.toLowerCase();

    if (normalized.includes('select') && normalized.includes('from students')) {
      return dbState.students.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return [];
  }

  pragma(pragma: string) {
    // Pragma is not needed for JSON database
  }
}

const db = new Database();

export default db;
