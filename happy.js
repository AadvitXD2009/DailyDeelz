// HAPPY HOURS
const happyContainer = document.getElementById("happy-container");
const happyTitle = document.getElementById("happy-title");

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const todayIndex = new Date().getDay();
const todayName = days[todayIndex];

happyTitle.textContent = `${todayName}'s Happy Hours`;

fetch("happyhours.json")
  .then(res => res.json())
  .then(data => {

    // Filter by today
    const todaysHappyHours = data.filter(d => 
      d.day.toLowerCase() === todayName.toLowerCase()
    );

    if (todaysHappyHours.length === 0) {
      happyContainer.innerHTML = "<p>No happy hour deals for today.</p>";
      return;
    }

    todaysHappyHours.forEach(deal => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="card-title">${deal.restaurant}</div>
        <div class="card-deal">${deal.title}</div>
        <ul class="card-extra">
            ${deal.details.map(item => `<li>${item}</li>`).join("")}
        </ul>
        <div class="card-address">${deal.address || ""}</div>

      `;

      happyContainer.appendChild(card);
    });
  });
