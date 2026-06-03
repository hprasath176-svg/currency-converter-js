const currency = document.querySelectorAll(".currency");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const output = document.getElementById("output");

const api = "https://api.exchangerate-api.com/v4/latest/USD";
fetch(api)
.then((res) => {
   return res.json();
})
.then((data) => {
   displayCurrencies(data.rates);
})
.catch((error) => {
   console.log(error);
});

function displayCurrencies(data){
   let curr = Object.entries(data)
   for(i=0; i< curr.length;i++){
    const opt=`<option value="${curr[i][0]}">${curr[i][0]}</option>`
    currency[0].innerHTML+=opt;
    currency[1].innerHTML+=opt;
   }
}
btn.addEventListener('click',function(){
    let curr1=currency[0].value;
    let curr2=currency[1].value;
    let amt=input.value;
    if(curr1==="" || curr2===""|| amt===""){
        alert("please fill the fields")
    }
    else{
        convert(curr1,curr2,amt)
    }
})
function convert(curr1,curr2,amt){
     fetch(`https://api.exchangerate-api.com/v4/latest/${curr1}`)
   .then((res) => {
      return res.json();
   })
   .then((data) => {

      let rate = data.rates[curr2];

      output.value = (amt * rate).toFixed(2);

   });

}