<script setup>
import { useRoute } from 'vue-router'
import SectionLabel from '@/components/ui/SectionLabel.vue'

const route = useRoute()
const slug = route.params.slug
</script>

<template>
  <div class="page-top">
    <section class="section">
      <div class="container article-container">
        <SectionLabel label="Article" />
        <h1 class="page-title">{{ slug }}</h1>
        <div class="placeholder">
          <p>Le contenu de cet article sera récupéré depuis <strong>Hygraph CMS</strong> via l'API GraphQL.</p>
          <p>Intégration à venir : query GraphQL + rendu du rich text Hygraph.</p>
        </div>
        <router-link to="/blog" class="back-link">← Retour au blog</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-top {
  padding-top: 100px;
}
.section {
  padding-top: 24px;
  padding-bottom: 64px;
}
.article-container {
  max-width: 720px;
}
.page-title {
  font-family: var(--serif);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  margin-top: 4px;
  margin-bottom: 28px;
  letter-spacing: -0.5px;
}
.placeholder {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 28px;
  margin-bottom: 28px;
  color: var(--text2);
  font-size: 15px;
  line-height: 1.7;
}
.placeholder p {
  margin-bottom: 12px;
}
.back-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1.5px solid var(--accent);
  padding-bottom: 3px;
}

@media (max-width: 768px) {
  .page-top {
    padding-top: 84px;
  }
  .placeholder {
    padding: 20px;
  }
}
</style>
