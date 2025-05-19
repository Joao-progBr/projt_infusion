(function(){
    var $body = document.querySelector('body')
    $body.classList.remove('no-js')
    $body.classList.add('js')
    
    
    // let btnMenu = document.querySelector('.header__btnMenu')
    // // btnMenu.style.display = 'block'
    // btnMenu.removeAttribute('style')
    
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
        closeMenu()
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
                maxHeight: 'calc(100vh -' + _top +')',
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
})()