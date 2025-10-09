'use client';

import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

interface ServicesSectionProps {
  locale: string;
}

export default function ServicesSection({ locale }: ServicesSectionProps) {
  const services = [
    {
      title: locale === 'en' ? 'Web Development' : 'Pengembangan Web',
      description:
        locale === 'en'
          ? 'Lightning-fast, pixel-perfect websites built with cutting-edge technology'
          : 'Website super cepat dan sempurna, dibangun dengan teknologi terkini',
      icon: '⚡',
    },
    {
      title: locale === 'en' ? 'UI/UX Design' : 'Desain UI/UX',
      description:
        locale === 'en'
          ? 'Stunning interfaces that users love, backed by data and psychology'
          : 'Antarmuka memukau yang disukai pengguna, didukung data dan psikologi',
      icon: '🎨',
    },
    {
      title: locale === 'en' ? '3D & Animation' : 'Animasi 3D',
      description:
        locale === 'en'
          ? 'Immersive 3D experiences and smooth animations that captivate'
          : 'Pengalaman 3D yang imersif dan animasi halus yang memikat',
      icon: '✨',
    },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            {locale === 'en' ? 'What We Do' : 'Apa Yang Kami Lakukan'}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Pushing boundaries in web development, design, and interactive experiences'
              : 'Melampaui batas dalam pengembangan web, desain, dan pengalaman interaktif'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <MagneticButton>
                <div className="group glass p-8 rounded-2xl hover:border-white/30 transition-all duration-300 h-full">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div className="mt-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-400">
            {locale === 'en' ? 'Powered by Modern Tech' : 'Didukung Teknologi Modern'}
          </h3>
        </motion.div>

        <div className="relative overflow-hidden py-8">
          <motion.div
            animate={{ x: [0, -2400] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="flex gap-16 items-center"
          >
            {[
              {
                name: 'JavaScript',
                logo: (
                  <svg viewBox="0 0 256 256" className="w-16 h-16">
                    <rect width="256" height="256" fill="#F7DF1E" />
                    <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" />
                  </svg>
                ),
              },
              {
                name: 'Three.js',
                logo: (
                  <svg viewBox="0 0 256 256" className="w-16 h-16">
                    <g fill="none" stroke="#FFF" strokeWidth="4">
                      <path d="M128 20 L236 128 L128 236 L20 128 Z" />
                      <path d="M128 60 L196 128 L128 196 L60 128 Z" />
                      <path d="M128 100 L156 128 L128 156 L100 128 Z" />
                    </g>
                  </svg>
                ),
              },
              {
                name: 'Tailwind CSS',
                logo: (
                  <svg viewBox="0 0 256 154" className="w-20 h-12">
                    <defs>
                      <linearGradient x1="-2.778%" y1="32%" x2="100%" y2="67.556%" id="gradient">
                        <stop stopColor="#2298BD" offset="0%" />
                        <stop stopColor="#0ED7B5" offset="100%" />
                      </linearGradient>
                    </defs>
                    <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="url(#gradient)" />
                  </svg>
                ),
              },
              {
                name: 'Framer Motion',
                logo: (
                  <svg viewBox="0 0 256 384" className="w-12 h-18">
                    <path d="M0 0 H256 L128 128 H256 L0 384 V256 L128 128 H0 Z" fill="#FFF" opacity="0.3" />
                  </svg>
                ),
              },
              {
                name: 'WebGL',
                logo: (
                  <svg viewBox="0 0 256 256" className="w-16 h-16">
                    <path d="M128 16 L240 128 L128 240 L16 128 Z" fill="none" stroke="#FFF" strokeWidth="8" opacity="0.3" />
                    <circle cx="128" cy="128" r="40" fill="#FFF" opacity="0.3" />
                  </svg>
                ),
              },
              {
                name: 'Node.js',
                logo: (
                  <svg viewBox="0 0 256 289" className="w-16 h-18">
                    <path d="M128 0L256 72.5V216.5L128 289L0 216.5V72.5L128 0Z" fill="#539E43" opacity="0.8" />
                    <path d="M128 28.8L234.7 86.4V201.6L128 259.2L21.3 201.6V86.4L128 28.8Z" fill="#333" />
                  </svg>
                ),
              },
              {
                name: 'Next.js',
                logo: (
                  <svg viewBox="0 0 256 256" className="w-16 h-16">
                    <defs>
                      <linearGradient x1="55.633%" x2="83.228%" y1="56.385%" y2="96.08%" id="nextGradient">
                        <stop stopColor="#FFF" offset="0%" />
                        <stop stopColor="#FFF" offset="100%" />
                      </linearGradient>
                    </defs>
                    <circle cx="128" cy="128" r="128" fill="#000" opacity="0.9" />
                    <path d="M212.634 224.028L98.335 76.8H76.8v102.357h17.107V98.68L199.11 234.446a128.433 128.433 0 0013.524-10.418zM128 0C57.308 0 0 57.307 0 128s57.308 128 128 128 128-57.307 128-128S198.692 0 128 0zm0 234.667C74.99 234.667 32 191.677 32 128S74.99 21.333 128 21.333 224 64.323 224 128s-42.99 106.667-96 106.667z" fill="url(#nextGradient)" />
                    <path d="M159.955 76.8h17.066v102.4h-17.066z" fill="url(#nextGradient)" />
                  </svg>
                ),
              },
              {
                name: 'React',
                logo: (
                  <svg viewBox="0 0 256 228" className="w-16 h-14">
                    <path d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488 29.348-9.723 48.443-25.443 48.443-41.52 0-15.417-17.868-30.326-45.517-39.844" fill="#61DAFB" opacity="0.8" />
                    <path d="M128.221 94.665c11.207 0 20.298 9.09 20.298 20.296 0 11.207-9.09 20.298-20.298 20.298-11.206 0-20.296-9.09-20.296-20.298 0-11.206 9.09-20.296 20.296-20.296" fill="#61DAFB" />
                  </svg>
                ),
              },
              {
                name: 'TypeScript',
                logo: (
                  <svg viewBox="0 0 256 256" className="w-16 h-16">
                    <rect width="256" height="256" fill="#3178C6" rx="28" />
                    <path d="M56.612 128.85h33.903v94.493h28.033v-94.493h33.903v-23.53H56.612v23.53zm109.577 0h-24.69V105.32h77.413v23.53h-24.69v94.493h-28.033V128.85z" fill="#FFF" fillRule="evenodd" />
                  </svg>
                ),
              },
            ]
              .concat([
                {
                  name: 'JavaScript',
                  logo: (
                    <svg viewBox="0 0 256 256" className="w-16 h-16">
                      <rect width="256" height="256" fill="#F7DF1E" />
                      <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" />
                    </svg>
                  ),
                },
                {
                  name: 'Three.js',
                  logo: (
                    <svg viewBox="0 0 256 256" className="w-16 h-16">
                      <g fill="none" stroke="#FFF" strokeWidth="4">
                        <path d="M128 20 L236 128 L128 236 L20 128 Z" />
                        <path d="M128 60 L196 128 L128 196 L60 128 Z" />
                        <path d="M128 100 L156 128 L128 156 L100 128 Z" />
                      </g>
                    </svg>
                  ),
                },
                {
                  name: 'Tailwind CSS',
                  logo: (
                    <svg viewBox="0 0 256 154" className="w-20 h-12">
                      <defs>
                        <linearGradient x1="-2.778%" y1="32%" x2="100%" y2="67.556%" id="gradient2">
                          <stop stopColor="#2298BD" offset="0%" />
                          <stop stopColor="#0ED7B5" offset="100%" />
                        </linearGradient>
                      </defs>
                      <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="url(#gradient2)" />
                    </svg>
                  ),
                },
                {
                  name: 'Framer Motion',
                  logo: (
                    <svg viewBox="0 0 256 384" className="w-12 h-18">
                      <path d="M0 0 H256 L128 128 H256 L0 384 V256 L128 128 H0 Z" fill="#FFF" opacity="0.3" />
                    </svg>
                  ),
                },
                {
                  name: 'WebGL',
                  logo: (
                    <svg viewBox="0 0 256 256" className="w-16 h-16">
                      <path d="M128 16 L240 128 L128 240 L16 128 Z" fill="none" stroke="#FFF" strokeWidth="8" opacity="0.3" />
                      <circle cx="128" cy="128" r="40" fill="#FFF" opacity="0.3" />
                    </svg>
                  ),
                },
                {
                  name: 'Node.js',
                  logo: (
                    <svg viewBox="0 0 256 289" className="w-16 h-18">
                      <path d="M128 0L256 72.5V216.5L128 289L0 216.5V72.5L128 0Z" fill="#539E43" opacity="0.8" />
                      <path d="M128 28.8L234.7 86.4V201.6L128 259.2L21.3 201.6V86.4L128 28.8Z" fill="#333" />
                    </svg>
                  ),
                },
                {
                  name: 'Next.js',
                  logo: (
                    <svg viewBox="0 0 256 256" className="w-16 h-16">
                      <defs>
                        <linearGradient x1="55.633%" x2="83.228%" y1="56.385%" y2="96.08%" id="nextGradient2">
                          <stop stopColor="#FFF" offset="0%" />
                          <stop stopColor="#FFF" offset="100%" />
                        </linearGradient>
                      </defs>
                      <circle cx="128" cy="128" r="128" fill="#000" opacity="0.9" />
                      <path d="M212.634 224.028L98.335 76.8H76.8v102.357h17.107V98.68L199.11 234.446a128.433 128.433 0 0013.524-10.418zM128 0C57.308 0 0 57.307 0 128s57.308 128 128 128 128-57.307 128-128S198.692 0 128 0zm0 234.667C74.99 234.667 32 191.677 32 128S74.99 21.333 128 21.333 224 64.323 224 128s-42.99 106.667-96 106.667z" fill="url(#nextGradient2)" />
                      <path d="M159.955 76.8h17.066v102.4h-17.066z" fill="url(#nextGradient2)" />
                    </svg>
                  ),
                },
                {
                  name: 'React',
                  logo: (
                    <svg viewBox="0 0 256 228" className="w-16 h-14">
                      <path d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488 29.348-9.723 48.443-25.443 48.443-41.52 0-15.417-17.868-30.326-45.517-39.844" fill="#61DAFB" opacity="0.8" />
                      <path d="M128.221 94.665c11.207 0 20.298 9.09 20.298 20.296 0 11.207-9.09 20.298-20.298 20.298-11.206 0-20.296-9.09-20.296-20.298 0-11.206 9.09-20.296 20.296-20.296" fill="#61DAFB" />
                    </svg>
                  ),
                },
                {
                  name: 'TypeScript',
                  logo: (
                    <svg viewBox="0 0 256 256" className="w-16 h-16">
                      <rect width="256" height="256" fill="#3178C6" rx="28" />
                      <path d="M56.612 128.85h33.903v94.493h28.033v-94.493h33.903v-23.53H56.612v23.53zm109.577 0h-24.69V105.32h77.413v23.53h-24.69v94.493h-28.033V128.85z" fill="#FFF" fillRule="evenodd" />
                    </svg>
                  ),
                },
              ])
              .map((tech, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 hover:scale-110 transition-transform duration-300 grayscale hover:grayscale-0"
                  title={tech.name}
                >
                  {tech.logo}
                </div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
