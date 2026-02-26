<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { experiences, education, skills } from '@/data/experiences'

gsap.registerPlugin(ScrollTrigger)

const tab = ref(0)

onMounted(() => {
  gsap.fromTo('.tl-item', { x: -30, opacity: 0 }, {
    x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.12,
    scrollTrigger: { trigger: '.timeline', start: 'top 80%' },
  })

  gsap.fromTo('.skill-card', { y: 40, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.06,
    scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
  })
})
</script>

<template>
  <div class="page-top">
    <section class="section">
      <div class="container">
        <SectionLabel label="Parcours" />
        <h1 class="page-title">Expériences & Formation</h1>

        <!-- TIMELINE -->
        <div class="timeline">
          <div class="tl-line"></div>
          <div v-for="(exp, i) in experiences" :key="i" class="tl-item">
            <div class="tl-dot">
              <div class="tl-pulse"></div>
            </div>
            <div class="tl-card">
              <div class="tl-card-header">
                <h3 class="tl-role">{{ exp.role }}</h3>
                <span class="tl-period">{{ exp.period }}</span>
              </div>
              <span class="tl-company">{{ exp.company }}</span>
              <p class="tl-desc">{{ exp.desc }}</p>
            </div>
          </div>
        </div>

        <!-- EDUCATION -->
        <div class="edu-section">
          <h2 class="sub-title">Formation</h2>
          <div class="edu-tabs">
            <button
              v-for="(t, i) in education"
              :key="i"
              @click="tab = i"
              class="edu-tab"
              :class="{ 'edu-tab-active': tab === i, 'edu-tab-first': i === 0, 'edu-tab-last': i === education.length - 1 }"
            >
              {{ t.title }}
            </button>
          </div>
          <div class="edu-content" :key="tab">
            <div class="edu-header">
              <h3 class="edu-title">{{ education[tab].title }}</h3>
              <span class="edu-year">{{ education[tab].year }}</span>
            </div>
            <span class="edu-school">{{ education[tab].school }}</span>
            <p class="edu-desc">{{ education[tab].desc }}</p>
          </div>
        </div>

        <!-- SKILLS -->
        <h2 class="sub-title">Compétences</h2>
        <div class="skills-grid">
          <div v-for="(s, i) in skills" :key="i" class="skill-card">
            <span class="skill-icon">{{ s.icon }}</span>
            <h4 class="skill-title">{{ s.title }}</h4>
            <p class="skill-desc">{{ s.desc }}</p>
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
  margin-bottom: 48px;
  letter-spacing: -0.5px;
}
.sub-title {
  font-family: var(--serif);
  font-size: clamp(22px, 2vw, 26px);
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
}

/* TIMELINE */
.timeline {
  position: relative;
  max-width: 820px;
  margin-bottom: 64px;
}
.tl-line {
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 1.5px;
  background: var(--border);
}
.tl-item {
  display: flex;
  gap: 20px;
  margin-bottom: 28px;
  padding-left: 48px;
  position: relative;
}
.tl-dot {
  position: absolute;
  left: 13px;
  top: 20px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg);
  border: 2.5px solid var(--accent);
  z-index: 2;
}
.tl-pulse {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0;
  animation: pulseGlow 2s ease infinite;
}
.tl-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px 22px;
  flex: 1;
  min-width: 0;
  transition: border-color 0.3s ease;
}
.tl-card:hover {
  border-color: var(--accent);
}
.tl-card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 10px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}
.tl-role {
  font-size: 15px;
  font-weight: 700;
}
.tl-period {
  font-size: 10px;
  font-weight: 600;
  color: var(--accent);
  font-family: var(--mono);
  letter-spacing: 0.5px;
  white-space: nowrap;
  background: var(--bg3);
  padding: 3px 10px;
  border-radius: 3px;
}
.tl-company {
  font-size: 13px;
  color: var(--text2);
  font-weight: 600;
}
.tl-desc {
  font-size: 13px;
  color: var(--text3);
  margin-top: 8px;
  line-height: 1.6;
}

/* EDUCATION */
.edu-section {
  margin-bottom: 64px;
}
.edu-tabs {
  display: flex;
  gap: 2px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.edu-tab {
  padding: 9px 18px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: var(--bg3);
  color: var(--text3);
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
  font-family: var(--mono);
}
.edu-tab-first { border-radius: 6px 0 0 6px; }
.edu-tab-last { border-radius: 0 6px 6px 0; }
.edu-tab-active {
  background: var(--text);
  color: var(--bg);
}
.edu-content {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px;
  animation: fadeIn 0.3s ease;
}
.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.edu-title { font-size: 16px; font-weight: 700; }
.edu-year { font-size: 11px; font-family: var(--mono); color: var(--accent); font-weight: 600; }
.edu-school { font-size: 13px; color: var(--text2); font-weight: 600; }
.edu-desc { font-size: 14px; color: var(--text2); margin-top: 10px; line-height: 1.7; }

/* SKILLS */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.skill-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}
.skill-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
}
.skill-icon { font-size: 22px; display: block; margin-bottom: 10px; }
.skill-title { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
.skill-desc { font-size: 12px; color: var(--text3); line-height: 1.55; }

@media (min-width: 640px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
  .edu-tabs {
    flex-wrap: nowrap;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-top: 32px;
    padding-bottom: 80px;
  }
  .timeline {
    margin-bottom: 80px;
  }
  .edu-section {
    margin-bottom: 80px;
  }
}

@media (max-width: 768px) {
  .page-top {
    padding-top: 84px;
  }
  .page-title {
    margin-bottom: 36px;
  }
  .tl-item {
    padding-left: 40px;
    gap: 12px;
    margin-bottom: 20px;
  }
  .tl-line {
    left: 16px;
  }
  .tl-dot {
    left: 9px;
    width: 14px;
    height: 14px;
  }
  .tl-card {
    padding: 16px;
  }
  .tl-card-header {
    flex-direction: column;
    gap: 6px;
  }
  .tl-period {
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .edu-tabs {
    flex-direction: column;
    gap: 4px;
  }
  .edu-tab {
    border-radius: 6px !important;
  }
  .skills-grid {
    grid-template-columns: 1fr;
  }
  .tl-role {
    font-size: 14px;
  }
  .tl-period {
    font-size: 9px;
  }
  .edu-content {
    padding: 18px;
  }
  .edu-header {
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }
}
</style>
