# swaplinks.awk
# begin => link => comment? - uncomment => setComment
BEGIN {
	state = "begin"
}

function Comment() {
  print "    <!--"
  while (!match($0,"LINKS END")) { print; getline; }
  print "    -->"
}

function UnComment() {
  getline
  while (!match($0,"-->")) { print; getline; }
  getline
}

/LINKS BEGIN/ {
  print
  getline
  if (match($0,"<!--")) UnComment()
  else Comment()
}

{ print }
