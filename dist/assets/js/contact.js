var requestOptions = {
    method: "POST",
    body: JSON.stringify({
      name: "Welcome to ActionForms",
      email: "testemail@example.com"
    }),
    redirect: "follow",
    headers: {
      "Content-Type": "application/json"
    }
  };
  
  fetch("https://www.actionforms.io/e/r/simonsays", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log("error", error));
  