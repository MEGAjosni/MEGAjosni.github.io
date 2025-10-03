document.addEventListener('DOMContentLoaded', () => {
  function renderOccupationSection(jsonPath, containerId) {
    const app = document.getElementById(containerId);
    if (!app) return;

    fetch(jsonPath)
      .then(response => response.json())
      .then(data => {
        data.forEach(obj => {
          const container = document.createElement('div');
          container.className = 'occupation-box';

          // Timestamp or period
          const periodText = obj.startTime && obj.endTime 
            ? `${obj.startTime} ➜ ${obj.endTime}`
            : obj.timestamp || null;
          if (periodText) {
            const period = document.createElement('span');
            period.className = 'occupation-year';
            period.textContent = periodText;
            container.appendChild(period);
          }

          // Title
          const title = document.createElement('strong');
          title.className = 'occupation-title';
          title.textContent = obj.title;
          container.appendChild(title);

          // Location and/or authors
          const location = document.createElement('span');
          location.className = 'occupation-location';
          location.textContent = obj.authors || obj.location || null;
          container.appendChild(location);

          // Description
          if (obj.description || obj.abstract) {
            const description = document.createElement('p');
            description.className = 'occupation-description';
            description.textContent = obj.description || obj.abstract;
            container.appendChild(description);
          }

          // links
          if (obj.logo) {
            const logolink = document.createElement('a');
            logolink.href = obj.link;
            logolink.target = '_blank';

            const logoDiv = document.createElement('div');
            logoDiv.className = 'occupation-logo';

            const logoImg = document.createElement('img');
            logoImg.src = obj.logo;
            logoImg.alt = obj.location + ' Logo';

            logoDiv.appendChild(logoImg);
            logolink.appendChild(logoDiv);
            container.appendChild(logolink);
          }

          
          if (obj.links && obj.links.length) {
            const linksDiv = document.createElement('div');
            linksDiv.className = 'pub-links';

            obj.links.forEach(linkObj => {
              const link = document.createElement('a');
              link.href = linkObj.link;
              link.target = '_blank';

              if (linkObj.type.toLowerCase() === 'pdf') {
                link.textContent = 'Read';
              } else if (linkObj.logo) {
                const logoImg = document.createElement('img');
                logoImg.src = linkObj.logo;
                logoImg.alt = linkObj.type;
                if (linkObj.style) {
                  logoImg.style = linkObj.style;
                }
                link.appendChild(logoImg);
              } else {
                link.textContent = linkObj.type;
              }

              linksDiv.appendChild(link);
            });

            container.appendChild(linksDiv);

          }

          app.appendChild(container);
        });
      })
      .catch(error => console.error(`Error loading ${jsonPath}:`, error));
  }

  function renderSkillSection(jsonPath, containerId, isCertification = false) {
    const app = document.getElementById(containerId);
    if (!app) return;

    fetch(jsonPath)
      .then(response => response.json())
      .then(data => {
        data.forEach(obj => {
          const container = document.createElement('a');
          container.className = 'skill-item';
          container.target = '_blank';
          container.href = obj.link;

          // Logo
          const logoContainer = document.createElement('div');
          logoContainer.className = 'logo-container';
          container.appendChild(logoContainer);

          const logo = document.createElement('img');
          logo.src = obj.logo || obj.badge || null;
          logo.className = isCertification ? 'certificate' : 'skill-logo';
          logoContainer.appendChild(logo);
          if (obj.brandLogo) {
            const brandLogo = document.createElement('img');
            brandLogo.className = 'brand-logo';
            brandLogo.src = obj.brandLogo;
            logoContainer.appendChild(brandLogo);
          }

          // Name
          const name = document.createElement('strong');
          name.textContent = obj.name || null;
          container.appendChild(name);

          // Organization
          const organization = document.createElement('span');
          organization.textContent = obj.issuer || obj.proficiency || null;
          organization.className = 'skill-item-tagline';
          container.appendChild(organization);
          
          app.appendChild(container);
        });
      })
      .catch(error => console.error(`Error loading ${jsonPath}:`, error));
  }


  // Call the function for different sections
  renderOccupationSection('data/work-experience.json', 'work-container');
  renderOccupationSection('data/education.json', 'education-container');
  renderOccupationSection('data/publications.json', 'publications-container');
  renderSkillSection('data/certifications.json', 'certification-container', true);
  renderSkillSection('data/frameworks.json', 'framework-container');
  renderSkillSection('data/programming-languages.json', 'programming-languages-container');
});