/* ==========================================================================
   MAYANK BANSAL — INTERACTIVE SCI-FI PORTFOLIO ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCursorAndSpotlight();
    initNavbar();
    initTypingEffect();
    initThreeHeroScene();
    initFigureTilt();
    initStatsCounter();
    initProjectsAndModal();
    initPublicationsTabs();
    initCertificates();
    initCopyButtons();
    initCommandPalette();
});

/* ---------- 1. Custom Sci-Fi Cursor & Ambient Spotlight ---------- */
function initCursorAndSpotlight() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const spotlight = document.getElementById('cursor-spotlight');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (spotlight) {
            spotlight.style.setProperty('--mx', `${mouseX}px`);
            spotlight.style.setProperty('--my', `${mouseY}px`);
        }

        if (dot) {
            dot.style.opacity = '1';
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        }
        if (ring) {
            ring.style.opacity = '1';
        }
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        if (ring) {
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
        }
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const interactiveEls = document.querySelectorAll('a, button, .project-card, .cert-stage');
    interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', () => ring && ring.classList.add('hovered'));
        el.addEventListener('mouseleave', () => ring && ring.classList.remove('hovered'));
    });

    // Subtle magnetic pull on .magnetic buttons
    document.querySelectorAll('.magnetic').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width / 2) * 0.18;
            const dy = (e.clientY - rect.top - rect.height / 2) * 0.18;
            btn.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* ---------- 2. Navbar Scroll & Mobile Menu ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlight
        const scrollPos = window.scrollY + 140;
        document.querySelectorAll('section[id]').forEach((sec) => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
            }
        });
    });

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(open));
        });

        links.forEach((l) => {
            l.addEventListener('click', () => navLinks.classList.remove('active'));
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
}

/* ---------- 3. Typing Stack Telemetry ---------- */
function initTypingEffect() {
    const el = document.getElementById('typed-output');
    if (!el) return;

    const phrases = [
        'LangGraph & Agentic AI',
        'Multi-Hop RAG Pipelines',
        'PyTorch & Computer Vision',
        'FastAPI & Docker Systems'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
        const current = phrases[phraseIdx];
        if (!deleting) {
            charIdx++;
            el.textContent = current.slice(0, charIdx);
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(tick, 1800);
                return;
            }
            setTimeout(tick, 55);
        } else {
            charIdx--;
            el.textContent = current.slice(0, charIdx);
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(tick, 320);
                return;
            }
            setTimeout(tick, 28);
        }
    }
    tick();
}

/* ---------- 4. Three.js 3D Sci-Fi Planet, Orbital Ring, Stars & Wireframe Terrain ---------- */
function initThreeHeroScene() {
    const canvas = document.getElementById('hero-webgl');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0.4, 8.5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const pinkLight = new THREE.PointLight(0xff2a85, 3.2, 25);
    pinkLight.position.set(4.5, 2.5, 4);
    scene.add(pinkLight);

    const violetLight = new THREE.PointLight(0xa855f7, 2.0, 22);
    violetLight.position.set(-5, -2, 3);
    scene.add(violetLight);

    // Planet Group (positioned right-center behind 3D figure, matching Image 2)
    const planetGroup = new THREE.Group();
    planetGroup.position.set(2.4, 0.35, -1.8);
    scene.add(planetGroup);

    const planetGeo = new THREE.SphereGeometry(2.15, 48, 48);
    const planetMat = new THREE.MeshStandardMaterial({
        color: 0x16141f,
        roughness: 0.85,
        metalness: 0.25
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);

    // Subtle wireframe latitude/longitude overlay on planet
    const wirePlanetGeo = new THREE.SphereGeometry(2.17, 24, 24);
    const wirePlanetMat = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });
    planetGroup.add(new THREE.Mesh(wirePlanetGeo, wirePlanetMat));

    // Glowing Orbital Ring (Image 2 signature ring)
    const ringGeo = new THREE.TorusGeometry(3.25, 0.045, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0xff2a85,
        transparent: true,
        opacity: 0.72
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI * 0.42;
    orbitalRing.rotation.y = -Math.PI * 0.14;
    planetGroup.add(orbitalRing);

    const outerRingGeo = new THREE.TorusGeometry(3.65, 0.015, 12, 120);
    const outerRingMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.35
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI * 0.42;
    outerRing.rotation.y = -Math.PI * 0.14;
    planetGroup.add(outerRing);

    // 3D Starfield
    const starCount = 700;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPos[i * 3] = (Math.random() - 0.5) * 32;
        starPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        starPos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 4;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
        color: 0xf9a8d4,
        size: 0.045,
        transparent: true,
        opacity: 0.7
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Subtle Wireframe Terrain Horizon (nodding to Image 1)
    const terrainGeo = new THREE.PlaneGeometry(28, 12, 40, 20);
    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const wave = Math.sin(x * 0.45) * 0.35 + Math.cos(y * 0.6) * 0.25;
        posAttr.setZ(i, wave);
    }
    terrainGeo.computeVertexNormals();
    const terrainMat = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.11
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2.25;
    terrain.position.set(0, -3.1, -2.5);
    scene.add(terrain);

    // Mouse parallax state
    let targetX = 0;
    let targetY = 0;
    window.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
        const w = canvas.parentElement.clientWidth;
        const h = canvas.parentElement.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        planetMesh.rotation.y = t * 0.08;
        orbitalRing.rotation.z = t * 0.12;
        outerRing.rotation.z = -t * 0.07;
        stars.rotation.y = t * 0.015;

        camera.position.x += (targetX * 0.55 - camera.position.x) * 0.04;
        camera.position.y += (-targetY * 0.35 + 0.4 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, -1);

        renderer.render(scene, camera);
    }
    animate();
}

