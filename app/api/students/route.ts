import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const students = db.prepare(`
      SELECT id, name, email, phone, address, date_of_birth, enrollment_date, status, created_at, updated_at
      FROM students
      ORDER BY created_at DESC
    `).all();

    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, email, phone, address, date_of_birth } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if student already exists
    const existing = db.prepare('SELECT id FROM students WHERE email = ?').get(email);
    if (existing) {
      return NextResponse.json(
        { error: 'Student with this email already exists' },
        { status: 400 }
      );
    }

    const result = db.prepare(`
      INSERT INTO students (name, email, phone, address, date_of_birth)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, phone || null, address || null, date_of_birth || null);

    return NextResponse.json(
      { message: 'Student created successfully', id: result.lastInsertRowid },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    );
  }
}
