" .vimrc

nnoremap \c Ypa/k
nnoremap \t :!firefox index.html
nnoremap \mm :wa<CR>:!make<CR>
nnoremap \ff :set filetype==&filetype == 'html' ? 'javascript' : 'html'
nnoremap \gf :find script/<c-r>=substitute(expand('<cfile>'),'\.*','','')<cr>x<cr>
nnoremap \gs :sp script/<c-r>=substitute(expand('<cfile>'),'\.*','','')<cr>x<cr>
nnoremap \gg :grep! script/*.jsx script/*/*.jsx -e <c-r>=expand('<cword>')<cr><cr>
nnoremap \mt :!./gentags.sh<cr>
nnoremap \vv :so .vimrc<cr>
nnoremap \mc :let tabCol = col('.')<cr>yl:let tabChar = @"<cr>
nnoremap \<space> :set opfunc=ISpace<cr>g@

function! ISpace(mode)
  "normal f<c-r>=tabChar<cr><c-r>=tabCol - col('.')<cr>i 
  exec line("'[") . ',' . line("']") . 's/\s*' . g:tabChar
              \ . '/\=repeat(" ",g:tabCol-col(".")) . "' . g:tabChar . '"/'
endfunction


set nu hls si et ts=2 sts=2 sw=2 fo=croqtjn nowrap tw=0 autowrite
set path+=script suffixesadd=x

if !exists('localLoaded')
  e script/script.jsx
  tabe style/components.css
  tabn 1
endif

"function! MakeDefaults()
"  normal 0w"fyw
"  normal f)F("pyi(
"  let params = split(substitute(getreg('p'),',',' ','g'))
"  let mapper = "'	this.' . v:val . ' = ' . v:val . ' ? ' . v:val . ' : 0;'"
"  call append(line('.'),map(params,mapper))
"endfunction
"
"function! MakeSetters()
"  normal 0w"fyw
"  normal f)F("pyi(
"  normal }
"  let fname = getreg('f')
"  let params = split(substitute(getreg('p'),',',' ','g'))
"  let mapper = "fname . '.set' . v:val . ' = (' . v:val . ') => { " .
"                \ "this.' . v:val . ' = ' . v:val . '; " .
"                \ "return {...this}; }'"
"  call append(line('.'),map(params,mapper))
"  "let mapper = "[fname . '.set' . v:val . ' = (' . v:val . ') => { '," .
"                "\ "'  this.' . v:val . ' = ' . v:val . ';'," .
"                "\ "'  return {...this};','}']"
"  "call map(map(params,mapper),"append(line('.'),v:val)")
"endfunction

let localLoaded = 1
