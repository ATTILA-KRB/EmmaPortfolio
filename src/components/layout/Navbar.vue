<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({ isDark: Boolean })
const emit = defineEmits(['toggle-theme'])

const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)

const links = [
  { to: '/', label: 'Accueil', name: 'home' },
  { to: '/portfolio', label: 'Portfolio', name: 'portfolio' },
  { to: '/experiences', label: 'Expériences', name: 'experiences' },
  { to: '/contact', label: 'Contact', name: 'contact' },
]

function onScroll() {
  scrolled.value = window.scrollY > 40
}

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileOpen.value = false
})

// Lock body scroll when menu open
watch(mobileOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <nav
    class="nav"
    :class="[scrolled || mobileOpen ? 'nav-scrolled' : 'nav-transparent']"
  >
    <div class="nav-inner container">
      <!-- Logo -->
      <router-link to="/" class="nav-logo">
        <span class="nav-logo-letter">E</span>
        <span class="nav-logo-dot"></span>
      </router-link>

      <!-- Desktop nav -->
      <div class="nav-links">
        <router-link
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          class="nav-link"
          :class="{ 'nav-link-active': route.name === link.name }"
        >
          {{ link.label }}
        </router-link>

        <button
          @click="emit('toggle-theme')"
          class="theme-toggle"
          aria-label="Basculer le thème"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>

      <!-- Mobile toggle -->
      <button class="nav-mobile-btn" @click="mobileOpen = !mobileOpen" aria-label="Menu">
        <span class="hamburger" :class="{ 'hamburger-open': mobileOpen }">
          <span></span>
          <span></span>
        </span>
      </button>
    </div>
  </nav>

  <!-- Mobile fullscreen overlay -->
  <Teleport to="body">
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="mobile-overlay" @click.self="mobileOpen = false">
        <div class="mobile-menu-content">
          <div class="mobile-menu-links">
            <router-link
              v-for="(link, i) in links"
              :key="link.name"
              :to="link.to"
              class="mobile-link"
              :class="{ 'mobile-link-active': route.name === link.name }"
              :style="{ transitionDelay: `${i * 0.05}s` }"
            >
              <span class="mobile-link-index">0{{ i + 1 }}</span>
              {{ link.label }}
            </router-link>
          </div>
          <div class="mobile-menu-footer">
            <button @click="emit('toggle-theme')" class="mobile-theme">
              {{ isDark ? '☀️ Mode clair' : '🌙 Mode sombre' }}
            </button>
            <a href="mailto:contact@emmapertusot.fr" class="mobile-email">contact@emmapertusot.fr</a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.5s var(--ease);
}
.nav-scrolled {
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(32px) saturate(200%);
  border-bottom: 1px solid var(--border);
}
.nav-transparent {
  background: transparent;
  border-bottom: 1px solid transparent;
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: baseline;
  gap: 4px;
  text-decoration: none;
  position: relative;
  z-index: 110;
}
.nav-logo-letter {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 900;
  color: var(--text);
  letter-spacing: -1px;
}
.nav-logo-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  margin-bottom: 2px;
}

/* Desktop links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-link {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text3);
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  transition: color 0.3s ease;
}
.nav-link:hover,
.nav-link-active {
  color: var(--text);
}
.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  animation: lineExpand 0.3s ease forwards;
  transform-origin: left;
}
.theme-toggle {
  background: none;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  width: 38px;
  height: 38px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease;
}
.theme-toggle:hover {
  border-color: var(--accent);
}

/* Hamburger */
.nav-mobile-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  position: relative;
  z-index: 110;
}
.hamburger {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 22px;
}
.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text);
  border-radius: 1px;
  transition: all 0.3s var(--ease);
  transform-origin: center;
}
.hamburger-open span:first-child {
  transform: translateY(4px) rotate(45deg);
}
.hamburger-open span:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

/* Mobile overlay */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 105;
  background: color-mix(in srgb, var(--bg) 95%, transparent);
  backdrop-filter: blur(24px);
  display: flex;
  flex-direction: column;
  padding-top: 80px;
}
.mobile-menu-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 16px var(--gutter) calc(32px + env(safe-area-inset-bottom, 0px));
  overflow-y: auto;
}
.mobile-menu-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mobile-link {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 700;
  color: var(--text2);
  text-decoration: none;
  padding: 14px 0;
  display: flex;
  align-items: baseline;
  gap: 16px;
  border-bottom: 1px solid var(--border);
  transition: color 0.3s ease;
}
.mobile-link-active {
  color: var(--accent);
}
.mobile-link-index {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--text3);
  letter-spacing: 0.5px;
}
.mobile-menu-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 24px;
}
.mobile-theme {
  font-size: 14px;
  color: var(--text3);
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px 16px;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.3s ease;
}
.mobile-email {
  font-size: 12px;
  font-family: var(--mono);
  color: var(--text3);
  text-decoration: none;
  letter-spacing: 0.3px;
}

/* Mobile menu transitions */
.mobile-menu-enter-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-enter-active .mobile-link {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.mobile-menu-leave-active {
  transition: opacity 0.2s ease;
}
.mobile-menu-enter-from {
  opacity: 0;
}
.mobile-menu-enter-from .mobile-link {
  opacity: 0;
  transform: translateY(12px);
}
.mobile-menu-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .nav-mobile-btn {
    display: block;
  }
}
</style>
