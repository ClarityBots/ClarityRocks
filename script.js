document.getElementById("generate-button").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value.trim();
  const outputDiv = document.getElementById("output");

  if (!prompt) {
    outputDiv.innerHTML = `<p>Please enter a prompt to begin.</p>`;
    return;
  }

  outputDiv.innerHTML = `<p><em>Generating SMART Rock...</em></p>`;

  try {
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (data.error) {
      outputDiv.innerHTML = `<p class="error">❌ Error: ${data.error}</p>`;
      return;
    }

    const rock = data.result;
    outputDiv.innerHTML = `
      <div class="smart-section"><h3>Specific</h3><p>${rock.specific}</p></div>
      <div class="smart-section"><h3>Measurable</h3><p>${rock.measurable}</p></div>
      <div class="smart-section"><h3>Achievable</h3><p>${rock.achievable}</p></div>
      <div class="smart-section"><h3>Relevant</h3><p>${rock.relevant}</p></div>
      <div class="smart-section"><h3>Time-bound</h3><p>${rock.timeBound}</p></div>
      <div class="commitment"><strong>Commitment:</strong> ${rock.commitment}</div>
    `;
  } catch (error) {
    console.error("❌ Script error:", error);
    outputDiv.innerHTML = `<p class="error">Server error: ${error.message}</p>`;
  }
});
