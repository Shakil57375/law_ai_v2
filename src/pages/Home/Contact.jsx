

import { useState } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "../../../lib/language-context"
import { getTranslation } from "../../../lib/i18n"

const Contact = () => {
  const { language } = useLanguage()
  const t = (key) => getTranslation(language, key)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('contactPage.nameRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contactPage.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contactPage.emailInvalid')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contactPage.messageRequired')
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contactPage.messageShort')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitSuccess(true)
        setFormData({
          name: "",
          email: "",
          message: "",
        })

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      }, 1500)
    }
  }

  return (
    <section id="contact" className="py-12 md:py-24 px-10 min-h-[400px]">
      <h2 className="text-[2.074rem] font-bold mb-8 text-[#60a5fa] text-center tracking-tight">{t('contactPage.title')}</h2>
      <div className="max-w-[1000px] mx-auto">
        <p className="text-center mb-8">
          {t('contactPage.subtitle')}
        </p>

        <div className="max-w-[600px] mx-auto bg-[#1e293b] p-8 rounded-xl shadow-lg border border-[rgba(96,165,250,0.2)]">
          {submitSuccess ? (
            <div className="bg-[rgba(16,185,129,0.2)] border border-[rgba(16,185,129,0.4)] text-[#10b981] p-4 rounded-lg mb-6 text-center">
              Thank you for your message! We will get back to you soon.
            </{t('contactPage.successMessage')}
          ) : null}

          <div className="mt-8 text-center">
            <p className="text-[#94a3b8]">
              Or reach us directly via email at{" "}
              {t('contactPage.email')}{" "}
              <a href="mailto:support@clintechso.com" className="text-[#60a5fa] hover:underline">
                {t('contactPage.emailAddress')}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-[30px] md:flex-row flex-col">
          <Link
            to="/login"
            className="bg-transparent border-2 border-[#3b82f6] text-white px-8 py-4 rounded-full hover:bg-[rgba(59,130,246,0.1)] transition-colors shadow-[0_5px_15px_rgba(37,99,235,0.2)] inline-block text-center"
          >
            {t('contactPage.login')}
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white px-8 py-4 rounded-full hover:translate-y-[-3px] hover:shadow-[0_8px_20px_rgba(37,99,235,0.5)] transition-all shadow-[0_5px_15px_rgba(37,99,235,0.4)] relative overflow-hidden z-1 inline-block text-center"
          >
            {t('contactPage.signup')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Contact
