<script setup>
import { useTheme } from '@/composables/useTheme'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

const { isDark, toggleDark } = useTheme()
</script>

<template>
  <div class="grain">
    <Navbar :isDark="isDark" @toggle-theme="toggleDark()" />
    <main>
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<style>
.page-enter-active {
  animation: fadeUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
.page-leave-active {
  animation: fadeIn 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse forwards;
}
</style>
