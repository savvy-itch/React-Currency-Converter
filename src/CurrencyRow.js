import React from 'react';

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
    autoFocus
  } = props;
  return (
    <div className='input-group my-3'>
      <input 
        type="number" 
        className='form-control text-bg-light p-3' 
        value={amount} 
        onChange={onChangeAmount} 
        autoFocus={autoFocus}
      />
      <select 
      className='form-select text-bg-light p-3'
        value={selectedCurrency} 
        onChange={onChangeCurrency}
      >
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <label className="currency-label input-group-text text-bg-secondary p-3">Currency</label>
    </div>
  )
}