# Ved Singh Portfolio - Synology Deployment Guide

This is the personal portfolio website for Ved Singh, an MBBS student, traveller, photographer, and chef. The site is built with Next.js, Tailwind CSS, and shadcn/ui components.

## 📋 System Requirements

- **Synology NAS** with Docker or Container Manager installed
- **Docker Compose** support (Synology Container Manager)
- **Minimum 500MB** disk space
- **Port 3011** available (or configure your preferred port)
- **2GB RAM** recommended

## 🚀 Deployment Steps

### 1. **Prepare Your Synology NAS**

Ensure Container Manager is installed on your Synology NAS:
- Open **Package Center**
- Search for **Container Manager**
- Install if not already installed

### 2. **Clone or Upload the Repository**

Clone the repository to your Synology NAS:

```bash
# SSH into your Synology
ssh admin@your-nas-ip

# Navigate to a suitable directory (e.g., /volume1/docker)
cd /volume1/docker

# Clone the repository
git clone https://github.com/DrAbinash/ved ved-singh-portfolio
cd ved-singh-portfolio
```

Or upload files via WebDAV/File Station.

### 3. **Configure Environment Variables**

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` to configure for your Synology setup:

```bash
# Example configuration
NEXT_PUBLIC_SITE_URL=http://your-nas-ip:3011
NODE_ENV=production
```

### 4. **Build and Deploy with Docker Compose**

Build the Docker image:

```bash
docker-compose build
```

Start the container:

```bash
docker-compose up -d
```

Check if the container is running:

```bash
docker-compose ps
```

### 5. **Access the Portfolio**

Open your browser and navigate to:
- `http://your-nas-ip:3011`
- Or `http://your-nas-hostname:3011`

## 📊 Docker Compose Configuration

The `docker-compose.yml` includes:

- **Container**: `ved-singh-portfolio`
- **Image**: `ved-singh-portfolio:latest`
- **Port**: `3011:3000` (accessible on port 3011)
- **Restart Policy**: `unless-stopped` (auto-restart on failure)
- **Health Check**: Monitors container health every 30 seconds
- **Logging**: JSON file driver with rotation (10MB max file, 3 file limit)
- **Volume**: Stores nginx logs

## 🔧 Nginx Configuration

The website uses Nginx for serving static files with:

- ✅ **Gzip Compression** - Reduces file sizes for faster loading
- ✅ **Security Headers** - X-Frame-Options, X-Content-Type-Options, etc.
- ✅ **Caching Strategy** - Aggressive caching for static assets
  - `/_next/static` - 365 days (immutable)
  - `/gallery` - 30 days
  - Other assets - 365 days
- ✅ **Client-side Routing** - Proper handling of Next.js routes
- ✅ **Security** - Blocks access to hidden and git files

## 📝 Common Commands

### Start the Container
```bash
docker-compose up -d
```

### Stop the Container
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f ved-singh-portfolio
```

### Rebuild the Image
```bash
docker-compose build --no-cache
docker-compose up -d
```

### SSH into Container
```bash
docker-compose exec ved-singh-portfolio /bin/sh
```

### Check Container Status
```bash
docker-compose ps
docker inspect ved-singh-portfolio
```

## 🔍 Troubleshooting

### Container Won't Start

1. Check logs for errors:
```bash
docker-compose logs ved-singh-portfolio
```

2. Verify port 3011 is not in use:
```bash
docker ps
netstat -tuln | grep 3011
```

3. Ensure sufficient disk space:
```bash
df -h
```

### Performance Issues

1. **Enable nginx caching** - Already configured in `nginx-default.conf`
2. **Monitor resource usage**:
```bash
docker stats ved-singh-portfolio
```

3. **Check nginx configuration**:
```bash
docker-compose exec ved-singh-portfolio nginx -t
```

### Port Already in Use

Change the port in `docker-compose.yml`:

```yaml
ports:
  - "3010:3000"  # Changed from 3011 to 3010
```

Then restart:
```bash
docker-compose up -d
```

## 📱 Update & Maintenance

### Update the Website Content

1. Pull latest changes:
```bash
git pull origin main
```

2. Rebuild and restart:
```bash
docker-compose up -d --build
```

### Backup Website Data

```bash
# Backup logs and configuration
docker cp ved-singh-portfolio:/var/log/nginx ./backups/nginx-logs
```

## 🌐 Synology Container Manager UI

You can also manage the container through Synology's GUI:

1. Open **Container Manager**
2. Navigate to **Containers**
3. Find `ved-singh-portfolio`
4. View logs, resource usage, and manage restart policies
5. Edit environment variables if needed

## 🔐 Security Considerations

- ✅ Non-root user execution (nginx user)
- ✅ Security headers enabled
- ✅ No unnecessary exposed ports
- ✅ Read-only file system considerations
- ✅ Health checks for automatic recovery

## 📈 Performance Metrics

With nginx serving static files:

- **Response Time**: < 50ms (local network)
- **Bandwidth**: Minimal (gzip compression enabled)
- **CPU Usage**: < 1% (idle)
- **Memory Usage**: ~50-100MB
- **Startup Time**: < 5 seconds

## 🎯 Next Steps

1. ✅ Deploy on Synology
2. ✅ Verify all sections load correctly
3. ✅ Test responsive design on mobile
4. ✅ Setup HTTPS (optional, via reverse proxy)
5. ✅ Configure domain name (if applicable)

## 📞 Support & Issues

For issues or questions:

1. Check logs: `docker-compose logs`
2. Verify configuration files
3. Ensure Docker and Container Manager are up to date
4. Check Synology documentation for Container Manager

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│          Synology NAS (Container Manager)           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │     ved-singh-portfolio Container            │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │  Nginx (Alpine Linux)                  │  │  │
│  │  │  - Static File Server                  │  │  │
│  │  │  - Gzip Compression                    │  │  │
│  │  │  - Security Headers                    │  │  │
│  │  │  - Caching Strategy                    │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │                                               │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │  Next.js Static Export                 │  │  │
│  │  │  - HTML/CSS/JS files                   │  │  │
│  │  │  - Gallery images                      │  │  │
│  │  │  - Public assets                       │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
           ↓ (Port 3011)
    Browser/Client Access
```

---

**Last Updated**: July 2026  
**Version**: 1.0  
**Maintained By**: Dr. Abinash Kumar
