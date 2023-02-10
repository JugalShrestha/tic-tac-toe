
//--VARIABLES
const everything = document.querySelector('.everything')
const playerSelectorWhole = document.querySelector('.player-selector')
const playerSelector = document.querySelectorAll('.player-option')
const idSelector = document.querySelectorAll('.id-option')
var id, p2Id
var playerChecker
var drawChecker = 0
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

//AI 
var aiId, aiMover

// //---------------------------Start of Loader-------------------------------------------------//
// window.addEventListener('load',()=>{
//     setTimeout(load,2000)
// })
// function load(){
//     everything.style.opacity = "100%"
// }
// //---------------------------End of loader-------------------------------------------------//


//---------------------------Start of Player Selector-------------------------------------------------//
playerSelector.forEach(opt=>{
    opt.addEventListener('click',()=>{
      playerChecker = opt.getAttribute('data-player')
      playerSelectorWhole.style.pointerEvents = "none"
      loadIdSelector()
    })
})
//---------------------------End of Id Selector-------------------------------------------------//


//---------------------------Start of Id Selector-------------------------------------------------//
function loadIdSelector(){
    idSelectorwhole.style.display = "flex"
    playerSelectorWhole.style.display = "none"
}

idSelector.forEach(opt=>{
    opt.addEventListener('click',()=>{
      id = opt.getAttribute('data-id')
      idSelectorwhole.style.pointerEvents = "none"
      if(playerChecker == "human")
      {
        if(id==0)p2Id=1
        else p2Id=0
      }
      else
      {
        if(id==0)
        {
            aiId=1
        }
        else{
            aiId=0
        }
      }
      loadBoxes()
    })
})

//---------------------------End of Id Selector-------------------------------------------------//


//---------------------------Start of Boxes-------------------------------------------------//
function loadBoxes(){
    boxList.style.display = "grid"
    boxList.style.pointerEvents = "all"
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

        //Checks for turn
        if(playerChecker == "human")
        {
            turnChange()
            if(id==0)
            {
                msg.innerHTML = "⨉ turn"
            }
            else if(id==1)
            {
                msg.innerHTML = "◯ turn"
            }
        }
        
        //Checks win eveytime the btn is clicked

        winChecker()

        if(gameover == false && playerChecker == "bot")
        {
            //AI bot
            bot()
        }

        //Checks win again
        winChecker()
    })
})

//When clicked turn changes can pick a box

function turnChange(){
    if(id==0) id = 1
    else id = 0 
}

//When clicked ai moves too

function bot(){
    aiMover =  Math.floor((Math.random() * (boxes.length-1)) + 1);
    console.log("AI: "+aiMover+","+id+",Draw: "+drawChecker)
    if(boxes[aiMover].hasAttribute('data-id'))
    {    
        bot()
    }
    else
    {
        boxes[aiMover].setAttribute('data-id',aiId)
    
        //Checks id

        if(aiId==0)
        {
            boxes[aiMover].innerHTML = "⨉"
        }
        else if(aiId==1)
        {
            boxes[aiMover].innerHTML = "◯"
        }
    }

}

//Checks if one has won or not

function winChecker(){
    winConditions.forEach(condition =>{
        if((boxes[condition[0]].getAttribute('data-id')== boxes[condition[1]].getAttribute('data-id')) && (boxes[condition[0]].getAttribute('data-id') == boxes[condition[2]].getAttribute('data-id')) && boxes[condition[0]].getAttribute('data-id')!=null){
            msg.innerHTML = boxes[condition[0]].innerHTML+" Won"
            boxes[condition[0]].style.background = "var(--s1-color)"
            boxes[condition[0]].style.color = "var(--p1-color)"
            
            boxes[condition[1]].style.background = "var(--s1-color)"
            boxes[condition[1]].style.color = "var(--p1-color)"
            
            boxes[condition[2]].style.background = "var(--s1-color)"
            boxes[condition[2]].style.color = "var(--p1-color)"
            finish()
        }
    })

    //Draw condition
    boxes.forEach(box=>{
        if(box.hasAttribute('data-id') && (gameover == false))
        {
            drawChecker++
        }
    })
    if(drawChecker == 45 || drawChecker == 81)
    {
        msg.innerHTML = "draw"
        finish()
    }
}

//Checks if Game is over or not
function finish()
{
    gameover = true
    boxList.style.pointerEvents = "none"
    goAgain.style.opacity = "100%"
    goAgain.style.zIndex = "1"
    goAgain.addEventListener('click',reset)
}

//resets everything

function reset(){
    playerSelectorWhole.style.display = "flex"
    playerSelectorWhole.style.pointerEvents = "all"
    idSelectorwhole.style.display = "none"
    idSelectorwhole.style.pointerEvents = "all"
    id = ""
    drawChecker = 0
    gameover = false
    boxList.style.display = "none"
    goAgain.style.opacity = "0"
    goAgain.style.zIndex = "-1"
    msg.innerHTML = ""
    boxes.forEach(box=>{
        box.removeAttribute('data-id')
        box.innerHTML = ""    
        box.style.background = "var(--p1-color)"
        box.style.color = "var(--s1-color)"
    })
}

//---------------------------End of Main Part-------------------------------------------------//
