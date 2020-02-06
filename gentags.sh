#!/bin/bash
# generate the tags for the tree

# force language for jsx files
ctags --language-force=javascript --sort=no script/*.jsx script/*/*.jsx

# for declarations like "let foo = React.forwardRef(..."
find . -name "*.jsx" -exec awk 'BEGIN { OFS="\t" } /^(const|let)/ { print($2, FILENAME,"/^" $0 "$/;\"","v") >> "tags" }' \{\} +
