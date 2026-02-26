<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import ProjectCard from '@/components/portfolio/ProjectCard.vue'
import { projects, categories } from '@/data/projects'

const filter = ref('Tous')
const filtered = computed(() =>
  filter.value === 'Tous' ? projects : projects.filter(p => p.cat === filter.value)
)

function setFilter(cat) {
  filter.value = cat
}

function animateCards() {
  nextTick(() => {
    gsap.fromTo('.portfolio-card', { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.06,
    })
  })
}

watch(filter, animateCards)
onMounted(animateCards)
</script>

<template>
  <div class="page-top">
    <section class="section">
      <div class="container">
        <SectionLabel label="Portfolio" />
        <h1 class="page-title">Tous mes projets</h1>

        <div class="filters">
          <button
            v-for="c in categories"
            :key="c"
            @click="setFilter(c)"
            class="filter-btn"
            :class="{ 'filter-active': filter === c }"
          >
            {{ c }}
          </button>
        </div>

        <div class="projects-grid">
          <div v-for="p in filtered" :key="p.id" class="portfolio-card">
            <ProjectCard :project="p" />
          </div>
        </div>
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
.page-title {
  font-family: var(--serif);
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 700;
  margin-top: 4px;
  margin-bottom: 32px;
  letter-spacing: -0.5px;
}
.filters {
  display: flex;
  gap: 6px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.filter-btn {
  padding: 7px 16px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.5px;
  background: transparent;
  color: var(--text3);
  border: 1.5px solid var(--border);
  transition: all 0.3s ease;
  font-family: var(--mono);
}
.filter-btn:hover {
  border-color: var(--text);
  color: var(--text);
}
.filter-active {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

@media (min-width: 520px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}
@media (min-width: 900px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
}

@media (max-width: 768px) {
  .page-top {
    padding-top: 84px;
  }
  .filters {
    gap: 8px;
    margin-bottom: 24px;
  }
  .filter-btn {
    padding: 9px 14px;
    font-size: 11px;
  }
}
</style>
