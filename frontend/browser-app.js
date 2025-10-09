const API_URL = "http://localhost:7000/api/v1/couriers";
const form = document.getElementById("courierForm");
const tableBody = document.getElementById("courierTableBody");

// Fetch and display all couriers
async function getCouriers() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();

    // Ensure we have an array to work with
    const couriersArray = Array.isArray(data.couriers) ? data.couriers : [];
    displayCouriers(couriersArray);

  } catch (error) {
    console.error("Error fetching couriers:", error);
    tableBody.innerHTML = `<tr><td colspan="7" style="color:red;">Failed to fetch couriers: ${error.message}</td></tr>`;
  }
}

// Display couriers in table
function displayCouriers(couriers) {
  tableBody.innerHTML = "";

  if (couriers.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7">No couriers found.</td></tr>`;
    return;
  }

  couriers.forEach(c => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.courierName}</td>
      <td>${c.packageId}</td>
      <td>${c.pickupLocation}</td>
      <td>${c.deliveryLocation}</td>
      <td>${c.deliveryStatus}</td>
      <td>${new Date(c.estimatedDelivery).toLocaleDateString()}</td>
      <td>
        <button class="update-btn" onclick="updateStatus('${c._id}')">Mark Delivered</button>
        <button class="delete-btn" onclick="deleteCourier('${c._id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add new courier
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const courier = {
    courierName: form.courierName.value,
    packageId: form.packageId.value,
    pickupLocation: form.pickupLocation.value,
    deliveryLocation: form.deliveryLocation.value,
    deliveryStatus: form.deliveryStatus.value,
    estimatedDelivery: form.estimatedDelivery.value
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courier)
    });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    form.reset();
    getCouriers();
  } catch (error) {
    console.error("Error adding courier:", error);
    alert(`Failed to add courier: ${error.message}`);
  }
});

// Delete courier
async function deleteCourier(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    getCouriers();
  } catch (error) {
    console.error("Error deleting courier:", error);
    alert(`Failed to delete courier: ${error.message}`);
  }
}

// Update courier status
async function updateStatus(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deliveryStatus: "Delivered" })
    });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    getCouriers();
  } catch (error) {
    console.error("Error updating status:", error);
    alert(`Failed to update status: ${error.message}`);
  }
}

// Initial fetch
getCouriers();
