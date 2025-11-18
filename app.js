// --------------------------------------------------------
// GLOBALS
// --------------------------------------------------------
const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const TODAY = DAYS[new Date().getDay()];


// --------------------------------------------------------
// TAB SWITCHING (index.html only)
// --------------------------------------------------------
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const target = btn.dataset.tab;

    tabContents.forEach(sec => {
      sec.classList.remove("active");
      if (sec.id === target) sec.classList.add("active");
    });

  });
});


// --------------------------------------------------------
// FOOD DEALS
// --------------------------------------------------------
const foodContainer = document.getElementById("food-container");
const foodTitle = document.getElementById("day-title");

if (foodContainer && foodTitle) {

  foodTitle.textContent = `${TODAY}'s Food Deals`;

  fetch("deals.json?v=" + Date.now())
    .then(r => r.json())
    .then(data => {

      const todaysDeals = data.filter(d => d.day === TODAY)
      .sort((a, b) => a.restaurant.localeCompare(b.restaurant));

      if (todaysDeals.length === 0) {
        foodContainer.innerHTML = "<p>No food deals for today.</p>";
        return;
      }

      todaysDeals.forEach(d => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <div class="card-title">${d.restaurant}</div>
          <div class="card-deal">${d.deal} — <strong>${d.amount}</strong></div>
          <div class="card-extra">${d.time || ""}</div>
          <div class="card-address">${d.address || ""}</div>
        `;

        foodContainer.appendChild(card);
      });

    });
}



// --------------------------------------------------------
// HAPPY HOURS (today only + everyday)
// --------------------------------------------------------
const happyContainer = document.getElementById("happy-container");
const happyTitle = document.getElementById("happy-title");

if (happyContainer && happyTitle) {

  happyTitle.textContent = `${TODAY}'s Happy Hours`;

  fetch("happyhours.json")
    .then(r => r.json())
    .then(data => {

      const todays = data.filter(d =>
        d.day.toLowerCase() === TODAY.toLowerCase() ||
        d.day.toLowerCase() === "everyday"
      )
      .sort((a, b) => a.restaurant.localeCompare(b.restaurant));

      if (todays.length === 0) {
        happyContainer.innerHTML = "<p>No happy hour deals for today.</p>";
        return;
      }

      todays.forEach(d => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <div class="card-title">${d.restaurant}</div>
          <div class="card-deal">${d.title}</div>
          <ul class="card-extra">
            ${d.details.map(item => `<li>${item}</li>`).join("")}
          </ul>
          <div class="card-address">${d.address || ""}</div>
        `;

        happyContainer.appendChild(card);
      });

    });
}



// --------------------------------------------------------
// STUDENT DISCOUNTS
// --------------------------------------------------------
const studentContainer = document.getElementById("student-container");

if (studentContainer) {

  fetch("students.json")
    .then(r => r.json())
    .then(data => {

      data
      .sort((a, b) => a.place.localeCompare(b.place))
      .forEach(d => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <div class="card-title">${d.place}</div>
          <div class="card-deal">${d.discount}</div>
          <div class="card-extra">${d.day}</div>
          <div class="card-address">${d.address || ""}</div>
        `;

        studentContainer.appendChild(card);
      });

    });
}
