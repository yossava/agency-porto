'use client';

import MagneticButton from '@/components/MagneticButton';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="flex gap-12 items-center"
          >
            {[
              { name: 'JavaScript', image: '/images/stacks/js.webp' },
              { name: 'TypeScript', image: '/images/stacks/typescript.png' },
              { name: 'React', image: '/images/stacks/react.png' },
              { name: 'Next.js', image: '/images/stacks/next.png' },
              { name: 'Node.js', image: '/images/stacks/nodejs.png' },
              { name: 'Tailwind CSS', image: '/images/stacks/tailwind.png' },
              { name: 'Laravel', image: '/images/stacks/laravel.png' },
              { name: 'Flutter', image: '/images/stacks/flutter.png' },
              { name: 'Angular', image: '/images/stacks/angular.png' },
              { name: 'Django', image: '/images/stacks/django.png' },
              { name: 'WordPress', image: '/images/stacks/wordpress.png' },
              { name: 'Android & iOS', image: '/images/stacks/android-ios.png' },
              { name: 'MongoDB', image: '/images/stacks/mongodb.png' },
              { name: 'MySQL', image: '/images/stacks/mysql.png' },
              { name: 'PostgreSQL', image: '/images/stacks/postgressql.png' },
              { name: 'Redis', image: '/images/stacks/redis.png' },
              { name: 'Kafka', image: '/images/stacks/kafka.png' },
              { name: 'Elasticsearch', image: '/images/stacks/elastic.png' },
              { name: 'AWS', image: '/images/stacks/aws.png' },
              { name: 'Cloudflare', image: '/images/stacks/cloudflare.png' },
            ]
              .concat([
                { name: 'JavaScript', image: '/images/stacks/js.webp' },
                { name: 'TypeScript', image: '/images/stacks/typescript.png' },
                { name: 'React', image: '/images/stacks/react.png' },
                { name: 'Next.js', image: '/images/stacks/next.png' },
                { name: 'Node.js', image: '/images/stacks/nodejs.png' },
                { name: 'Tailwind CSS', image: '/images/stacks/tailwind.png' },
                { name: 'Laravel', image: '/images/stacks/laravel.png' },
                { name: 'Flutter', image: '/images/stacks/flutter.png' },
                { name: 'Angular', image: '/images/stacks/angular.png' },
                { name: 'Django', image: '/images/stacks/django.png' },
                { name: 'WordPress', image: '/images/stacks/wordpress.png' },
                { name: 'Android & iOS', image: '/images/stacks/android-ios.png' },
                { name: 'MongoDB', image: '/images/stacks/mongodb.png' },
                { name: 'MySQL', image: '/images/stacks/mysql.png' },
                { name: 'PostgreSQL', image: '/images/stacks/postgressql.png' },
                { name: 'Redis', image: '/images/stacks/redis.png' },
                { name: 'Kafka', image: '/images/stacks/kafka.png' },
                { name: 'Elasticsearch', image: '/images/stacks/elastic.png' },
                { name: 'AWS', image: '/images/stacks/aws.png' },
                { name: 'Cloudflare', image: '/images/stacks/cloudflare.png' },
              ])
              .map((tech, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 hover:scale-110 transition-transform duration-300 relative p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10"
                  title={tech.name}
                >
                  <Image
                    src={tech.image}
                    alt={tech.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
