const studentContainer = document.getElementById("student-container");

fetch("students.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            const card = document.createElement("div");
            card.className = "deal-card";

            card.innerHTML = `
                <div class="deal-title">${item.place}</div>
                <div class="deal-desc">${item.amount}</div>
                <div class="card-extra">${item.day}</div>
                <div class="card-address">${item.address || ""}</div>

            `;

            studentContainer.appendChild(card);
        });
    });
