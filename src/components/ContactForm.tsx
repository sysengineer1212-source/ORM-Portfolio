import { useState } from 'react'
import type { FormEvent } from 'react'

import {
  CheckCircle2,
  Loader2,
  Mail,
  Send,
} from 'lucide-react'

type FormStatus =
  | 'idle'
  | 'sending'
  | 'success'
  | 'error'

function ContactForm() {
  const [status, setStatus] =
    useState<FormStatus>('idle')

  const [errorMessage, setErrorMessage] =
    useState('')

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setStatus('sending')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    const data = {
      access_key:
        import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,

      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      subject: formData.get('subject'),
      message: formData.get('message'),

      from_name: 'Nestor Portfolio',
    }

    try {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify(data),
        },
      )

      const result = await response.json()

      if (!result.success) {
        throw new Error(
          result.message || 'Unable to send message.',
        )
      }

      setStatus('success')
      form.reset()
    } catch (error) {
      setStatus('error')

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong.',
      )
    }
  }

  return (
    <section
      id="contact"
      className="mt-16 scroll-mt-8"
    >
      <div className="overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#0d1219]">

        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">

          {/* LEFT SIDE */}
          <div className="border-b border-white/10 bg-emerald-400/[0.03] p-7 lg:border-b-0 lg:border-r">
            <p className="text-sm font-medium text-emerald-400">
              Get In Touch
            </p>

            <h3 className="mt-3 text-3xl font-semibold tracking-tight">
              Have an ORM or PHP project?
            </h3>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
              Send me a message about ORM asset building,
              PHP, WordPress, SEO operations, campaign
              infrastructure, or related engineering work.
            </p>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-600">
                Email
              </p>

              <a
                href="mailto:sysengineer1212@gmail.com"
                className="mt-2 inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-emerald-400"
              >
                <Mail
                  size={16}
                  className="text-emerald-400"
                />

                sysengineer1212@gmail.com
              </a>
            </div>

            <div className="mt-8 rounded-xl border border-white/10 bg-black/10 p-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs font-medium text-gray-300">
                  Available for remote opportunities
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-600">
                ORM · PHP · WordPress · SEO Operations
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="p-7">
            {status === 'success' ? (
              <SuccessMessage
                onReset={() => setStatus('idle')}
              />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">

                  <FormField
                    label="Name"
                    name="name"
                    placeholder="Your name"
                    required
                  />

                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <FormField
                    label="Company"
                    name="company"
                    placeholder="Company name"
                  />

                  <FormField
                    label="Subject"
                    name="subject"
                    placeholder="Project or opportunity"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm text-gray-400"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me a little about the opportunity..."
                    className="w-full resize-none rounded-lg border border-white/10 bg-[#080b10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/40"
                  />
                </div>

                {status === 'error' && (
                  <div className="rounded-lg border border-red-400/20 bg-red-400/5 p-4">
                    <p className="text-sm text-red-400">
                      Unable to send your message.
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {errorMessage}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />

                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
}: {
  label: string
  name: string
  type?: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm text-gray-400"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-[#080b10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/40"
      />
    </div>
  )
}

function SuccessMessage({
  onReset,
}: {
  onReset: () => void
}) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
        <CheckCircle2
          size={28}
          className="text-emerald-400"
        />
      </div>

      <h4 className="mt-5 text-xl font-semibold">
        Message sent
      </h4>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
        Thanks for reaching out. Your message has been
        delivered successfully.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm text-emerald-400 hover:text-emerald-300"
      >
        Send another message
      </button>
    </div>
  )
}

export default ContactForm