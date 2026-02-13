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

  fetch('http://localhost:5001/api/portfolio')  
  // fetch('https://akanshanairportfolio.onrender.com/api/portfolio')  
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
        const response = await fetch('http://localhost:5001/api/portfolio/contact', {
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
        }
      } catch (err) {
        console.error('Form submission error:', err);
        alert('Network error. Please check your connection.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }


  switchPage('about');
});