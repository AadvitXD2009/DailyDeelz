// --------------------------------------------------------
// GLOBALS
// --------------------------------------------------------
const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const TODAY = DAYS[new Date().getDay()];

// --------------------------------------------------------
// HAPPY HOURS PAGE
// --------------------------------------------------------
const happyContainer = document.getElementById("happy-container");
const happyTitle = document.getElementById("happy-title");

if (happyContainer && happyTitle) {

  happyTitle.textContent = `${TODAY}'s Happy Hours`;

  fetch("happyhours.json")
    .then(r => r.json())
    .then(data => {

      const todays = data
        .filter(d =>
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
