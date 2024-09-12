// Get form, output, and theme toggle button elements
var form = document.getElementById("resumeForm");
var output = document.getElementById("resumeOutput");
var toggle = document.getElementById("themeToggle");
function Resume(data) {
    var skillsList = data.skills.split(',').map(function (skill) { return "<li contenteditable=\"true\">".concat(skill.trim(), "</li>"); }).join('');
    var resumeTemplate = "\n    <section class=\"resume-header\" contenteditable=\"true\">\n      <h1>".concat(data.name, "</h1>\n      <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n      <p><strong>Email:</strong> ").concat(data.email, "</p>\n      <p><strong>Address:</strong> ").concat(data.address, "</p>\n    </section>\n\n    <section class=\"resume-section\">\n      <h2>Skills</h2>\n      <ul>").concat(skillsList, "\n</ul>\n    </section>\n\n    <section class=\"resume-section\" contenteditable=\"true\">\n      <h2>Education</h2>\n      <p>").concat(data.education, "</p>\n    </section>\n\n    <section class=\"resume-section\" contenteditable=\"true\">\n      <h2>Experience</h2>\n      <p>").concat(data.experience, "</p>\n    </section>\n  ");
    if (data.imageUrl) {
        resumeTemplate = "\n      <section class=\"resume-header\">\n        <img src=\"".concat(data.imageUrl, "\" alt=\"Profile Image\" style=\"width: 150px; height: 150px;\" />\n        ").concat(resumeTemplate, "\n      </section>\n    ");
    }
    // Render the resume in the output area
    if (output) {
        output.innerHTML = resumeTemplate;
    }
}
// Form submit event listener
if (form) {
    form.addEventListener("submit", function (event) {
        var _a, _b;
        event.preventDefault();
        var resumeData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            skills: document.getElementById("skills").value,
            education: document.getElementById("education").value,
            experience: document.getElementById("experience").value,
        };
        var profileImageFile = (_b = (_a = document.getElementById("profileImage")) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
        if (profileImageFile) {
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                resumeData.imageUrl = reader_1.result;
                Resume(resumeData);
            };
            reader_1.readAsDataURL(profileImageFile);
        }
        else {
            Resume(resumeData);
        }
    });
}
// Theme toggle functionality
if (toggle) {
    toggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
        var container = document.querySelector(".container");
        container.classList.toggle("dark-theme");
    });
}
