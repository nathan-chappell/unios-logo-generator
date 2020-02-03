#!/bin/bash

# download cdn links for local use

sed 's/[^"]*"\([^"]*\)".*/\1/' links.html | xargs wget
