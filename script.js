const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// Fetch Codeforces Data
async function fetchCodeforcesData() {
  try {
    const handle = 'abdullahelshebrawy';
    const userInfoResponse = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    const userInfo = await userInfoResponse.json();

    if (userInfo.status === 'OK') {
      const user = userInfo.result[0];
      
      // Update DOM elements
      const ratingElement = document.querySelector('.rating');
      const rankElement = document.querySelector('.rank');
      
      ratingElement.textContent = user.rating || 'Unrated';
      document.querySelector('.max-rating').textContent = user.maxRating || 'Unrated';
      rankElement.textContent = user.rank || 'Unrated';
      
      // Add color classes based on rating
      const rating = user.rating || 0;
      let colorClass = 'cf-unrated';
      
      if (rating >= 2400) colorClass = 'cf-red';
      else if (rating >= 2100) colorClass = 'cf-orange';
      else if (rating >= 1900) colorClass = 'cf-violet';
      else if (rating >= 1600) colorClass = 'cf-blue';
      else if (rating >= 1400) colorClass = 'cf-cyan';
      else if (rating >= 1200) colorClass = 'cf-green';
      else if (rating > 0) colorClass = 'cf-gray';
      
      ratingElement.className = `rating ${colorClass}`;
      rankElement.className = `rank ${colorClass}`;
      
      // Fetch user's submissions
      const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
      const submissions = await submissionsResponse.json();
      
      if (submissions.status === 'OK') {
        // Count unique solved problems
        const solvedProblems = new Set(
          submissions.result
            .filter(sub => sub.verdict === 'OK')
            .map(sub => `${sub.problem.contestId}${sub.problem.index}`)
        );
        
        document.querySelector('.problems').textContent = solvedProblems.size;
      }
    }
  } catch (error) {
    console.error('Error fetching Codeforces data:', error);
  }
}

// Image Modal Functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.modal-close');

// Get all project images
document.querySelectorAll('.project-img').forEach(img => {
  img.addEventListener('click', () => {
    modal.classList.add('show');
    modalImg.src = img.src;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });
});

// Close modal when clicking the close button
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
  }
});

// Call the function when the page loads
fetchCodeforcesData();