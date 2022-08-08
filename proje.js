var count = 0
var data =JSON.parse(localStorage.getItem("data"))  || []
const form = document.querySelector("#car-form");
form.addEventListener("submit",(e) =>{
    const newCar = document.querySelector("#carInput").value.trim()
    var task = {
        id:count,
        value: newCar,
        process:"brand",
    }
    if(task.value==""){
        const alert = document.createElement("div")
        alert.className="alert alert-danger"
        alert.textContent="Lütfen bir araç markası giriniz"
        document.querySelector(".card-body").appendChild(alert)

        setTimeout(() =>{
            alert.remove()
        },1000)
    }
    else{
        data.push(task)
        updateLocalStorage(data)
        addToUI()
        document.querySelector("#carInput").value= null
        count++
    }
    e.preventDefault()
})

document.addEventListener("DOMContentLoaded", addToUI)

function updateLocalStorage(data){
    localStorage.setItem("data",JSON.stringify(data))
}

function addToUI(){
        var tempHTML = ""
        var tempHTMLCompleted = ""
        var tempHTMLDelivered = ""
        for (let i = 0; i < data.length; i++) {
            
            if(data[i].process === "brand"){
                tempHTML+='<div class="input-group mb-3">'+
                '<div class="input-group-prepend">'+
                '<div class="input-group-text">'+
                '</div>'+
                '</div>'+
                '<p type="text" class="form-control" aria-label="Text input with checkbox">'+data[i].value+'</p>'+
                '<div class="input-group-append">'+
                '<button class="btn btn-warning"  onclick="sendCar('+data[i].id+')"><i class="fa fa-cogs"></i></button>'+
                '<button class="btn btn-outline-danger" type="button" onclick="deleteElement('+data[i].id+');"><i class="fa fa-trash"></i></button>'+
                '</div>'+
                '</div>';
            }
            else if(data[i].process === "maintenance"){
                tempHTMLCompleted+='<div class="input-group mb-3">'+
                '<p type="text" class="form-control" aria-label="Text input with checkbox">'+data[i].value+'</p>'+
                '<div class="input-group-append">'+
                    '<button class="btn btn-outline-primary" type="button" onclick="undoElement('+data[i].id+');"><i class="fa fa-undo"></i></button>'+
                    '<button class="btn btn-outline-danger" type="button" onclick="deliverCar('+data[i].id+');"><i class="fa fa-car" onclic></i></button>'+
                '</div>'+
                '</div>';
            }
            else if(data[i].process === "completed"){
                tempHTMLDelivered+='<div class="input-group mb-3">'+
                '<p type="text" class="form-control" aria-label="Text input with checkbox">'+data[i].value+'</p>'+
                '<div class="input-group-append">'+
                '</div>'+
                '</div>';
            }
            
        }
            document.getElementById('brand').innerHTML=tempHTML
            document.querySelector("#completed").innerHTML = tempHTMLCompleted
            document.querySelector("#delivered").innerHTML = tempHTMLDelivered

}

const sendCar = (id) =>{
    var i =data.findIndex(x=>x.id==id)
    data[i].process = "maintenance"
    updateLocalStorage(data)
    addToUI()

}
const deleteElement = (id) =>{
    var i = data.findIndex(x=>x.id==id)
    data.splice(i,1)
    localStorage.removeItem(data)
    localStorage.setItem("data",JSON.stringify(data))
    addToUI()
}

const undoElement = (id) =>{
    var i = data.findIndex(x=>x.id==id)
    data[i].process = "brand"
    updateLocalStorage(data)
    addToUI()
}

const deliverCar = (id) =>{
    var i = data.findIndex(x=>x.id==id)
    data[i].process = "completed"
    updateLocalStorage(data)
    addToUI()
}