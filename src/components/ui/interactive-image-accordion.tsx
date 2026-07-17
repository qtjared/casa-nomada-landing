"use client";

import React, { useState } from 'react';

// --- Data for the image accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'Estrategias Digitales',
    imageUrl: '/work-media/work-1.jpg',
  },
  {
    id: 2,
    title: 'Creación de Contenido',
    imageUrl: '/work-media/work-2.jpg',
  },
  {
    id: 3,
    title: 'Desarrollo Web',
    imageUrl: '/work-media/services.png',
  },
  {
    id: 4,
    title: 'Dirección de Arte',
    imageUrl: '/work-media/work-5.jpg',
  },
  {
    id: 5,
    title: 'Campañas de Ads',
    imageUrl: '/work-media/work-6.jpg',
  },
];

interface AccordionItemProps {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
}

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative h-[450px] lg:h-[550px] rounded-[2rem] overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out border border-[var(--border)] shadow-xl
        ${isActive ? 'w-[400px] lg:w-[450px]' : 'w-[60px] lg:w-[80px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error'; }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-black/20' : 'bg-black/60'}`}></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white font-bricolage font-bold whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${
            isActive
              ? 'text-2xl lg:text-3xl bottom-8 left-8 rotate-0 opacity-100' // Active state: horizontal, bottom-left
              : 'text-lg lg:text-xl w-auto text-left bottom-24 left-1/2 -translate-x-1/2 -rotate-90 opacity-60' // Inactive state
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

// --- Main App Component ---
export function InteractiveImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-row items-center justify-center gap-3 lg:gap-4 overflow-x-auto w-full px-2 py-4 no-scrollbar">
      {accordionItems.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onMouseEnter={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}
