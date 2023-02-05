
//--VARIABLES
const everything = document.querySelector('.everything')
const idSelector = document.querySelectorAll('.id-option')
var id
let winConditions = [[0,1,2],[3,4,5],[6,7,8],  //Horizontal
                    [0,4,8],[2,4,6],            //Diagonal
                    [0,3,6],[1,4,7],[2,5,8]]    //Vertical
let gameover = false
const boxes = document.querySelectorAll('.box')
const boxList = document.querySelector('.boxes')
const idSelectorwhole = document.querySelector('.id-selector')
const goAgain = document.querySelector('.play-again')
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

        winChecker()

    })
})

//Checks if one has won or not

function winChecker(){
    winConditions.forEach(condition =>{
        if((boxes[condition[0]].getAttribute('data-id')== boxes[condition[1]].getAttribute('data-id'))&& (boxes[condition[0]].getAttribute('data-id') == boxes[condition[2]].getAttribute('data-id')) && boxes[condition[0]].getAttribute('data-id')!=null){
            msg.innerHTML = boxes[condition[0]].innerHTML+" Won"
            boxes[condition[0]].style.background = "var(--s1-color)"
            boxes[condition[0]].style.color = "var(--p1-color)"
            
            boxes[condition[1]].style.background = "var(--s1-color)"
            boxes[condition[1]].style.color = "var(--p1-color)"
            
            boxes[condition[2]].style.background = "var(--s1-color)"
            boxes[condition[2]].style.color = "var(--p1-color)"
            gameover = true
            finish()
        }
    })
}

//Checks if Game is over or not
function finish()
{
    gameover = false
    boxList.style.pointerEvents = "none"
    goAgain.style.opacity = "100%"
    goAgain.style.zIndex = "1"
    goAgain.addEventListener('click',reset)
}

//resets everything

function reset(){
    idSelectorwhole.style.display = "flex"
    idSelectorwhole.style.pointerEvents = "all"
    id = ""
    boxList.style.display = "none"
    boxList.style.pointerEvents = "all"
    goAgain.style.opacity = "0"
    goAgain.style.zIndex = "-1"
    msg.innerHTML = ""
    boxes.forEach(box=>{
        box.setAttribute('data-id', null)
        box.innerHTML = ""    
        box.style.background = "var(--p1-color)"
        box.style.color = "var(--s1-color)"
    })
}

//---------------------------End of Main Part-------------------------------------------------//
