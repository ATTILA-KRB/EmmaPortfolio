<script setup>
import { ref } from 'vue'

const props = defineProps({
  project: Object,
})

const hovered = ref(false)
const toast = ref(false)
let toastTimer = null

function handleClick(e) {
  if (props.project.url === '#') {
    e.preventDefault()
    if (toastTimer) clearTimeout(toastTimer)
    toast.value = true
    toastTimer = setTimeout(() => { toast.value = false }, 3000)
  }
}
</script>

<template>
  <a
    :href="project.url"
    :target="project.url === '#' ? '_self' : '_blank'"
    rel="noopener"
    class="project-card"
    :class="{ 'project-card-hover': hovered }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="handleClick"
  >
    <img
      :src="project.img"
      :alt="project.title"
      class="project-img"
      :class="{ 'project-img-hover': hovered }"
      loading="lazy"
    />
    <div class="project-overlay" :class="{ 'project-overlay-hover': hovered }">
      <span class="project-cat" :style="{ color: project.color }">{{ project.cat }}</span>
      <span class="project-title">{{ project.title }}</span>
      <div class="project-bottom">
        <span class="project-media">{{ project.media }}</span>
        <span v-if="project.url !== '#'" class="project-arrow" :class="{ 'project-arrow-show': hovered }">↗</span>
        <span v-else class="project-draft-badge">En cours de rédaction</span>
      </div>
    </div>
  </a>

  <Teleport to="body">
    <Transition name="toast">
      <div v-if="toast" class="project-toast">
        ✏️ Article en cours de rédaction
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.project-card {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  aspect-ratio: 3/2;
  background: var(--bg3);
  display: block;
  text-decoration: none;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  -webkit-tap-highlight-color: transparent;
}
.project-card-hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}
.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: brightness(0.7);
}
.project-img-hover {
  transform: scale(1.08);
  filter: brightness(0.3);
}
.project-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  background: linear-gradient(transparent 20%, rgba(0, 0, 0, 0.65) 100%);
  transition: background 0.4s ease;
}
.project-cat {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-bottom: 6px;
  font-family: var(--mono);
}
.project-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  line-height: 1.35;
}
.project-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.project-media {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--mono);
}
.project-arrow {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  opacity: 0;
  transform: translateX(8px);
  transition: all 0.3s ease;
}
.project-arrow-show {
  opacity: 1;
  transform: translateX(0);
}

/* ─── TOUCH / MOBILE ─── */
@media (hover: none) {
  .project-img {
    filter: brightness(0.55);
  }
  .project-card-hover {
    transform: none;
    box-shadow: none;
  }
  .project-img-hover {
    transform: none;
    filter: brightness(0.55);
  }
  .project-overlay {
    background: linear-gradient(transparent 10%, rgba(0, 0, 0, 0.7) 100%);
  }
  .project-arrow {
    opacity: 1;
    transform: translateX(0);
  }
  .project-title {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .project-overlay {
    padding: 16px;
  }
  .project-cat {
    font-size: 9px;
    letter-spacing: 2px;
    margin-bottom: 4px;
  }
  .project-title {
    font-size: 13px;
  }
  .project-media {
    font-size: 10px;
  }
}
</style>

<style>
.project-draft-badge {
  font-size: 10px;
  font-family: var(--mono);
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.5px;
  font-style: italic;
}
.project-toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--text);
  color: var(--bg);
  font-size: 13px;
  font-family: var(--mono);
  font-weight: 500;
  letter-spacing: 0.3px;
  padding: 12px 20px;
  border-radius: 8px;
  z-index: 999;
  white-space: nowrap;
  pointer-events: none;
}
.toast-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
</style>
