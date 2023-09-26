var weatherContainer=document.getElementById('weatherContainer')

// openweather Map 
// cityname=>inputbox and pass it to the url
// fetch the data from the URL
//display it to the browser
//try and catch


async function getWeatherData(){
    try{
        var cityName=document.getElementById('cityName').value
    console.log(cityName)
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d3e506754c7c6054d2a6c7e680b5a02f`

        let data=await fetch(url)
        let res=await data.json()
        console.log(res)
        const {temp,feels_like,humidity}=res.main
    weatherContainer.innerHTML=`
    
    <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="https://cdn3.vectorstock.com/i/1000x1000/10/87/weather-forecast-vector-11181087.jpg" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${cityName} Weather Details</h5>
                  <p class="card-text m-0 p-0 fw-bold">Temperature:${temp}°C</p>
                  <p class="card-text m-0 p-0 fw-bold">Feels Like:${feels_like}°C</p>
                  <p class="card-text m-0 p-0 fw-bold">Humidity:${humidity}°C</p>
                  <p class="card-text m-0 p-0 fw-bold">Description:${res.weather[0].description}</p>
                </div>
              </div>
            </div>
          </div>
    
    
    
    
    `
    }
    catch(e){
        console.log("Error Found")
    }


}



