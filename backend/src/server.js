require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const fs = require('fs').promises;
const fsSync = require('fs');  // For sync operations
const path = require('path');
const archiver = require('archiver');
const AdmZip = require('adm-zip');

const app = express();
const port = process.env.PORT || 5000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Path to data storage
const DATA_DIR = path.join(__dirname, '..', 'data');
const CRUD_DATA_FILE = path.join(DATA_DIR, 'crud_data.json');
const PROMPT_HISTORY_FILE = path.join(DATA_DIR, 'promptHistory.json');
const DOWNLOADS_DIR = path.join(__dirname, '..', 'public', 'downloads');

// Ensure data directory and files exist
async function ensureDataFiles() {
  if (!fsSync.existsSync(DATA_DIR)) {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
  if (!fsSync.existsSync(CRUD_DATA_FILE)) {
    await fs.writeFile(CRUD_DATA_FILE, '[]');
  }
  if (!fsSync.existsSync(PROMPT_HISTORY_FILE)) {
    await fs.writeFile(PROMPT_HISTORY_FILE, '[]');
  }
}

// Prompt History Operations
async function readPromptHistory() {
  await ensureDataFiles();
  const data = await fs.readFile(PROMPT_HISTORY_FILE, 'utf8');
  return JSON.parse(data);
}

async function savePromptHistory(history) {
  await fs.writeFile(PROMPT_HISTORY_FILE, JSON.stringify(history, null, 2));
}

// CRUD Operations
async function readCrudData() {
  await ensureDataFiles();
  const data = await fs.readFile(CRUD_DATA_FILE, 'utf8');
  return JSON.parse(data);
}

async function writeCrudData(data) {
  await fs.writeFile(CRUD_DATA_FILE, JSON.stringify(data, null, 2));
}

app.use(cors());
app.use(express.json());
app.use('/downloads', express.static(path.join(__dirname, '..', 'public', 'downloads')));

// CRUD API Endpoints
app.get('/api/crud/data', async (req, res) => {
  try {
    const data = await readCrudData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/crud/data', async (req, res) => {
  try {
    const data = await readCrudData();
    const newItem = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    data.push(newItem);
    await writeCrudData(data);
    res.json({ success: true, item: newItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/crud/data/:id', async (req, res) => {
  try {
    const data = await readCrudData();
    const index = data.findIndex(item => item.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    data[index] = { ...data[index], ...req.body, updatedAt: new Date().toISOString() };
    await writeCrudData(data);
    res.json({ success: true, item: data[index] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/crud/data/:id', async (req, res) => {
  try {
    const data = await readCrudData();
    const filteredData = data.filter(item => item.id !== req.params.id);
    await writeCrudData(filteredData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, type } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    // Determine the type of application from the prompt
    const isCrudApp = prompt.toLowerCase().includes('crud');
    
    // Generate code based on the application type
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: isCrudApp ? 
            `You are an expert full-stack developer specializing in modern, beautiful web applications. Generate a complete CRUD application with:

            1. Frontend:
               - Modern, responsive design using Bootstrap 5
               - Clean and professional UI with proper spacing and typography
               - Smooth animations and transitions
               - Interactive forms with validation feedback
               - Loading states and success/error notifications
               - Mobile-friendly layout
               - Modern color scheme and gradients
               - Professional typography using Google Fonts
               - Proper shadows and depth

            2. Backend:
               - Node.js/Express backend with RESTful API
               - Complete CRUD operations
               - Error handling and validation
               - File-based data storage (JSON)

            Format your response with 'File: filename' followed by the file contents.
            Include these files:
            - index.html (complete structure with all sections)
            - styles.css (comprehensive custom styles)
            - script.js (all interactive features)
            - server.js (Node.js/Express backend)
            - data/crud_data.json (initial data file)
            - README.md (setup instructions)

            For the index.html, include:
            1. Complete HTML structure with all necessary CDN links:
               - Bootstrap 5 CSS and JS
               - Font Awesome 6
               - Google Fonts
               - jQuery
               - Custom CSS/JS

            2. Form section with:
               - Name input
               - Email input
               - Submit button
               - Edit/Update functionality
               - Delete functionality

            3. Data display section with:
               - Responsive table
               - Edit and Delete buttons
               - Proper styling

            Make sure all interactive features work properly with the backend API.
            Include proper error handling and loading states.
            Make the design visually stunning and fully responsive.` :
            `You are an expert web developer specializing in creating stunning, modern Bootstrap 5 websites. Create a visually appealing and professional website with complete HTML structure and content.

            1. Required Meta Tags and CDN Links:
               - Proper meta tags for SEO and responsiveness
               - Bootstrap 5 CSS and JS with integrity checks
               - Font Awesome 6 for icons
               - Google Fonts (Inter, Poppins, or other modern fonts)
               - AOS (Animate On Scroll) library
               - jQuery for compatibility
               - Custom CSS/JS files

            2. HTML Structure:
               - Semantic HTML5 elements
               - Proper indentation and commenting
               - Organized sections with meaningful IDs and classes
               - Accessibility attributes
               - Schema markup where appropriate
               - Open Graph meta tags

            3. Content Sections (Include ALL with proper structure):
               - Navigation bar with logo, menu items, and call-to-action
               - Hero section with background image/video
               - Features/Services section with icons and descriptions
               - About section with images and compelling content
               - Portfolio/Gallery section with filtering
               - Testimonials carousel
               - Team members section with social links
               - Pricing tables with feature lists
               - Contact form with validation
               - Google Maps integration
               - Footer with multiple columns
               - Newsletter subscription form
               - Social media links
               - Copyright notice

            4. Design Elements:
               - Modern color scheme with gradients
               - Custom animations and transitions
               - Hover effects on cards and buttons
               - Parallax scrolling effects
               - Image overlays and masks
               - Custom cursors and scrollbars
               - Loading animations
               - Modal popups
               - Toast notifications
               - Back to top button

            5. Bootstrap Components (Use ALL appropriately):
               - Navbar with dropdown menus
               - Carousel/Slider
               - Cards with hover effects
               - Modals and Popovers
               - Accordion/Collapse
               - Progress bars
               - Badges and Labels
               - Alerts and Notifications
               - Tabs and Pills
               - Forms with validation

            6. Responsive Features:
               - Mobile-first approach
               - Proper breakpoints
               - Responsive images and videos
               - Collapsible navigation
               - Responsive typography
               - Touch-friendly elements

            Format your response with 'File: filename' followed by the file contents.
            Include these files:
            - index.html (complete structure with all sections)
            - styles.css (comprehensive custom styles)
            - script.js (all interactive features)
            - assets/css/custom.css (additional styles)
            - assets/js/main.js (main JavaScript)

            For the index.html, include ALL the sections mentioned above with actual content, proper structure, and complete markup. Do not use placeholder text - generate meaningful content based on the project type.

            Make the design visually stunning, fully responsive, and production-ready.
            Ensure all interactive features work properly.
            Include proper documentation in code comments.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
       temperature: 1
    });

    // Parse the response and extract files
    const files = {};
    const response = completion.choices[0].message.content;
    const fileMatches = response.split(/File:\s+/g).filter(Boolean);
    
    fileMatches.forEach(match => {
      const firstNewLine = match.indexOf('\n');
      const filename = match.slice(0, firstNewLine).trim();
      const content = match.slice(firstNewLine + 1).trim();
      files[filename] = content;
    });

    // Create a zip file with proper structure
    const zip = new AdmZip();

    // For CRUD applications
    if (isCrudApp) {
      // Add frontend files
      const frontendFiles = {
        'index.html': files['index.html'] || '',
        'styles.css': files['styles.css'] || '',
        'script.js': files['script.js'] || '',
      };

      // Add backend files
      const backendFiles = {
        'server.js': files['server.js'] || '',
        'data/crud_data.json': files['data/crud_data.json'] || '[]',
        'README.md': files['README.md'] || ''
      };

      // Add all files to zip with proper structure
      Object.entries(frontendFiles).forEach(([filename, content]) => {
        if (filename === 'index.html') {
          // Ensure index.html has all required dependencies
          content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Application</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome 6 -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="styles.css" rel="stylesheet">
</head>
<body>
${content}
<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Custom JS -->
<script src="script.js"></script>
</body>
</html>`;
        }
        zip.addFile(filename, Buffer.from(content));
      });

      Object.entries(backendFiles).forEach(([filename, content]) => {
        zip.addFile(filename, Buffer.from(content));
      });
    } else {
      // For static websites
      const requiredFiles = {
        'index.html': files['index.html'] || '',
        'styles.css': files['styles.css'] || '',
        'script.js': files['script.js'] || '',
        'assets/css/custom.css': files['assets/css/custom.css'] || '',
        'assets/js/main.js': files['assets/js/main.js'] || ''
      };

      // Add all files to zip with proper structure
      Object.entries(requiredFiles).forEach(([filename, content]) => {
        if (filename === 'index.html') {
          // Ensure index.html has all required dependencies
          content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome 6 -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- AOS Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="styles.css" rel="stylesheet">
    <link href="assets/css/custom.css" rel="stylesheet">
</head>
<body>
${content}
<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- AOS Library -->
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<!-- Custom JS -->
<script src="script.js"></script>
<script src="assets/js/main.js"></script>
<script>
    // Initialize AOS
    AOS.init();
    
    // Initialize Bootstrap tooltips and popovers
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })
</script>
</body>
</html>`;
        }
        zip.addFile(filename, Buffer.from(content));
      });
    }

    // Save zip file
    const timestamp = Date.now();
    const zipFileName = `project-${timestamp}.zip`;
    const zipPath = path.join(DOWNLOADS_DIR, zipFileName);
    await fs.mkdir(DOWNLOADS_DIR, { recursive: true });
    await zip.writeZipPromise(zipPath);

    // Save to history
    let history = [];
    try {
      const data = await fs.readFile(PROMPT_HISTORY_FILE, 'utf8');
      history = JSON.parse(data);
    } catch (err) {
      console.error('Error reading history file:', err);
    }

    history.push({
      _id: timestamp.toString(),
      prompt,
      type: isCrudApp ? 'CRUD Application' : type,
      generatedFiles: files,
      createdAt: new Date().toISOString()
    });

    await fs.writeFile(PROMPT_HISTORY_FILE, JSON.stringify(history, null, 2));

    res.json({
      success: true,
      files,
      downloadPath: `/downloads/${zipFileName}`,
      type: isCrudApp ? 'crud' : 'static'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get prompt history
app.get('/api/history', async (req, res) => {
  try {
    const history = await readPromptHistory();
    // Sort history by createdAt in descending order (latest first)
    const sortedHistory = history.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.json({ success: true, history: sortedHistory.slice(0, 10) }); // Return last 10 prompts
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 