# GRAVITY E-Commerce - Render Deployment Guide

Deploy your Next.js e-commerce platform to Render.

## 🚀 Quick Deploy to Render

### Prerequisites
- GitHub account
- Render account (free tier at [render.com](https://render.com))

## Step 1: Push to GitHub

First, let's push your code to GitHub:

```bash
# Check if you have a remote configured
git remote -v

# If no remote exists, create a GitHub repository at github.com/new
# Then add it (replace with YOUR username and repo name):
git remote add origin https://github.com/YOUR_USERNAME/gravity-commerce.git

# Push your code
git push -u origin master
```

## Step 2: Deploy on Render

### A. Create New Web Service

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account (if not already)
4. Select your `gravity-commerce` repository

### B. Configure Build Settings

Use these exact settings:

| Setting | Value |
|---------|-------|
| **Name** | `gravity-commerce` (or your choice) |
| **Region** | Choose closest to you |
| **Branch** | `master` |
| **Root Directory** | Leave blank |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### C. Environment Variables

Click **"Advanced"** and add:

| Key | Value |
|-----|-------|
| `NODE_VERSION` | `18.17.0` |

### D. Deploy!

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for initial deployment
3. Your site will be live at: `https://gravity-commerce.onrender.com`

## 🔧 Important Render Configuration

### Create `render.yaml` (Optional)

For automated configuration, create this file in your project root:

```yaml
services:
  - type: web
    name: gravity-commerce
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: "18.17.0"
```

## ⚠️ Important Notes

### Free Tier Limitations
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds (cold start)
- 750 hours/month free

### Performance Tips
- Enable **"Auto-Deploy"** for automatic deployments on git push
- Monitor build logs in Render dashboard
- Check "Events" tab for deployment status

## 🆘 Troubleshooting

### Build Fails?
1. Check Render logs in dashboard
2. Verify `package.json` scripts exist:
   - `"build": "next build"`
   - `"start": "next start"`
3. Ensure Node version compatibility

### Site Not Loading?
1. Check deployment status (should say "Live")
2. View logs for errors
3. Verify build completed successfully
4. Try hard refresh (Ctrl+Shift+R)

### API Routes 404?
Next.js API routes work automatically on Render - no extra config needed!

## 🎉 Your Live Site

Once deployed:
- **URL**: `https://your-app.onrender.com`
- **Dashboard**: `https://dashboard.render.com`
- **Logs**: Available in Render dashboard

## 📱 Custom Domain

To add your own domain:
1. Go to Render Dashboard → Your Service → Settings
2. Click "Add Custom Domain"
3. Enter your domain
4. Add CNAME record to your DNS:
   - **Name**: `www` (or `@` for root)
   - **Value**: `your-app.onrender.com`
5. Wait for DNS propagation

## 🔄 Continuous Deployment

Every time you push to GitHub:
```bash
git add .
git commit -m "Update features"
git push
```
Render automatically redeploys! 🚀

---

**Need Help?**
- Render Docs: https://render.com/docs
- Next.js on Render: https://render.com/docs/deploy-nextjs
