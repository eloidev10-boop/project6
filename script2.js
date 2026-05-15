function register() {

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  const teacherExists = teachers.find(
    teacher => teacher.email === email
  );

  if (teacherExists) {
    alert("Teacher already exists");
    return;
  }

  teachers.push({
    name,
    email,
    password
  });

  localStorage.setItem("teachers", JSON.stringify(teachers));

  alert("Account created successfully");
}

function login() {

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  const teacher = teachers.find(
    teacher =>
      teacher.email === email &&
      teacher.password === password
  );

  if (teacher) {

    localStorage.setItem("loggedInTeacher", JSON.stringify(teacher));

    alert("Login successful");

    window.location.href = "dashboard.html";

  } else {
    alert("Wrong email or password");
  }
}
function login() {

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // 🟪 1. ADMIN LOGIN CHECK (FIRST)
  if (email === "admin@gmail.com" && password === "admin123") {

    localStorage.setItem("adminLoggedIn", "true");

    alert("Admin login successful");

    window.location.href = "admin.html";

    return;
  }

  // 🟦 2. NORMAL TEACHER LOGIN
  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  const teacher = teachers.find(
    teacher =>
      teacher.email === email &&
      teacher.password === password
  );

  if (teacher) {

    localStorage.setItem(
      "loggedInTeacher",
      JSON.stringify(teacher)
    );

    alert("Login successful");

    window.location.href = "dashboard.html";

  } else {
    alert("Wrong email or password");
  }
}

