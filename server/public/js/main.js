const loginForm = document.querySelector("#login");
const overlay = document.querySelector("#overlay");
const loginInput = document.querySelector("#username");
const inputField = document.querySelector("#input");
const form = document.querySelector("#form");
const cursor = document.querySelector("#cursor");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const user = await axios({
      method: "POST",
      url: "http://localhost:5000/api/users",
      data: {
        username: loginInput.value,
      },
    });

    if (user) {
      let socket = io("http://localhost:5000");

      socket.on("connect", () => {
        console.log("connected to server");
      });

      // ON FOCUS
      inputField.addEventListener("focus", () => {
        console.log("focus")
        socket.emit("disable input", { disabled: true });
      });

      socket.on("disable", (data) => {
        console.log(data);
        inputField.disabled = data.disabled;
      });

      // ON BLUR
      inputField.addEventListener("blur", () => {
        socket.emit("enable input", { disabled: false });
      });

      socket.on("enable", (data) => {
        console.log(data);
        inputField.disabled = data.disabled;
      });

      // ON TYPING

      inputField.addEventListener("input", (e) => {
        socket.emit("chat", { message: e.target.value });
      });

      socket.on("chat", (message) => {
        // document.querySelector("#messages").innerHTML += `<li>${message}</li>`;
        inputField.value = message;
      });

      // ON SUBMIT
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        document.querySelector(
          "#messages"
        ).innerHTML += `<li>${inputField.value}</li>`;

        const activity = inputField.value;

        socket.emit("send", activity);
      });

      socket.on("send", (data) => {
        document.querySelector("#messages").innerHTML += `<li>${data}</li>`;
      });

      // ON MOUSE MOVEMENT

      window.addEventListener("mousemove", (e) => {
        const postion = [e.pageX, e.pageY];
        cursor.style.visibility = "hidden";
        socket.emit("mouse moving", {
          postion,
          username: user.data.user.username,
        });
      });

      socket.on("mouse moving", (data) => {
        console.log(data);
        cursor.innerHTML = `${data.username}`;

        cursor.style.cssText = `visibility: visible; left: ${data.postion[0]}px; top: ${data.postion[1]}px`;
      });
    }
  } catch (error) {
    console.log(error);
  }

  overlay.style.display = "none";
});
