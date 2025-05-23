node
mysql
plantuml
docker run -d \                        
  --name plantuml-server \
  -p 8080:8080 \
  -e BASE_URL=plantuml \
  plantuml/plantuml-server:jetty