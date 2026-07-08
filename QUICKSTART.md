# 🚀 Quick Start - Synology Deployment

Get Ved Singh's portfolio running on Synology in minutes!

## Prerequisites

- Synology NAS with Container Manager installed
- SSH access or File Station
- Port 3009 available (or edit docker-compose.yml)

## 30-Second Setup

```bash
# 1. SSH into Synology
ssh admin@your-nas-ip

# 2. Navigate to docker directory
cd /volume1/docker

# 3. Clone repository
git clone https://github.com/DrAbinash/ved ved-singh-portfolio
cd ved-singh-portfolio

# 4. Copy environment file
cp .env.example .env.local

# 5. Edit environment (optional)
nano .env.local

# 6. Build and deploy
docker-compose build
docker-compose up -d

# 7. Done! Visit http://your-nas-ip:3009
```

## Verify Deployment

```bash
# Check if running
docker-compose ps

# View logs
docker-compose logs

# Test with curl
curl http://localhost:3009
```

## Common Tasks

### Stop Container
```bash
docker-compose down
```

### Restart Container
```bash
docker-compose restart
```

### View Live Logs
```bash
docker-compose logs -f
```

### Rebuild Container
```bash
docker-compose up -d --build
```

### Update Website
```bash
git pull
docker-compose up -d --build
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3009 in use | Change port in `docker-compose.yml` |
| Container crashes | Run `docker-compose logs` to see error |
| Slow performance | Check `docker stats` for resource usage |
| Can't access | Verify firewall and port are open |

## Status Check

After deployment, check:

1. ✅ Container is running: `docker-compose ps`
2. ✅ Website loads: Visit `http://your-nas-ip:3009`
3. ✅ Sections load: Home, About, Gallery, Connect
4. ✅ Images display: Gallery images visible
5. ✅ Links work: Instagram links, smooth scrolling

## Next Steps

- 📖 Read [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed configuration
- 🔧 Configure custom domain (optional)
- 🔐 Setup HTTPS with reverse proxy (optional)
- 📊 Monitor performance with Docker stats
- 🆘 Check logs if issues arise

## Need Help?

```bash
# View detailed logs
docker-compose logs ved-singh-portfolio

# Check container configuration
docker inspect ved-singh-portfolio

# Test nginx configuration
docker-compose exec ved-singh-portfolio nginx -t

# Check available disk space
docker system df
```

---

**For detailed guide, see:** [DEPLOYMENT.md](./DEPLOYMENT.md)
