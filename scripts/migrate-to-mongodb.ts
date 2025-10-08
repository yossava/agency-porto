import { MongoClient } from 'mongodb';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'agency_portfolio';

if (!uri) {
  console.error('❌ Error: MONGODB_URI not found in .env file');
  process.exit(1);
}

async function migrate() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas\n');

    const db = client.db(dbName);

    // ========================================
    // MIGRATE PROJECTS
    // ========================================
    console.log('📦 Migrating projects...');
    const projectsCollection = db.collection('projects');

    // Read projects.json
    const projectsPath = path.join(__dirname, '../src/data/projects.json');
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

    // Clear existing data
    await projectsCollection.deleteMany({});
    console.log('   Cleared existing projects');

    // Transform and insert projects
    const projects = projectsData.map((project: any) => ({
      ...project,
      date: new Date(project.date),
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const projectResult = await projectsCollection.insertMany(projects);
    console.log(`   ✅ Inserted ${projectResult.insertedCount} projects`);

    // Create indexes for projects
    await projectsCollection.createIndex({ id: 1 }, { unique: true });
    await projectsCollection.createIndex({ featured: 1, date: -1 });
    await projectsCollection.createIndex({ published: 1 });
    console.log('   ✅ Created project indexes\n');

    // ========================================
    // MIGRATE BLOG POSTS
    // ========================================
    console.log('📝 Migrating blog posts...');
    const blogCollection = db.collection('blog_posts');

    // Read blog.json
    const blogPath = path.join(__dirname, '../src/data/blog.json');
    const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf-8'));

    // Clear existing data
    await blogCollection.deleteMany({});
    console.log('   Cleared existing blog posts');

    // Transform and insert blog posts
    const posts = blogData.map((post: any) => ({
      ...post,
      date: new Date(post.date),
      published: true,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const blogResult = await blogCollection.insertMany(posts);
    console.log(`   ✅ Inserted ${blogResult.insertedCount} blog posts`);

    // Create indexes for blog posts
    await blogCollection.createIndex({ slug: 1 }, { unique: true });
    await blogCollection.createIndex({ published: 1, date: -1 });
    await blogCollection.createIndex({ featured: 1 });
    await blogCollection.createIndex({ 'category.id': 1 });
    await blogCollection.createIndex({ 'category.en': 1 });
    console.log('   ✅ Created blog post indexes\n');

    // ========================================
    // CREATE CONTACT SUBMISSIONS COLLECTION
    // ========================================
    console.log('📬 Setting up contact submissions collection...');
    const contactCollection = db.collection('contact_submissions');

    // Create indexes for contact submissions
    await contactCollection.createIndex({ createdAt: -1 });
    await contactCollection.createIndex({ status: 1 });
    await contactCollection.createIndex({ email: 1 });
    console.log('   ✅ Created contact submission indexes\n');

    // ========================================
    // SUMMARY
    // ========================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ MIGRATION COMPLETED SUCCESSFULLY!\n');
    console.log('Summary:');
    console.log(`   📦 Projects:         ${projectResult.insertedCount} documents`);
    console.log(`   📝 Blog Posts:       ${blogResult.insertedCount} documents`);
    console.log(`   📬 Contact Ready:    Collection created with indexes`);
    console.log('\nDatabase:', dbName);
    console.log('Collections:', 'projects, blog_posts, contact_submissions');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // ========================================
    // VERIFY DATA
    // ========================================
    console.log('🔍 Verifying data...');
    const projectCount = await projectsCollection.countDocuments();
    const blogCount = await blogCollection.countDocuments();
    const featuredProjects = await projectsCollection.countDocuments({ featured: true });
    const featuredBlogs = await blogCollection.countDocuments({ featured: true });

    console.log(`   Total projects:          ${projectCount}`);
    console.log(`   Featured projects:       ${featuredProjects}`);
    console.log(`   Total blog posts:        ${blogCount}`);
    console.log(`   Featured blog posts:     ${featuredBlogs}\n`);

    console.log('✅ Migration verification complete!');
    console.log('\n💡 Next steps:');
    console.log('   1. Run: npm run dev');
    console.log('   2. Visit: http://localhost:3000');
    console.log('   3. Test the API routes: http://localhost:3000/api/projects');
    console.log('   4. Check MongoDB Atlas dashboard to view your data\n');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('👋 Disconnected from MongoDB\n');
  }
}

// Run migration
console.log('🚀 Starting MongoDB Migration...\n');
migrate();
