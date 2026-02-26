<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import DotGrid from '@/components/ui/DotGrid.vue'
import ProjectCard from '@/components/portfolio/ProjectCard.vue'
import { projects } from '@/data/projects'
import { logos } from '@/data/socials'

gsap.registerPlugin(ScrollTrigger)

const featured = projects.filter(p => p.featured)

onMounted(() => {
  let mm = gsap.matchMedia()

  mm.add("(min-width: 769px)", () => {
    gsap.fromTo('.hero-anim', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.15,
    })

    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })

    gsap.fromTo('.featured-card', { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.12,
      scrollTrigger: { trigger: '.featured-grid', start: 'top 80%' },
    })
  })

  mm.add("(max-width: 768px)", () => {
    gsap.fromTo('.hero-anim', { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1,
    })

    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      })
    })

    gsap.fromTo('.featured-card', { x: 30, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1,
      scrollTrigger: { trigger: '.featured-grid', start: 'top 85%' },
    })
  })
})
</script>

<template>
  <div>
  <!-- HERO -->
  <section class="hero">
    <DotGrid />
    <div class="hero-letter" aria-hidden="true">E</div>

    <div class="container hero-content">
      <div class="hero-anim">
        <span class="hero-badge">Journaliste · Presse écrite</span>
      </div>

      <h1 class="hero-anim hero-title">
        Emma<br /><span class="hero-surname">Pertusot</span><span style="color: var(--accent)">.</span>
      </h1>

      <div class="hero-anim hero-desc-wrap">
        <p class="hero-desc">
          Enquêtes sociétales, écologie et voix peu représentées. Un journalisme exigeant, ancré dans le terrain et la vérification.
        </p>
      </div>

      <div class="hero-anim hero-ctas">
        <router-link to="/portfolio" class="btn-primary">Voir mes projets</router-link>
        <a href="/Emma_Pertusot_CV.pdf" download class="btn-secondary">Télécharger CV ↓</a>
        <a href="https://www.linkedin.com/in/emma-p-32183b26a/" target="_blank" class="btn-secondary">LinkedIn ↗</a>
      </div>

      <div class="hero-anim hero-stats">
        <div class="stat" v-for="(s, i) in [
          { num: '30+', label: 'Articles publiés' },
          { num: '6', label: 'Médias' },
        ]" :key="i" :class="{ 'stat-border': i < 1 }">
          <div class="stat-num">{{ s.num }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <div class="container hero-scroll-wrap">
      <div class="hero-scroll">
        <div class="hero-scroll-line"></div>
        <span class="hero-scroll-text">Défiler</span>
      </div>
    </div>
  </section>

  <!-- MARQUEE -->
  <section class="marquee-section">
    <div class="marquee-track">
      <span v-for="(l, i) in [...logos, ...logos, ...logos]" :key="i" class="marquee-item">
        {{ l }} <span class="marquee-dot">·</span>
      </span>
    </div>
  </section>

  <!-- ABOUT -->
  <section class="section reveal">
    <div class="container">
      <div class="about-grid">
        <div>
          <SectionLabel label="À propos" />
          <h2 class="about-title">
            Du terrain au récit,<br />
            <span class="about-title-italic">un journalisme engagé.</span>
          </h2>
        </div>
        <div>
          <p class="about-text">
            Étudiante en Master 2 Nouvelles Pratiques Journalistiques à l'Université Lyon 2, je m'intéresse au journalisme indépendant et aspire à rejoindre une rédaction de presse écrite qui travaille sur des enquêtes sociétales ou sur l'écologie.
          </p>
          <p class="about-text">
            Mes expériences en rédaction — de L'Est Républicain à Tribune de Lyon — ont confirmé mon intérêt pour un journalisme exigeant, attentif aux réalités sociales et aux voix peu représentées.
          </p>
          <div class="about-link-wrap">
            <router-link to="/experiences" class="link-accent">Mon parcours complet →</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED PROJECTS -->
  <section class="section">
    <div class="container">
      <div class="featured-header reveal">
        <div>
          <SectionLabel label="Projets" />
          <h2 class="section-title">Travaux récents</h2>
        </div>
        <router-link to="/portfolio" class="link-accent">Tout voir →</router-link>
      </div>
      <div class="featured-grid">
        <div v-for="p in featured" :key="p.id" class="featured-card">
          <ProjectCard :project="p" />
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section reveal">
    <div class="container">
      <div class="cta-box">
        <DotGrid />
        <div class="cta-text">
          <h3 class="cta-title">Un projet en tête<span style="color: var(--accent)"> ?</span></h3>
          <p class="cta-desc">Discutons de comment je peux contribuer à votre rédaction.</p>
        </div>
        <a href="mailto:epertusot@gmail.com" class="btn-primary cta-btn">Me contacter →</a>
      </div>
    </div>
  </section>
  </div>
</template>

<style scoped>
/* ─── HERO ─── */
.hero {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.hero-letter {
  position: absolute;
  right: -3vw;
  top: 50%;
  transform: translateY(-55%);
  font-family: var(--serif);
  font-size: clamp(220px, 36vw, 520px);
  font-weight: 900;
  color: var(--accent);
  opacity: 0.04;
  line-height: 0.85;
  letter-spacing: -15px;
  user-select: none;
  pointer-events: none;
}
.hero-content {
  position: relative;
  z-index: 2;
}
.hero-badge {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  font-family: var(--mono);
  background: var(--bg2);
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--border);
  display: inline-block;
  margin-bottom: 28px;
}
.hero-title {
  font-family: var(--serif);
  font-size: clamp(42px, 7vw, 100px);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 20px;
}
.hero-surname {
  font-style: italic;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -1px;
}
.hero-desc-wrap {
  max-width: 460px;
}
.hero-desc {
  font-size: clamp(15px, 1.2vw, 17px);
  line-height: 1.75;
  color: var(--text2);
  margin-bottom: 28px;
}
.hero-ctas {
  display: flex;
  gap: 12px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}
.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 24px 0;
}
.stat {
  padding-right: 32px;
  margin-right: 32px;
}
.stat-border {
  border-right: 1px solid var(--border);
}
.stat-num {
  font-family: var(--serif);
  font-size: clamp(22px, 2vw, 28px);
  font-weight: 900;
  color: var(--text);
  line-height: 1;
}
.stat-label {
  font-size: 11px;
  color: var(--text3);
  margin-top: 6px;
  font-family: var(--mono);
  letter-spacing: 0.3px;
}
.hero-scroll-wrap {
  position: absolute;
  bottom: 28px;
  left: 0;
  right: 0;
}
.hero-scroll {
  display: flex;
  align-items: center;
  gap: 12px;
}
.hero-scroll-line {
  width: 32px;
  height: 1px;
  background: var(--accent);
}
.hero-scroll-text {
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text3);
  font-family: var(--mono);
}

