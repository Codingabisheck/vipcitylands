document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobileNav');
  const form = document.getElementById('enquiryForm');
  const msg = document.getElementById('successMsg');

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const original = button.innerHTML;
      button.disabled = true;
      button.innerHTML = 'Sending…';
      try {
        const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
        if (!response.ok) throw new Error('Submission failed');
        form.reset();
        msg.textContent = '✓ Thanks! Our team will contact you soon.';
        msg.style.color = '#0b5d3b';
      } catch (error) {
        msg.textContent = 'Please try again or contact us on WhatsApp.';
        msg.style.color = '#b42318';
      } finally {
        button.disabled = false;
        button.innerHTML = original;
      }
    });
  }
});
