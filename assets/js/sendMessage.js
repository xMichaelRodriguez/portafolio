document.addEventListener("DOMContentLoaded", function (event) {
  event.preventDefault();

  const btn = document.getElementById("btnSend");
  btn.addEventListener("click", () => {
    let user = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let body = document.getElementById("message").value;

    const data = {
      user,
      email,
      body,
    };

    const correoReg = /^[a-zA-Z0-9{3}+]+\S[a-zA-Z0-9]+\S@\S[a-zA-Z0-9_.-]+\.[a-zA-Z]+[^\s]$/;
    if (user !== "" && body !== "" && email !== "") {
      if (correoReg.test(email)) {
        Swal.fire({
          title: "Enviando...",
          text: "Por favor espera...",
          allowOutsideClick: false,
          allowEnterKey: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        console.log("enviando");

        fetch("https://contactosdf.herokuapp.com/contact/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((resp) => {
            Swal.fire({
              icon: resp.status,
              title: "Exito!",
              text: resp.message,
            }).then((result) => {
              if (result.isConfirmed) {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
              }
            });
          })
          .catch(console.warn);
      } else {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Upss...",
          text: "Correo invalido",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Upss...",
        text: "Rellana los campos",
      });
    }
  });
});
