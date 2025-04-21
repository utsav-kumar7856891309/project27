const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

window.onload = async function () {
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await response.json();
  const currencies = Object.keys(data.rates);
  currencies.forEach((currency) => {
    fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  });
  fromCurrency.value = "USD";
  toCurrency.value = "INR";
};

// Convert function
async function convert() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    result.innerHTML = "Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    result.innerHTML = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.innerHTML = "Something went wrong. Try again!";
    console.error(error);
  }
}
