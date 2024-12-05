'use client';

import { cn } from '@/lib/utils';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

// 'use client';

// import { cn } from '@/lib/utils';

// interface PhoneFrameProps {
//   children: React.ReactNode;
//   className?: string;
// }

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div
        className={cn(
          'relative w-full max-w-[375px] aspect-[375/812] bg-background rounded-[40px] shadow-2xl overflow-hidden border-4 border-gray-800 dark:border-gray-700',
          className
        )}
        style={{ height: '100%'}} // Scale the height responsively
      >
        <div className="relative h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}


// export function PhoneFrame({ children, className }: PhoneFrameProps) {
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       <div
//         className={cn(
//           'relative w-full  max-w-[375px] h-[812px] bg-background rounded-[60px] shadow-2xl overflow-hidden border-8 border-gray-800 dark:border-gray-700 p-2',
//           // 'before:content-[""] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-40 before:h-6 before:bg-gray-800 dark:before:bg-gray-700 before:rounded-b-3xl ' ,
//           className
//         )}
//       >
//         <div className="h-full overflow-y-auto ">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }