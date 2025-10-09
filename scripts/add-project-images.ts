import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'agency_portfolio';

if (!uri) {
  console.error('❌ Error: MONGODB_URI not found in .env file');
  process.exit(1);
}

// Sample placeholder images from Unsplash (you can replace these with actual project images)
const sampleImages = {
  // You can add specific images per project, or use generic tech/project images
  web: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  ],
  mobile: [
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80',
    'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80',
  ],
  ai: [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
  ],
};

async function addProjectImages() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas\n');

    const db = client.db(dbName);
    const projectsCollection = db.collection('projects');

    // Get all projects
    const projects = await projectsCollection.find({}).toArray();
    console.log(`📦 Found ${projects.length} projects\n`);

    let updatedCount = 0;

    for (const project of projects) {
      // Determine image set based on tags or category
      let imageSet = sampleImages.web;

      if (project.tags?.some((tag: string) => tag.toLowerCase().includes('mobile') || tag.toLowerCase().includes('ios') || tag.toLowerCase().includes('android'))) {
        imageSet = sampleImages.mobile;
      } else if (project.tags?.some((tag: string) => tag.toLowerCase().includes('ai') || tag.toLowerCase().includes('ml') || tag.toLowerCase().includes('machine'))) {
        imageSet = sampleImages.ai;
      }

      // Generate random number of images (3-9)
      const imageCount = Math.floor(Math.random() * 7) + 3; // 3 to 9 images
      const shuffled = [...imageSet].sort(() => 0.5 - Math.random());
      const selectedImages = shuffled.slice(0, Math.min(imageCount, imageSet.length));

      // Update the project with thumbnail and images
      await projectsCollection.updateOne(
        { _id: project._id },
        {
          $set: {
            thumbnail: selectedImages[0], // First image as thumbnail
            images: selectedImages, // All images for gallery
            updatedAt: new Date(),
          },
        }
      );

      console.log(`   ✅ Updated "${project.id}" with ${selectedImages.length} images`);
      updatedCount++;
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Successfully updated ${updatedCount} projects with images!`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('💡 Note: These are placeholder images from Unsplash.');
    console.log('   Replace them with actual project screenshots by updating');
    console.log('   the database records directly or modifying this script.\n');

  } catch (error) {
    console.error('❌ Error adding images:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('👋 Disconnected from MongoDB\n');
  }
}

// Run the script
console.log('🚀 Starting to add images to projects...\n');
addProjectImages();
