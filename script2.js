// Validation helper functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // Password must be at least 8 characters
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" };
  }
  // Must contain at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" };
  }
  // Must contain at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" };
  }
  // Must contain at least one number
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" };
  }
  // Must contain at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, message: "Password must contain at least one special character (!@#$%^&* etc.)" };
  }
  return { valid: true, message: "Password is valid" };
}

function validateName(name) {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return { valid: false, message: "Name cannot be empty" };
  }
  if (trimmedName.length < 2) {
    return { valid: false, message: "Name must be at least 2 characters long" };
  }
  if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
    return { valid: false, message: "Name can only contain letters, spaces, hyphens, and apostrophes" };
  }
  return { valid: true, message: "Name is valid" };
}

function register() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  // Validate name
  const nameValidation = validateName(name);
  if (!nameValidation.valid) {
    alert("❌ Name Error:\n" + nameValidation.message);
    return;
  }

  // Validate email
  if (!email.trim()) {
    alert("❌ Email Error:\nEmail cannot be empty");
    return;
  }
  if (!isValidEmail(email)) {
    alert("❌ Email Error:\nPlease enter a valid email address (e.g., user@example.com)");
    return;
  }

  // Validate password
  if (!password) {
    alert("❌ Password Error:\nPassword cannot be empty");
    return;
  }
  const passwordValidation = isValidPassword(password);
  if (!passwordValidation.valid) {
    alert("❌ Password Error:\n" + passwordValidation.message);
    return;
  }

  // Check if teacher already exists
  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
  const teacherExists = teachers.find(teacher => teacher.email === email);

  if (teacherExists) {
    alert("❌ Registration Error:\nTeacher with this email already exists");
    return;
  }

  // Register the teacher
  teachers.push({
    name: name.trim(),
    email: email.trim(),
    password
  });

  localStorage.setItem("teachers", JSON.stringify(teachers));
  alert("✅ Success:\nAccount created successfully!");
  
  // Redirect to login page
  window.location.href = "login.html";
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Validate email
  if (!email.trim()) {
    alert("❌ Login Error:\nEmail cannot be empty");
    return;
  }
  if (!isValidEmail(email)) {
    alert("❌ Login Error:\nPlease enter a valid email address");
    return;
  }

  // Validate password
  if (!password) {
    alert("❌ Login Error:\nPassword cannot be empty");
    return;
  }

  // Admin login check
  if (email === "admin@gmail.com" && password === "admin123") {
    localStorage.setItem("adminLoggedIn", "true");
    alert("✅ Success:\nAdmin login successful");
    window.location.href = "admin.html";
    return;
  }

  // Normal teacher login
  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
  const teacher = teachers.find(
    teacher =>
      teacher.email === email.trim() &&
      teacher.password === password
  );

  if (teacher) {
    localStorage.setItem("loggedInTeacher", JSON.stringify(teacher));
    alert("✅ Success:\nLogin successful");
    window.location.href = "dashboard.html";
  } else {
    alert("❌ Login Error:\nWrong email or password");
  }
}
