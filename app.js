const percentBtns = document.querySelectorAll(".percent-btn");
const tipPerPerson = document.querySelector(".tip-amount");
const totalPerPerson = document.querySelector(".total-amount");
const bill = document.querySelector(".bill");
const people = document.querySelector(".people");
const custom = document.querySelector(".custom");
const resetBtn = document.querySelector(".reset");

bill.addEventListener("input", billFunc);

people.addEventListener("input", peopleFunc);

percentBtns.forEach(function (btn) {
  btn.classList.remove("active");
  btn.addEventListener("click", percentFunc);
});

custom.addEventListener("input", customFunc);
resetBtn.addEventListener("click", resetFunc);

bill.value = "";
people.value = "";
tipPerPerson.innerHTML = `$` + (0).toFixed(2);
totalPerPerson.innerHTML = `$` + (0).toFixed(2);

let billNumber;
let personNumber;
let percent;

function billFunc() {
  billNumber = parseFloat(bill.value);
  billNumber <= 0 ? errorFunc(bill, `Can't be zero`) : successFunc(bill);
  calculateTip();
}
function peopleFunc() {
  personNumber = parseFloat(people.value);
  personNumber <= 0 ? errorFunc(people, `Can't be zero`) : successFunc(people);

  calculateTip();
}

function percentFunc(e) {
  percentBtns.forEach(function (btn) {
    if (btn.innerHTML === e.target.innerHTML) {
      btn.classList.add("active");
      percent = parseFloat(btn.innerHTML) / 100;
    } else {
      btn.classList.remove("active");
    }
  });
  calculateTip();
}
function customFunc() {
  percent = parseFloat(custom.value / 100);
  percentBtns.forEach(function (btn) {
    btn.classList.remove("active");
  });

  calculateTip();
}
function calculateTip() {
  if (billNumber > 0 && personNumber > 0 && percent > 0) {
    let tipAmount = (billNumber * percent) / personNumber;
    let total = billNumber / personNumber + tipAmount;

    tipPerPerson.innerHTML = `$` + tipAmount.toFixed(2);
    totalPerPerson.innerHTML = `$` + total.toFixed(2);
  }
}

function resetFunc() {
  bill.value = "";
  billFunc();

  people.value = "";
  peopleFunc();

  custom.value =''

  tipPerPerson.innerHTML = `$` + (0).toFixed(2);
  totalPerPerson.innerHTML = `$` + (0).toFixed(2);

  percentBtns.forEach(function (btn) {
    btn.classList.remove("active");
    percent = '';
  });
  
}

function errorFunc(input, message) {
  const inputControl = input.parentElement;
  const errorText = inputControl.querySelector("small");
  errorText.innerHTML = message;
  inputControl.className = "error";
  errorText.className = "error-text";
}

function successFunc(input) {
  const inputControl = input.parentElement;
  const errorText = inputControl.querySelector("small");
  errorText.innerHTML = "";
  inputControl.className = "success";
}
