<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { useContactForm } from '@/composables/useContactForm'
import { socials } from '@/data/socials'

const { form, status, errorMsg, availableServices, toggleService, sendForm } = useContactForm()
</script>

<template>
  <div class="page-top">
    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <!-- LEFT -->
          <div>
            <SectionLabel label="Contact" />
            <h1 class="page-title">Échangeons<span style="color: var(--accent)">.</span></h1>
            <p class="contact-desc">
              Vous cherchez une journaliste pour une enquête, un article ou un stage ? Discutons-en.
            </p>

            <div class="contact-email-block">
              <span class="contact-label">Email</span>
              <a href="mailto:contact@emmapertusot.fr" class="contact-email">contact@emmapertusot.fr</a>
            </div>

            <div class="contact-socials">
              <a
                v-for="s in socials"
                :key="s.name"
                :href="s.url"
                target="_blank"
                rel="noopener"
                class="social-btn"
              >{{ s.name }}</a>
            </div>
          </div>

          <!-- RIGHT — FORM -->
          <div class="form-card">
            <div v-if="status === 'sent'" class="form-success">
              <div class="success-icon">✓</div>
              <h3 class="success-title">Message envoyé</h3>
              <p class="success-desc">Je vous réponds très vite.</p>
            </div>

            <form v-else @submit.prevent="sendForm">
              <div class="field">
                <label class="field-label">Nom</label>
                <input v-model="form.name" placeholder="Votre nom" class="field-input" />
              </div>

              <div class="field">
                <label class="field-label">Email</label>
                <input v-model="form.email" type="email" placeholder="votre@email.com" class="field-input" />
              </div>

              <div class="field">
                <label class="field-label">Message</label>
                <textarea v-model="form.message" rows="4" placeholder="Décrivez votre projet..." class="field-input field-textarea"></textarea>
              </div>

              <div class="field">
                <label class="field-label">Services</label>
                <div class="services">
                  <span
                    v-for="s in availableServices"
                    :key="s"
                    @click="toggleService(s)"
                    class="service-chip"
                    :class="{ 'service-active': form.services.includes(s) }"
                  >{{ s }}</span>
                </div>
              </div>

              <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

              <button type="submit" class="submit-btn" :disabled="status === 'sending'">
                {{ status === 'sending' ? 'Envoi...' : 'Envoyer →' }}
              </button>

              <p class="form-footer">VIA EMAILJS — SANS BACKEND</p>
            </form>
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
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: start;
}
.page-title {
  font-family: var(--serif);
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 700;
  margin-top: 4px;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}
.contact-desc {
  font-size: 15px;
  color: var(--text2);
  line-height: 1.75;
  margin-bottom: 32px;
  max-width: 400px;
}
.contact-email-block {
  margin-bottom: 28px;
}
.contact-label {
  font-size: 10px;
  color: var(--text3);
  font-family: var(--mono);
  letter-spacing: 2px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 8px;
}
.contact-email {
  font-family: var(--serif);
  font-size: clamp(16px, 1.5vw, 20px);
  font-weight: 700;
  color: var(--accent);
  border-bottom: 1.5px solid var(--accent);
  padding-bottom: 2px;
  text-decoration: none;
}
.contact-socials {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.social-btn {
  padding: 9px 16px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  border: 1.5px solid var(--border);
  color: var(--text3);
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: var(--mono);
  letter-spacing: 0.5px;
}
.social-btn:hover {
  border-color: var(--text);
  color: var(--text);
}

/* FORM */
.form-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 28px;
}
.field {
  margin-bottom: 16px;
}
.field-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text3);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: var(--mono);
  display: block;
  margin-bottom: 8px;
}
.field-input {
  width: 100%;
  padding: 11px 14px;
  border-radius: 4px;
  border: 1.5px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
  font-family: var(--sans);
  outline: none;
  transition: border-color 0.3s ease;
}
.field-input:focus {
  border-color: var(--accent);
}
.field-textarea {
  resize: vertical;
}
.services {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.service-chip {
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
  border: 1.5px solid var(--border);
  background: transparent;
  color: var(--text3);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--mono);
  user-select: none;
}
.service-active {
  border-color: var(--accent);
  background: var(--accent);
  color: white;
}
.error-msg {
  color: var(--accent);
  font-size: 13px;
  margin-bottom: 12px;
}
.submit-btn {
  width: 100%;
  padding: 13px;
  border-radius: 4px;
  border: none;
  background: var(--accent);
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: background 0.3s ease;
  font-family: var(--sans);
}
.submit-btn:hover {
  background: var(--accent2);
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.form-footer {
  font-size: 10px;
  color: var(--text3);
  margin-top: 10px;
  text-align: center;
  font-family: var(--mono);
  letter-spacing: 1px;
}

/* Success */
.form-success {
  text-align: center;
  padding: 40px 0;
  animation: fadeUp 0.5s ease;
}
.success-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  margin: 0 auto 16px;
}
.success-title {
  font-family: var(--serif);
  font-size: 20px;
  margin-bottom: 8px;
}
.success-desc {
  color: var(--text2);
  font-size: 13px;
}

/* ─── TABLET ─── */
@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 5fr 6fr;
    gap: 48px;
  }
  .form-card {
    padding: 32px;
  }
}

/* ─── DESKTOP ─── */
@media (min-width: 1024px) {
  .contact-grid {
    gap: 64px;
  }
  .section {
    padding-top: 32px;
    padding-bottom: 80px;
  }
}

/* ─── MOBILE ─── */
@media (max-width: 768px) {
  .page-top {
    padding-top: 84px;
  }
  .form-card {
    padding: 20px;
  }
  .contact-desc {
    margin-bottom: 24px;
  }
  .contact-email-block {
    margin-bottom: 20px;
  }
  .service-chip {
    padding: 8px 12px;
    font-size: 10px;
  }
  .submit-btn {
    padding: 15px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .contact-socials {
    flex-direction: column;
  }
  .social-btn {
    text-align: center;
  }
}
</style>
