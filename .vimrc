" .vimrc

set nu hls et ts=2 sts=2 sw=2 fo=croqtjnl ai aw nowrap
noh

nnoremap \mm :w<cr>:!make<cr>
nnoremap \ww :wa<cr>
nnoremap \vv :so .vimrc<cr>
nnoremap \x :!firefox index.html<cr>
nnoremap \t :!firefox test/test.html<cr>
nnoremap \ff :call SwitchFileType()<cr>
nnoremap \mt :!make test.js<cr>
nnoremap \gf :find <c-r>=expand('<cfile>:t')<cr>x<cr>
nnoremap \a :set opfunc=AlignFromCursor<cr>g@

function! SwitchFileType()
  " html -> js -> sh
  if &filetype == 'html'
    set filetype=javascript
  elseif &filetype == 'javascript'
    set filetype=sh
  elseif &filetype == 'sh'
    set filetype=html
  endif
  echo &filetype
  set indentexpr=
endfunction

function! AlignFromCursor(type)
  if a:type == 'char' || a:type == 'block' | return | endif
  let sep = getline('.')[col('.')-1]
  let pos = max(map(getline("'[","']"),'match(v:val,"' . sep . '")'))
  " substitue delmiter
  let sd = sep == '/' ? '$' : '/'
  echo 'pos ' . pos . ', sep ' . sep
  exec "'[,']s".sd.sep.sd.
        \"\\=repeat(' ',pos-match(getline('.'),'".sep."')).'".sep."'".sd
endfunction

if !exists('loaded_vimrc')
  e index.html
  vs jsx/script.jsx
endif

let loaded_vimrc = 1
echo "foo"
