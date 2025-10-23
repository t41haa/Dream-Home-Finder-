const properties = [
            { id: 1, title: "Modern Apartment", location: "New York, NY", type: "Apartment", beds: 3, baths: 2, desc: "A beautiful family house in a prime location. Newly renovated with hardwood floors throughout. Spacious and sunlit interior.", price: 450000, img: "https://plus.unsplash.com/premium_photo-1674676471417-07f613528a94?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1145" },
            { id: 2, title: "Luxury Villa", location: "Miami, FL", type: "Villa", beds: 5, baths: 4, desc: "Experience luxury living in this stunning villa. Huge gardens, private pool, and elegant architecture.", price: 890000, img: "https://plus.unsplash.com/premium_photo-1674035036549-67b8ad6d0be3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1150" },
            { id: 3, title: "Cozy House", location: "Austin, TX", type: "House", beds: 4, baths: 3, desc: "Charming updated home with modern kitchen and beautiful outdoor area. Perfect for families.", price: 320000, img: "https://plus.unsplash.com/premium_photo-1661879475108-b4646f98170e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1123" },
            { id: 4, title: "Elegant Penthouse", location: "Chicago, IL", type: "Apartment", beds: 2, baths: 2, desc: "Stunning city views with open concept, premium finishings and a designer kitchen.", price: 610000, img: "https://plus.unsplash.com/premium_photo-1661963530409-d525da0eca0e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174" },
            { id: 5, title: "Countryside Cottage", location: "Nashville, TN", type: "House", beds: 3, baths: 2, desc: "Escape to peace in this charming cottage surrounded by greenery.", price: 270000, img: "https://plus.unsplash.com/premium_photo-1661962738261-56f195aa2476?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" },
            { id: 6, title: "Modern Loft", location: "San Francisco, CA", type: "Apartment", beds: 1, baths: 1, desc: "Contemporary loft in the heart of SF. Great amenities and a prime location.", price: 520000, img: "https://plus.unsplash.com/premium_photo-1746363361902-29227dc82bca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074" }
        ];

        let currentUserRole = null;
        let currentUserName = null;
        let pendingRole = null;

        function renderProperties(list = properties) {
            const grid = document.getElementById('propertiesGrid');
            grid.innerHTML = list.map(p => `
        <div class="property-card">
          <div class="property-image"><img src="${p.img}" alt="${p.title}" /></div>
          <div class="property-content">
            <div class="property-location">${p.location}</div>
            <div class="property-specs">
              <span>${p.beds} Beds ${p.baths} Baths</span>
            </div>
            <div class="property-price">$${p.price.toLocaleString()}/Month</div>
            <div class="property-title">${p.title}</div>
            <div class="property-desc">${p.desc}</div>
            <button class="btn-enquire" data-id="${p.id}">Enquire</button>
          </div>
        </div>
      `).join('');
            populateEnquiryDropdown(list);
        }

        function populateEnquiryDropdown(list = properties) {
            const sel = document.getElementById('enquireProp');
            sel.innerHTML = '<option value="">Select a property</option>' +
                list.map(p => `<option value="${p.id}">${p.title} - ${p.location}</option>`).join('');
        }

        renderProperties();

        // Search modal
        document.getElementById('searchIcon').addEventListener('click', () => {
            document.getElementById('searchModal').classList.add('active');
        });

        function closeSearchModal() {
            document.getElementById('searchModal').classList.remove('active');
        }

        document.getElementById('searchModal').addEventListener('click', (e) => {
            if (e.target.id === 'searchModal') closeSearchModal();
        });

        document.getElementById('searchBtn').addEventListener('click', () => {
            const loc = document.getElementById('searchLocation').value.trim().toLowerCase();
            const type = document.getElementById('searchType').value.trim().toLowerCase();
            const filtered = properties.filter(p =>
                (!loc || p.location.toLowerCase().includes(loc)) &&
                (!type || p.type.toLowerCase() === type)
            );
            renderProperties(filtered);
            closeSearchModal();
            document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
        });

        // Smooth scroll
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Login modal
        function openLoginModal() {
            document.getElementById('loginModal').classList.add('active');
            showRoleBtns();
        }

        function closeLoginModal() {
            document.getElementById('loginModal').classList.remove('active');
        }

        function showRoleBtns() {
            document.getElementById('loginNameBlock').style.display = 'none';
            document.getElementById('loginUser').style.display = 'inline-block';
            document.getElementById('loginAgent').style.display = 'inline-block';
        }

        function showNamePrompt(role) {
            pendingRole = role;
            document.getElementById('loginUser').style.display = 'none';
            document.getElementById('loginAgent').style.display = 'none';
            document.getElementById('loginNameBlock').style.display = 'block';
            document.getElementById('loginNameInput').focus();
        }

        document.getElementById('loginBtn').addEventListener('click', openLoginModal);
        document.getElementById('loginUser').addEventListener('click', () => showNamePrompt('user'));
        document.getElementById('loginAgent').addEventListener('click', () => showNamePrompt('agent'));

        document.getElementById('loginContinueBtn').addEventListener('click', () => {
            const name = document.getElementById('loginNameInput').value.trim();
            if (name.length < 2) {
                alert('Please enter a valid name');
                return;
            }
            currentUserRole = pendingRole;
            currentUserName = name;
            updateLoginUI();
            closeLoginModal();
            showWelcomeModal();
        });

        document.getElementById('loginNameInput').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') document.getElementById('loginContinueBtn').click();
        });

        function updateLoginUI() {
            document.getElementById('loginBtn').style.display = currentUserRole ? 'none' : 'flex';
            document.getElementById('logoutBtn').style.display = currentUserRole ? 'flex' : 'none';
            document.getElementById('listPropertyForm').classList.toggle('active', currentUserRole === 'agent');
        }

        document.getElementById('logoutBtn').addEventListener('click', () => {
            currentUserRole = null;
            currentUserName = null;
            updateLoginUI();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });


        function showWelcomeModal() {
            document.getElementById('welcomeModal').classList.add('active');
            document.getElementById('welcomeTitle').textContent = `Welcome ${currentUserName}!`;
            document.getElementById('welcomeMsg').textContent = currentUserRole === 'agent'
                ? 'You are logged in as an Agent. You can now list properties.'
                : 'You are logged in as a User. Browse and enquire about properties.';
        }

        function closeWelcomeModal() {
            document.getElementById('welcomeModal').classList.remove('active');
        }

        document.getElementById('welcomeCloseBtn').addEventListener('click', closeWelcomeModal);

        document.getElementById('listPropertyForm').addEventListener('submit', (e) => {
            e.preventDefault();
            if (currentUserRole !== 'agent') {
                alert('Only agents can list properties');
                return;
            }
            const newProp = {
                id: properties.length + 1,
                title: document.getElementById('propTitle').value.trim(),
                location: document.getElementById('propLocation').value.trim(),
                type: document.getElementById('propType').value,
                beds: parseInt(document.getElementById('propBeds').value),
                baths: parseInt(document.getElementById('propBaths').value),
                price: parseInt(document.getElementById('propPrice').value),
                desc: document.getElementById('propDesc').value.trim(),
                img: document.getElementById('propImage').value.trim()
            };
            properties.push(newProp);
            renderProperties();
            alert('Property listed successfully!');
            e.target.reset();
            document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
        });

        document.getElementById('propertiesGrid').addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-enquire')) {
                if (!currentUserRole) {
                    openLoginModal();
                    return;
                }
                document.getElementById('enquireProp').value = e.target.dataset.id;
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
        });

        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            if (!currentUserRole) {
                openLoginModal();
                return;
            }
            const propId = document.getElementById('enquireProp').value;
            const name = document.getElementById('userName').value.trim();
            if (!propId || !name) {
                alert('Please fill all fields');
                return;
            }
            const prop = properties.find(p => p.id == propId);
            alert(`Enquiry sent about "${prop.title}". We'll contact you soon!`);
            e.target.reset();
        });

        const scrollBtn = document.getElementById('scrollTopBtn');
        window.addEventListener('scroll', () => {
            scrollBtn.classList.toggle('show', window.scrollY > 300);
        });
        scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        document.getElementById('darkModeToggle').addEventListener('click', function () {
            document.body.classList.toggle('dark');
            this.innerHTML = document.body.classList.contains('dark') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });

        // Handle list property click from top header
        function handleListPropertyClick() {
            if (currentUserRole === 'agent') {
                // Already logged in as agent, scroll to form
                document.getElementById('listProperty').scrollIntoView({ behavior: 'smooth' });
            } else {
                // Open login modal and set pending action
                window.pendingAction = 'listProperty';
                openLoginModal();
                // Pre-select agent
                setTimeout(() => showNamePrompt('agent'), 100);
            }
        }

        // Update the login continue to handle pending action
        document.getElementById('loginContinueBtn').addEventListener('click', () => {
            const name = document.getElementById('loginNameInput').value.trim();
            if (name.length < 2) {
                alert('Please enter a valid name');
                return;
            }
            currentUserRole = pendingRole;
            currentUserName = name;
            updateLoginUI();
            closeLoginModal();
            showWelcomeModal();

            // If there's a pending action (from top header), execute it
            if (window.pendingAction === 'listProperty' && currentUserRole === 'agent') {
                setTimeout(() => {
                    document.getElementById('listProperty').scrollIntoView({ behavior: 'smooth' });
                    window.pendingAction = null;
                }, 500);
            }
        });
