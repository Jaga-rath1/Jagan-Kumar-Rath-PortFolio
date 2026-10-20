import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const primaryColor = rgb(0.12, 0.08, 0.28); // Deep Midnight Violet
  const accentColor = rgb(0.45, 0.22, 0.85); // Purple accent
  const darkTextColor = rgb(0.15, 0.15, 0.18);
  const mutedTextColor = rgb(0.4, 0.42, 0.48);
  const lineColor = rgb(0.85, 0.85, 0.9);

  let y = height - 42;

  // Header
  page.drawText('JAGAN KUMAR RATH', {
    x: 40,
    y,
    size: 22,
    font: fontBold,
    color: primaryColor,
  });

  y -= 16;
  page.drawText('ASSOCIATE SOFTWARE ENGINEER  |  MERN STACK DEVELOPER', {
    x: 40,
    y,
    size: 10,
    font: fontBold,
    color: accentColor,
  });

  y -= 14;
  const contactText = '+91 6371561513   |   rathjaga83@gmail.com   |   linkedin.com/in/jagan-kumar-rath-80a699326   |   github.com/Jaga-rath1';
  page.drawText(contactText, {
    x: 40,
    y,
    size: 8.5,
    font: fontRegular,
    color: mutedTextColor,
  });

  y -= 10;
  page.drawLine({
    start: { x: 40, y },
    end: { x: width - 40, y },
    thickness: 1,
    color: lineColor,
  });

  y -= 16;

  function drawSectionHeader(title) {
    page.drawText(title.toUpperCase(), {
      x: 40,
      y,
      size: 10.5,
      font: fontBold,
      color: accentColor,
    });
    y -= 4;
    page.drawLine({
      start: { x: 40, y },
      end: { x: width - 40, y },
      thickness: 0.5,
      color: lineColor,
    });
    y -= 12;
  }

  // Summary
  drawSectionHeader('Professional Summary');
  const summary = 'Motivated Software Engineer with strong full-stack and cross-platform expertise in React.js, React Native, JavaScript, Node.js, Express.js, MongoDB, and Tailwind CSS. Experienced in building responsive web and mobile interfaces, scalable RESTful APIs, robust CRUD workflows, and secure authentication systems. Proficient in containerization and deployment pipelines using Docker, Kubernetes, and CI/CD, while actively expanding skills in Data Science.';

  // Wrap summary
  const words = summary.split(' ');
  let line = '';
  for (const w of words) {
    const testLine = line + (line ? ' ' : '') + w;
    if (fontRegular.widthOfTextAtSize(testLine, 8.5) > width - 80) {
      page.drawText(line, { x: 40, y, size: 8.5, font: fontRegular, color: darkTextColor });
      y -= 11.5;
      line = w;
    } else {
      line = testLine;
    }
  }
  if (line) {
    page.drawText(line, { x: 40, y, size: 8.5, font: fontRegular, color: darkTextColor });
    y -= 14;
  }

  // Experience
  drawSectionHeader('Work Experience');
  page.drawText('NEXNUV PRIVATE LIMITED', { x: 40, y, size: 10, font: fontBold, color: primaryColor });
  page.drawText('August 2026 – Present', { x: width - 150, y, size: 9, font: fontOblique, color: mutedTextColor });
  y -= 12;
  page.drawText('Associate Software Engineer', { x: 40, y, size: 9, font: fontBold, color: darkTextColor });
  y -= 12;

  const expBullets = [
    'Contributing to full-stack and mobile development using React.js, React Native, and backend services.',
    'Designing, developing, and optimizing RESTful APIs, microservices, and database schemas with MongoDB & MySQL.',
    'Collaborating with engineering teams following clean code standards, MVC patterns, and industry best practices.',
    'Participating in agile sprints, code reviews, and containerized deployment pipelines using Docker and CI/CD.'
  ];

  for (const bullet of expBullets) {
    page.drawText('•', { x: 45, y, size: 8.5, font: fontBold, color: accentColor });
    page.drawText(bullet, { x: 55, y, size: 8.5, font: fontRegular, color: darkTextColor });
    y -= 11;
  }
  y -= 6;

  // Key Projects
  drawSectionHeader('Featured Engineering Projects');

  const projects = [
    {
      name: 'CARZODRIVE — Premium Vehicle Rental Platform (Live Project)',
      tech: 'React.js, Tailwind CSS, REST APIs, Vercel',
      link: 'Live: carzodrive1.vercel.app  |  GitHub: github.com/Jaga-rath1/CarNest',
      points: [
        'Production vehicle rental platform offering luxury cars, self-drive bikes, chauffeur services, and booking workflows.',
        'Engineered high-performance responsive UI with smooth interactions, dynamic filters, and clean modular architecture.'
      ]
    },
    {
      name: 'CAREFLOW HEALTH — Clinic Management Platform',
      tech: 'React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Mongoose',
      link: 'GitHub: github.com/Jaga-rath1/Clinic-Management-System',
      points: [
        'Engineered clinic operations system coordinating doctor scheduling, patient appointments, and role-based admin workflows.',
        'Designed secure RESTful APIs, patient record tracking, and scalable schema models.'
      ]
    },
    {
      name: 'DOCUPULSE — Browser-Based PDF Utility SaaS',
      tech: 'React.js, Tailwind CSS, Framer Motion, JavaScript',
      link: 'GitHub: github.com/Jaga-rath1/DocuPulse',
      points: [
        'Dark-themed client-side document processing tool for PDF merging, splitting, compression, and encryption.',
        'Implemented fluid micro-interactions and high-performance in-browser file manipulation.'
      ]
    },
    {
      name: 'CARNEST — Containerized Vehicle Marketplace',
      tech: 'Node.js, Express.js, MongoDB, Docker, Kubernetes, CI/CD, Multer, Cloudinary',
      link: 'GitHub: github.com/Jaga-rath1/CarNest',
      points: [
        'Full-stack automotive marketplace with vehicle CRUD, secure image uploads, and RESTful service design.',
        'Containerized with Docker Compose; engineered Kubernetes deployment manifests and CI/CD automation pipelines.'
      ]
    },
    {
      name: 'WANDERLUST — Vacation Rental Web Platform',
      tech: 'Node.js, Express.js, MongoDB, Passport.js, Geoapify, Leaflet.js, Cloudinary',
      link: 'GitHub: github.com/Jaga-rath1/WanderLust',
      points: [
        'Rental platform featuring MVC architecture, user authentication, interactive map geolocation, and cloud media storage.'
      ]
    }
  ];

  for (const p of projects) {
    page.drawText(p.name, { x: 40, y, size: 9, font: fontBold, color: primaryColor });
    y -= 10.5;
    page.drawText(`Stack: ${p.tech}   |   ${p.link}`, { x: 40, y, size: 7.5, font: fontOblique, color: mutedTextColor });
    y -= 10;
    for (const pt of p.points) {
      page.drawText('•', { x: 45, y, size: 8, font: fontRegular, color: accentColor });
      page.drawText(pt, { x: 55, y, size: 8, font: fontRegular, color: darkTextColor });
      y -= 10;
    }
    y -= 3;
  }

  // Skills
  drawSectionHeader('Technical Skills');
  const skills = [
    { cat: 'Full Stack & Mobile:', items: 'React.js, React Native, JavaScript (ES6+), Node.js, Express.js, HTML5, CSS3, Tailwind CSS, REST APIs' },
    { cat: 'Databases & Architecture:', items: 'MongoDB, Mongoose, MySQL, MVC Architecture, RBAC, Authentication & Session Mgmt' },
    { cat: 'DevOps & Deployment:', items: 'Docker, Docker Compose, Docker Hub, Kubernetes, Minikube, kubectl, Git, GitHub, CI/CD' },
    { cat: 'Data Science (Learning):', items: 'Python, NumPy, Pandas, Data Analysis Fundamentals, Machine Learning Foundations' },
    { cat: 'Languages & Tools:', items: 'JavaScript, Python, Java, C, Postman, Hoppscotch, Cloudinary, Passport.js' }
  ];

  for (const s of skills) {
    page.drawText(s.cat, { x: 40, y, size: 8, font: fontBold, color: darkTextColor });
    page.drawText(s.items, { x: 160, y, size: 8, font: fontRegular, color: darkTextColor });
    y -= 10.5;
  }
  y -= 4;

  // Education & Certifications
  drawSectionHeader('Education & Certifications');
  page.drawText('Master of Computer Applications (MCA)', { x: 40, y, size: 8.5, font: fontBold, color: darkTextColor });
  page.drawText('NIIS Institute of Business Admin, Bhubaneswar (2024–2026) | CGPA: 8.2', { x: 230, y, size: 8, font: fontRegular, color: mutedTextColor });
  y -= 11;
  page.drawText('Bachelor of Science (B.Sc.)', { x: 40, y, size: 8.5, font: fontBold, color: darkTextColor });
  page.drawText('SVM Autonomous College, Jagatsinghpur (2024)', { x: 230, y, size: 8, font: fontRegular, color: mutedTextColor });
  y -= 11;
  page.drawText('Higher Secondary (+2 Science)', { x: 40, y, size: 8.5, font: fontBold, color: darkTextColor });
  page.drawText('Baranga College of Education & Technology (Passed 2021)', { x: 230, y, size: 8, font: fontRegular, color: mutedTextColor });
  y -= 11;
  page.drawText('Certifications:', { x: 40, y, size: 8.5, font: fontBold, color: darkTextColor });
  page.drawText('MERN Stack (Apna College)  |  DSA with Java (Apna College)  |  Data Science & Analytics (In Progress)', { x: 110, y, size: 8, font: fontOblique, color: accentColor });

  const pdfBytes = await pdfDoc.save();
  fs.mkdirSync('public/resume', { recursive: true });
  fs.writeFileSync('public/resume/Jagan-Kumar-Rath-Resume.pdf', pdfBytes);
  console.log('PDF generated at public/resume/Jagan-Kumar-Rath-Resume.pdf, size:', pdfBytes.length);
}

generateResume();
