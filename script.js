let clients = JSON.parse(localStorage.getItem("crmClients")) || [];

function saveData() {
  localStorage.setItem("crmClients", JSON.stringify(clients));
}

function showSection(section) {

  document.querySelectorAll(".section").forEach(item => {
    item.classList.add("hidden");
  });

  document.getElementById(section).classList.remove("hidden");

  const titles = {
    dashboard: "Dashboard",
    clients: "Clients",
    followups: "Follow-ups"
  };

  document.getElementById("pageTitle").textContent = titles[section];

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.remove("active");
  });

  if (section === "dashboard") {
    document.querySelectorAll(".nav-item")[0].classList.add("active");
  }

  if (section === "clients") {
    document.querySelectorAll(".nav-item")[1].classList.add("active");
  }

  if (section === "followups") {
    document.querySelectorAll(".nav-item")[2].classList.add("active");
  }

  updateDashboard();
  renderClients();
  renderFollowups();
}

function openClientModal() {
  document.getElementById("clientModal").classList.add("show");
}

function closeClientModal() {
  document.getElementById("clientModal").classList.remove("show");
  document.getElementById("clientForm").reset();
}

document.getElementById("clientForm").addEventListener("submit", function(e) {

  e.preventDefault();

  const client = {
    id: Date.now(),

    name: document.getElementById("clientName").value.trim(),

    business: document.getElementById("businessName").value.trim(),

    phone: document.getElementById("phone").value.trim(),

    email: document.getElementById("email").value.trim(),

    category: document.getElementById("category").value,

    status: document.getElementById("status").value,

    followupDate: document.getElementById("followupDate").value,

    followupTime: document.getElementById("followupTime").value,

    notes: document.getElementById("notes").value.trim(),

    createdAt: new Date().toISOString()
  };

  clients.unshift(client);

  saveData();

  closeClientModal();

  updateDashboard();

  renderClients();

  renderFollowups();

  alert("Client added successfully!");

});

function updateDashboard() {

  document.getElementById("totalClients").textContent = clients.length;

  const today = new Date().toISOString().split("T")[0];

  const todayCount = clients.filter(
    client => client.followupDate === today
  ).length;

  document.getElementById("todayFollowups").textContent = todayCount;

  document.getElementById("interestedClients").textContent =
    clients.filter(client => client.status === "Interested").length;

  document.getElementById("wonClients").textContent =
    clients.filter(client => client.status === "Won").length;

  renderRecentClients();
}

function renderRecentClients() {

  const container = document.getElementById("recentClients");

  if (clients.length === 0) {

    container.innerHTML = `
      <div class="empty">
        No clients yet. Add your first client.
      </div>
    `;

    return;
  }

  container.innerHTML = clients
    .slice(0, 5)
    .map(client => `
      <div class="followup-item">

        <div class="followup-info">

          <strong>${escapeHTML(client.name)}</strong>

          <span>
            ${escapeHTML(client.business || client.category)}
          </span>

        </div>

        <span class="badge">
          ${escapeHTML(client.status)}
        </span>

      </div>
    `)
    .join("");
}

function renderClients() {

  const tbody = document.getElementById("clientTable");

  const search =
    document.getElementById("searchInput")?.value
      .toLowerCase() || "";

  const status =
    document.getElementById("statusFilter")?.value || "all";

  const filtered = clients.filter(client => {

    const text = `
      ${client.name}
      ${client.business}
      ${client.phone}
      ${client.email}
    `.toLowerCase();

    const matchesSearch = text.includes(search);

    const matchesStatus =
      status === "all" || client.status === status;

    return matchesSearch && matchesStatus;

  });

  if (filtered.length === 0) {

    tbody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty">
            No clients found.
          </div>
        </td>
      </tr>
    `;

    return;
  }

  tbody.innerHTML = filtered.map(client => `

    <tr>

      <td>
        <div class="client-name">
          ${escapeHTML(client.name)}
        </div>

        <div class="client-email">
          ${escapeHTML(client.email || "")}
        </div>
      </td>

      <td>
        ${escapeHTML(client.business || "-")}
      </td>

      <td>
        ${escapeHTML(client.phone)}
      </td>

      <td>
        <span class="badge">
          ${escapeHTML(client.status)}
        </span>
      </td>

      <td>
        ${client.followupDate || "-"}
        ${client.followupTime || ""}
      </td>

      <td>

        <div class="actions">

          <button
            class="action-btn"
            title="Call"
            onclick="callClient('${escapeAttribute(client.phone)}')"
          >
            📞
          </button>

          <button
            class="action-btn"
            title="WhatsApp"
            onclick="whatsappClient('${escapeAttribute(client.phone)}')"
          >
            🟢
          </button>

          <button
            class="action-btn"
            title="Delete"
            onclick="deleteClient(${client.id})"
          >
            🗑️
          </button>

        </div>

      </td>

    </tr>

  `).join("");
}

function renderFollowups() {

  const container = document.getElementById("followupList");

  const followups = clients
    .filter(client => client.followupDate)
    .sort((a, b) =>
      a.followupDate.localeCompare(b.followupDate)
    );

  if (followups.length === 0) {

    container.innerHTML = `
      <div class="empty">
        No follow-ups scheduled.
      </div>
    `;

    return;
  }

  container.innerHTML = followups.map(client => `

    <div class="followup-item">

      <div class="followup-info">

        <strong>
          ${escapeHTML(client.name)}
        </strong>

        <span>
          ${escapeHTML(client.business || "-")}
        </span>

      </div>

      <div class="followup-date">

        ${client.followupDate}

        ${client.followupTime || ""}

      </div>

    </div>

  `).join("");
}

function callClient(phone) {

  const cleanPhone = phone.replace(/\D/g, "");

  window.location.href = `tel:${cleanPhone}`;
}

function whatsappClient(phone) {

  const cleanPhone = phone.replace(/\D/g, "");

  const message =
    "Namaste, main aapke business ke regarding baat karna chahta hoon.";

  const url =
    `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

function deleteClient(id) {

  const confirmed =
    confirm("Are you sure you want to delete this client?");

  if (!confirmed) return;

  clients = clients.filter(client => client.id !== id);

  saveData();

  updateDashboard();

  renderClients();

  renderFollowups();

}

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return String(value).replace(/'/g, "\\'");
}

updateDashboard();
renderClients();
renderFollowups();
