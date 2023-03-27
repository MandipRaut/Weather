myFunction1("North Somerset")
document.getElementById("button1").addEventListener("click",myFunction);

function myFunction(){
    input=document.getElementById("search").value
    myFunction1(input)
}

function myFunction1(input){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input+'&units=metric&appid=a996fdcd6c4f2a16fd83338c84ab0236')
    .then(response => response.json())
    .then(data => hello(data))

    .catch(error => {
        document.getElementById("search").value=""
        document.getElementById("search").placeholder="Invalid name. Please enter again."
    })

    function hello(d){
        let lat=d["coord"]["lat"]
        let lon=d["coord"]["lon"]
        fetch('https://api.timezonedb.com/v2.1/get-time-zone?key=GTVY9MLSTZYO&format=json&by=position&lat='+lat+'&lng='+lon)
        .then(response => response.json())
        .then(data1 => {
            console.log(data1)
            let datetime=data1["formatted"]
            time=datetime.split(" ")
            const today = new Date();
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const day = daysOfWeek[today.getDay()];
            let country=data1["countryName"]
            document.getElementById("time").innerHTML=time[1]
            document.getElementById("name").innerHTML+=", "+country
            document.getElementById("day").innerHTML=day
        })
        .catch(error => console.log("Error"))
        let cloudData=d["weather"][0]["description"];
        let iconValue=d["weather"][0]["icon"]
        let temp=d["main"]["temp"]
        let humidity=d["main"]["humidity"]
        let name=d["name"]
        let wind=d["wind"]["speed"]
        document.getElementById("name").innerHTML=name
        document.getElementById("temperature").innerHTML=temp+"°C" 
        document.getElementById("humidity").innerHTML=humidity+"%"
        document.getElementById("wind").innerHTML=wind+"m/s" 
        document.getElementById("cloud").innerHTML=cloudData
        document.getElementById("search").placeholder="City Name"
        document.getElementById("image").src="https://openweathermap.org/img/wn/"+iconValue+".png"
    }

}

