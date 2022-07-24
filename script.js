class Calculator {
  constructor(tipAmountPerPerson, totalPerPerson) {
    this.tipAmount = tipAmountPerPerson;
    this.tipAmount.innerText = `$${(0).toFixed(2)}` 
    this.totalAmount = totalPerPerson;
    this.totalAmount.innerText =  `$${(0).toFixed(2)}`
  }
  getBill() {
    this.bill = parseFloat(billInput.value);
    if (this.bill <= 0) {
      this.errorFunc(billInput, `Can't be zero`);
    } else {
      this.successFunc(billInput)
    }
  }
  getPeople() {
    this.people = parseFloat(peopleInput.value);
    if (this.people <= 0) {
      this.errorFunc(peopleInput, `Can't be zero`);
    } else {
      this.successFunc(peopleInput)
    }
  }
  getPercentage(button) {
    this.percentage = parseFloat(button.innerText) / 100;
  }
  getCustomValue() {
    this.percentage = parseFloat(customInput.value) / 100;
  }
  calculateTip() {
    if(this.bill > 0 && this.people > 0 && this.percentage > 0){
      const computeTipAmount = (this.bill * this.percentage) / this.people;
      const computeTotalAmount = (this.bill / this.people) + computeTipAmount

      this.tipAmount.innerText = `$${computeTipAmount.toFixed(2)}`
      this.totalAmount.innerText = `$${computeTotalAmount.toFixed(2)}`
    }
  }
  errorFunc(input, message) {
    const inputControl = input.parentElement;
    const errorText = inputControl.querySelector("small");
    errorText.innerHTML = message;
    inputControl.className = "error";
    errorText.className = "error-text";
  }
  successFunc(input) {
    const inputControl = input.parentElement;
    const errorText = inputControl.querySelector("small");
    errorText.innerHTML = "";
    inputControl.className = "success";
  }
  resetValues() {
    billInput.value = "";
    peopleInput.value = "";
    customInput.value = '';
    percentageBtns.forEach((clearBtn) => {
      clearBtn.classList.remove("active");
    });
    this.percentage = "";
    this.tipAmount.innerText = `$${(0).toFixed(2)}` 
    this.totalAmount.innerText =  `$${(0).toFixed(2)}`
  }
}

const billInput = document.querySelector(".bill");
const peopleInput = document.querySelector(".people");
const percentageBtns = document.querySelectorAll(".percent-btn");
const customInput = document.querySelector(".custom");
const tipAmountPerPerson = document.querySelector(".tip-amount");
const totalPerPerson = document.querySelector(".total-amount");
const resetBtn = document.querySelector(".reset");

const calculator = new Calculator(tipAmountPerPerson, totalPerPerson);

billInput.addEventListener("input", () => {
  calculator.getBill();
  calculator.calculateTip()
});

peopleInput.addEventListener("input", () => {
  calculator.getPeople();
  calculator.calculateTip()
});

percentageBtns.forEach((button) => {
  button.addEventListener("click", () => {
    percentageBtns.forEach((clearBtn) => {
      clearBtn.classList.remove("active");
    });
    button.classList.add("active");
    calculator.getPercentage(button);
    calculator.calculateTip()
  });
});

customInput.addEventListener("input", () => {
  calculator.getCustomValue();
  percentageBtns.forEach((clearBtn) => {
    clearBtn.classList.remove("active");
  });
  calculator.calculateTip()
});

resetBtn.addEventListener("click", () => {
  calculator.resetValues();
});
