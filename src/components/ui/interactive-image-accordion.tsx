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
        relative overflow-hidden cursor-pointer rounded-[2rem]
        transition-all duration-700 ease-in-out border border-[var(--border)] shadow-xl
        min-w-0 min-h-0 w-full lg:w-auto h-auto
        ${isActive ? 'flex-[4]' : 'flex-1'}
      `}
      onMouseEnter={onMouseEnter}
      onClick={onMouseEnter}
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

      {/* Caption Text Container */}
      <div 
        className={`z-10 transition-all duration-500 ease-in-out absolute ${
          isActive 
            ? 'bottom-6 lg:bottom-8 left-6 lg:left-8 translate-x-0 max-w-[calc(100%-3rem)] lg:max-w-[calc(100%-4rem)] text-left' 
            : 'bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 lg:translate-x-0 w-[calc(100%-2rem)] lg:w-max text-center lg:text-left'
        }`}
      >
        <p
          className={`
            text-white font-bricolage font-bold m-0
            transition-all duration-500 ease-in-out lg:origin-left
            ${
              isActive
                ? 'text-2xl lg:text-3xl rotate-0 opacity-100 overflow-hidden text-ellipsis whitespace-nowrap'
                : 'text-lg lg:text-xl rotate-0 lg:-rotate-90 opacity-60 overflow-hidden text-ellipsis whitespace-nowrap lg:overflow-visible'
            }
          `}
        >
          {item.title}
        </p>
      </div>
    </div>
  );
};

// --- Main App Component ---
export function InteractiveImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto h-[80vh] lg:h-[550px] gap-3 lg:gap-4 px-2 py-4">
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