/* ─── MARQUEE ─── */
.marquee-section {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 14px 0;
  overflow: hidden;
}
.marquee-track {
  display: inline-flex;
  animation: marquee 35s linear infinite;
  white-space: nowrap;
}
.marquee-item {
  padding: 0 32px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text3);
  font-family: var(--serif);
  letter-spacing: 1.5px;
  opacity: 0.55;
}
.marquee-dot {
  color: var(--accent);
  opacity: 0.4;
  margin: 0 6px;
}

/* ─── SECTIONS ─── */
.section {
  padding-top: 64px;
  padding-bottom: 64px;
}

.section-title {
  font-family: var(--serif);
  font-size: clamp(24px, 2.5vw, 32px);
  font-weight: 700;
  margin-top: 4px;
  letter-spacing: -0.5px;
}

/* ─── ABOUT ─── */
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;
}
.about-title {
  font-family: var(--serif);
  font-size: clamp(24px, 2.5vw, 32px);
  font-weight: 700;
  margin-top: 4px;
  letter-spacing: -0.5px;
  line-height: 1.2;
}
.about-title-italic {
  font-style: italic;
  color: var(--text2);
}
.about-text {
  font-size: clamp(14px, 1.1vw, 16px);
  line-height: 1.85;
  color: var(--text2);
  margin-bottom: 16px;
}
.about-link-wrap {
  margin-top: 24px;
}

