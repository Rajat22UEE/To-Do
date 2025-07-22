import { NextResponse } from 'next/server';
import connectDB from '../../../app/lib/mongodb';
import Todo from '../../../app/lib/models/Todo';

// GET - Fetch all todos
export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: todos });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new todo
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const todo = await Todo.create(body);
    return NextResponse.json(
      { success: true, data: todo },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}