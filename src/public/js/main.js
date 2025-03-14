const form = document.querySelector("form");
const mess = document.querySelector(".message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  mess.classList.remove("success", "error");
  mess.innerHTML = "";

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mess.classList.add("success");
      mess.innerHTML = "<p>Je bericht is succesvol verzonden!</p>";
      form.reset();
    } else {
      mess.classList.add("error");
      mess.innerHTML = `<p>Oeps, iet is kapoet! 💣💥</p>`;
    }
  } catch (error) {
    mess.classList.add("error");
    mess.innerHTML = `<p>Er is een fout opgetreden: ${error.message}</p>`;
  }
});
