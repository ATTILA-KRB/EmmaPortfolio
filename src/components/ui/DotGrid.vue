<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <svg width="100%" height="100%" style="opacity: 0.25">
      <defs>
        <pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="var(--text3)" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>
  </div>
</template>
