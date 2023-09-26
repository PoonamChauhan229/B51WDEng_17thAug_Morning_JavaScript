var colorDisplay=document.getElementById('colorDisplay')
let url1='https://x-colors.yurace.pro/api/random'
let url2='https://x-colors.yurace.pro/api/random?number=20'
async function getRandomColor(){
    console.log("Fetching......")
    const data1=await fetch(url1)
    const res1=await data1.json()
    console.log(res1)
    colorDisplay.style.backgroundImage=""
    changeColor(res1.hex)
}

async function getRandomVariousColor(){
    console.log("Fetching......")
    const data2=await fetch(url2)
    const res2=await data2.json()
    console.log(res2[0].hex,res2[1].hex)
    colorDisplay.style.backgroundColor=""
    changeGradientColor(res2[0].hex,res2[1].hex)
}

function changeColor(color){
    colorDisplay.style.backgroundColor=color
   

}
function changeGradientColor(color1,color2){
    // gradient 
    colorDisplay.style.backgroundImage = `linear-gradient(180deg,${color1},${color2}`

}