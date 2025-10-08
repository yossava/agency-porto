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

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[
              'Next.js',
              'React',
              'TypeScript',
              'Three.js',
              'Tailwind CSS',
              'Framer Motion',
              'WebGL',
              'Node.js',
            ]
              .concat([
                'Next.js',
                'React',
                'TypeScript',
                'Three.js',
                'Tailwind CSS',
                'Framer Motion',
                'WebGL',
                'Node.js',
              ])
              .map((tech, i) => (
                <span
                  key={i}
                  className="text-4xl font-bold text-white/20 hover:text-white/60 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
