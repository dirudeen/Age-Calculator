//variables
const birthDate = document.getElementById("date");
const dateErrMgs = document.querySelector(".validity.date");
const dateTitle = document.querySelector("[for='date']");
const birthMonth = document.getElementById("month");
const monthErrMgs = document.querySelector(".validity.month");
const monthTitle = document.querySelector('[for="month"]');
const birthYear = document.getElementById("year");
const yearErrMgs = document.querySelector(".validity.year");
const yearTitle = document.querySelector('[for="year"]');
const submitButton = document.querySelector("button");
const displayDays = document.querySelector("[data-days]");
const displayMonths = document.querySelector("[data-months]");
const displayYears = document.querySelector("[data-years]");

//Colors for Error messages
const errorColor = "hsl(0, 70%, 65%)";
const textDefaultColor = "hsl(0, 1%, 44%)";
const borderDefaultColor = "";

// Validation Flag variables
let datePassedValidation = false;
let monthPassedValidation = false;
let yearPassedValidation = false;
let isDateCorrect = false;

//validate birth date
function validateBirthDate() {
  dateErrMgs.textContent = "Must be a valid date";
  if (isNaN(birthDate.value) || birthDate.value > 31) {
    showErr(dateErrMgs, dateTitle, birthDate);
    datePassedValidation = false;
  } else if (birthDate.value === "") {
    dateErrMgs.textContent = "This field is required";
    showErr(dateErrMgs, dateTitle, birthDate);
    datePassedValidation = false;
  } else {
    hideErr(dateErrMgs, dateTitle, birthDate);
    datePassedValidation = true;
  }
}

//validate birth month
function valiedateMonth() {
  monthErrMgs.textContent = "Must be a valid month";
  if (isNaN(birthMonth.value) || birthMonth.value > 12) {
    showErr(monthErrMgs, monthTitle, birthMonth);
    monthPassedValidation = false;
  } else if (birthMonth.value === "") {
    monthErrMgs.textContent = "This field is required";
    showErr(monthErrMgs, monthTitle, birthMonth);
    monthPassedValidation = false;
  } else {
    hideErr(monthErrMgs, monthTitle, birthMonth);
    monthPassedValidation = true;
  }
}

//validate birth year
function valiedateYear() {
  yearErrMgs.textContent = "Must be in the past";
  const year = new Date().getFullYear();
  if (isNaN(birthYear.value) || birthYear.value > year) {
    showErr(yearErrMgs, yearTitle, birthYear);
    yearPassedValidation = false;
  } else if (birthYear.value === "") {
    yearErrMgs.textContent = "This field is required";
    showErr(yearErrMgs, yearTitle, birthYear);
    yearPassedValidation = false;
  } else {
    hideErr(yearErrMgs, yearTitle, birthYear);
    yearPassedValidation = true;
  }
}

// check if the date-of-birth is valid as a date
function checkDate() {
  const birthDaytimestamp = new Date(
    parseInt(birthYear.value),
    parseInt(birthMonth.value - 1),
    parseInt(birthDate.value)
  ).getTime();
  const validDayInMonth = new Date(
    parseInt(birthYear.value),
    parseInt(birthMonth.value),
    0
  ).getDate();
  if (birthDate.value > validDayInMonth || Date.now() < birthDaytimestamp) {
    showErr(dateErrMgs, dateTitle, birthDate);
    showErr(monthErrMgs, monthTitle, birthMonth);
    showErr(yearErrMgs, yearTitle, birthYear);
    isDateCorrect = false;
  } else {
    isDateCorrect = true;
  }
}

//show errorr messages
function showErr(elementErrMgs, titleElement, inputElement) {
  elementErrMgs.style.opacity = 1;
  titleElement.style.color = errorColor;
  inputElement.style.borderColor = errorColor;
}

//hide error messages
function hideErr(elementErrMgs, titleElement, inputElement) {
  elementErrMgs.style.opacity = 0;
  titleElement.style.color = textDefaultColor;
  inputElement.style.borderColor = borderDefaultColor;
}

function calculateAge() {
  // check if the date is valid
  checkDate();

  if (
    !(
      datePassedValidation &&
      monthPassedValidation &&
      yearPassedValidation &&
      isDateCorrect
    )
  ) {
    return; // don't calculate if the validation fails
  }

  // hide all error messages
  hideErr(dateErrMgs, dateTitle, birthDate);
  hideErr(monthErrMgs, monthTitle, birthMonth);
  hideErr(yearErrMgs, yearTitle, birthYear);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // calculating the yearsdiffs
  let yeardiffs = today.getFullYear() - parseInt(birthYear.value);
  let monthdiffs = currentMonth - parseInt(birthMonth.value);
  let daydiffs = currentDay - parseInt(birthDate.value);

  if (
    currentMonth < birthMonth.value ||
    (currentMonth === parseInt(birthMonth.value) &&
      currentDay < birthDate.value)
  ) {
    yeardiffs--;
    monthdiffs += 12;
  }

  if (daydiffs < 0) {
    const daysInPreviousMonth = new Date(
      today.getFullYear(),
      currentMonth - 1,
      0
    ).getDate();
    monthdiffs--;
    daydiffs += daysInPreviousMonth;
  }

  // animate the numbers from zero
  animateToNum(displayYears, yeardiffs);
  animateToNum(displayMonths, monthdiffs);
  animateToNum(displayDays, daydiffs);
}

function animateToNum(element, num) {
  let i = 0;
  const timeout = setInterval(() => {
    element.textContent = `${i}`;
    i++;
    if (i > num) {
      clearInterval(timeout);
    }
  }, 10);
}

// Event listeners
birthDate.addEventListener("input", validateBirthDate);
birthMonth.addEventListener("input", valiedateMonth);
birthYear.addEventListener("input", valiedateYear);
submitButton.addEventListener("click", calculateAge);
