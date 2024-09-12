// Get form, output, and theme toggle button elements
const form = document.getElementById("resumeForm") as HTMLFormElement | null;
const output = document.getElementById("resumeOutput") as HTMLElement | null;
const toggle = document.getElementById("themeToggle") as HTMLButtonElement | null;

interface ResumeData {
  name: string;
  phone: string;
  email: string;
  address: string;
  skills: string;
  education: string;
  experience: string;
  imageUrl?: string;
}

function Resume(data: ResumeData) {
  let skillsList = data.skills.split(',').map((skill: string) => `<li contenteditable="true">${skill.trim()}</li>`).join('');

  let resumeTemplate = `
    <section class="resume-header" contenteditable="true">
      <h1>${data.name}</h1>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Address:</strong> ${data.address}</p>
    </section>

    <section class="resume-section">
      <h2>Skills</h2>
      <ul>${skillsList}\n</ul>
    </section>

    <section class="resume-section" contenteditable="true">
      <h2>Education</h2>
      <p>${data.education}</p>
    </section>

    <section class="resume-section" contenteditable="true">
      <h2>Experience</h2>
      <p>${data.experience}</p>
    </section>
  `;

  if (data.imageUrl) {
    resumeTemplate = `
      <section class="resume-header">
        <img src="${data.imageUrl}" alt="Profile Image" style="width: 150px; height: 150px;" />
        ${resumeTemplate}
      </section>
    `;
  }

  // Render the resume in the output area
  if (output) {
    output.innerHTML = resumeTemplate;
  }
}

// Form submit event listener
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const resumeData: ResumeData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      address: (document.getElementById("address") as HTMLTextAreaElement).value,
      skills: (document.getElementById("skills") as HTMLTextAreaElement).value,
      education: (document.getElementById("education") as HTMLTextAreaElement).value,
      experience: (document.getElementById("experience") as HTMLTextAreaElement).value,
    };

    const profileImageFile = (document.getElementById("profileImage") as HTMLInputElement)?.files?.[0];

    if (profileImageFile) {
      const reader = new FileReader();
      reader.onloadend = function () {
        resumeData.imageUrl = reader.result as string;
        Resume(resumeData);
      };
      reader.readAsDataURL(profileImageFile);
    } else {
      Resume(resumeData);
    }
  });
}

// Theme toggle functionality
if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const container = document.querySelector(".container") as HTMLElement;
    container.classList.toggle("dark-theme");
  });
}