/* ─── FEATURED ─── */
.featured-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 36px;
  gap: 16px;
  flex-wrap: wrap;
}
.featured-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* ─── CTA ─── */
.cta-box {
  padding: 40px 28px;
  border-radius: 10px;
  position: relative;
  background: var(--bg3);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
}
.cta-text {
  position: relative;
  z-index: 2;
}
.cta-title {
  font-family: var(--serif);
  font-size: clamp(20px, 2vw, 26px);
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}
.cta-desc {
  color: var(--text2);
  font-size: 15px;
}
.cta-btn {
  position: relative;
  z-index: 2;
  align-self: flex-start;
}

/* ─── SHARED COMPONENTS ─── */
.btn-primary {
  background: var(--accent);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.5px;
  text-decoration: none;
  display: inline-block;
  transition: background 0.3s ease, transform 0.3s ease;
  font-family: var(--sans);
}
.btn-primary:hover {
  background: var(--accent2);
  transform: translateY(-1px);
}
.btn-secondary {
  background: transparent;
  color: var(--text);
  border: 1.5px solid var(--border);
  padding: 12px 28px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.5px;
  text-decoration: none;
  display: inline-block;
  transition: border-color 0.3s ease;
  font-family: var(--sans);
}
.btn-secondary:hover {
  border-color: var(--text);
}
.link-accent {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1.5px solid var(--accent);
  padding-bottom: 3px;
  transition: opacity 0.3s ease;
}
.link-accent:hover {
  opacity: 0.8;
}

/* ─── TABLET ─── */
@media (min-width: 640px) {
  .featured-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
  .cta-box {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 48px 40px;
  }
  .cta-btn {
    align-self: center;
    flex-shrink: 0;
  }
  .hero-ctas {
    margin-bottom: 52px;
  }
}

/* ─── DESKTOP ─── */
@media (min-width: 1024px) {
  .section {
    padding-top: 80px;
    padding-bottom: 80px;
  }
  .about-grid {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }
  .featured-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .cta-box {
    padding: 56px 52px;
  }
  .hero-badge {
    letter-spacing: 4px;
    margin-bottom: 32px;
  }
  .stat {
    padding-right: 36px;
    margin-right: 36px;
  }
}

/* ─── MOBILE ─── */
@media (max-width: 768px) {
  .hero {
    padding-top: 80px;
    justify-content: flex-start;
    padding-bottom: 60px;
  }
  .hero-badge {
    font-size: 10px;
    letter-spacing: 2px;
    padding: 6px 12px;
    margin-bottom: 20px;
  }
  .hero-scroll-wrap {
    display: none;
  }
  .hero-letter {
    font-size: clamp(150px, 45vw, 250px);
    right: -10vw;
  }
  .section {
    padding-top: 48px;
    padding-bottom: 48px;
  }
}

@media (max-width: 640px) {
  .featured-grid {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 16px;
    padding-bottom: 16px;
    margin: 0 -20px;
    padding: 0 20px 20px 20px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .featured-grid::-webkit-scrollbar {
    display: none;
  }
  .featured-card {
    min-width: 280px;
    width: 80vw;
    scroll-snap-align: center;
    flex-shrink: 0;
  }
}

@media (max-width: 480px) {
  .hero-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .stat {
    padding-right: 0;
    margin-right: 0;
  }
  .stat-border {
    border-right: none;
    border-bottom: none;
  }
  .hero-ctas {
    flex-direction: column;
  }
  .hero-ctas .btn-primary,
  .hero-ctas .btn-secondary {
    text-align: center;
    width: 100%;
  }
  .hero-title {
    letter-spacing: -1px;
  }
  .marquee-item {
    padding: 0 20px;
    font-size: 12px;
  }
  .cta-box {
    padding: 32px 20px;
  }
}
</style>
