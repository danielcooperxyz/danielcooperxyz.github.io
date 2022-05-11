FROM starefossen/ruby-node:latest

RUN gem install bundler jekyll

ENTRYPOINT [ "/bin/bash" ]
