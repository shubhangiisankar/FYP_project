const medicines = {
    1: {
        name: "Acetaminophen (Tylenol)",
        ingredients: "Acetaminophen, Povidone, Starch, Stearic acid, Hypromellose",
        manufacturer: "Johnson & Johnson",
        classification: "Analgesic, Antipyretic",
        sideEffects: ["Nausea", "Headache", "Rash", "Liver damage (with prolonged use)"]
    },
    2: {
        name: "Ibuprofen (Advil, Motrin)",
        ingredients: "Ibuprofen, Lactose, Corn starch, Croscarmellose sodium, Gelatin",
        manufacturer: "Pfizer Inc.",
        classification: "NSAID (Nonsteroidal anti-inflammatory drug)",
        sideEffects: ["Stomach pain", "Heartburn", "Dizziness", "Mild allergic reactions"]
    },
    3: {
        name: "Amoxicillin",
        ingredients: "Amoxicillin, Penicillin, Lactose, Magnesium stearate, Sodium starch glycolate",
        manufacturer: "GSK",
        classification: "Antibiotic (Penicillin)",
        sideEffects: ["Diarrhea", "Rash", "Nausea", "Severe allergic reaction (rare)"]
    },
    4: {
        name: "Lisinopril",
        ingredients: "Lisinopril, Calcium phosphate, Corn starch, Lactose, Magnesium stearate",
        manufacturer: "Merck & Co.",
        classification: "ACE inhibitor",
        sideEffects: ["Dry cough", "Dizziness", "Headache", "High potassium levels"]
    },
    5: {
        name: "Atorvastatin (Lipitor)",
        ingredients: "Atorvastatin calcium, Lactose monohydrate, Microcrystalline cellulose, Hydroxypropyl cellulose",
        manufacturer: "Pfizer Inc.",
        classification: "Statin (Lipid-lowering)",
        sideEffects: ["Muscle pain", "Joint pain", "Digestive problems", "Liver enzyme abnormalities"]
    },
    6: {
        name: "Metformin",
        ingredients: "Metformin hydrochloride, Povidone, Magnesium stearate, Hypromellose",
        manufacturer: "Bristol-Myers Squibb",
        classification: "Antidiabetic",
        sideEffects: ["Nausea", "Diarrhea", "Metallic taste", "Vitamin B12 deficiency"]
    },
    7: {
        name: "Levothyroxine (Synthroid)",
        ingredients: "Levothyroxine sodium, Lactose monohydrate, Corn starch, Gelatin, Croscarmellose sodium",
        manufacturer: "Abbott Laboratories",
        classification: "Thyroid hormone",
        sideEffects: ["Headache", "Insomnia", "Nervousness", "Heart palpitations"]
    }
};

const alternatives = {
    "Penicillin": ["Azithromycin", "Clarithromycin", "Doxycycline"],
    "Lactose": ["Acetaminophen (lactose-free formula)", "Naproxen (Aleve)", "Aspirin (Bayer)"],
    "Starch": ["Acetaminophen (starch-free formula)", "Celecoxib (Celebrex)"],
    "Gelatin": ["Ibuprofen (gelatin-free formula)", "Diclofenac"]
};

let currentUser = null;

