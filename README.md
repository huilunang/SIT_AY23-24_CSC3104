# SIT_AY23-24_CSC3104

## Configuration
- env.example file is the configuration constants

## Build (Image)
- At root folder, Run
1. docker-compose build

## Deployment
### 1. Docker Compose
1. Rename env.example to .env
2. At root folder, Start
    > docker-compose up --build
3. At root folder, Clean
    > docker-compose down

### 2. Kubernetes
1. Replace `hostPath` in [k8s-script/mongo-pv.yaml](k8s-script/mongo-pv.yaml#L12) to your device absolute path to [db](db) folder
2. At root folder, Start
    > kubectl apply -f "[k8s-script](k8s-script)/*"
3. [Start dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) (optional)
- Access dashboard, run
    > kubectl proxy
- Visit the site
    > http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
- Generate token to login
    > kubectl -n kubernetes-dashboard create token admin-user
4. At root folder, Clean
    > kubectl delete -f "[k8s-script](k8s-script)/*"
