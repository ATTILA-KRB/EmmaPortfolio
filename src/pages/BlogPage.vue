<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import SectionLabel from '@/components/ui/SectionLabel.vue'

const posts = ref([
  { slug: 'deontologie-terrain', title: "Ce que le terrain m'a appris sur la déontologie", date: 'Bientôt', excerpt: "Retour d'expérience sur les dilemmes éthiques rencontrés lors de mes stages en rédaction.", tag: 'Réflexion', reading: '5 min' },
  { slug: 'presse-independante', title: 'Pourquoi la presse indépendante compte', date: 'Bientôt', excerpt: 'Regard sur le rôle des médias indépendants face à la concentration des rédactions.', tag: 'Médias', reading: '7 min' },
])

const hovered = ref(null)
const toast = ref(false)
let toastTimer = null

function handleArticleClick() {
  if (toastTimer) clearTimeout(toastTimer)
  toast.value = true
  toastTimer = setTimeout(() => { toast.value = false }, 3000)
}

onMounted(() => {
  gsap.fromTo('.blog-article', { y: 30, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1,
  })
})
</script>

<template>
  <div class="page-top">
    <section class="section">
      <div class="container blog-container">
        <SectionLabel label="Blog" />
        <h1 class="page-title">Articles & Analyses</h1>
        <p class="page-desc">Réflexions sur le métier, le terrain et la presse indépendante.</p>

        <div class="blog-list">
          <div
            v-for="(post, i) in posts"
            :key="post.slug"
            class="blog-article"
            @mouseenter="hovered = i"
            @mouseleave="hovered = null"
            @click="handleArticleClick"
          >
            <div class="blog-meta">
              <span class="blog-tag">{{ post.tag }}</span>
              <span class="blog-date">{{ post.date }}</span>
              <span class="blog-date">· {{ post.reading }}</span>
            </div>
            <h3 class="blog-title" :class="{ 'blog-title-hover': hovered === i }">{{ post.title }}</h3>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
          </div>
        </div>

        <div class="blog-footer">CONTENU VIA HYGRAPH CMS</div>

        <Teleport to="body">
          <Transition name="toast">
            <div v-if="toast" class="blog-toast">
              ✏️ En cours de rédaction
            </div>
          </Transition>
        </Teleport>
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
.blog-container {
  max-width: 860px;
}
.page-title {
  font-family: var(--serif);
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 700;
  margin-top: 4px;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}
.page-desc {
  color: var(--text3);
  font-size: 14px;
  margin-bottom: 40px;
  font-family: var(--mono);
  letter-spacing: 0.3px;
}
.blog-list {
  display: flex;
  flex-direction: column;
}
.blog-article {
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: padding-left 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}
.blog-article:hover {
  padding-left: 12px;
}
.blog-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.blog-tag {
  font-size: 10px;
  font-weight: 700;
  color: var(--accent);
  font-family: var(--mono);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.blog-date {
  font-size: 12px;
  color: var(--text3);
  font-family: var(--mono);
}
.blog-title {
  font-size: clamp(17px, 1.5vw, 20px);
  font-weight: 700;
  font-family: var(--serif);
  margin-bottom: 8px;
  line-height: 1.3;
  transition: color 0.3s ease;
}
.blog-title-hover {
  color: var(--accent);
}
.blog-excerpt {
  font-size: 14px;
  color: var(--text2);
  line-height: 1.6;
}
.blog-footer {
  text-align: center;
  padding: 44px 0 16px;
  color: var(--text3);
  font-size: 11px;
  font-family: var(--mono);
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .page-top {
    padding-top: 84px;
  }
  .blog-article {
    padding: 20px 0;
  }
  .blog-article:hover {
    padding-left: 0;
  }
  .blog-excerpt {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .blog-meta {
    gap: 6px;
  }
}
</style>

<style>
.blog-toast {
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
