/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function sumarizeLengthJumps(jumpings: number[]): number {
  return jumpings.reduce((jumpDistanceSoFar, currentJump) => { return jumpDistanceSoFar + currentJump});
  ;
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

//Lyft över klass i egen fil
const STUDENT_NAME = "Sebastian";

function getSebastiansStudentStatus(student: Student): string {
  if (student.name === STUDENT_NAME && student.handedInOnTime) {
    student.passed = true;
  } else {
    student.passed = false;
  }

  return student.passed ? "VG" : "IG";
}

// function getStudentStatus(student: Student): string {
//     student.passed =    student.name == "Sebastian" ? student.handedInOnTime ? true : false : false;
//     if (student.passed) {
//         return "VG";
//     } else {
//         return "IG";
//     }}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

//Lyft över class i egen fil
const DAYS_IN_WEEK = 7;
const ONE_WEEK_IN_MS = 604800000;
const CITY_NAME = "Stockholm";

function getAverageWeeklyTemperature(temperatures: cityTempData[]) {
  let sumAverageTemperatures:number = 0; 
  for (let i = 0; i < temperatures.length; i++) {
    if (temperatures[i].city === CITY_NAME) {
      if(temperatures[i].date.getTime() > Date.now() - ONE_WEEK_IN_MS) {
        return sumAverageTemperatures = temperatures[i].temp;
      }
    }
  }
  calculateDailyAverageTemperature(sumAverageTemperatures);
}

  // return sumAverageTemperatures / DAYS_IN_WEEK;
function calculateDailyAverageTemperature (sumAverageTemperatures: number) {
  return sumAverageTemperatures / DAYS_IN_WEEK;
}
// }
// function averageWeeklyTemperature(heights: Temp[]) {
//   let r = 0;

//   for (let who = 0; who < heights.length; who++) {
//     if (heights[who].q === "Stockholm") {
//       if (heights[who].where.getTime() > Date.now() - 604800000) {
//         r += heights[who].v;
//       }
//     }
//   }

//   return r / 7;
// }

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */
//Lyft över parametrarna i en egen klass under models

// function showProduct(product: Product) {
//   let container = document.createElement("div");
//   let title = document.createElement("h4");
//   let price = document.createElement("strong"); //ändrat till engelska istället för pris
//   let imageTag = document.createElement("img");

//   title.innerHTML = product.name;
//   price.innerHTML = product.price.toString();
//   imageTag.src = product.image;

//   container.appendChild(title);
//   container.appendChild(imageTag);
//   container.appendChild(price);
//   product.parent.appendChild(container);
// }

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
function presentStudents(students: Student[]) {
  for (const student of students) {
    if (student.handedInOnTime) {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#passedstudents");
      listOfStudents?.appendChild(container);
    } else {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#failedstudents");
      listOfStudents?.appendChild(container);
    }
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

function concatenateStrings () {
  let texts: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return texts.join(" ");
  }

// function concatenateStrings() {
//   let result = "";
//   result += "Lorem";
//   result += "ipsum";
//   result += "dolor";
//   result += "sit";
//   result += "amet";

//   return result;
// }

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
function createUser(user: User
//flyttat till egen fil i models
) {
  // Validation

  let ageDiff = Date.now() - user.birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (!(userAge < 20)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
