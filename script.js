
  let currentIndex = 0;

  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  // Show current slide
  function showSlide(index) {

    // Remove active class from all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Add active class to current slide
    slides[index].classList.add("active");

    // Add active class to current dot
    dots[index].classList.add("active");
  }

  // Next slide automatically
  function nextSlide() {
    currentIndex++;

    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    showSlide(currentIndex);
  }

  // Manual dot click
  function currentSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
  }

  // Auto slide every 4 seconds
  setInterval(nextSlide, 3000);

  // Initialize first slide
  showSlide(currentIndex);

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

