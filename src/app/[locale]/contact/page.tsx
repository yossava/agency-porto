'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

interface ContactPageProps {
  params: { locale: string };
}

export default function ContactPage({ params: { locale } }: ContactPageProps) {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(locale === 'en' ? 'Message sent successfully!' : 'Pesan berhasil dikirim!');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: locale === 'en' ? 'Email' : 'Email',
      value: 'hello@agency.com',
      href: 'mailto:hello@agency.com',
    },
    {
      icon: Phone,
      title: locale === 'en' ? 'Phone' : 'Telepon',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: locale === 'en' ? 'Location' : 'Lokasi',
      value: locale === 'en' ? 'San Francisco, CA' : 'San Francisco, CA',
      href: '#',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            {locale === 'en' ? "Let's Work" : 'Mari Bekerja'}
            <span className="block gradient-text">
              {locale === 'en' ? 'Together' : 'Bersama'}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.'
              : 'Punya proyek dalam pikiran? Kami ingin mendengar dari Anda. Kirim pesan dan kami akan merespons secepat mungkin.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold mb-8">
              {locale === 'en' ? 'Contact Info' : 'Info Kontak'}
            </h2>

            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-blue-400 group-hover:border-white/30 group-hover:scale-110 transition-all duration-300">
                  <info.icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 group-hover:gradient-text transition-all">
                    {info.title}
                  </h3>
                  <p className="text-gray-400">{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Extra Info */}
            <div className="pt-8 border-t border-white/10">
              <h3 className="font-semibold mb-4">
                {locale === 'en' ? 'Business Hours' : 'Jam Kerja'}
              </h3>
              <p className="text-gray-400 text-sm">
                {locale === 'en' ? 'Monday - Friday' : 'Senin - Jumat'}
                <br />
                9:00 AM - 6:00 PM PST
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {locale === 'en' ? 'Your Name' : 'Nama Anda'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-blue-400 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
                    placeholder={locale === 'en' ? 'John Doe' : 'John Doe'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {locale === 'en' ? 'Email Address' : 'Alamat Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-blue-400 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  {locale === 'en' ? 'Subject' : 'Subjek'}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-blue-400 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
                  placeholder={locale === 'en' ? 'Project Inquiry' : 'Pertanyaan Proyek'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {locale === 'en' ? 'Message' : 'Pesan'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-blue-400 focus:outline-none transition-all duration-300 text-white placeholder-gray-500 resize-none"
                  placeholder={
                    locale === 'en'
                      ? 'Tell us about your project...'
                      : 'Ceritakan tentang proyek Anda...'
                  }
                />
              </div>

              <MagneticButton>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {locale === 'en' ? 'Sending...' : 'Mengirim...'}
                      </>
                    ) : (
                      <>
                        {locale === 'en' ? 'Send Message' : 'Kirim Pesan'}
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
