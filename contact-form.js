const contactForm = document.querySelector(".contact-form");
const emailLink = document.querySelector('.contact-directory a[href^="mailto:"]');

if (contactForm && emailLink) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = new FormData(contactForm);
    const name = [fields.get("firstName"), fields.get("lastName")]
      .map((part) => part.trim())
      .join(" ");
    const email = fields.get("email");
    const message = fields.get("message").trim();
    const inHindi = document.documentElement.lang === "hi";
    const subject = inHindi ? `पोर्टफ़ोलियो के ज़रिए संदेश — ${name}` : `Portfolio inquiry — ${name}`;
    const body = `${message}\r\n\r\n${name}\r\n${email}`;

    window.location.href = `${emailLink.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  contactForm.closest(".contact-compose").hidden = false;
}
