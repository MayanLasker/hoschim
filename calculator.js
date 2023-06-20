function calcWeeklyWorkingHours(
  startDate,
  dueDate,
  moneyNeeded,
  currentAmontMoney,
  moneyPerHour,
  moneyExpenses
) {
  let date1 = new Date(startDate).getTime();
  let date2 = new Date(dueDate).getTime();

  let difference_In_Time = date2 - date1;

  let numWeeksLeft = (difference_In_Time / (1000 * 3600 * 24 * 7)).toFixed(3);

  let weeklyHoursNeeded = Math.ceil(
    (moneyNeeded - currentAmontMoney + moneyExpenses * numWeeksLeft) /
      (moneyPerHour * numWeeksLeft)
  );
  return {
    numWeeksLeft,
    weeklyHoursNeeded,
  };
}
function CreateRecommendation(
  numWeeksLeft,
  moneyExpenses,
  moneyPerHour,
  wish,
  weeklyHoursNeeded,
  currentAmontMoney,
  moneyNeeded
) {
  let recommendArr = [];

  if (numWeeksLeft > 30) {
    recommendArr.push("התאריך ממש רחוק תכוון למועד קרוב יותר");
  }
  if (moneyPerHour <= 25 && weeklyHoursNeeded > 45) {
    recommendArr.push(
      "השכר שלך נמוך, כדי להשיג " +
        wish +
        " תדרוש יותר,או שתעבור לעבודה משתלמת יותר"
    );
  }
  if (weeklyHoursNeeded >= 45) {
    recommendArr.push(
      " הגזמת, השאיפה שלך לא הגיונית! כדי להגיע ל" +
        wish +
        " נסה תאריך רחוק יותר או יעד קטן יותר"
    );
  }
  if (weeklyHoursNeeded <= 1) {
    recommendArr.push("יש לך את היכולת לעבוד יותר שעות, נסה לשאוף גבוה יותר.");
  }
  if (weeklyHoursNeeded <= 45 && numWeeksLeft <= 30) {
    recommendArr.push("מעולה, אתה בדרך הנכונה בהצלחה בדרך להגשמת היעד.");
  }

  if (moneyExpenses > 300) {
    recommendArr.push("אתה מבזבז יותר מידי השתדל לחסוך כדי להגיע ל" + wish);
  }

  return recommendArr;
}
let _1 = document.getElementById(1);
let _2 = document.getElementById(2);
let _3 = document.getElementById(3);
let _4 = document.getElementById(4);
let _5 = document.getElementById(5);
let _6 = document.getElementById(6);

_1.innerHTML = "";
_2.innerHTML = "";
_3.innerHTML = "";
_4.innerHTML = "";
_5.innerHTML = "";
_6.innerHTML = "";

let results = document.getElementById("results");
results.style.display = "none";
let startDate = document.getElementById("firstdate");
let dueDate = document.getElementById("dueDate");
let moneyNeeded = document.getElementById("endgoal");
let currentAmontMoney = document.getElementById("currentAmontMoney");
let moneyPerHour = document.getElementById("moneyperhour");
let moneyExpenses = document.getElementById("moneyExpenses");
let wish = document.getElementById("goal");

let hourperweek = document.getElementById("hourperweek");
let btn = document.getElementById("btn");
let recommendation = document.getElementById("recommendation");
let loader = document.getElementById("loader");

btn.onclick = () => {
  if (
    new Date(startDate.value).getTime() <= new Date().setHours(0, 0) ||
    new Date(startDate.value).getTime() > new Date(dueDate.value).getTime() ||
    startDate.value == "" ||
    moneyNeeded.value == "" ||
    moneyPerHour.value == "" ||
    dueDate.value == "" ||
    currentAmontMoney.value == "" ||
    moneyExpenses.value == ""
  ) {
    _1.innerHTML = "יש לבחור תאריך מאוחר מהתאריך העכשווי";
  }
  if (new Date(startDate.value).getTime() > new Date(dueDate.value).getTime()) {
    _4.innerHTML = "יש לבחור תאריך מאוחר מהתאריך ההתחלתי";
  }
  if (startDate.value == "") {
    _1.innerHTML = "*שדה זה הינו חובה";
  }
  if (moneyNeeded.value == "") {
    _2.innerHTML = "*שדה זה הינו חובה";
  }
  if (moneyPerHour.value == "") {
    _3.innerHTML = "*שדה זה הינו חובה";
  }
  if (dueDate.value == "") {
    _4.innerHTML = "*שדה זה הינו חובה";
  }
  if (currentAmontMoney.value == "") {
    _5.innerHTML = "*שדה זה הינו חובה";
  }
  if (moneyExpenses.value == "") {
    _6.innerHTML = "*שדה זה הינו חובה";
  } else {
    _1.innerHTML = "";
    _2.innerHTML = "";
    _3.innerHTML = "";
    _4.innerHTML = "";
    _5.innerHTML = "";
    _6.innerHTML = "";

    let result = calcWeeklyWorkingHours(
      startDate.value,
      dueDate.value,
      moneyNeeded.value,
      currentAmontMoney.value,
      moneyPerHour.value,
      moneyExpenses.value
    );
    console.log(result);
    let result2 = CreateRecommendation(
      result.numWeeksLeft,
      moneyExpenses.value,
      moneyPerHour.value,
      wish.value,
      result.weeklyHoursNeeded,
      currentAmontMoney.value,
      moneyNeeded.value
    );
    console.log(result2);

    results.style.display = "block";
    btn.style.display = "none";
    hourperweek.style.display = "none";
    recommendation.style.display = "none";
    let clock = document.getElementById("clock");
    let think = document.getElementById("think");
    clock.style.display = "none";
    think.style.display = "none";

    setTimeout(() => {
      loader.style.display = "none";
      hourperweek.style.display = "block";
      clock.style.display = "block";
      think.style.display = "block";
      hourperweek.innerHTML =
        "כדי להשיג ₪" +
        moneyNeeded.value +
        ", עליך לעבוד לפחות " +
        result.weeklyHoursNeeded +
        " שעות בשבוע";
      recommendation.style.display = "block";
    }, 3000);

    result2.map((x) => {
      let sentence = document.createElement("div");
      sentence.className = "recommendation";
      sentence.innerHTML = "💡" + x;
      recommendation.appendChild(sentence);
    });
    console.log(wish.value);
  }
  console.log(new Date().setHours(0, 0));
  console.log(new Date(startDate.value).getTime());
};

let push = document.getElementById("btn1");

let number = document.getElementById("age");

let minwage = document.getElementById("minwage");
minwage.style.display = "none";
push.onclick = () => {
  minwage.style.display = "block";
  minwage.innerHTML = "שכר המינימום לפי גילך הוא: " + age(number.value);
};

function age(age) {
  if (age <= 16) {
    return "22.54₪";
  } else if (age <= 17) {
    return "24.15₪";
  } else if (age < 18) {
    return "26.73₪";
  } else if (age >= 18) {
    return "30.61₪";
  }
}

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btnModal = document.getElementById("min");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
modal.style.display = "none";

// When the user clicks on the button, open the modal
btnModal.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
let refresh = document.getElementById("refresh");
refresh.onclick = () => {
  window.location.reload();
};
