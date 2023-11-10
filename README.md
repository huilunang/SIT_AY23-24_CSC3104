# SIT_AY23-24_CSC3104

## Configuration
- env.example file is the configuration constants

## Deployment
### 1. Docker Compose
- Rename env.example to .env
- At root folder, Start
    > docker-compose up --build
- At root folder, Clean
    > docker-compose down

### 2. Kubernetes
- Replace `hostPath` in [k8s-script/mongo-pv.yaml](k8s-script/mongo-pv.yaml) to your device absolute path to [db](db) folder
- At root folder, Start
    > kubectl apply -f [k8s-script](k8s-script)/*
- At root folder, Clean
    > kubectl delete -f [k8s-script](k8s-script)/*
