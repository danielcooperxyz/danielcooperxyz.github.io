FROM timbru31/ruby-node:3.1-slim-16

RUN apt-get update && apt-get install -y build-essential

RUN gem install bundler jekyll

ENTRYPOINT [ "/bin/bash" ]
