document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn');


  function switchPage(pageId) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');


    document.querySelectorAll(`[data-page="${pageId}"]`).forEach(btn => {
      btn.classList.add('active');
    });
  }


  navLinks.forEach(btn => {
    btn.addEventListener('click', () => {
      const pageId = btn.getAttribute('data-page');
      switchPage(pageId);
    });
  });

  
  fetch('https://naair-portfolio.onrender.com/api/portfolio')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      loader.classList.add('hidden');


      document.getElementById('name').textContent = data.name || 'Akanksha Nair';
      document.getElementById('title').textContent = data.title || 'BCA Student';

      document.getElementById('linkedin').href = data.socials?.linkedin || '#';
      document.getElementById('github').href = data.socials?.github || '#';
      document.getElementById('instagram').href = data.socials?.instagram || '#';


      const aboutTextEl = document.getElementById('about-text');
      if (aboutTextEl) {
        aboutTextEl.innerHTML = `
          <p>${data.about || ''}</p>
          ${data.objective ? `<p><strong>Career Objective:</strong> ${data.objective}</p>` : ''}
        `;
      }


      const educationList = document.getElementById('education-list');
      if (educationList && data.education?.length) {
        educationList.innerHTML = data.education.map(edu => `
          <div class="timeline-item">
            <h4>${edu.institution}</h4>
            <span class="year">${edu.years}</span>
            <p>${edu.degree}</p>
          </div>
        `).join('');
      }


      const skillsList = document.getElementById('skills-list');
      if (skillsList && data.skills?.length) {
        skillsList.innerHTML = data.skills.map(skill => `
          <span class="chip">${skill}</span>
        `).join('');
      }


      const projectsList = document.getElementById('projects-list');
      if (projectsList && data.projects?.length) {
        projectsList.innerHTML = data.projects.map(proj => `
          <div class="timeline-item">
            <h4>${proj.title}</h4>
            <p>${proj.description || ''}</p>
          </div>
        `).join('');
      }


      const strengthsList = document.getElementById('strengths-list');
      if (strengthsList && data.strengths?.length) {
        strengthsList.innerHTML = data.strengths.map(str => `
          <span class="chip">${str}</span>
        `).join('');
      }


      const interestsList = document.getElementById('interests-list');
      if (interestsList && data.interests?.length) {
        interestsList.innerHTML = data.interests.map(int => `
          <span class="chip">${int}</span>
        `).join('');
      }


      const personalList = document.getElementById('personal-list');
      if (personalList && data.personal) {
        personalList.innerHTML = `
          <div><strong>Name:</strong> ${data.personal.name || ''}</div>
          <div><strong>Nationality:</strong> ${data.personal.nationality || ''}</div>
          <div><strong>Languages Known:</strong> ${data.personal.languages || ''}</div>
        `;
      }
    })
    .catch(err => {
      console.error('Error fetching portfolio data:', err);
      loader.innerHTML = '<p style="color: #ef4444;">Failed to load data. Please try again later.</p>';
    });


  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.btn.primary');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      const formData = new FormData(form);
      const payload = {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      try {
        const response = await fetch('https://naair-portfolio.onrender.com/api/portfolio/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message || 'Message sent successfully!');
          form.reset();
        } else {
          alert(result.message || 'Failed to send message. Please try again.');
        }Get in TouchGet in Touch


      } catch (err) {
        console.error('Form submission error:', err);
        // alert('Network error. Please check your connection.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  switchPage('about');
});


// FORM MEssage
// ────────────────────────────────────────────────
// Admin Messages Feature (hardcoded password)
// ────────────────────────────────────────────────
const ADMIN_PASSWORD = 'akanksha123'; // ← Change this to whatever you want (hardcoded)

const showMessagesBtn = document.getElementById('show-messages-btn');
const passwordForm = document.getElementById('admin-password-form');
const submitPasswordBtn = document.getElementById('submit-password-btn');
const messagesContainer = document.getElementById('messages-container');
const messagesList = document.getElementById('messages-list');

if (showMessagesBtn) {
  showMessagesBtn.addEventListener('click', () => {
    passwordForm.style.display = passwordForm.style.display === 'none' ? 'block' : 'none';
    messagesList.style.display = 'none'; // hide messages if reopening
  });

  submitPasswordBtn.addEventListener('click', async () => {
    const enteredPass = document.getElementById('admin-password').value.trim();

    if (enteredPass === ADMIN_PASSWORD) {
      // Password correct → fetch messages
      passwordForm.style.display = 'none';
      messagesList.style.display = 'block';
      messagesContainer.innerHTML = '<p style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> Loading messages...</p>';

      try {
        const res = await fetch('https://naair-portfolio.onrender.com/api/portfolio/contact'); // ← change to production URL later
        if (!res.ok) throw new Error('Failed to fetch messages');

        const messages = await res.json();

        if (messages.length === 0) {
          messagesContainer.innerHTML = '<p style="text-align:center; color:#64748b;">No messages yet.</p>';
          return;
        }

        messagesContainer.innerHTML = messages.map(msg => `
          <div class="message-item">
            <strong>${msg.fullname || 'Anonymous'}</strong> 
            <small>(${msg.email || 'No email'})</small>
            <p style="margin: 0.75rem 0;">${msg.message || ''}</p>
            <small>${new Date(msg.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small>
          </div>
        `).join('');
      } catch (err) {
        console.error('Error fetching messages:', err);
        messagesContainer.innerHTML = '<p style="color:#ef4444; text-align:center;">Failed to load messages. Try again.</p>';
      }
    } else {
      alert('Incorrect password!');
      document.getElementById('admin-password').value = '';
    }
  });
}