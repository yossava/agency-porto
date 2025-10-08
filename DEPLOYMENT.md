# Deployment Guide

This guide covers deploying your Next.js portfolio website to various platforms.

## 🚀 Quick Deploy

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Configure Project**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Install Command: `npm install`

3. **Environment Variables**
   - Add variables from `.env.example` in Vercel dashboard
   - Go to Project Settings → Environment Variables

4. **Custom Domain**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

### Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: out
   ```

3. **Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add variables from `.env.example`

4. **Deploy**
   - Push to main branch to trigger deployment
   - Or use Netlify CLI:
     ```bash
     npm install netlify-cli -g
     netlify deploy --prod
     ```

### Cloudflare Pages

1. **Connect Repository**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect your Git repository

2. **Build Configuration**
   ```
   Framework preset: Next.js (Static HTML Export)
   Build command: npm run build
   Build output directory: out
   ```

3. **Environment Variables**
   - Add from `.env.example` in Pages dashboard

## 📦 Manual Deployment

### Build Locally

```bash
# Install dependencies
npm install

# Build static site
npm run build

# Output will be in 'out' directory
```

### Deploy to Static Hosting

The `out` directory can be deployed to any static hosting:

#### AWS S3 + CloudFront

```bash
# Install AWS CLI
aws configure

# Upload to S3
aws s3 sync out/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### GitHub Pages

```bash
# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d out"

# Install gh-pages
npm install -D gh-pages

# Deploy
npm run deploy
```

#### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Configure:
# - Public directory: out
# - Single-page app: No
# - Set up automatic builds: No

# Deploy
firebase deploy
```

## 🔧 Environment Variables

### Required Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your Agency Name
NEXT_PUBLIC_CONTACT_EMAIL=hello@yourdomain.com
```

### Optional Variables

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Social Media
NEXT_PUBLIC_TWITTER_HANDLE=@youragency
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername

# Form Handling
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/yourformid
```

## 🌐 Custom Domain

### DNS Configuration

Point your domain to your hosting provider:

**Vercel:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Netlify:**
```
Type: CNAME
Name: www
Value: your-site.netlify.app
```

**Cloudflare Pages:**
```
Type: CNAME
Name: www
Value: your-site.pages.dev
```

### SSL/HTTPS

All recommended platforms provide automatic SSL certificates via Let's Encrypt.

## ✅ Pre-Deployment Checklist

- [ ] Update site content in `src/data/*.json`
- [ ] Replace placeholder text with your information
- [ ] Update contact information (email, phone, social media)
- [ ] Configure environment variables
- [ ] Test build locally: `npm run build`
- [ ] Update Open Graph images (add to `/public`)
- [ ] Update favicon and app icons
- [ ] Set up analytics (optional)
- [ ] Configure contact form endpoint (optional)
- [ ] Test on mobile devices
- [ ] Check accessibility with Lighthouse
- [ ] Verify SEO with Google Search Console

## 🔄 Continuous Deployment

### Auto-deploy on Git Push

Most platforms support automatic deployments:

1. **Vercel**: Auto-deploys on push to main branch
2. **Netlify**: Auto-deploys on push to main branch
3. **Cloudflare Pages**: Auto-deploys on push to production branch

### Branch Previews

- **Vercel**: Creates preview deployments for pull requests
- **Netlify**: Deploy previews for all branches
- **Cloudflare Pages**: Preview deployments for PRs

## 📊 Performance Optimization

### Before Deployment

```bash
# Analyze bundle size
npm run build

# Check for unused dependencies
npx depcheck

# Audit dependencies
npm audit

# Update dependencies
npm update
```

### After Deployment

1. **Test with Lighthouse**
   - Open DevTools → Lighthouse
   - Run audit for Performance, SEO, Accessibility

2. **Monitor Core Web Vitals**
   - Use Google Search Console
   - Monitor in Vercel/Netlify Analytics

3. **Set up Monitoring**
   - Vercel Analytics
   - Google Analytics
   - Sentry (for error tracking)

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules .next out
npm install
npm run build
```

### 404 Errors

- Ensure `output: 'export'` in `next.config.mjs`
- Check all internal links use relative paths
- Verify routes match file structure

### Slow Performance

- Enable image optimization
- Check bundle size with `npm run build`
- Minimize third-party scripts
- Use lazy loading for heavy components

## 📞 Support

Need help with deployment?
- Check [Next.js Documentation](https://nextjs.org/docs/deployment)
- Visit [Vercel Support](https://vercel.com/support)
- See [Netlify Docs](https://docs.netlify.com)

---

Happy deploying! 🚀
