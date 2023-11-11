# SIT_AY23-24_CSC3104

## Configuration
- env.example file is the configuration constants

## Build (Local)
1. At root folder, Run
    > docker-compose build

## Deployment
- Tools used - Docker Desktop

### 1. Docker Compose
1. Rename env.example to .env
2. At root folder, Start
    > docker-compose up --build
3. At root folder, Clean
    > docker-compose down

### 2. Kubernetes
1. Replace `hostPath` in [k8s-script/mongo-pv.yaml](k8s-script/mongo-pv.yaml#L12) to your device absolute path to [db](db) folder
2. [Start dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) (optional)
- Deploy dashboard, run
    > kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
- Add additional metrics view, run
    > kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
    
    > kubectl patch deployment metrics-server -n kube-system --type 'json' -p '[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--kubelet-insecure-tls"}]'
- Access dashboard, run
    > kubectl proxy
- Visit the site
    > http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
- Generate token to login
    > kubectl -n kubernetes-dashboard create token admin-user
3. At root folder, Start
    > kubectl apply -f "[k8s-script](k8s-script)/*"
4. At root folder, Clean
    > kubectl delete -f "[k8s-script](k8s-script)/*"
    
    > kubectl delete -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml

    > kubectl delete -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

