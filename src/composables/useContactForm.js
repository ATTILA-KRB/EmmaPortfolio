import { ref, reactive } from 'vue'

export function useContactForm() {
  const form = reactive({
    name: '',
    email: '',
    message: '',
    services: [],
  })

  const status = ref('idle') // idle | sending | sent | error
  const errorMsg = ref('')

  const availableServices = ['Enquête', 'Reportage', 'Portrait', 'Pige', 'Stage', 'Autre']

  function toggleService(service) {
    const idx = form.services.indexOf(service)
    if (idx > -1) {
      form.services.splice(idx, 1)
    } else {
      form.services.push(service)
    }
  }

  async function sendForm() {
    if (!form.name || !form.email || !form.message) {
      errorMsg.value = 'Veuillez remplir tous les champs.'
      status.value = 'error'
      return
    }

    status.value = 'sending'
    errorMsg.value = ''

    try {
      // EmailJS integration — replace with your IDs
      // import emailjs from '@emailjs/browser'
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      //   from_name: form.name,
      //   from_email: form.email,
      //   message: form.message,
      //   services: form.services.join(', '),
      // }, 'YOUR_PUBLIC_KEY')

      // Simulated delay for prototype
      await new Promise(resolve => setTimeout(resolve, 1000))

      status.value = 'sent'
      form.name = ''
      form.email = ''
      form.message = ''
      form.services = []
    } catch (err) {
      status.value = 'error'
      errorMsg.value = 'Erreur lors de l\'envoi. Réessayez.'
    }
  }

  function resetForm() {
    status.value = 'idle'
    errorMsg.value = ''
  }

  return {
    form,
    status,
    errorMsg,
    availableServices,
    toggleService,
    sendForm,
    resetForm,
  }
}
