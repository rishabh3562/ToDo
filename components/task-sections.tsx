'use client';

import { useMemo } from 'react';
import { Todo } from '@/lib/store';
import { TodoItem } from './todo-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isSameDay, parseISO, isValid } from 'date-fns';

interface TaskSectionsProps {
  todos: Todo[];
  selectedDate: Date;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, dueDate: string) => void;
}

export function TaskSections({
  todos,
  selectedDate,
  onToggle,
  onDelete,
  onEdit,
}: TaskSectionsProps) {
  const { todayTasks, remainingTasks, completedTasks } = useMemo(() => {
    const today: Todo[] = [];
    const remaining: Todo[] = [];
    const completed: Todo[] = [];

    todos.forEach((todo) => {
      try {
        const dueDate = parseISO(todo.dueDate);
        if (!isValid(dueDate)) throw new Error('Invalid date');

        if (isSameDay(dueDate, selectedDate)) {
          today.push(todo);
        }

        if (todo.completed) {
          completed.push(todo);
        } else {
          remaining.push(todo);
        }
      } catch {
        // Handle invalid dates by adding to remaining
        if (todo.completed) {
          completed.push(todo);
        } else {
          remaining.push(todo);
        }
      }
    });

    return {
      todayTasks: today,
      remainingTasks: remaining,
      completedTasks: completed,
    };
  }, [todos, selectedDate]);

  return (
    <Tabs defaultValue="today" className="w-full">
      {/* <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="today">
          Today ({todayTasks.length})
        </TabsTrigger>
        <TabsTrigger value="remaining">
          Remaining ({remainingTasks.length})
        </TabsTrigger>
        <TabsTrigger value="completed">
          Done ({completedTasks.length})
        </TabsTrigger>
      </TabsList> */}

      <TabsContent value="today">
        <TaskList
          title="Today's Tasks"
          tasks={todayTasks}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </TabsContent>

      {/* <TabsContent value="remaining">
        <TaskList
          title="Remaining Tasks"
          tasks={remainingTasks}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </TabsContent>

      <TabsContent value="completed">
        <TaskList
          title="Completed Tasks"
          tasks={completedTasks}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </TabsContent> */}
    </Tabs>
  );
}

interface TaskListProps {
  title: string;
  tasks: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, dueDate: string) => void;
}

function TaskList({ title, tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground ">
          No tasks to show.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((todo) => (
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
  );
}