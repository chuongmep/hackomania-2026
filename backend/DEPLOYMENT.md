# Deployment Guide

This guide covers deploying the HackIT API backend to **Google Cloud Run** using Docker.

## Environment Variables

The following environment variables are required:

| Variable | Description | Example |
|---|---|---|
| `OPEN_API_KEY` | OpenAI API key | `sk-...` |
| `ch_host` | ClickHouse host | `abc.clickhouse.cloud` |
| `ch_port` | ClickHouse port | `8443` |
| `ch_user` | ClickHouse username | `default` |
| `ch_password` | ClickHouse password | `your-password` |
| `ch_database` | ClickHouse database | `default` |
| `ch_secure` | Use TLS for ClickHouse | `true` |

---

## Google Cloud Run

Cloud Run builds and runs the `Dockerfile` as a containerized service.

### Prerequisites

- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) installed
- A Google Cloud project

### Setup (one-time)

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
```

### Deploy

From the `backend/` directory:

```bash
cd backend
gcloud run deploy hackit-api \
  --source . \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars "OPEN_API_KEY=your-key,ch_host=your-host,ch_port=8443,ch_user=default,ch_password=your-password,ch_database=default,ch_secure=true"
```

Cloud Run will:

1. Detect the `Dockerfile`
2. Build the image in the cloud
3. Deploy and return a public URL

### Update environment variables

```bash
gcloud run services update hackit-api \
  --region asia-southeast1 \
  --set-env-vars "OPEN_API_KEY=new-key"
```

### Redeploy after code changes

```bash
cd backend
gcloud run deploy hackit-api --source . --region asia-southeast1
```

### View logs

```bash
gcloud run services logs read hackit-api --region asia-southeast1
```

### Cost

Cloud Run free tier includes 2 million requests/month and 360,000 GB-seconds of memory.

---

## Run Docker locally

Build and run the container on your machine for testing:

```bash
cd backend
docker build -t hackit-api .
docker run -p 8080:8080 \
  -e OPEN_API_KEY="your-key" \
  -e ch_host="your-host" \
  -e ch_port=8443 \
  -e ch_user="default" \
  -e ch_password="your-password" \
  -e ch_database="default" \
  -e ch_secure=true \
  hackit-api
```

The API will be available at `http://localhost:8080`.

---

## Verify deployment

After deploying, test the endpoints:

```bash
# Health check
curl https://YOUR_URL/health
# Expected: {"status":"ok"}

# Root
curl https://YOUR_URL/
# Expected: {"message":"Welcome to HackIT API"}

# Swagger docs
open https://YOUR_URL/docs
```