/* ---------- 5. 3D Figure Mouse-Reactive Tilt ---------- */
function initFigureTilt() {
    const stage = document.getElementById('figure-stage');
    const frame = document.getElementById('figure-frame');
    if (!stage || !frame) return;

    stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        frame.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 12}deg) scale(1.02)`;
    });

    stage.addEventListener('mouseleave', () => {
        frame.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
}

/* ---------- 6. Stats Count-Up on Scroll ---------- */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-value[data-count]');
    if (!stats.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const decimals = parseInt(el.dataset.decimals || '0', 10);
            const duration = 1100;
            const start = performance.now();

            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const val = (target * eased).toFixed(decimals);
                el.textContent = `${val}${suffix}`;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            obs.unobserve(el);
        });
    }, { threshold: 0.4 });

    stats.forEach((s) => observer.observe(s));
}

/* ---------- 7. Projects Filtering, Expand & Dossier Modal ---------- */
const PROJECT_DETAILS = {
    'career-copilot': {
        title: 'AI Career Copilot',
        category: 'AGENTIC RAG · LANGGRAPH',
        img: 'img/projects/project17.webp',
        bullets: [
            'Architected an agentic RAG career assistant and ATS scorer with LangGraph state machine orchestration and human-in-the-loop resume diff review.',
            'Engineered a dual-provider LLM pipeline (Groq cloud & Ollama local) with ChromaDB semantic retrieval, achieving 90% Recall@4, 0.83 MRR@4, and 0.81s P50 latency.',
            'Containerized production microservices stack with Docker and exposed modular endpoints via FastAPI.'
        ],
        tags: ['Python', 'FastAPI', 'LangChain', 'LangGraph', 'RAG', 'ChromaDB', 'Groq', 'Ollama', 'Docker'],
        github: 'https://github.com/Mayank149/AI-Career-Copilot-Complete-'
    },
    'debug-assistant': {
        title: 'Technical Debug Assistant',
        category: 'MULTI-HOP RAG · LLAMA 3.3 70B',
        img: 'img/projects/project16.webp',
        bullets: [
            'Engineered a production-style Multi-Hop RAG debugging assistant using FAISS vector indexing and Groq-hosted Llama 3.3 70B for context-grounded diagnostics.',
            'Built an end-to-end ingestion pipeline with metadata-aware chunking, semantic vector embeddings, and multi-document context synthesis.',
            'Integrated dynamic document uploads for live knowledge base updates, transparent source attribution, and retrieval score visualization.'
        ],
        tags: ['RAG', 'Python', 'FAISS', 'Groq API', 'Llama 3.3 70B', 'Semantic Search'],
        github: 'https://github.com/Mayank149/Technical-Debug-Assistant'
    },
    'wastesnap': {
        title: 'WasteSnap – Smart Waste Classification',
        category: 'COMPUTER VISION · MOBILENETV2',
        img: 'img/projects/project8.webp',
        bullets: [
            'Trained and fine-tuned a MobileNetV2 convolutional neural network in TensorFlow to classify 9 distinct categories of waste.',
            'Delivered real-time inference providing probabilistic confidence scores alongside contextual recycling and disposal recommendations.',
            'Packaged and deployed the full-stack web application to production on Render using Flask.'
        ],
        tags: ['Python', 'TensorFlow', 'MobileNetV2', 'Flask', 'HTML/CSS/JS'],
        live: 'https://wastesnap.onrender.com/',
        github: 'https://github.com/Mayank149/WasteSnap'
    },
    'mood2mail': {
        title: 'Mood2Mail – Email Tone Analyzer',
        category: 'NLP · RESEARCH PREPRINT',
        img: 'img/projects/project3.webp',
        bullets: [
            'Built a natural language classification engine using TF-IDF n-gram vectorization and Naive Bayes modeling to detect email communication tones.',
            'Implemented a RESTful Flask API providing instantaneous tone scoring (Formal, Friendly, Aggressive) to the client application.',
            'Deployed live on Render with an interactive preview interface delivering real-time sentiment feedback as users type.'
        ],
        tags: ['Python', 'TF-IDF', 'Flask', 'JavaScript', 'NLP'],
        live: 'https://mood2mail.onrender.com/',
        github: 'https://github.com/Mayank149/Mood2Mail'
    },
    'visual-search': {
        title: 'Visual Search Engine',
        category: 'COMPUTER VISION · RESNET50 + FAISS',
        img: 'img/projects/project14.webp',
        bullets: [
            'Implemented an end-to-end visual similarity search engine using a pre-trained ResNet50 CNN in PyTorch for deep feature representation.',
            'Utilized FAISS vector indexing to perform fast nearest-neighbor similarity searches across large image datasets.',
            'Constructed an interactive Flask web service supporting real-time image upload, feature vector extraction, and candidate retrieval.'
        ],
        tags: ['Python', 'PyTorch', 'ResNet50', 'FAISS', 'Flask'],
        github: 'https://github.com/Mayank149/Visual-Search-Engine'
    },
    'pdf-rag': {
        title: 'PDF Question Answering System (RAG)',
        category: 'RAG · GEMINI + FAISS',
        img: 'img/projects/project13.webp',
        bullets: [
            'Built an end-to-end PDF question answering pipeline using Sentence Transformers embeddings and a FAISS vector index for low-latency similarity search.',
            'Integrated Gemini API with structured prompt engineering and safety guardrails to enforce context grounding and mitigate hallucinations.',
            'Developed an interactive web interface with Flask for dynamic PDF ingestion, chunking, and document querying.'
        ],
        tags: ['Python', 'Flask', 'FAISS', 'Sentence Transformers', 'Gemini'],
        github: 'https://github.com/Mayank149/PDF-Question-Answering-RAG-System'
    },
    'complaint-triage': {
        title: 'AI Complaint Triage & Routing System',
        category: 'ML · CLASSIFICATION',
        img: 'img/projects/project15.webp',
        bullets: [
            'Developed an automated complaint triage system using TF-IDF vectorization and Logistic Regression to predict target departments and urgency levels.',
            'Formulated a hybrid credibility scoring algorithm with dynamic follow-up question generation to validate incoming claims.',
            'Engineered a centralized admin dashboard with persistent database storage for auditing, ticket assignment, and oversight.'
        ],
        tags: ['Python', 'TF-IDF', 'Scikit-learn', 'Flask', 'Database'],
        github: 'https://github.com/Mayank149/AI-Complaint-Triage-and-Routing-System-with-Hybrid-Credibility-Scoring-and-Feedback-Learning'
    },
    'dyslexia-ai': {
        title: 'Dyslexia AI Assistant',
        category: 'NLP · T5 TRANSFORMER',
        img: 'img/projects/project12.webp',
        bullets: [
            'Deployed an assistive text simplification pipeline powered by a fine-tuned T5 Transformer sequence-to-sequence model.',
            'Automated the syntactic restructuring of dense, complex passages into simplified sentences while preserving factual nuance.',
            'Built an accessible Flask web interface designed with dyslexia-friendly typographic formatting and contrast controls.'
        ],
        tags: ['Python', 'Flask', 'T5 Transformer', 'HTML/CSS/JS'],
        github: 'https://github.com/Mayank149/Dyslexia-AI-Assistant'
    },
    'asl-signs': {
        title: 'Real Time ASL Hand Signs Predictor',
        category: 'COMPUTER VISION · MEDIAPIPE',
        img: 'img/projects/project11.webp',
        bullets: [
            'Trained a deep CNN on American Sign Language datasets utilizing GPU acceleration in Google Colab with data augmentation.',
            'Integrated MediaPipe and OpenCV pipelines for real-time hand landmark detection and region-of-interest segmentation.',
            'Implemented low-latency webcam stream processing to deliver continuous real-time sign language prediction.'
        ],
        tags: ['Python', 'TensorFlow/Keras', 'CNN', 'OpenCV', 'MediaPipe'],
        github: 'https://github.com/Mayank149/ASL_Hand_sign_recognizer'
    },
    'biasxray': {
        title: 'BiasX-Ray – Real-Time Bias Detector',
        category: 'NLP · HACKATHON',
        img: 'img/projects/project1.webp',
        bullets: [
            'Engineered a real-time NLP text analysis engine using spaCy and NLTK to scan communications for gender-coded bias and microaggressions.',
            'Implemented a rule-augmented recommendation system proposing inclusive, respectful phrasing alternatives.',
            'Deployed full-stack application live on Render featuring asynchronous API communication and visual inline highlights.'
        ],
        tags: ['Python', 'Flask', 'spaCy', 'NLTK', 'JavaScript'],
        live: 'https://biasx.onrender.com',
        github: 'https://github.com/Mayank149/BiasX'
    },
    'digidetect': {
        title: 'DigiDetect – Handwritten Digit Recognition',
        category: 'COMPUTER VISION · CNN',
        img: 'img/projects/project9.webp',
        bullets: [
            'Architected and trained a Convolutional Neural Network (CNN) in TensorFlow/Keras for robust handwritten digit classification.',
            'Supported dual input streams with real-time HTML5 Canvas drawing and image file uploads with server-side grayscale normalization.',
            'Engineered a Flask backend serving low-latency inference along with full softmax probability distributions.'
        ],
        tags: ['Python', 'TensorFlow', 'CNN', 'Flask'],
        github: 'https://lnkd.in/g53-Pq3c'
    },
    'stylenet': {
        title: 'StyleNet – Fashion Image Classifier',
        category: 'COMPUTER VISION · CNN',
        img: 'img/projects/project10.webp',
        bullets: [
            'Designed and trained a deep CNN on the Fashion MNIST benchmark dataset, achieving ~91% test classification accuracy.',
            'Implemented server-side image preprocessing pipelines for 28x28 grayscale normalization and tensor reshaping.',
            'Deployed as an interactive Flask application enabling drag-and-drop image uploads with immediate categorical predictions.'
        ],
        tags: ['Python', 'TensorFlow', 'CNN', 'Flask'],
        github: 'https://lnkd.in/gvrTxBQ9'
    },
    'music-genre': {
        title: 'Music Genre Classification',
        category: 'AUDIO ML · LIBROSA',
        img: 'img/projects/project6.webp',
        bullets: [
            'Developed an audio signal processing pipeline leveraging Librosa to extract MFCCs, spectral roll-off, and chroma features.',
            'Built a modular Flask REST API handling multiformat audio uploads (MP3, WAV) with configured CORS headers.',
            'Optimized audio feature extraction pipelines ensuring compatibility across runtime environments.'
        ],
        tags: ['Python', 'Librosa', 'Flask API', 'Audio Processing'],
        github: 'https://github.com/Mayank149/Music-genre-Classification-Backend-'
    },
    'fake-job': {
        title: 'Fake Job Posting Detector',
        category: 'NLP · CLASSIFICATION',
        img: 'img/projects/project4.webp',
        bullets: [
            'Trained a supervised Logistic Regression classifier on labeled job posting datasets to identify fraudulent postings.',
            'Executed text preprocessing including tokenization, stop-word filtering, and term frequency feature extraction.',
            'Deployed full-stack web application live on Render utilizing a Flask backend and vanilla JavaScript interface.'
        ],
        tags: ['Python', 'Scikit-learn', 'Flask', 'JavaScript'],
        live: 'https://fake-job-postings.onrender.com/',
        github: 'https://github.com/Mayank149/Fake-job-postings'
    },
    'car-mileage': {
        title: 'Car Mileage Predictor',
        category: 'ML · REGRESSION',
        img: 'img/projects/project5.webp',
        bullets: [
            'Constructed a predictive regression pipeline featuring domain-specific feature engineering and Grid Search parameter tuning.',
            'Evaluated multi-attribute automotive specifications to compute calibrated vehicle fuel efficiency metrics.',
            'Deployed live on Render with an intuitive form interface and Flask REST backend.'
        ],
        tags: ['Python', 'Linear Regression', 'Grid Search', 'Flask'],
        live: 'https://mileage-predictor.onrender.com/',
        github: 'https://github.com/Mayank149/Mileage_Predictor'
    },
    'movie-rec': {
        title: 'Movie Recommendation System',
        category: 'ML · RECOMMENDER',
        img: 'img/projects/project7.webp',
        bullets: [
            'Architected a content-based recommendation algorithm utilizing cosine similarity matrices across movie titles, genres, and metadata.',
            'Built data transformation pipelines in Python to process movie datasets and return ranked high-affinity recommendations.'
        ],
        tags: ['Python', 'Cosine Similarity', 'Data Analysis'],
        github: 'https://github.com/Mayank149/Movie-Recommendation-System/tree/main'
    }
};

function initProjectsAndModal() {
    const grid = document.getElementById('projects-grid');
    const toggleBtn = document.getElementById('toggle-all-projects');
    const filterBtns = document.querySelectorAll('.filter-pill');
    const cards = document.querySelectorAll('.project-card');

    if (toggleBtn && grid) {
        toggleBtn.addEventListener('click', () => {
            const expanded = grid.classList.toggle('show-all');
            toggleBtn.querySelector('span').textContent = expanded ? 'Show Featured Only' : 'View All 16 Projects';
            toggleBtn.querySelector('i').className = expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        });
    }

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            if (filter !== 'all' && grid) {
                grid.classList.add('show-all');
                if (toggleBtn) toggleBtn.style.display = 'none';
            } else if (toggleBtn) {
                toggleBtn.style.display = 'inline-flex';
            }

            cards.forEach((card) => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('filtered-out', !match);
            });
        });
    });

    // Dossier Modal
    const modal = document.getElementById('project-modal');
    const mImg = document.getElementById('modal-project-img');
    const mCat = document.getElementById('modal-project-cat');
    const mTitle = document.getElementById('modal-project-title');
    const mBullets = document.getElementById('modal-project-bullets');
    const mTags = document.getElementById('modal-project-tags');
    const mLinks = document.getElementById('modal-project-links');

    function openProjectModal(id) {
        const data = PROJECT_DETAILS[id];
        if (!data || !modal) return;

        mImg.src = data.img;
        mImg.alt = data.title;
        mCat.textContent = data.category;
        mTitle.textContent = data.title;
        mBullets.innerHTML = data.bullets.map((b) => `<li>${b}</li>`).join('');
        mTags.innerHTML = data.tags.map((t) => `<span>${t}</span>`).join('');

        let linksHtml = '';
        if (data.live) {
            linksHtml += `<a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn-primary"><i class="fas fa-globe"></i> Live Demo</a>`;
        }
        if (data.github) {
            linksHtml += `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-glass"><i class="fab fa-github"></i> View Repository</a>`;
        }
        mLinks.innerHTML = linksHtml;

        modal.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!modal) return;
        modal.hidden = true;
        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-project]').forEach((btn) => {
        btn.addEventListener('click', () => openProjectModal(btn.dataset.openProject));
    });

    document.querySelectorAll('[data-close-modal]').forEach((el) => {
        el.addEventListener('click', closeProjectModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.hidden) closeProjectModal();
    });
}

