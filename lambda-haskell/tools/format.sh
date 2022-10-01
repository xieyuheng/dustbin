#!/usr/bin/env bash

# https://github.com/tweag/ormolu

ormolu --mode inplace $(find src -name '*.hs')
