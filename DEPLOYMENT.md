# GRAVITY E-Commerce Deployment Guide

Complete guide for deploying the GRAVITY e-commerce platform to production.

## 🚀 Quick Deploy to Vercel (Recommended)

Vercel is the official platform for Next.js and offers the easiest deployment experience.

### Prerequisites

- GitHub account
- Vercel account (free tier available at [vercel.com](https://vercel.com))

### Step-by-Step Deployment

#### 1. Push Code to GitHub

```bash
# Add all files to git
git add .

# Commit changes
git commit -m "Ready for production deployment"

# Create a new GitHub repository at github.com/new

# Add remote (replace with your GitHub username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/gravity-commerce.git

# Push to GitHub
git push -u origin master
```

#### 2. Deploy to Vercel

**Option A: Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your GitHub repository (`gravity-commerce`)
4. Vercel will auto-detect Next.js settings
5. Click **"Deploy"**
6. Wait 2-3 minutes for deployment
7. Your site will be live at `https://your-project.vercel.app`

**Option B: Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from your project directory
vercel

# Follow the prompts
# - Link to GitHub? Yes
# - Deploy? Yes

# For production deployment
vercel --prod
```

#### 3. Verify Deployment

After deployment, test your live site:

- ✅ Homepage loads
- ✅ Shop page shows products
- ✅ Product detail pages work
- ✅ Cart functionality (add/remove items)
- ✅ Login/Register modal
- ✅ All API routes respond (`/api/products`, `/api/collections`, `/api/verify`)
- ✅ Dark/Light theme toggle

### Your Live URLs

After deployment, you'll get:

- **Production URL**: `https://your-project.vercel.app`
- **Admin Dashboard**: `https://vercel.com/dashboard`
- **Analytics**: Included in Vercel dashboard

## 🌐 Custom Domain (Optional)

### Add Your Own Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Enter your domain name (e.g., `gravityfashion.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-30 minutes)
5. Your site will be live at your custom domain

### Recommended Domain Providers

- Namecheap
- Google Domains
- Cloudflare

## 🔧 Environment Variables

If you need to add environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables:
   - `NEXT_PUBLIC_API_URL` (if using external API)
   - `DATABASE_URL` (if connecting to a database later)
3. Redeploy to apply changes

## 📊 Post-Deployment Features

### Automatic Deployments

- Every push to `master` branch triggers a new deployment
- Preview deployments for every pull request
- Instant rollback to previous versions

### Analytics & Monitoring

- Real-time visitor analytics (Vercel Analytics)
- Performance monitoring
- Error tracking in dashboard

### Performance

- Global CDN (Content Delivery Network)
- Automatic image optimization
- Edge caching
- Serverless functions for APIs

## 🆘 Troubleshooting

### Build Fails

If build fails, check:
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all dependencies in `package.json`

### API Routes Not Working

- Ensure all routes are in `/app/api` directory
- Check route files export functions correctly
- Verify serverless function limits (10s timeout on free tier)

### Images Not Loading

- All images should be in `/public` directory
- Use absolute paths starting with `/`
- Example: `/product-tee.png` not `product-tee.png`

## 📱 Alternative Deployment Options

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option 3: Self-Hosted (Advanced)

```bash
# Build production bundle
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "gravity" -- start
```

## 🎉 Your Site Is Live!

Once deployed, share your e-commerce platform:

- **Homepage**: `https://your-project.vercel.app`
- **Shop**: `https://your-project.vercel.app/shop`
- **Collections**: `https://your-project.vercel.app/collections`

---

## Next Steps

After successful deployment:

1. ✅ Test all features on live site
2. ✅ Share with friends/testers
3. ✅ Gather feedback
4. 🔜 Connect to real database (MongoDB, PostgreSQL)
5. 🔜 Add payment integration (Stripe, Razorpay)
6. 🔜 Implement real authentication backend
7. 🔜 Set up email notifications

---

**Need Help?**

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Community Support: https://github.com/vercel/next.js/discussions
