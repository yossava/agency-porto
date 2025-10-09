import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'agency_portfolio';

if (!uri) {
  console.error('❌ Error: MONGODB_URI not found in .env file');
  process.exit(1);
}

async function addSEOFields() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas\n');

    const db = client.db(dbName);

    // ========================================
    // UPDATE PROJECTS WITH SEO FIELDS
    // ========================================
    console.log('📦 Adding SEO fields to projects...');
    const projectsCollection = db.collection('projects');

    // Get all projects
    const projects = await projectsCollection.find({}).toArray();
    console.log(`   Found ${projects.length} projects\n`);

    let projectsUpdated = 0;

    for (const project of projects) {
      // Generate SEO data from existing fields if not present
      const seoData = project.seo || {
        metaTitle: project.title,
        metaDescription: project.description,
        keywords: project.tags || [],
        ogImage: project.thumbnail || project.images?.[0],
        ogType: 'website',
      };

      await projectsCollection.updateOne(
        { _id: project._id },
        {
          $set: {
            seo: seoData,
            updatedAt: new Date(),
          },
        }
      );

      console.log(`   ✅ Updated SEO for project: ${project.id}`);
      projectsUpdated++;
    }

    console.log(`\n   ✅ Updated ${projectsUpdated} projects with SEO fields\n`);

    // ========================================
    // UPDATE BLOG POSTS WITH SEO FIELDS
    // ========================================
    console.log('📝 Adding SEO fields to blog posts...');
    const blogCollection = db.collection('blog_posts');

    // Get all blog posts
    const posts = await blogCollection.find({}).toArray();
    console.log(`   Found ${posts.length} blog posts\n`);

    let postsUpdated = 0;

    for (const post of posts) {
      // Generate SEO data from existing fields if not present
      const seoData = post.seo || {
        metaTitle: post.title,
        metaDescription: post.excerpt,
        keywords: post.tags || [],
        ogImage: post.thumbnail,
        ogType: 'article',
      };

      await blogCollection.updateOne(
        { _id: post._id },
        {
          $set: {
            seo: seoData,
            updatedAt: new Date(),
          },
        }
      );

      console.log(`   ✅ Updated SEO for blog post: ${post.slug}`);
      postsUpdated++;
    }

    console.log(`\n   ✅ Updated ${postsUpdated} blog posts with SEO fields\n`);

    // ========================================
    // SUMMARY
    // ========================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ SEO FIELDS ADDED SUCCESSFULLY!\n');
    console.log('Summary:');
    console.log(`   📦 Projects updated:       ${projectsUpdated}`);
    console.log(`   📝 Blog posts updated:     ${postsUpdated}`);
    console.log('\nSEO fields added:');
    console.log('   - metaTitle (id/en)');
    console.log('   - metaDescription (id/en)');
    console.log('   - keywords (array)');
    console.log('   - ogImage (string)');
    console.log('   - ogType (string)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('💡 Next steps:');
    console.log('   1. Review the SEO data in MongoDB Atlas');
    console.log('   2. Customize metaTitle and metaDescription for better SEO');
    console.log('   3. Add specific keywords for each project/post');
    console.log('   4. Upload custom OG images for social sharing');
    console.log('   5. Run: npm run dev and check page metadata\n');

  } catch (error) {
    console.error('❌ Error adding SEO fields:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('👋 Disconnected from MongoDB\n');
  }
}

// Run the script
console.log('🚀 Starting to add SEO fields to database...\n');
addSEOFields();
