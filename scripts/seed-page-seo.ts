import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'agency_portfolio';

if (!uri) {
  console.error('❌ Error: MONGODB_URI not found in .env file');
  process.exit(1);
}

const pageSEOData = [
  {
    slug: 'home',
    title: {
      id: 'codebiru - Pengembangan Web & Aplikasi Premium',
      en: 'codebiru - Premium Web & App Development',
    },
    description: {
      id: 'Transformasikan kehadiran digital Anda dengan pengembangan web mutakhir, desain UI/UX yang menakjubkan, dan solusi inovatif. Tim ahli memberikan keunggulan.',
      en: 'Transform your digital presence with cutting-edge web development, stunning UI/UX design, and innovative solutions. Expert team delivering excellence.',
    },
    keywords: [
      'web development',
      'app development',
      'UI/UX design',
      'Next.js',
      'React',
      'TypeScript',
      'frontend development',
      'full stack development',
      'digital agency',
      'codebiru',
      'pengembangan web',
      'pengembangan aplikasi',
    ],
    ogImage: '/og-home.jpg',
    published: true,
  },
  {
    slug: 'about',
    title: {
      id: 'Tentang Kami - Siapa Kami dan Apa yang Kami Lakukan',
      en: 'About Us - Who We Are and What We Do',
    },
    description: {
      id: 'Pelajari lebih lanjut tentang codebiru, tim ahli kami, dan bagaimana kami membantu bisnis berkembang melalui solusi digital inovatif.',
      en: 'Learn more about codebiru, our expert team, and how we help businesses thrive through innovative digital solutions.',
    },
    keywords: [
      'about codebiru',
      'team',
      'vision',
      'mission',
      'digital agency',
      'tentang codebiru',
      'tim',
      'visi',
      'misi',
      'agensi digital',
    ],
    ogImage: '/og-about.jpg',
    published: true,
  },
  {
    slug: 'services',
    title: {
      id: 'Layanan Kami - Solusi Digital Komprehensif',
      en: 'Our Services - Comprehensive Digital Solutions',
    },
    description: {
      id: 'Dari pengembangan web dan aplikasi hingga desain UI/UX dan konsultasi digital - kami menawarkan layanan lengkap untuk transformasi digital Anda.',
      en: 'From web and app development to UI/UX design and digital consulting - we offer complete services for your digital transformation.',
    },
    keywords: [
      'web development services',
      'app services',
      'UI/UX design',
      'digital consulting',
      'custom development',
      'layanan pengembangan web',
      'layanan aplikasi',
      'konsultasi digital',
      'pengembangan custom',
    ],
    ogImage: '/og-services.jpg',
    published: true,
  },
  {
    slug: 'work',
    title: {
      id: 'Portofolio Kami - Proyek dan Kisah Sukses',
      en: 'Our Work - Projects and Success Stories',
    },
    description: {
      id: 'Jelajahi portofolio proyek kami yang beragam. Setiap proyek merepresentasikan komitmen kami terhadap keunggulan dan inovasi dalam pengembangan digital.',
      en: 'Explore our diverse portfolio of projects. Each one represents our commitment to excellence and innovation in digital development.',
    },
    keywords: [
      'portfolio',
      'projects',
      'case studies',
      'work',
      'clients',
      'portofolio',
      'proyek',
      'studi kasus',
      'karya',
      'klien',
    ],
    ogImage: '/og-work.jpg',
    published: true,
  },
  {
    slug: 'blog',
    title: {
      id: 'Blog - Insights, Tips, dan Berita Industri',
      en: 'Blog - Insights, Tips, and Industry News',
    },
    description: {
      id: 'Baca artikel terbaru kami tentang pengembangan web, tren teknologi, best practices, dan insights industri dari tim ahli kami.',
      en: 'Read our latest articles on web development, technology trends, best practices, and industry insights from our expert team.',
    },
    keywords: [
      'tech blog',
      'development articles',
      'web tutorials',
      'industry trends',
      'programming tips',
      'blog teknologi',
      'artikel pengembangan',
      'tutorial web',
      'tren industri',
      'tips programming',
    ],
    ogImage: '/og-blog.jpg',
    published: true,
  },
  {
    slug: 'contact',
    title: {
      id: 'Hubungi Kami - Mari Wujudkan Proyek Anda',
      en: "Contact Us - Let's Bring Your Project to Life",
    },
    description: {
      id: 'Siap memulai proyek Anda? Hubungi kami hari ini untuk konsultasi gratis dan diskusikan bagaimana kami dapat membantu bisnis Anda berkembang.',
      en: 'Ready to start your project? Contact us today for a free consultation and discuss how we can help your business thrive.',
    },
    keywords: [
      'contact',
      'get in touch',
      'consultation',
      'quote',
      'start project',
      'kontak',
      'hubungi kami',
      'konsultasi',
      'mulai proyek',
    ],
    ogImage: '/og-contact.jpg',
    published: true,
  },
];

async function seedPageSEO() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas\n');

    const db = client.db(dbName);
    const pageSEOCollection = db.collection('page_seo');

    // Clear existing data
    await pageSEOCollection.deleteMany({});
    console.log('   Cleared existing page SEO data\n');

    // Add timestamps to each page
    const pagesWithTimestamps = pageSEOData.map((page) => ({
      ...page,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert page SEO data
    const result = await pageSEOCollection.insertMany(pagesWithTimestamps);
    console.log(`   ✅ Inserted ${result.insertedCount} page SEO records\n`);

    // Create indexes
    await pageSEOCollection.createIndex({ slug: 1 }, { unique: true });
    await pageSEOCollection.createIndex({ published: 1 });
    console.log('   ✅ Created indexes\n');

    // ========================================
    // SUMMARY
    // ========================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ PAGE SEO DATA SEEDED SUCCESSFULLY!\n');
    console.log('Summary:');
    console.log(`   📄 Pages configured:    ${result.insertedCount}`);
    console.log('\nPages with SEO:');
    pageSEOData.forEach((page) => {
      console.log(`   ✓ ${page.slug}`);
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('💡 Next steps:');
    console.log('   1. You can now customize SEO content in MongoDB Atlas');
    console.log('   2. Edit the "page_seo" collection to update:');
    console.log('      - title (id/en)');
    console.log('      - description (id/en)');
    console.log('      - keywords (array)');
    console.log('      - ogImage (URL)');
    console.log('   3. Run: npm run dev to see the changes');
    console.log('   4. Upload custom OG images to /public directory\n');

  } catch (error) {
    console.error('❌ Error seeding page SEO:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('👋 Disconnected from MongoDB\n');
  }
}

// Run the script
console.log('🚀 Starting to seed page SEO data...\n');
seedPageSEO();
