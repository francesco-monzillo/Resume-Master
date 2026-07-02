kind load docker-image resume-master-backend
kind load docker-image resume-master-frontend
kubectl create -f .
kubectl config set-context --current --namespace=resume-master
kubectl create secret generic backend-secret --from-env-file=../backend/API/.env -n resume-master
kubectl create secret generic db-secret --from-env-file=../mongodb/.env -n resume-master
kubectl create -f ./Deployments
kubectl create -f ./Services
kubectl create -f "./Stateful Sets"
:::kubectl exec -it mongodb-0 -- bash
::mongosh
::rs.initiate({_id: "rs0",members: [{ _id: 0, host: "mongodb-0.mongodb-service.resume-master.svc.cluster.local:27017" },{ _id: 1, host: "mongodb-1.mongodb-service.resume-master.svc.cluster.local:27017" },{ _id: 2, host: "mongodb-2.mongodb-service.resume-master.svc.cluster.local:27017" }]})
::exit