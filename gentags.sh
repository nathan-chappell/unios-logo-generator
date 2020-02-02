#!/bin/bash
# generate the tags for the tree

# force language for jsx files
ctags --language-force=javascript -u script/*.jsx script/*/*.jsx

# for declarations like "let foo = React.forwardRef(..."
grep -r . -e "^\(let\|const\) \w* = " | sed 's/.\/\([^:]*\):\(\w* \(\w*\).*\)/\3\t\1\t\/^\2$\/;"\tg/' >> tags
