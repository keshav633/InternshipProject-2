//select elements
let productname =document.getElementById("productname")
let price =document.getElementById("price")
let sales =document.getElementById("sales")
let supplier =document.getElementById("supplier")
let quantity =document.getElementById("quantity")
let count =document.getElementById("count")
let Description =document.getElementById("Description")
let total =document.getElementById("total")
let create =document.getElementById("create")
let update =document.getElementById("update")
let del = document.getElementById("delete")
let searchInput = document.getElementById("searchinp")
let mood ='create';
let temp;






// console.log(title,price,taxes,ads,discount,count,category,total,create,update,del);
//calcute price function 
function calc() {
    if(price.value != ""){

        let totalprice = +price.value;
        total.innerText = totalprice +'$'
        total.style.backgroundColor = 'green'
    
}else{

    total.innerText = "$"
    total.style.backgroundColor = 'red'
    
}

}
//read all the data and push them in an array
let products = []
if(localStorage.getItem("product") != null){
    products =JSON.parse(localStorage.getItem("product"))
}


function createProducts() {


    count.style.display = 'block'
    
        let newProduct = {
            productname:productname.value,
            price:price.value,
            sales:sales.value,
            supplier:supplier.value,
            quantity:quantity.value,
            total:total.innerHTML,
            count:count.value,
            Description:Description.value
        }
        
        if(mood =='create'){
            
        if(count.value>1){
            if(count.value <=100){

                for (let i = 0; i < count.value; i++) {
                    products.push(newProduct)
                    
                }
                clearInputs()

            }else{
                alert("too many items")
            }
        }else{
            products.push(newProduct)
            clearInputs()
            
        }

        total.style.backgroundColor = 'red'
        total.innerHTML = '$'
    }
//end create

        else{

                products[temp] = newProduct;
                mood = 'create'
                create.innerHTML = 'create'
                create.style.backgroundColor = 'rgb(22, 44, 246)'
                clearInputs()
            }
            addDataToLocalStorage()
    
    
}


function clearInputs() {
    productname.value="",
    price.value ="",
    sales.value ="",
    supplier.value ="",
    quantity.value = "",
    total.value="",
    count.value="",
    Description.value = ''
}
create.addEventListener("click",()=>{
    if(!productname.value){
        alert("please enter productname of the product  ")
        return
        
    }
    if(!price.value){
        alert("please enter price of the product  ")
        return

    }
    if(!Description.value){
        alert("please enter Description of the product  ")
        return

    }


    createProducts()
    showProducts()

})

//show our products dynamically in our table

function showProducts() {


    
    deleteAllbtn()

    let body = '';
    for (let i = 0; i < products.length; i++) {

    
        body+= ` 
        <tr>
            <td>${i}</td>
            <td>${products[i].productname}</td>
            <td>${products[i].price}</td>
            <td>${products[i].supplier}</td>
            <td>${products[i].sales}</td>
            <td>${products[i].quantity}</td>
            <td>${products[i].total}</td>
            <td>${products[i].Description}</td>
            <td><button  onclick ='updatefunc(${i})'  class="update" id="update">update</button></td>
            <td><button  onclick='deletefunc(${i})' class="delete" id="delete">delete</button></td>
        </tr>`

    }


    document.querySelector("tbody").innerHTML = body
    // console.log(body);
}
showProducts()
function deletefunc(index) {
    products.splice(index,1)
    addDataToLocalStorage()
    showProducts()




}
function updatefunc(index) {
    productname.value= products[index].productname
    price.value= products[index].price
    supplier.value= products[index].supplier
    Description.value= products[index].Description
    quantity.value= products[index].quantity
    sales.value= products[index].sales
    total.innerHTML= products[index].total
    scroll({
        top:0,
        behavior:'smooth'
    })

    count.style.display = 'none'
    create.innerHTML = 'Update'
    create.style.backgroundColor = 'green'
    mood = 'update'

    temp = index;

}
function addDataToLocalStorage() {
    localStorage.setItem('product',JSON.stringify(products))
    
}

function deleteAllbtn() {
    if(products.length>0){
        document.getElementById("da").style.display = 'block'
        document.getElementById("da").innerHTML = `DeleteAll (${products.length}Products)`

    }else{
        document.getElementById("da").style.display = 'none'

    }

}

document.getElementById("da").onclick = function () {
    products.splice(0)
    addDataToLocalStorage()
    showProducts()
}













let searchstat = 'stitle'
function searching(id) {
    // console.log(id);
    if(id =='stitle'){
        searchstat = 'stitle'
        searchInput.placeholder = 'search by title'

     


    }else{
        searchInput.placeholder = 'search by category'
        searchstat = 'ctitle'

    }

    searchInput.focus()
    


}

function getsearchdata(value) {

    
    let body = '';
    if(searchstat =='stitle'){
        for (let i = 0; i < products.length; i++) {
            if(products[i].title.toLowerCase().includes(value.toLowerCase())){
                
                
                body+= ` 
                <tr>
                <td>${i}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button  onclick ='updatefunc(${i})'  class="update" id="update">update</button></td>
            <td><button  onclick='deletefunc(${i})' class="delete" id="delete">delete</button></td>
            </tr>`
            
        }
        
        
    }
}else{
    for (let i = 0; i < products.length; i++) {
        if(products[i].category.toLowerCase().includes(value.toLowerCase())){
            
            
            body+= ` 
            <tr>
            <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button  onclick ='updatefunc(${i})'  class="update" id="update">update</button></td>
        <td><button  onclick='deletefunc(${i})' class="delete" id="delete">delete</button></td>
        </tr>`
        
    }
    
    
}


    }
document.querySelector("tbody").innerHTML = body
}