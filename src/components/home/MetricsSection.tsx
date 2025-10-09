'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/effects/AnimatedCounter';
import { Activity, Users, Award, Zap } from 'lucide-react';

interface MetricsSectionProps {
  locale: string;
}

export default function MetricsSection({ locale }: MetricsSectionProps) {
  const metrics = [
    {
      icon: Activity,
      value: 99,
      suffix: '%',
      label: locale === 'en' ? 'Performance Score' : 'Skor Performa',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      value: 50,
      suffix: '+',
      label: locale === 'en' ? 'Happy Clients' : 'Klien Puas',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      value: 100,
      suffix: '+',
      label: locale === 'en' ? 'Projects Completed' : 'Proyek Selesai',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Zap,
      value: 5,
      suffix: '+',
      label: locale === 'en' ? 'Years Experience' : 'Tahun Pengalaman',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {locale === 'en' ? 'Numbers That' : 'Angka Yang'}
            <span className="block gradient-text">
              {locale === 'en' ? 'Speak for Themselves' : 'Berbicara Sendiri'}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="relative group"
              >
                <div className="glass rounded-3xl p-8 text-center hover:border-white/30 transition-all duration-500 relative overflow-hidden">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Animated Counter */}
                  <AnimatedCounter
                    end={metric.value}
                    suffix={metric.suffix}
                    className="text-5xl md:text-6xl font-bold gradient-text mb-2"
                  />

                  {/* Label */}
                  <p className="text-sm text-gray-400">{metric.label}</p>

                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
