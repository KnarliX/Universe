// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// Modal Functions
function openModal() {
  document.getElementById('coming-soon').style.display = 'flex';
}

function closeModal() {
  document.getElementById('coming-soon').style.display = 'none';
}

function openForm() {
  document.getElementById('contact-form').style.display = 'flex';
}

function closeForm() {
  document.getElementById('contact-form').style.display = 'none';
}

// Function to show custom alert
function showAlert(message, isError = false) {
  document.getElementById('alert-message').textContent = message;
  document.getElementById('loading').style.display = 'none'; // Hide loading text
  document.getElementById('custom-alert').style.display = 'flex'; // Show alert
  if (isError) {
    document.getElementById('custom-alert').classList.add('error-alert');
  } else {
    document.getElementById('custom-alert').classList.remove('error-alert');
  }
}

// Function to close custom alert
function closeAlert() {
  document.getElementById('custom-alert').style.display = 'none'; // Hide alert
}

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission
  const name = document.getElementById('name').value.trim();
  const discordId = document.getElementById('discordId').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Check if at least one of Discord ID, Email, or Phone is filled
  if (!discordId && !email && !phone) {
    showAlert('Please fill at least one of the fields: Discord ID, Email, or Phone.', true);
    return;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailPattern.test(email)) {
    showAlert('Please enter a valid email address.', true);
    return;
  }

  // Check reCAPTCHA response
  const recaptchaResponse = grecaptcha.getResponse();
  console.log('reCAPTCHA Response:', recaptchaResponse); // Debugging line
  if (!recaptchaResponse) {
    showAlert('Please complete the reCAPTCHA.', true);
    return;
  }

  const webhookURL = 'https://discord.com/api/webhooks/1322216742222692373/WMGgLYR-Y5tzoTJVfxa9dRayPuP__1QlpoBjG5Gw-qjWhjEzvu69RxFItpn3S6HPWPs6'; // Replace with your actual backend endpoint
  const payload = JSON.stringify({
    content: `Name: ${name}\nDiscord ID: ${discordId || 'N/A'}\nEmail: ${email || 'N/A'}\nPhone: ${phone || 'N/A'}\nSubject: ${subject}\nMessage: ${message}`
  });

  // Show loading animation
  document.getElementById('loading').style.display = 'block'; // Show loading text

  fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    })
    .then(response => {
      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.text(); // Use text() instead of json() to handle non-JSON responses
    })
    .then(data => {
      console.log('Success:', data); // Log success response
      showAlert(' Your message has been sent!'); // Show success message
      closeForm(); // Close the form
      grecaptcha.reset(); // Reset reCAPTCHA
    })
    .catch((error) => {
      console.error('Webhook Error:', error);
      showAlert('Failed to send the message. Please try again later.', true); // Show error message
    });
});

// Particle Animation
const maxParticles = 100;
const particles = [];
document.addEventListener('mousemove', function(e) {
  if (particles.length > maxParticles) {
    particles.shift().remove(); // Remove the oldest particle if limit exceeded
  }
  const particle = document.createElement('div');
  particle.className = 'particle';
  const size = Math.random() * 10 + 5; // Random size between 5 and 15
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${e.pageX}px`;
  particle.style.top = `${e.pageY}px`;
  document.body.appendChild(particle);

  // Animation duration
  const duration = Math.random() * 1 + 0.5; // Random duration between 0.5 and 1.5 seconds
  particle.style.animationDuration = `${duration}s`;

  // Remove particle after animation
  particle.addEventListener('animationend', function() {
    particle.remove();
  });
});