/* ---------- 8. Publications Tabs ---------- */
function initPublicationsTabs() {
    const tabs = document.querySelectorAll('[data-pub-tab]');
    const bookPanel = document.getElementById('pub-book');
    const articlesPanel = document.getElementById('pub-articles');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.pubTab;
            if (bookPanel && articlesPanel) {
                bookPanel.hidden = target !== 'book';
                articlesPanel.hidden = target !== 'articles';
            }
        });
    });
}

/* ---------- 9. Certificates Carousel & Lightbox ---------- */
function initCertificates() {
    const certs = Array.from({ length: 9 }, (_, i) => `img/certificates/certificate${i + 1}.webp`);
    let index = 0;

    const img = document.getElementById('cert-display-img');
    const counter = document.getElementById('cert-counter');
    const prevBtn = document.getElementById('cert-prev');
    const nextBtn = document.getElementById('cert-next');
    const stage = document.getElementById('cert-stage');

    const lightbox = document.getElementById('cert-lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCaption = document.getElementById('lightbox-caption');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');

    function render() {
        const num = String(index + 1).padStart(2, '0');
        if (img) {
            img.src = certs[index];
            img.alt = `Verified Certificate ${index + 1}`;
        }
        if (counter) counter.textContent = `${num} / 09`;
        if (lbImg) lbImg.src = certs[index];
        if (lbCaption) lbCaption.textContent = `Certificate ${index + 1} of ${certs.length}`;
    }

    function step(delta) {
        index = (index + delta + certs.length) % certs.length;
        render();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => step(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => step(1));
    if (lbPrev) lbPrev.addEventListener('click', () => step(-1));
    if (lbNext) lbNext.addEventListener('click', () => step(1));

    if (stage && lightbox) {
        stage.addEventListener('click', () => {
            render();
            lightbox.hidden = false;
            document.body.style.overflow = 'hidden';
        });
    }

    document.querySelectorAll('[data-close-cert]').forEach((el) => {
        el.addEventListener('click', () => {
            if (lightbox) lightbox.hidden = true;
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox || lightbox.hidden) return;
        if (e.key === 'Escape') {
            lightbox.hidden = true;
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            step(-1);
        } else if (e.key === 'ArrowRight') {
            step(1);
        }
    });
}

/* ---------- 10. Copy Buttons & Toast ---------- */
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('visible'), 2400);
}

