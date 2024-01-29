const chooseTheme = document.getElementById("chooseTheme");
const toggleBall = document.querySelector(".toggle-ball");
const htmlElement = document.documentElement;
const form = document.querySelector("form");
const buttonForm = document.querySelector("#button-form");
const budgetInput = document.getElementById("budgetamount");
const expenseInput = document.getElementById("expense");
const amountInput = document.getElementById("amount");
const expensesList = document.querySelector("#expenses-list");
const remainingText = document.querySelector("#remaining");
let budget;

//SWITCH TO DARK THEME

//Toggle
function changeTheme() {
  if (chooseTheme.checked) {
    toggleBall.style.transform = "translateX(24px)";
    htmlElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    toggleBall.style.transform = "translateX(0)";
    htmlElement.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
}

//Keeps user's theme preferences
const themePreferences = localStorage.getItem("darkMode");
if (themePreferences === "true") {
  htmlElement.classList.add("dark");
  toggleBall.style.transform = "translateX(24px)";
} else {
  htmlElement.classList.remove("dark");
  toggleBall.style.transform = "translateX(0)";
}

//BUDGET

addEventListeners();

//Prevents screen flickering
function addEventListeners() {
  form.addEventListener("submit", addExpenses);
}

//Inputs budget and expenses
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.remaining = Number(budget);
    this.expenses = [];
  }

  newExpense(expense) {
    this.expenses = [...this.expenses, expense];
    this.calculateRemaining();
  }

  updateBudget(newBudget) {
    this.budget = Number(newBudget);
    this.calculateRemaining();
  }

  calculateRemaining() {
    const spent = this.expenses.reduce(
      (total, expense) => total + expense.expenseAmount,
      0
    );

    this.remaining = this.budget - spent;
  }

  removeExpense(id) {
    this.expenses = this.expenses.filter(
      (expense) => expense.id.toString() !== id
    );
    this.calculateRemaining;
  }
}

//Changes number to currency
let currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//Creates HTML and UI
class UI {
  insertBudget(amount) {
    const { budget, remaining } = amount;

    remainingText.textContent = currency.format(remaining);
  }

  errorAlert(message, type) {
    const alertDiv = document.createElement("p");
    alertDiv.classList.add(
      "fontfamily-primary",
      "p-sm",
      "col-span-2",
      "mb-auto",
      "rounded-md",
      "text-center"
    );

    if (type === "error") {
      alertDiv.classList.add(
        "text-errorLtTwo",
        "bg-errorLtOne",
        "dark:text-errorDkTwo",
        "dark:bg-errorDkOne"
      );
    } else {
      alertDiv.classList.add("border", "border-accent");
    }

    alertDiv.textContent = message;

    document.getElementById("budget-form").insertBefore(alertDiv, buttonForm);

    setTimeout(() => {
      alertDiv.remove();
    }, 2000);
  }

  itemExpense(expenses) {
    this.cleanHTML();

    expenses.forEach((expense) => {
      const { expenseAmount, expenseTitle, id } = expense;

      const itemDiv = document.createElement("div");
      itemDiv.className = "flex items-center gap-sm";

      itemDiv.innerHTML = `
          <p class="fontfamily-primary text-600 dark:text-darktext">
            <b>${expenseTitle}:</b> ${currency.format(expenseAmount)}
          </p>
    `;
      itemDiv.dataset.id = id;

      //Removes item

      const removeButton = document.createElement("button");
      removeButton.innerHTML = `
      <img
        class="ease-in-out hover:opacity-50 cursor-pointer"
        src="/src/img/close-fill.svg"
      />
    `;
      removeButton.onclick = () => {
        deleteExpense(id);
      };
      itemDiv.prepend(removeButton);

      expensesList.appendChild(itemDiv);
    });
  }

  cleanHTML() {
    while (expensesList.firstChild) {
      expensesList.removeChild(expensesList.firstChild);
    }
  }

  getRemaining(remaining) {
    remainingText.textContent = currency.format(remaining);
  }

  //Creates warning after exceed amount

  budgetWarnings(budgetObj) {
    const { budget, remaining } = budgetObj;
    const remainingAmount = remainingText.classList;

    if (!budget) {
      budgetInput.classList.add("animate-bounce");
    } else {
      budgetInput.classList.remove("animate-bounce");
    }

    if (budget / 4 > remaining) {
      remainingAmount.remove("text-accent", "dark:text-accent");
      remainingAmount.add("text-warningText", "dark:text-warningText");
    } else if (budget / 2 > remaining) {
      remainingAmount.remove("text-accent", "dark:text-accent");
      remainingAmount.remove("text-warningText", "dark:text-warningText");
      remainingAmount.add("text-primarystrong");
    } else {
      remainingAmount.remove(
        "text-warningText",
        "dark:text-warningText",
        "text-primarystrong"
      );
      remainingAmount.add("text-accent", "dark:text-accent");
    }

    if (remaining <= 0) {
      buttonForm.disabled = true;
      expenseInput.disabled = true;
      amountInput.disabled = true;
      buttonForm.style.opacity = 0.5;
      expenseInput.style.opacity = 0.5;
      amountInput.style.opacity = 0.5;
      ui.errorAlert("You exceeded the budget", "error");
    } else {
      buttonForm.disabled = false;
      expenseInput.disabled = false;
      amountInput.disabled = false;
      buttonForm.style.opacity = 1;
      expenseInput.style.opacity = 1;
      amountInput.style.opacity = 1;
    }
  }
}

let ui = new UI();

//ADDS INITIAL BUDGET

function setBudget() {
  let budgetAmount = budgetInput.value;
  const mainDiv = document.getElementById("main-container");

  if (!budget) {
    budget = new Budget(budgetAmount);
  } else {
    budget.updateBudget(budgetAmount);
    ui.insertBudget(budget);
    mainDiv.classList.remove("blur-sm");
    buttonForm.disabled = false;
    expenseInput.disabled = false;
    amountInput.disabled = false;
  }

  ui.budgetWarnings(budget);
}

//ADDS EXPENSES
function addExpenses(e) {
  e.preventDefault();

  //Validates form

  const expenseTitle = expenseInput.value;
  const expenseAmount = Number(amountInput.value);

  if (expenseTitle === "" || expenseAmount === "") {
    ui.errorAlert("Both fields must be filled", "error");
  } else if (expenseAmount <= 0 || isNaN(expenseAmount)) {
    ui.errorAlert("Invalid quantity. Positive numbers only", "error");
    return;
  }

  //Adds Item to list

  const expense = {
    expenseTitle,
    expenseAmount,
    id: expenseAmount + expenseTitle,
  };

  if (expenseTitle !== "" && expenseAmount !== "") {
    // ui.itemExpense(expense.expenseAmount, expense.expenseTitle, expense.id);
    budget.newExpense(expense);
    const { expenses } = budget;
    ui.itemExpense(expenses);
  }

  //Calculates remaining

  const { remaining, expenses } = budget;

  ui.getRemaining(remaining);

  ui.budgetWarnings(budget);

  form.reset();
}

//REMOVES EXPENSE

function deleteExpense(id) {
  budget.removeExpense(id);
  budget.calculateRemaining();

  const { expenses, remaining } = budget;
  ui.itemExpense(expenses);
  ui.getRemaining(remaining);
  ui.budgetWarnings(budget);
}
