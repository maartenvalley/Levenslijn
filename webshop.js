class CartItem{
    constructor(name, price){
        this.name = name
        this.price = price
        this.quantity = 1
    }
}

class LocalCart{
    static key = "cartItems"

    static getLocalCartItems(){
        let cartMap = new Map()
        const cart = localStorage.getItem(LocalCart.key)
        if(cart===null || cart.length===0)  return cartMap
        return new Map(Object.entries(JSON.parse(cart)))
    }

    static addItemToLocalCart(id, item){
        let cart = LocalCart.getLocalCartItems()
        if(cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity +=1
            cart.set(id, mapItem)
        }
        else
            cart.set(id, item)
        localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()

    }

    static removeItemFromCart(id){
        let cart = LocalCart.getLocalCartItems()
        if(cart.has(id)){
            let mapItem = cart.get(id)
            if(mapItem.quantity>1)
            {
                mapItem.quantity -=1
                cart.set(id, mapItem)
            }
            else
                cart.delete(id)
        }
        if (cart.length===0)
            localStorage.clear()
        else
            localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()
    }
}


const cartIcon = document.querySelector('.fa-cart-arrow-down')
const wholeCartWindow = document.querySelector('.whole-cart-window')
wholeCartWindow.inWindow = 0
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn')
addToCartBtns.forEach( (btn)=>{
    btn.addEventListener('click', addItemFunction)
}  )

function addItemFunction(e){
    const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    const name = e.target.parentElement.previousElementSibling.textContent
    let price = e.target.parentElement.children[1].textContent
    price = price.replace("Prijs: €", '')
    const item = new CartItem(name, price)
    LocalCart.addItemToLocalCart(id, item)
    console.log(price)
}


cartIcon.addEventListener('click', ()=>{
    if(wholeCartWindow.classList.contains('hide'))
        wholeCartWindow.classList.remove('hide')
})

cartIcon.addEventListener('mouseleave', ()=>{
    // if(wholeCartWindow.classList.contains('hide'))
    setTimeout( () =>{
        if(wholeCartWindow.inWindow===0){
            wholeCartWindow.classList.add('hide')
        }
    } ,500 )

})

wholeCartWindow.addEventListener('mouseover', ()=>{
    wholeCartWindow.inWindow=1
})

wholeCartWindow.addEventListener('mouseleave', ()=>{
    wholeCartWindow.inWindow=0
    wholeCartWindow.classList.add('hide')
})


function updateCartUI(){
    const cartWrapper = document.querySelector('.cart-wrapper')
    cartWrapper.innerHTML=""
    const items = LocalCart.getLocalCartItems()
    if(items === null) return
    let count = 0
    let total = 0
    for(const [key, value] of items.entries()){
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        let price = value.price*value.quantity
        price = Math.round(price*100)/100
        count+=1
        total += price
        total = Math.round(total*100)/100
        cartItem.innerHTML =
            `
                       <div class="details">
                           <h3>${value.name}</h3>
                            <span class="quantity">Aantal: ${value.quantity}</span>
                               <span class="price">Prijs: € ${value.price*value.quantity}</span>
                           </p>
                       </div>
                       <div class="cancel"><i class="fas fa-window-close"></i></div>
        `
        cartItem.lastElementChild.addEventListener('click', ()=>{
            LocalCart.removeItemFromCart(key)
        })
        cartWrapper.append(cartItem)
    }

    if(count > 0){
        cartIcon.classList.add('non-empty')
        let root = document.querySelector(':root')
        root.style.setProperty('--after-content', `"${count}"`)
        const subtotal = document.querySelector('.subtotal')
        subtotal.innerHTML = `Totaal: €${total}`
    }
    else
        cartIcon.classList.remove('non-empty')
}
document.addEventListener('DOMContentLoaded', ()=>{updateCartUI()})
