const form = document.getElementById('enquiryForm');
const msg = document.getElementById('successMsg');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent normal submit

  // Disable submit button to prevent double submission
  submitBtn.disabled = true;

  fetch(form.action, {
    method: form.method,
    body: new FormData(form)
  })
  .then(response => {
    if(response.ok){
      form.reset(); // clear input fields
      msg.style.display = 'block';
      msg.style.color = 'green';
      msg.innerText = "✅ Thanks for your submission! Our team will contact you soon.";
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(() => {
    msg.style.display = 'block';
    msg.style.color = 'red';
    msg.innerText = "❌ Something went wrong. Please try again.";
  })
  .finally(() => {
    // Re-enable the submit button after 5 seconds
    setTimeout(() => {
      submitBtn.disabled = false;
      msg.style.display = 'none'; // hide message after 5 sec
    }, 5000);
  });
});

// Scroll functions
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

