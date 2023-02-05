
//---------------------------Device Width Start-------------------------------------------------//

// const body = document.querySelector('body')

// //TO get exact width and height
// var deviceWidth = window.innerWidth
// var deviceHeight = window.innerHeight

// body.style.width = deviceWidth+"px"
// body.style.height = deviceHeight+"px"

//---------------------------Device Width End-------------------------------------------------//

//--VARIABLES
const everything = document.querySelector('.everything')
const idSelector = document.querySelectorAll('.id-option')
var id
var check = 0
var indexCounter = 0
var i, j
let gameover = false
const boxes = document.querySelectorAll('.box')
const boxList = document.querySelector('.boxes')
const idSelectorwhole = document.querySelector('.id-selector')
const sign = document.querySelectorAll('.sign')
const msg = document.querySelector('.text')

// //---------------------------Start of Loader-------------------------------------------------//
// window.addEventListener('load',()=>{
//     setTimeout(load,2000)
// })
// function load(){
//     everything.style.opacity = "100%"
// }
// //---------------------------End of loader-------------------------------------------------//


//---------------------------Start of Id Selector-------------------------------------------------//
idSelector.forEach(opt=>{
    opt.addEventListener('click',()=>{
      id = opt.getAttribute('data-id')
      idSelectorwhole.style.pointerEvents = "none"
      setInterval(loadBoxes,1)
    })
})
//---------------------------End of Id Selector-------------------------------------------------//


//---------------------------Start of Boxes-------------------------------------------------//
function loadBoxes(){
    boxList.style.display = "grid"
    idSelectorwhole.style.display = "none"
}
//---------------------------End of Boxes-------------------------------------------------//


//---------------------------Start of Main Part-------------------------------------------------//

boxes.forEach(function(box,index){

    //When box is clicked

    box.addEventListener('click',()=>{

        //Checks whether the box is clicked or not
        //If is clicked then nothing happens

        if(box.hasAttribute('data-id'))return

        //Else not clicked then id is passed

        else
        box.setAttribute('data-id',id)
        id = box.getAttribute('data-id')
        indexCounter++

        //Checks id

        if(id==0)
        {
            box.innerHTML = "⨉"
        }
        else if(id==1)
        {
            box.innerHTML = "◯"
        }

        //Checks win eveytime the btn is clicked

        winChecker(index)

    })
})

//Checks if one has won or not
function winChecker(index){
    var idChecker = 0
    
    //If Clicked on 1st Col--------------------------------------
    if(boxes[index].getAttribute('data-col')==1)
    {

        //Horizontal check
        
        for(i=index;i<=index;i++)
        {
            for(j=i+1;j<=index+2;j++)
            {
                if(boxes[i].getAttribute('data-id') == boxes[j].getAttribute('data-id'))
                {
                    idChecker ++
                }
            }
        }
        if(idChecker==2)
        {
            idChecker = 0
            msg.innerHTML = boxes[index].innerText+" won"
            gameover = true
        }

        //Vertical Check

        for(i=index;i<=index;i++)
        {
            idChecker = 0
            console.log("i: "+i)
            console.log("idChecker: "+idChecker)
            
            for(j=i+2;j<i+2;j++)
            {
                for(j=j+2;j<j;j++)
                {
                    if(boxes[i].getAttribute('data-id') == boxes[j].getAttribute('data-id'))
                    {
                        idChecker ++
                    }
                }
            }
        }
        if(idChecker==2)
        {
            idChecker = 0
            msg.innerHTML = boxes[index].innerText+" won"
            gameover = true
        }
    }

    //If Clicked on 2nd COl----------------------------------------------

    if(boxes[index].getAttribute('data-col')==2)
    {
        console.log("index: "+index)
        console.log('id: '+boxes[index].getAttribute('data-id'))
        //Horizontal check
        for(i=index;i<=index;i++)
        {
            //For next box
            for(j=i+1;j<=i+1;j++)
            {
                if(boxes[i].getAttribute('data-id') == boxes[j].getAttribute('data-id'))
                {
                    idChecker ++
                }
            }
            //For prev box
            for(j=i-1;j>=i-1;j--)
            {
                if(boxes[i].getAttribute('data-id') == boxes[j].getAttribute('data-id'))
                {
                    idChecker ++
                }
            }
        }
        if(idChecker==2)
        {
            msg.innerHTML = boxes[index].innerText+" won"
            gameover = true 
        }
        //Vertical Check
        //Diagonal Check
    }

    //If Clicked on 3rd col--------------------------------------

    if(boxes[index].getAttribute('data-col')==3)
    {
        //Horizontal check
        for(i=index;i<=index;i++)
        {
            for(j=i-1;j>=index-2;j--)
            {
                if(boxes[i].getAttribute('data-id') == boxes[j].getAttribute('data-id'))
                {
                    idChecker ++
                }
            }
        }
        if(idChecker==2)
        {
            msg.innerHTML = boxes[index].innerText+" won"
            gameover = true 
        }
        //Vertical Check
        //Diagonal Check
    }
}

//---------------------------End of Main Part-------------------------------------------------//
