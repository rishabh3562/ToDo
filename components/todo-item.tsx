'use client';

import { useState, useCallback } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Pencil, Trash2, Check, X, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Todo } from '@/lib/store';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, dueDate: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDate, setEditDate] = useState<Date>(() => {
    try {
      const date = parseISO(todo.dueDate);
      return isValid(date) ? date : new Date();
    } catch {
      return new Date();
    }
  });
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleEdit = useCallback(() => {
    if (editText.trim() !== todo.text || editDate.toISOString() !== todo.dueDate) {
      onEdit(todo.id, editText.trim(), editDate.toISOString());
    }
    setIsEditing(false);
  }, [editText, editDate, todo.id, todo.text, todo.dueDate, onEdit]);

  const formatDueDate = useCallback((dateString: string) => {
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'PPP') : 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  }, []);

  return (
    <div className="flex items-center gap-3 group">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="h-5 w-5"
      />
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={editDate}
                onSelect={(date) => {
                  setEditDate(date || new Date());
                  setCalendarOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button size="icon" variant="ghost" onClick={handleEdit}>
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setIsEditing(false);
              setEditText(todo.text);
              try {
                const date = parseISO(todo.dueDate);
                setEditDate(isValid(date) ? date : new Date());
              } catch {
                setEditDate(new Date());
              }
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 flex flex-col">
            <span
              className={cn(
                'flex-1',
                todo.completed && 'line-through text-muted-foreground'
              )}
            >
              {todo.text}
            </span>
            <span className="text-sm text-muted-foreground">
              Due: {formatDueDate(todo.dueDate)}
            </span>
          </div>
          <div className="flex gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}