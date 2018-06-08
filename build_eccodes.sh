#!/usr/bin/env bash
mkdir -p eccodes eccodes/src eccodes/build
wget -O eccodes/eccodes.tar.gz https://software.ecmwf.int/wiki/download/attachments/45757960/eccodes-2.7.3-Source.tar.gz?api=v2
tar -xzf eccodes/eccodes.tar.gz -C eccodes/src --strip-components=1
cd eccodes/build && cmake ../src -DCMAKE_INSTALL_PREFIX=../dist && make && make install