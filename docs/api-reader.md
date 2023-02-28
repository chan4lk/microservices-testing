# create service account
```shell
kubectl create serviceaccount api-explorer -n beta
```

# create cluster rol
```shell
kubectl apply -f - <<EOF
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: log-reader-beta
  namespace: beta
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods", "pods/log"]
  verbs: ["get", "watch", "list"]
EOF
```

# Create role binding
```shell
kubectl create rolebinding api-explorer:log-reader:beta --clusterrole log-reader-beta --serviceaccount beta:api-explorer -n beta
```

# Check all possible clusters, as your .KUBECONFIG may have multiple contexts:
kubectl config view -o jsonpath='{"Cluster name\tServer\n"}{range .clusters[*]}{.name}{"\t"}{.cluster.server}{"\n"}{end}'

# Select name of cluster you want to interact with from above output:
export CLUSTER_NAME="ctac-api"

# Point to the API server referring the cluster name
APISERVER=$(kubectl config view -o jsonpath="{.clusters[?(@.name==\"$CLUSTER_NAME\")].cluster.server}")

# Create a secret to hold a token for the default service account
```shell
kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: log-reader-token-beta
  namespace: beta
  annotations:
    kubernetes.io/service-account.name: api-explorer
type: kubernetes.io/service-account-token
EOF
```

# Wait for the token controller to populate the secret with a token:
while ! kubectl describe secret log-reader-token-beta -n beta | grep -E '^token' >/dev/null; do
  echo "waiting for token..." >&2
  sleep 1
done

# Get the token value
TOKEN=$(kubectl get secret -n beta log-reader-token-beta -o jsonpath='{.data.token}' | base64 --decode)

# Explore the API with TOKEN
curl -X GET $APISERVER/api --header "Authorization: Bearer $TOKEN" --insecure

curl -X GET $APISERVER/api/v1/namespaces/beta/pods/ --header "Authorization: Bearer $TOKEN" --insecure

curl -X GET $APISERVER/api/v1/namespaces/beta/pods?labelSelector=app%3Demp-api --header "Authorization: Bearer $TOKEN" --insecure

curl -X GET $APISERVER/api/v1/namespaces/beta/pods/emp-api --silent --header "Authorization: Bearer $TOKEN" --insecure

curl -X GET $APISERVER/api/v1/namespaces/beta/pods/emp-api-7b5695bf78-dcbd4/log?sinceSeconds=3 --header "Authorization: Bearer $TOKEN" --insecure

