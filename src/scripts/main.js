(function(){
    var $body = document.querySelector('body')
    $body.classList.remove('no-js')
    $body.classList.add('js')
    
    
    // let btnMenu = document.querySelector('.header__btnMenu')
    // // btnMenu.style.display = 'block'
    // btnMenu.removeAttribute('style')
    

    // configuração menu
    let menu = new Menu({
        container: '.header__nav',
        toggleBtn: '.header__btnMenu',
        widthEnabled: 1024,
    })

    function Menu(config){
        this.nav = (typeof config.container === 'string') ?
        document.querySelector(config.container) : config.container
        
        this.btn = (typeof config.toggleBtn === 'string') ?
        document.querySelector(config.toggleBtn) : config.toggleBtn
        
        this.maxWidth = config.widthEnabled || false
        
        
        let _opened = false
        let _this = this
        this.btn.removeAttribute('style')
        // closeMenu()

        if(this.maxWidth){
            window.addEventListener('resize', e => {
                if(window.innerWidth > _this.maxWidth){
                    _this.nav.removeAttribute('style')
                    _opened = true
                }else if(!_this.nav.getAttribute('style')){
                    closeMenu()
                }
            })
            if(window.innerWidth <= _this.maxWidth){
                closeMenu()
            }
        }

        this.btn.addEventListener('click', openOrClose)
        
        
        function openOrClose(){
            if(!_opened){
                openMenu()
            }
            else{
                closeMenu()
            }
        }
    
        function openMenu(){
            var _top = _this.nav.getBoundingClientRect().top + 'px'
            var _style = {
                maxHeight: 'calc(100vh - ' + _top +')',
                overflow: 'hidden'
            }
                
            applyStyleToNav(_style)

             _opened = true
        }
    
        function applyStyleToNav(_style){
            Object.keys(_style).forEach( stl => {
                _this.nav.style[stl] = _style[stl]
            } )
        }
    
        function closeMenu(){
        var _style = {
            maxHeight: '0px',
            overflow: 'hidden'
        }
        
        applyStyleToNav(_style)
            _opened = false
        }
    }

    

    // configuração carrossel DIV laptop-slider
    let carousel = new Carousel({
        container: '.laptop-slider__show',
        itens: 'figure',
        btnPrev: '.prev',
        btnNext: '.next'
    })

    // configuração carrossel section quotes
    let carouselQuotes = new Carousel({
        container: '.quotes-slider',
        itens: 'figure',
        btnPrev: '.prev',
        btnNext: '.next'
    })

    function Carousel(config){
        this.container = (typeof config.container === 'string') ?
        document.querySelector(config.container) : config.container

        this.itens = (typeof config.itens === 'string') ?
        this.container.querySelectorAll(config.itens) : config.itens

        this.btnPrev = (typeof config.btnPrev === 'string') ?
        this.container.querySelector(config.btnPrev) : config.btnPrev
        
        this.btnNext = (typeof config.btnNext === 'string') ?
        this.container.querySelector(config.btnNext) : config.btnNext


        let _this = this
        let _currentSlide = 0

        init()

        function init(){
            let _show = _this.container.querySelectorAll('.show')
            Array.prototype.forEach.call(_show, function(el){
                el.classList.remove('show')
            })
            _this.itens[0].classList.add('show')
            _this.btnNext.removeAttribute('style')
            _this.btnPrev.removeAttribute('style')

            addListeners()
        }

        function addListeners(){
            _this.btnNext.addEventListener('click', showNextSlide)
            _this.btnPrev.addEventListener('click', showPrevSlide)
        }

        function showNextSlide(){
            _currentSlide++
            showSlide()
        }

        function showPrevSlide(){
            _currentSlide--
            showSlide()
        }

        function showSlide(){
            let qtd = _this.itens.length
            let slide = _currentSlide % qtd
            slide = Math.abs(slide)

            _this.container.querySelector('.show').classList.remove('show')
            _this.itens[slide].classList.add('show')
        }
    }
})()