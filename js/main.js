let search = document.getElementById('search')

async function getCity(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f29bf7af47164645b3f193121230608&q=${city}&days=3`)
    if (response.ok && 400 != response.status) {
        let result = await response.json()
        displayDay(result.location, result.current)
        displayAll(result.forecast.forecastday)
    }
}

document.getElementById("search").addEventListener("keyup", result => {
    getCity(search.value)
}
);

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayDay(a, t) {
    var e = new Date(t.last_updated);
    let x = `<div class="card-title p-3 d-flex ">
    <div class="day" id="day">${days[e.getDay()]}</div>
    <div class="date ms-auto"> ${e.getDate() + monthNames[e.getMonth()]}</div>
</div>
<div class="card-text p-3 ">
    <div class="locat" id="location"><p>${a.name}</p></div>
    <div class="weather d-flex justify-content-between">
        <p class="bold">${t.temp_c}<sup>o</sup>C</p> 
        <img src="https:${t.condition.icon}" class="align-self-center" alt="" width=80>\n
    </div>
    <div class="weatherstate">
        <p>${t.condition.text}</p>
    </div>
    <div class="state mt-3 d-flex justify-content-around">
        <div class="d-flex">
            <i class="fa-solid fa-umbrella mt-1 me-1" style="color: #63656F;"></i>
            <p>20%</p>
        </div>
        <div class="d-flex">
            <i class="fa-solid fa-wind mt-1 me-1" style="color: #63656F;"></i>
            <p>17km/h</p>
        </div>
        <div class="d-flex">
            <i class="fa-solid fa-compass mt-1 me-1" style="color: #63656F;"></i>
            <p>East</p>
        </div>
    </div>
</div>`
    document.getElementById("show").innerHTML = x
}
function displayAll(a) {
    let t = `<div class="card-title2 py-3 text-center">
    <div class="day">${days[new Date(a[1].date).getDay()]}</div>
</div>
<div class="card-text2 pt-5 pb-4 text-center">
    <div class="weather d-flex flex-column justify-content-center">
    <img src="https:${a[1].day.condition.icon}" alt="" class="mx-auto" width=48>\n 
    <div class="degree fs-3">${a[1].day.maxtemp_c}<sup>o</sup>C</div>\n 
    <p class="fs-5">${a[1].day.mintemp_c}<sup>o</sup></p>\n
    </div>
    <div class="weatherstate">
        <P>${a[1].day.condition.text}</p>
    </div>
</div>`
    document.getElementById('second').innerHTML = t
    let th = `<div class="card-title py-3 text-center">
<div class="day">${days[new Date(a[2].date).getDay()]}</div>
</div>
<div class="card-text pt-5 pb-4 text-center">
<div class="weather d-flex flex-column justify-content-center">
<img src="https:${a[2].day.condition.icon}" alt="" class="mx-auto" width=48>\n 
<div class="degree fs-3">${a[2].day.maxtemp_c}<sup>o</sup>C</div>\n 
<p class="fs-5">${a[2].day.mintemp_c}<sup>o</sup></p>\n
</div>
<div class="weatherstate">
    <P>${a[2].day.condition.text}</p>
</div>
</div>
`
    document.getElementById('third').innerHTML = th

}
async function getLocation() {
        const request = await fetch("https://ipinfo.io/json?token=84706ab1aa460d")
        const data = await request.json()
        getCity(data.city)
}
getLocation()