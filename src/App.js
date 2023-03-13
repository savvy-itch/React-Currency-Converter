import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

// добавить поиск с автозаполнением
// убрать рубль и драгметаллы

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  // Register from which input to convert
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  
  let toAmount, fromAmount;
  // if 'from' input has value 
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  // if 'to' input has value
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  // fetch API on every page load
  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        const options = data.map(el => el.txt);
        const firstCurrency = data.filter(
          d => d.txt === options[0]);
        setCurrencyOptions(options);
        // Currency to convert from
        setFromCurrency(options[0]);
        // Currency to convert to
        setToCurrency(options[1]);
        // set default rate
        setExchangeRate(firstCurrency[0].rate);
      });
  }, []);

  // when currency changes
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(BASE_URL)
        .then(response => response.json())
        .then(data => {
          const fromCurrencyData = data.filter(el => el.txt === fromCurrency);
          const toCurrencyData = data.filter(el => el.txt === toCurrency);
          setExchangeRate(fromCurrencyData[0].rate / toCurrencyData[0].rate)
        });
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
 }

  return (
    <>
      <h1 className='text-success'>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        // on change set value to user's selection
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
        autoFocus
      />
      <div className="equals text-success">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        // on change set value to user's selection
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;