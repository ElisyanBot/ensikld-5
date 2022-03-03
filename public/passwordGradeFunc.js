const password = document.querySelector("#signUp-password");

password.addEventListener("keyup", () => {
  let passwordPoints = 0;
  const newPassword = passwordObj(password.value);

  newPassword.isCapital();
  newPassword.isNumber();
  newPassword.isSign();

  //negative points
  passwordPoints -= negativeForOnlyLowerCase(newPassword);

  //positiv points
  passwordPoints += password.value.length;
  passwordPoints += plusPointsForCapital(newPassword);
  passwordPoints += plusPointsForNumber(newPassword);
  passwordPoints += plusPointsForSign(newPassword);

  renderText(gradePassword(passwordPoints));

});


function renderText(gradeFunc){
  const gradeText = document.querySelector("#grade-text");
  gradeText.innerText = gradeFunc;

  if(gradeText.innerText == "very weak"){
    gradeText.style.color = "red"
  }
  if(gradeText.innerText == "weak"){
    gradeText.style.color = "orange"
  }
  if(gradeText.innerText == "medium"){
    gradeText.style.color = "#ebff33"
  }
  if(gradeText.innerText == "strong"){
    gradeText.style.color = "#7cc953"
  }
  if(gradeText.innerText == "very strong"){
    gradeText.style.color = "#29ff08"
  }
}

function gradePassword(points) {
  let grade = "";
  if (points < 6) grade = "very weak";
  if (points >= 6 && points < 10) grade = " weak";
  if (points >= 10 && points < 12) grade = "medium";
  if (points >= 12 && points < 15) grade = "strong";
  if (points >= 15) grade = "very strong";
  return grade;
}



// ===================== negative points =========================
function negativeForOnlyLowerCase(obj) {
  let points = 0;
  if (obj.hasCapital == false) points += 2;
  if (obj.hasNumber == false) points += 2;
  if (obj.hasSign == false) points += 2;
  return points;
}

// ===================== positive points =========================
function plusPointsForCapital(obj) {
  let points = 0;
  for (i = 0; i < obj.password.length; i++) {
    if (/[A-Z]/.test(obj.password[i])) {
      points += 1;
    }
  }
  return points;
}

function plusPointsForNumber(obj) {
  let points = 0;
  for (i = 0; i < obj.password.length; i++) {
    if (/[0-9]/.test(obj.password[i])) {
      points += 1;
    }
  }
  return points;
}

function plusPointsForSign(obj) {
  let points = 0;
  for (i = 0; i < obj.password.length; i++) {
    if (/[a-zA-Z0-9]/.test(obj.password[i]) === false) {
      points += 1;
    }
  }
  return points;
}

//================ password object ================;
function passwordObj(inputValue) {
  return {
    password: inputValue,
    hasCapital: false,
    hasNumber: false,
    hasSign: false,
    isCapital: function () {
      for (i = 0; i < this.password.length; i++) {
        if (/[A-Z]/.test(this.password[i])) {
          this.hasCapital = true;
        }
      }
    },
    isNumber: function () {
      for (i = 0; i < this.password.length; i++) {
        if (/[0-9]/.test(this.password[i])) {
          this.hasNumber = true;
        }
      }
    },
    isSign: function () {
      for (i = 0; i < this.password.length; i++) {
        if (/[a-zA-Z0-9]/.test(this.password[i]) === false) {
          this.hasSign = true;
        }
      }
    },
  };
}

/*
  - password lenth = 1 point per char
  - if character == character.toUpperCase() = 1 point
  - if character == number = 1 point
  - if !number or !letter = 1point
  
  - if capital letter != ture = - 2 points
  - if number != true = - 2 points

  < 6 = väldigt svagt
  6 point = svagt
  10 points = medium
  12 points = strong
  15 points = very strong
*/
