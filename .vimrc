" .vimrc

set nu hls et ts=2 sw=2 sts=2 fo=croqtjn
set autowrite

nnoremap \mm :wa<cr>:!make<cr>
nnoremap \vv :so .vimrc<cr>
nnoremap \er :e .vimrc<cr>

e script/script.jsx

