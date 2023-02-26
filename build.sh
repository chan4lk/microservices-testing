nerdctl build --no-cache -t localhost:5000/auth-api . -f apps/auth-api/dockerfile
nerdctl build -t localhost:5000/employee-api . -f apps/employee-management/dockerfile
nerdctl push localhost:5000/auth-api
nerdctl push localhost:5000/employee-api
kubectl config use-context rancher-desktop
kubectl apply -f k8s/k8s.local.yml