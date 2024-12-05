'use client';

import { useState } from 'react';
import { useTodoStore } from '@/lib/store';
import { DateNavigation } from '@/components/date-navigation';
import { TaskSections } from '@/components/task-sections';
import { AddTodoDialog } from '@/components/add-todo-dialog';
import { PhoneFrame } from '@/components/phone-frame';
import { CheckSquare } from 'lucide-react';

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodoStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <PhoneFrame>
      <main className="h-full  ">
        <header className="sticky rounded-b-2x  top-0 z-50 backdrop-blur-lg bg-background/80 border-b">
          <div className="px-4 pb-3 pt-6" >
            <div className="flex items-center gap-2 mb-4">
              <CheckSquare className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Tasks</h1>
            </div>
            <DateNavigation
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </header>

        <div className="px-4 py-6  border-2  h-full">
          <TaskSections
            todos={todos}
            selectedDate={selectedDate}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

        </div>

        <AddTodoDialog onAdd={addTodo} />
      </main>
    </PhoneFrame>
  );
}