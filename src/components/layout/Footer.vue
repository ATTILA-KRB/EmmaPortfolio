<script setup>
import { socials } from '@/data/socials'
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div>
          <div class="footer-logo">Emma Pertusot<span style="color: var(--accent)">.</span></div>
          <div class="footer-subtitle">Journaliste · Presse écrite</div>
        </div>
        <div class="footer-socials">
          <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" rel="noopener" class="footer-social">
            {{ s.name }}
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} —  </span>
        <router-link to="/contact" class="footer-legal">Mentions légales</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding-top: 56px;
  padding-bottom: 36px;
  margin-top: 80px;
}
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 40px;
}
.footer-logo {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 900;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
}
.footer-subtitle {
  color: var(--text3);
  font-size: 13px;
  line-height: 1.6;
}
.footer-socials {
  display: flex;
  gap: 24px;
}
.footer-social {
  font-size: 13px;
  color: var(--text3);
  text-decoration: none;
  transition: color 0.3s ease;
}
.footer-social:hover {
  color: var(--accent);
}
.footer-bottom {
  border-top: 1px solid var(--border);
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--text3);
  font-family: var(--mono);
  flex-wrap: wrap;
  gap: 12px;
}
.footer-legal {
  color: var(--text3);
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 768px) {
  .footer {
    padding-top: 40px;
    padding-bottom: 24px;
    margin-top: 48px;
  }
  .footer-top {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 28px;
  }
  .footer-socials {
    gap: 16px;
    flex-wrap: wrap;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    font-size: 10px;
  }
}
</style>
