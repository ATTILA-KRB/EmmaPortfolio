<script setup>
defineProps({ label: String })
</script>

<template>
  <div class="flex items-center gap-3 mb-3">
    <div class="w-6 h-[1.5px]" style="background: var(--accent)"></div>
    <span class="section-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.section-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  font-family: var(--mono);
}
</style>
