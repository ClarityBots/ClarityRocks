document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rockForm");
  const resultDiv = document.getElementById("result");
  const loader = document.getElementById("loader");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const rock = document.getElementById("rock").value;
    const role = document.getElementById("role").value;
    const includeMilestones = document.getElementById("includeMilestones").checked;

    resultDiv.innerHTML = "";
    loader.style.display = "block";

    try {
      const response = await fetch("/.netlify/functions/clarityrocks", {
        method: "POST",
        body: JSON.stringify({ rock, role, includeMilestones }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        resultDiv.innerHTML = `<pre>${data.message}</pre>`;
      } else {
        resultDiv.innerHTML = `<span style="color: red;">⚠️ Error: ${data.error}</span>`;
      }
    } catch (error) {
      resultDiv.innerHTML = `<span style="color: red;">⚠️ Error: ${error.message}</span>`;
    } finally {
      loader.style.display = "none";
    }
  });
});
