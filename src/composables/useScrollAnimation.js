import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  const triggers = []

  function revealOnScroll(selector, options = {}) {
    const defaults = {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.1,
      start: 'top 85%',
    }
    const config = { ...defaults, ...options }

    onMounted(() => {
      const elements = document.querySelectorAll(selector)
      if (!elements.length) return

      const tl = gsap.fromTo(
        elements,
        { y: config.y, opacity: config.opacity },
        {
          y: 0,
          opacity: 1,
          duration: config.duration,
          ease: config.ease,
          stagger: config.stagger,
          scrollTrigger: {
            trigger: elements[0].parentElement || elements[0],
            start: config.start,
            toggleActions: 'play none none none',
          },
        }
      )

      triggers.push(tl)
    })
  }

  onUnmounted(() => {
    triggers.forEach(tl => tl.scrollTrigger?.kill())
    triggers.length = 0
  })

  return { revealOnScroll, gsap, ScrollTrigger }
}
