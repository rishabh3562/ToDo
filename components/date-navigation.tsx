'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { format, addDays, isSameDay, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateNavigationProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function DateNavigation({ selectedDate, onDateSelect }: DateNavigationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = startOfDay(new Date());

  // Generate dates for 2 weeks before and after today
  const dates = Array.from({ length: 29 }, (_, i) => addDays(today, i - 14));

  useEffect(() => {
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.querySelector('[data-selected="true"]');
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [selectedDate]);

  return (
    <div className="relative mb-6">
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const newDate = addDays(selectedDate, -1);
            onDateSelect(newDate);
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          ref={scrollRef}
          className="flex-1 flex items-center overflow-x-auto scrollbar-hide px-2 gap-1 snap-x snap-mandatory"
        >
          {dates.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, today);
            
            return (
              <Button
                key={date.toISOString()}
                variant={isSelected ? 'default' : 'ghost'}
                className={cn(
                  'min-w-[2.5rem] h-12 flex-col gap-1 snap-center',
                  isToday && !isSelected && 'border-primary'
                )}
                onClick={() => onDateSelect(date)}
                data-selected={isSelected}
              >
                <span className="text-[0.7rem] uppercase">
                  {format(date, 'EEE')}
                </span>
                <span className={cn(
                  'text-sm',
                  isToday && 'font-bold'
                )}>
                  {format(date, 'd')}
                </span>
              </Button>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const newDate = addDays(selectedDate, 1);
            onDateSelect(newDate);
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}