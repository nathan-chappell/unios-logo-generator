nnoremap \c Ypa/k
nnoremap \t :!firefox index.html
nnoremap \mm :wa<CR>:!make<CR>
nnoremap \ff :set filetype==&filetype == 'html' ? 'javascript' : 'html'
nnoremap \gf :find script/<c-r>=substitute(expand('<cfile>'),'\.*','','')<cr>x<cr>
nnoremap \gg :grep! script/*.jsx script/*/*.jsx -e <c-r>=expand('<cword>')<cr><cr>

set nu hls si et ts=2 sts=2 sw=2 fo=croqtjn nowrap tw=70
set tags+='../tags'
set path+=script suffixesadd=x
