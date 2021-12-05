set nocompatible
let mapleader = ","

let data_dir = has('nvim') ? stdpath('data') . '/site' : '~/.vim'
if empty(glob(data_dir . '/autoload/plug.vim'))
  silent execute '!curl -fLo '.data_dir.'/autoload/plug.vim --create-dirs  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

call plug#begin('~/.vim/plugged')

Plug 'https://github.com/preservim/nerdtree'
Plug 'prettier/vim-prettier', { 'do': 'yarn install --frozen-lockfile --production' }
Plug 'pangloss/vim-javascript'
Plug 'leafgarland/typescript-vim'
Plug 'maxmellon/vim-jsx-pretty'
Plug 'jparise/vim-graphql'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'w0rp/ale'

call plug#end()

let g:coc_global_extensions = ['coc-tsserver']

" Search down into subfolders recursively
" Provides tab-completion for all file-related tasks
set path+=**

" Display all matching files when we tab complete (tab or shift+tab to cycle
" through
set wildmenu

" The above two settings allow us to:
" - Hit tab to :find by partial match
" - Use * to make the search fuzzy
" - Use :b to autocomplete any open buffer


" TAG JUMPING:
"
" Create the 'tags' file (may need to install ctags first)
" The bang makes this execute as a console command
command! MakeTags !ctags -R .

" This allows us to:
" - Use ^] to jump to tag under cursor
" - Use g^] for ambiguous tags
" - Use ^t to jump back up the tag stack


" AUTOCOMPLETE:
"
" The good stuff is documented in |ins-completion|
"
" HIGHLIGHTS:
" - ^x^n for JUST the current file
" - ^x^f for filenames
" - ^x^j for tags only
" - ^n for anything specified by the 'complete' option
"
" Use ^n and ^p to go back and forth in the list of suggestions

set autoindent


" NERDTree
autocmd VimEnter * NERDTree
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>

" CoC
nmap <leader>ac <Plug>(coc-codeaction)
nmap <leader>qf <Plug>(coc-fix-current)
" Go to code navigation
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Eslint
let g:ale_fixers = {
	\ 'javascript': ['eslint']
	\ }
let g:ale_sign_error = '❌'
let g:ale_sign_warning = '⚠️'
let g:ale_fix_on_save = 1
