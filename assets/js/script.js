'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
    if (modalContainer && overlay) {
        modalContainer.classList.toggle("active");
        overlay.classList.toggle("active");
    }
}

// add click event to all modal items
if (testimonialsItem && modalContainer && modalImg && modalTitle && modalText) {
    for (let i = 0; i < testimonialsItem.length; i++) {
        testimonialsItem[i].addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
        });
    }
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
if (selectItems && selectValue) {
    for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
    }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
    if (filterItems) {
        for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
        }
    }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

if (filterBtn) {
    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
        });
    }
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formInputs && formBtn) {
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener("input", function () {
        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
        });
    }
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
if (navigationLinks && pages) {
    for (let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].addEventListener("click", function () {
        for (let i = 0; i < pages.length; i++) {
            if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
            pages[i].classList.add("active");
            navigationLinks[i].classList.add("active");
            window.scrollTo(0, 0);
            } else {
            pages[i].classList.remove("active");
            navigationLinks[i].classList.remove("active");
            }
        }
        });
    }
}

function toggleCourses(element) {
    const timelineItem = element.closest('.timeline-item');
    const coursesList = timelineItem.querySelector('.courses-list');
    const iconContainer = element.closest('.icon-container'); // Get the closest icon-container
  
    // If it's currently closed, open it
    if (!coursesList.classList.contains('open')) {
      coursesList.style.display = 'grid'; // Ensure the list is a grid before measuring height
      requestAnimationFrame(() => {
        coursesList.style.maxHeight = "2000px"; // Set to the current scroll height
        coursesList.style.visibility = 'visible'; // Make the list visible
        coursesList.style.padding = '15px 20px 15px 20px'; // Add padding (top, right, bottom, left)
        coursesList.style.margin = '0'; // Reset margin when visible
        coursesList.classList.add('open'); // Add the open class for shadow
        iconContainer.classList.add('rotated'); // Rotate the icon
      });
    } else {
      // Collapse the list
      coursesList.style.maxHeight = coursesList.scrollHeight + "px"; // Set to the current height first
      requestAnimationFrame(() => {
        coursesList.style.maxHeight = '0'; // Animate to height 0
        coursesList.style.padding = '0 20px'; // Animate padding (top/bottom to 0, keep left/right)
        coursesList.style.margin = '0'; // Remove margin when hidden
      });
  
      coursesList.classList.remove('open'); // Remove open class for shadow
      iconContainer.classList.remove('rotated'); // Rotate the icon back
  
      // Set a timeout to change display after the animation is done
      setTimeout(() => {
        coursesList.style.display = 'none'; // Hide the list after the transition completes
        coursesList.style.visibility = 'hidden'; // Ensure the list is not visible
      }, 300); // This duration should match the CSS transition duration
    }
  }