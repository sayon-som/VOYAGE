// axios.get('https://api.cryptonator.com/api/ticker/btc-usd').then((res)=>{
//     console.log(res.data.ticker.price)
// }).catch(err=>{
//     console.log(err);
// })

//DEFINING THE HEADERS
const config = { headers: { Accept: "text/plain" } };

const btn = document.querySelector("button");
const display = document.querySelector("h3");
btn.addEventListener("click", () => {
  axios
    .get("https://icanhazdadjoke.com", config)
    .then((res) => {
      display.innerText = res.data;
    })
    .catch((err) => {
      console.log(`The error is ${err}`);
    });
});
// axios.get("https://icanhazdadjoke.com",config).then(res=>{
// document.write(res.data)

// }).catch(err=>{
//     console.log(`The fucking error is ${err}`);
// })
