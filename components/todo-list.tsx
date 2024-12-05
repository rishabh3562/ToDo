'use client';

import { useMemo } from 'react';
import { format, isToday, parseISO, isValid } from 'date-fns';
import { Todo } from '@/lib/store';
import { TodoItem } from './todo-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, dueDate: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  const groupedTodos = useMemo(() => {
    const groups: Record<string, Todo[]> = {};
    
    todos.forEach((todo) => {
      try {
        const date = todo.dueDate ? parseISO(todo.dueDate) : new Date();
        if (!isValid(date)) {
          throw new Error('Invalid date');
        }
        const key = isToday(date) ? 'Today' : format(date, 'MMMM d, yyyy');
        
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(todo);
      } catch (error) {
        // If date parsing fails, group under "No Date"
        const key = 'No Date';
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(todo);
      }
    });

    // Sort groups by date
    return Object.fromEntries(
      Object.entries(groups).sort(([dateA, _], [dateB, __]) => {
        if (dateA === 'Today') return -1;
        if (dateB === 'Today') return 1;
        if (dateA === 'No Date') return 1;
        if (dateB === 'No Date') return -1;
        try {
          return parseISO(dateA).getTime() - parseISO(dateB).getTime();
        } catch {
          return 0;
        }
      })
    );
  }, [todos]);

  if (todos.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No tasks yet. Click the + button to add one.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 ">
      {Object.entries(groupedTodos).map(([date, todos]) => (
        <Card key={date}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{date}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}