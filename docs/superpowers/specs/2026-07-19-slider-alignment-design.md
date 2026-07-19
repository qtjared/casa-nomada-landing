# Slider Alignment Design - Casos de Éxito

Aligning the horizontal cases slider on the landing page with the main content container to achieve a contained layout.

## Background Context
Currently, the horizontal scroll slider in `CasosPreview.tsx` sits outside the main container to span the entire screen width. It uses custom responsive padding calculations to attempt to align the first item with the container content, but this doesn't scale perfectly across all viewports (specifically on `sm`, `md`, and intermediate screen sizes).

## Proposed Changes
We will constrain the slider container within the main responsive container boundaries.

### Components

#### [MODIFY] [CasosPreview.tsx](file:///c:/Users/kobra/Documents/nomads-house/casa-nomada-landing/src/components/sections/home/CasosPreview.tsx)
- Move the horizontal scroll `<m.div>` inside the main `<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">`.
- Remove custom margin/padding calculations `pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-4 sm:pr-6` from the inner `.horizontal-scroll` element.
- Add vertical margin/spacing class `mt-12 lg:mt-16` to the slider wrapper.
- Use simple bottom padding (`pb-4`) on the horizontal scroll element to ensure card shadows are not clipped.

## Verification Plan

### Automated Tests
- None. This is a purely visual layout adjustment.

### Manual Verification
- Run `npm run dev` and resize the viewport across multiple breakpoints:
  - Mobile (<640px)
  - Small / Tablet (640px - 768px - 1024px)
  - Desktop (1024px - 1280px)
  - Large Desktop (>=1280px)
- Verify that the first card in the slider aligns perfectly with the "Casos de Éxito" section title under all these viewports.
