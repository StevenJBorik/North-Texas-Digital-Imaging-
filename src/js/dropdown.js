const dropdowns = document.querySelectorAll('.dropdown-menu');

dropdowns.forEach((dropdown) => {
  const parentLink = dropdown.parentNode.querySelector('a');
  const childLinks = dropdown.querySelectorAll('a');
  
  parentLink.addEventListener('click', (event) => {
    event.preventDefault();
    toggleActiveLink(parentLink);
    toggleDropdown(dropdown);
  });
  
  childLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleActiveLink(parentLink);
      toggleDropdown(dropdown);
    });
  });
});

function toggleActiveLink(link) {
  link.classList.toggle('active');
}

function toggleDropdown(dropdown) {
  dropdown.classList.toggle('active');
}