const users = [
    {
        id: 1,
        username: "john_doe",
        email: "john.doe@example.com",
        password: "password123", // In production, passwords must be hashed
        created: "April 15, 2025",
        allergies: [
            { name: "Penicillin", severity: "Severe" },
            { name: "Lactose", severity: "Moderate" }
        ],
        history: [
            { medicine: "Ibuprofen (Advil, Motrin)", date: "April 22, 2025", result: "USE WITH CAUTION" },
            { medicine: "Acetaminophen (Tylenol)", date: "April 20, 2025", result: "SAFE TO USE" }
        ]
    }
];

        
        // DOM Elements
        const homeContent = document.getElementById("home-content");
        const loginContent = document.getElementById("login-content");
        const signupContent = document.getElementById("signup-content");
        const dashboardContent = document.getElementById("dashboard-content");
        const profileContent = document.getElementById("profile-content");
        const searchContent = document.getElementById("search-content");
        const historyContent = document.getElementById("history-content");
        const resultsContainer = document.getElementById("results-container");
        const alertContainer = document.getElementById("alert-container");
        
        // Navigation links
        const homeLink = document.getElementById("home-link");
        const dashboardLink = document.getElementById("dashboard-link");
        const searchLink = document.getElementById("search-link");
        const profileLink = document.getElementById("profile-link");
        const historyLink = document.getElementById("history-link");
        const logoutLink = document.getElementById("logout-link");
        const loginLink = document.getElementById("login-link");
        const signupLink = document.getElementById("signup-link");
        const loginItem = document.getElementById("login-item");
        const signupItem = document.getElementById("signup-item");
        
        // Helper functions
        function hideAllContent() {
            homeContent.style.display = "none";
            loginContent.style.display = "none";
            signupContent.style.display = "none";
            dashboardContent.style.display = "none";
            profileContent.style.display = "none";
            searchContent.style.display = "none";
            historyContent.style.display = "none";
        }
        
        function showAlert(message, type) {
            alertContainer.innerHTML = `
                <div class="alert alert-${type}">
                    ${message}
                </div>
            `;
            
            // Clear the alert after 5 seconds
            setTimeout(() => {
                alertContainer.innerHTML = "";
            }, 5000);
        }
        
        function updateAuthUI() {
            if (currentUser) {
                // Show authenticated UI
                dashboardLink.style.display = "block";
                searchLink.style.display = "block";
                profileLink.style.display = "block";
                historyLink.style.display = "block";
                logoutLink.style.display = "block";
                loginItem.style.display = "none";
                signupItem.style.display = "none";
                
                // Update user name in dashboard
                document.getElementById("user-name").textContent = currentUser.username;
                
                // Update profile information
                document.getElementById("profile-username").textContent = currentUser.username;
                document.getElementById("profile-email").textContent = currentUser.email;
                document.getElementById("profile-created").textContent = currentUser.created;
            } else {
                // Show non-authenticated UI
                dashboardLink.style.display = "none";
                searchLink.style.display = "none";
                profileLink.style.display = "none";
                historyLink.style.display = "none";
                logoutLink.style.display = "none";
                loginItem.style.display = "block";
                signupItem.style.display = "block";
            }
        }
        
        function loadDashboardAllergies() {
            const dashboardAllergenList = document.getElementById("dashboard-allergen-list");
            const noAllergies = document.getElementById("no-allergies");
            const dashboardAllergies = document.getElementById("dashboard-allergies");
            
            if (currentUser && currentUser.allergies.length > 0) {
                dashboardAllergenList.innerHTML = "";
                currentUser.allergies.forEach(allergy => {
                    dashboardAllergenList.innerHTML += `
                        <li class="allergen-item">
                            <span>${allergy.name}</span>
                            <span class="severity severity-${allergy.severity}">${allergy.severity}</span>
                        </li>
                    `;
                });
                dashboardAllergies.style.display = "block";
                noAllergies.style.display = "none";
            } else {
                dashboardAllergies.style.display = "none";
                noAllergies.style.display = "block";
            }
        }
        
        function loadRecentSearches() {
            const recentSearches = document.getElementById("recent-searches");
            const noSearches = document.getElementById("no-searches");
            const recentSearchesContainer = document.getElementById("recent-searches-container");
            
            if (currentUser && currentUser.history.length > 0) {
                recentSearches.innerHTML = "";
                // Show only the 3 most recent searches
                const recent = currentUser.history.slice(0, 3);
                recent.forEach(item => {
                    recentSearches.innerHTML += `
                        <tr>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">${item.medicine}</td>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">${item.date}</td>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">
                                <span class="badge ${item.result === 'SAFE TO USE' ? 'badge-success' : 
                                                     item.result === 'USE WITH CAUTION' ? 'badge-warning' : 'badge-danger'}">
                                    ${item.result}
                                </span>
                            </td>
                        </tr>
                    `;
                });
                recentSearchesContainer.style.display = "block";
                noSearches.style.display = "none";
            } else {
                recentSearchesContainer.style.display = "none";
                noSearches.style.display = "block";
            }
        }
        
        function loadProfileAllergies() {
            const allergyList = document.getElementById("allergy-list");
            const noAllergyList = document.getElementById("no-allergy-list");
            const allergyListContainer = document.getElementById("allergy-list-container");
            
            if (currentUser && currentUser.allergies.length > 0) {
                allergyList.innerHTML = "";
                currentUser.allergies.forEach((allergy, index) => {
                    allergyList.innerHTML += `
                        <li class="allergen-item">
                            <span>${allergy.name}</span>
                            <div>
                                <span class="severity severity-${allergy.severity}">${allergy.severity}</span>
                                <button class="btn btn-danger" style="padding: 3px 10px; margin-left: 10px;" 
                                 onclick="removeAllergy(${index})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>
                    `;
                });
                allergyListContainer.style.display = "block";
                noAllergyList.style.display = "none";
            } else {
                allergyListContainer.style.display = "none";
                noAllergyList.style.display = "block";
            }
        }
        
        function loadHistoryList() {
            const historyList = document.getElementById("history-list");
            const noHistory = document.getElementById("no-history");
            
            if (currentUser && currentUser.history.length > 0) {
                historyList.innerHTML = "";
                currentUser.history.forEach((item, index) => {
                    historyList.innerHTML += `
                        <tr>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">${item.medicine}</td>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">${item.date}</td>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">
                                <span class="badge ${item.result === 'SAFE TO USE' ? 'badge-success' : 
                                                     item.result === 'USE WITH CAUTION' ? 'badge-warning' : 'badge-danger'}">
                                    ${item.result}
                                </span>
                            </td>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #eee;">
                                <button class="btn btn-outline" style="padding: 5px 10px;" onclick="viewHistoryItem(${index})">
                                    <i class="fas fa-eye"></i> View
                                </button>
                                <button class="btn btn-danger" style="padding: 5px 10px;" onclick="removeHistoryItem(${index})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });
                historyList.parentElement.parentElement.style.display = "block";
                noHistory.style.display = "none";
            } else {
                historyList.parentElement.parentElement.style.display = "none";
                noHistory.style.display = "block";
            }
        }
        
        // Event handlers - Global scope functions
        window.removeAllergy = function(index) {
            if (currentUser) {
                currentUser.allergies.splice(index, 1);
                loadProfileAllergies();
                loadDashboardAllergies();
                showAlert("Allergy removed successfully", "success");
            }
        };
        
        window.removeHistoryItem = function(index) {
            if (currentUser) {
                currentUser.history.splice(index, 1);
                loadHistoryList();
                loadRecentSearches();
                showAlert("History item removed successfully", "success");
            }
        };
        
        window.viewHistoryItem = function(index) {
            if (currentUser) {
                const item = currentUser.history[index];
                // Find medicine details
                const medicineId = Object.keys(medicines).find(id => 
                    medicines[id].name === item.medicine
                );
                
                if (medicineId) {
                    displayMedicineResults(medicineId);
                    hideAllContent();
                    searchContent.style.display = "block";
                }
            }
        };
        
        // Function to analyze medicine against user allergies
        function analyzeMedicine(medicineId) {
            const medicine = medicines[medicineId];
            const result = {
                safe: true,
                warnings: [],
                danger: false,
                allergenMatches: []
            };
            
            // If user is not logged in or has no allergies
            if (!currentUser || currentUser.allergies.length === 0) {
                return result;
            }
            
            // Check each allergy against medicine ingredients
            currentUser.allergies.forEach(allergy => {
                if (medicine.ingredients.toLowerCase().includes(allergy.name.toLowerCase())) {
                    result.safe = false;
                    
                    if (allergy.severity === "Severe") {
                        result.danger = true;
                    }
                    
                    result.allergenMatches.push({
                        name: allergy.name,
                        severity: allergy.severity
                    });
                }
            });
            
            return result;
        }
        
        function getSaferAlternatives(medicineId, allergenMatches) {
            if (allergenMatches.length === 0) return [];
            
            const medicine = medicines[medicineId];
            let allPossibleAlternatives = [];
            
            // Gather alternatives for each matched allergen
            allergenMatches.forEach(match => {
                if (alternatives[match.name]) {
                    allPossibleAlternatives = [...allPossibleAlternatives, ...alternatives[match.name]];
                }
            });
            
            // Remove duplicates and filter out the current medicine
            return [...new Set(allPossibleAlternatives)].filter(alt => 
                alt.toLowerCase() !== medicine.name.toLowerCase()
            );
        }
        
        function displayMedicineResults(medicineId) {
            const medicine = medicines[medicineId];
            const analysis = analyzeMedicine(medicineId);
            
            // Set medicine details
            document.getElementById("result-medicine-name").textContent = medicine.name;
            document.getElementById("result-medicine-ingredients").textContent = medicine.ingredients;
            document.getElementById("medicine-manufacturer").textContent = medicine.manufacturer;
            document.getElementById("medicine-classification").textContent = medicine.classification;
            
            // Set side effects
            const sideEffectsList = document.getElementById("medicine-side-effects");
            sideEffectsList.innerHTML = "";
            medicine.sideEffects.forEach(effect => {
                sideEffectsList.innerHTML += `<li>${effect}</li>`;
            });
            
            // Set result status
            document.getElementById("result-safe").style.display = "none";
            document.getElementById("result-warning").style.display = "none";
            document.getElementById("result-danger").style.display = "none";
            document.getElementById("result-icon-safe").style.display = "none";
            document.getElementById("result-icon-warning").style.display = "none";
            document.getElementById("result-icon-danger").style.display = "none";
            
            if (analysis.safe) {
                document.getElementById("result-safe").style.display = "block";
                document.getElementById("result-icon-safe").style.display = "block";
                document.getElementById("no-alternatives").style.display = "block";
                document.getElementById("alternatives-list").style.display = "none";
            } else if (analysis.danger) {
                document.getElementById("result-danger").style.display = "block";
                document.getElementById("result-icon-danger").style.display = "block";
                document.getElementById("no-alternatives").style.display = "none";
                document.getElementById("alternatives-list").style.display = "block";
            } else {
                document.getElementById("result-warning").style.display = "block";
                document.getElementById("result-icon-warning").style.display = "block";
                document.getElementById("no-alternatives").style.display = "none";
                document.getElementById("alternatives-list").style.display = "block";
            }
            
            // Set allergen matches
            const allergenMatchesContainer = document.getElementById("allergen-matches-container");
            const allergenMatches = document.getElementById("allergen-matches");
            
            if (analysis.allergenMatches.length > 0) {
                allergenMatches.innerHTML = "";
                analysis.allergenMatches.forEach(match => {
                    allergenMatches.innerHTML += `
                        <li class="allergen-item">
                            <span>${match.name}</span>
                            <span class="severity severity-${match.severity}">${match.severity}</span>
                        </li>
                    `;
                });
                allergenMatchesContainer.style.display = "block";
                
                // Set safer alternatives
                const alternativesList = document.getElementById("alternatives");
                const saferAlternatives = getSaferAlternatives(medicineId, analysis.allergenMatches);
                
                if (saferAlternatives.length > 0) {
                    alternativesList.innerHTML = "";
                    saferAlternatives.forEach(alt => {
                        alternativesList.innerHTML += `<li>${alt}</li>`;
                    });
                } else {
                    alternativesList.innerHTML = "<li>No specific alternatives found. Please consult with a healthcare provider.</li>";
                }
            } else {
                allergenMatchesContainer.style.display = "none";
            }
            
            resultsContainer.style.display = "block";
        }
        
        // Navigation event handlers
        homeLink.addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            homeContent.style.display = "block";
        });
        
        dashboardLink.addEventListener("click", function(e) {
            e.preventDefault();
            if (!currentUser) {
                hideAllContent();
                loginContent.style.display = "block";
                showAlert("Please log in to access your dashboard", "info");
                return;
            }
            
            hideAllContent();
            dashboardContent.style.display = "block";
            loadDashboardAllergies();
            loadRecentSearches();
        });
        
        searchLink.addEventListener("click", function(e) {
            e.preventDefault();
            if (!currentUser) {
                hideAllContent();
                loginContent.style.display = "block";
                showAlert("Please log in to check medicine safety", "info");
                return;
            }
            
            hideAllContent();
            searchContent.style.display = "block";
            resultsContainer.style.display = "none";
        });
        
        profileLink.addEventListener("click", function(e) {
            e.preventDefault();
            if (!currentUser) {
                hideAllContent();
                loginContent.style.display = "block";
                showAlert("Please log in to access your profile", "info");
                return;
            }
            
            hideAllContent();
            profileContent.style.display = "block";
            loadProfileAllergies();
        });
        
        historyLink.addEventListener("click", function(e) {
            e.preventDefault();
            if (!currentUser) {
                hideAllContent();
                loginContent.style.display = "block";
                showAlert("Please log in to access your history", "info");
                return;
            }
            
            hideAllContent();
            historyContent.style.display = "block";
            loadHistoryList();
        });
        
        loginLink.addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            loginContent.style.display = "block";
        });
        
        signupLink.addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            signupContent.style.display = "block";
        });
        
        logoutLink.addEventListener("click", function(e) {
            e.preventDefault();
            currentUser = null;
            updateAuthUI();
            hideAllContent();
            homeContent.style.display = "block";
            showAlert("You have been logged out successfully", "success");
        });
        
        // More event handlers
        document.getElementById("hero-signup-btn").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            signupContent.style.display = "block";
        });
        
        document.getElementById("hero-login-btn").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            loginContent.style.display = "block";
        });
        
        document.getElementById("to-signup-link").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            signupContent.style.display = "block";
        });
        
        document.getElementById("to-login-link").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            loginContent.style.display = "block";
        });
        
        document.getElementById("quick-search").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            searchContent.style.display = "block";
            resultsContainer.style.display = "none";
        });
        
        document.getElementById("quick-profile").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            profileContent.style.display = "block";
            loadProfileAllergies();
        });
        
        document.getElementById("quick-history").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            historyContent.style.display = "block";
            loadHistoryList();
        });
        
        document.getElementById("manage-allergies-btn").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            profileContent.style.display = "block";
            loadProfileAllergies();
        });
        
        document.getElementById("add-allergies-btn").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            profileContent.style.display = "block";
            loadProfileAllergies();
        });
        
        document.getElementById("view-all-history").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            historyContent.style.display = "block";
            loadHistoryList();
        });
        
        document.getElementById("check-medicine-btn").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            searchContent.style.display = "block";
            resultsContainer.style.display = "none";
        });
        
        document.getElementById("history-check-medicine-btn").addEventListener("click", function(e) {
            e.preventDefault();
            hideAllContent();
            searchContent.style.display = "block";
            resultsContainer.style.display = "none";
        });
        
        document.getElementById("new-search").addEventListener("click", function(e) {
            e.preventDefault();
            resultsContainer.style.display = "none";
            document.getElementById("search-form").reset();
        });
        
        document.getElementById("save-result").addEventListener("click", function(e) {
            e.preventDefault();
            const medicineId = document.getElementById("medicine").value;
            const medicine = medicines[medicineId];
            const analysis = analyzeMedicine(medicineId);
            
            let result;
            if (analysis.safe) {
                result = "SAFE TO USE";
            } else if (analysis.danger) {
                result = "NOT RECOMMENDED";
            } else {
                result = "USE WITH CAUTION";
            }
            
            // Add to history
            const today = new Date();
            const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            
            if (currentUser) {
                // Add to the beginning of the array
                currentUser.history.unshift({
                    medicine: medicine.name,
                    date: dateString,
                    result: result
                });
                
                showAlert("Result saved to history", "success");
                loadRecentSearches();
            }
        });
        
        // Form submissions
        document.getElementById("login-form").addEventListener("submit", function(e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            
            // Find user
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                currentUser = user;
                updateAuthUI();
                hideAllContent();
                dashboardContent.style.display = "block";
                loadDashboardAllergies();
                loadRecentSearches();
                showAlert("Login successful. Welcome back!", "success");
            } else {
                showAlert("Invalid username or password", "danger");
            }
        });
        
        document.getElementById("signup-form").addEventListener("submit", function(e) {
            e.preventDefault();
            const username = document.getElementById("new-username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("new-password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            
            // Simple validation
            if (password !== confirmPassword) {
                showAlert("Passwords do not match", "danger");
                return;
            }
            
            // Check if username already exists
            if (users.some(u => u.username === username)) {
                showAlert("Username already exists", "danger");
                return;
            }
            
            // Create new user
            const today = new Date();
            const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            
            const newUser = {
                id: users.length + 1,
                username: username,
                email: email,
                password: password,
                created: dateString,
                allergies: [],
                history: []
            };
            
            users.push(newUser);
            currentUser = newUser;
            updateAuthUI();
            hideAllContent();
            profileContent.style.display = "block";
            loadProfileAllergies();
            showAlert("Account created successfully! Start by adding your allergies.", "success");
        });
        
        document.getElementById("add-allergy-form").addEventListener("submit", function(e) {
            e.preventDefault();
            const allergen = document.getElementById("allergen").value;
            const severity = document.getElementById("severity").value;
            
            if (!currentUser) return;
            
            // Check if allergy already exists
            if (currentUser.allergies.some(a => a.name.toLowerCase() === allergen.toLowerCase())) {
                showAlert("This allergen is already in your profile", "warning");
                return;
            }
            
            // Add allergy
            currentUser.allergies.push({
                name: allergen,
                severity: severity
            });
            
            // Reset form
            document.getElementById("add-allergy-form").reset();
            
            // Update UI
            loadProfileAllergies();
            showAlert("Allergy added successfully", "success");
        });
        
        document.getElementById("search-form").addEventListener("submit", function(e) {
            e.preventDefault();
            const medicineId = document.getElementById("medicine").value;
            
            if (!medicineId) {
                showAlert("Please select a medicine", "warning");
                return;
            }
            
            displayMedicineResults(medicineId);
        });
        
        // Tab functionality
        const tabs = document.querySelectorAll(".tab");
        tabs.forEach(tab => {
            tab.addEventListener("click", function() {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove("active"));
                // Add active class to clicked tab
                this.classList.add("active");
                
                // Hide all tab content
                const tabContents = document.querySelectorAll(".tab-content");
                tabContents.forEach(content => content.classList.remove("active"));
                
                // Show selected tab content
                const tabContentId = this.getAttribute("data-tab") + "-content";
                document.getElementById(tabContentId).classList.add("active");
            });
        });
        
        // Initialize the app
        function init() {
            updateAuthUI();
            hideAllContent();
            homeContent.style.display = "block";
        }
        
        init();