function initCopyButtons() {
    document.querySelectorAll('.copy-btn[data-copy]').forEach((btn) => {
        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(btn.dataset.copy);
                showToast(`Copied: ${btn.dataset.copy}`);
            } catch {
                showToast('Copy failed — please copy manually');
            }
        });
    });
}

/* ---------- 11. Command Palette (Ctrl+K / Cmd+K) ---------- */
function initCommandPalette() {
    const modal = document.getElementById('command-palette');
    const trigger = document.getElementById('cmd-trigger');
    const input = document.getElementById('cmd-input');
    const list = document.getElementById('cmd-list');
    if (!modal || !input || !list) return;

    const actions = [
        { label: 'Jump to Home', hint: '#home', run: () => location.hash = '#home' },
        { label: 'Explore Projects', hint: '#projects', run: () => location.hash = '#projects' },
        { label: 'View Neural Skills', hint: '#skills', run: () => location.hash = '#skills' },
        { label: 'About & Education', hint: '#experience', run: () => location.hash = '#experience' },
        { label: 'Published Book & Articles', hint: '#publications', run: () => location.hash = '#publications' },
        { label: 'Verified Certificates', hint: '#certificates', run: () => location.hash = '#certificates' },
        { label: 'Open Resume (PDF)', hint: 'New Tab', run: () => window.open('downloads/resume.pdf', '_blank') },
        { label: 'Copy Email Address', hint: 'Clipboard', run: () => navigator.clipboard.writeText('bansalmayank1414@gmail.com').then(() => showToast('Copied: bansalmayank1414@gmail.com')) },
        { label: 'Open GitHub Profile', hint: 'External', run: () => window.open('https://github.com/Mayank149', '_blank') }
    ];

    function renderList(query = '') {
        const q = query.trim().toLowerCase();
        const filtered = actions.filter((a) => a.label.toLowerCase().includes(q));
        list.innerHTML = '';
        filtered.forEach((a) => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.innerHTML = `<span>${a.label}</span><span class="cmd-hint">${a.hint}</span>`;
            btn.addEventListener('click', () => {
                close();
                a.run();
            });
            li.appendChild(btn);
            list.appendChild(li);
        });
    }

    function open() {
        modal.hidden = false;
        input.value = '';
        renderList('');
        setTimeout(() => input.focus(), 40);
    }

    function close() {
        modal.hidden = true;
    }

    if (trigger) trigger.addEventListener('click', open);
    input.addEventListener('input', () => renderList(input.value));
    document.querySelectorAll('[data-close-cmd]').forEach((el) => el.addEventListener('click', close));

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            modal.hidden ? open() : close();
        } else if (e.key === 'Escape' && !modal.hidden) {
            close();
        }
    });
}
