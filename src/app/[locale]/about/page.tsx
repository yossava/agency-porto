'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Lightbulb, Target } from 'lucide-react';

interface AboutPageProps {
  params: { locale: string };
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  const values = [
    {
      icon: Lightbulb,
      title: locale === 'en' ? 'Innovation' : 'Inovasi',
      description:
        locale === 'en'
          ? 'We stay ahead of the curve, embracing new technologies and creative solutions'
          : 'Kami selalu terdepan, mengadopsi teknologi baru dan solusi kreatif',
    },
    {
      icon: Heart,
      title: locale === 'en' ? 'Passion' : 'Passion',
      description:
        locale === 'en'
          ? 'We love what we do and it shows in every project we deliver'
          : 'Kami mencintai apa yang kami lakukan dan itu terlihat di setiap proyek',
    },
    {
      icon: Target,
      title: locale === 'en' ? 'Excellence' : 'Keunggulan',
      description:
        locale === 'en'
          ? 'We set high standards and consistently exceed expectations'
          : 'Kami menetapkan standar tinggi dan selalu melampaui ekspektasi',
    },
    {
      icon: Award,
      title: locale === 'en' ? 'Quality' : 'Kualitas',
      description:
        locale === 'en'
          ? 'Every detail matters. We deliver pixel-perfect, production-ready code'
          : 'Setiap detail penting. Kami menghasilkan kode yang sempurna dan siap produksi',
    },
  ];

  const stats = [
    { number: '50+', label: locale === 'en' ? 'Projects Completed' : 'Proyek Selesai' },
    { number: '30+', label: locale === 'en' ? 'Happy Clients' : 'Klien Puas' },
    { number: '5+', label: locale === 'en' ? 'Years Experience' : 'Tahun Pengalaman' },
    { number: '95+', label: locale === 'en' ? 'Quality Score' : 'Skor Kualitas' },
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: locale === 'en' ? 'Lead Developer' : 'Lead Developer',
      image: '👨‍💻',
      bio:
        locale === 'en'
          ? 'Full-stack expert with 8+ years building scalable web applications'
          : 'Ahli full-stack dengan pengalaman 8+ tahun membangun aplikasi web scalable',
    },
    {
      name: 'Sarah Johnson',
      role: locale === 'en' ? 'UI/UX Designer' : 'Desainer UI/UX',
      image: '👩‍🎨',
      bio:
        locale === 'en'
          ? 'Award-winning designer passionate about creating delightful user experiences'
          : 'Desainer pemenang penghargaan yang passionate menciptakan pengalaman pengguna',
    },
    {
      name: 'David Martinez',
      role: locale === 'en' ? 'DevOps Engineer' : 'DevOps Engineer',
      image: '👨‍🔧',
      bio:
        locale === 'en'
          ? 'Cloud infrastructure specialist ensuring reliable, fast deployments'
          : 'Spesialis infrastruktur cloud yang memastikan deployment cepat dan andal',
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
            {locale === 'en' ? 'About' : 'Tentang'}
            <span className="block gradient-text">
              {locale === 'en' ? 'Us' : 'Kami'}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {locale === 'en'
              ? "We're a team of passionate developers and designers dedicated to creating exceptional digital experiences that make a difference."
              : 'Kami adalah tim developer dan desainer yang berdedikasi menciptakan pengalaman digital luar biasa yang membuat perbedaan.'}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            {locale === 'en' ? 'Our Values' : 'Nilai Kami'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass rounded-3xl p-8 text-center hover:border-white/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            {locale === 'en' ? 'Meet the Team' : 'Tim Kami'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-3xl p-8 text-center group hover:border-white/30 transition-all duration-300"
              >
                <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {member.image}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                  {member.name}
                </h3>
                <div className="text-blue-400 mb-4">{member.role}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 glass rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            {locale === 'en' ? 'Our Mission' : 'Misi Kami'}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {locale === 'en'
              ? 'To empower businesses with cutting-edge web solutions that drive growth, enhance user experiences, and push the boundaries of what's possible on the web.'
              : 'Memberdayakan bisnis dengan solusi web terkini yang mendorong pertumbuhan, meningkatkan pengalaman pengguna, dan melampaui batas kemungkinan di web.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
