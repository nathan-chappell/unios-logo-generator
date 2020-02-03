" .vimrc

nnoremap \c Ypa/k
nnoremap \t :!firefox index.html
nnoremap \mm :wa<CR>:!make<CR>
nnoremap \ff :set filetype==&filetype == 'html' ? 'javascript' : 'html'
nnoremap \gf :find script/<c-r>=substitute(expand('<cfile>'),'\.*','','')<cr>x<cr>
nnoremap \gg :grep! script/*.jsx script/*/*.jsx -e <c-r>=expand('<cword>')<cr><cr>
nnoremap \n :next<cr>
nnoremap \N :prev<cr>
nnoremap \d :e script
nnoremap \a :args <c-r>=join(glob('**/*.jsx',1,1))<cr><cr>

set nu hls si et ts=2 sts=2 sw=2 fo=croqtjn nowrap tw=70
set path+=script suffixesadd=x

let g:netrw_liststyle=3
e script
vs script/script.jsx
tabe style/
tabn 1
normal \a
