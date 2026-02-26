async function analyze() {
  const feedback = document.getElementById("feedback").value;

  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ feedback }),
  });

  const data = await response.json();
  document.getElementById("output").innerText = data.result;
}
