export interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  isLive?: boolean;
  category: 'rag' | 'cv' | 'nlp';
  summary: string;
  img: string;
  chips?: string[];
  tags: string[];
  bullets: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: 'brain' | 'cpu' | 'code' | 'server';
  skills: string[];
}

export interface PublicationItem {
  title: string;
  date: string;
  type: string;
  summary: string;
  img: string;
  primaryUrl: string;
  primaryLabel: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
}

export const STATS = [
  { label: 'DSA Problems', value: 680, suffix: '+' },
  { label: 'CGPA', value: 9.41, decimals: 2 },
  { label: 'AI & ML Projects', value: 16, suffix: '+' },
  { label: 'Book Published', value: 1 },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'career-copilot',
    title: 'AI Career Copilot',
    badge: 'Agentic RAG',
    category: 'rag',
    featured: true,
    summary:
      'Agentic RAG career assistant & ATS scorer with LangGraph state orchestration and dual-provider LLM pipeline.',
    img: 'img/projects/project17.webp',
    chips: ['90% Recall@4', '0.81s P50'],
    tags: ['LangGraph', 'FastAPI', 'ChromaDB', 'Docker', 'Groq', 'Ollama'],
    bullets: [
      'Architected an agentic RAG career assistant and ATS scorer with LangGraph state machine orchestration and human-in-the-loop resume diff review.',
      'Engineered a dual-provider LLM pipeline (Groq cloud & Ollama local) with ChromaDB semantic retrieval, achieving 90% Recall@4, 0.83 MRR@4, and 0.81s P50 latency.',
      'Containerized production microservices stack with Docker and exposed modular endpoints via FastAPI.',
    ],
    github: 'https://github.com/Mayank149/AI-Career-Copilot-Complete-',
  },
  {
    id: 'debug-assistant',
    title: 'Technical Debug Assistant',
    badge: 'Multi-Hop RAG',
    category: 'rag',
    featured: true,
    summary:
      'RAG-powered debugging assistant with FAISS vector indexing, metadata-aware chunking, and multi-document synthesis.',
    img: 'img/projects/project16.webp',
    chips: ['Multi-Hop RAG', 'Llama 3.3 70B'],
    tags: ['RAG', 'Groq', 'FAISS', 'Python', 'Llama 3.3 70B'],
    bullets: [
      'Engineered a production-style Multi-Hop RAG debugging assistant using FAISS vector indexing and Groq-hosted Llama 3.3 70B for context-grounded diagnostics.',
      'Built an end-to-end ingestion pipeline with metadata-aware chunking, semantic vector embeddings, and multi-document context synthesis.',
      'Integrated dynamic document uploads for live knowledge base updates, transparent source attribution, and retrieval score visualization.',
    ],
    github: 'https://github.com/Mayank149/Technical-Debug-Assistant',
  },
  {
    id: 'wastesnap',
    title: 'WasteSnap',
    badge: 'Live',
    isLive: true,
    category: 'cv',
    featured: true,
    summary:
      'Real-time waste classification using fine-tuned MobileNetV2 deep learning with contextual recycling guidance.',
    img: 'img/projects/wastesnap.png',
    chips: ['MobileNetV2', '9 Classes'],
    tags: ['TensorFlow', 'MobileNetV2', 'Flask', 'Python'],
    bullets: [
      'Trained and fine-tuned a MobileNetV2 convolutional neural network in TensorFlow to classify 9 distinct categories of waste.',
      'Delivered real-time inference providing probabilistic confidence scores alongside contextual recycling and disposal recommendations.',
      'Packaged and deployed the full-stack web application to production on Render using Flask.',
    ],
    live: 'https://wastesnap.onrender.com/',
    github: 'https://github.com/Mayank149/WasteSnap',
  },
  {
    id: 'mood2mail',
    title: 'Mood2Mail',
    badge: 'Live',
    isLive: true,
    category: 'nlp',
    summary:
      'Email tone analyzer to craft better communication with TF-IDF n-grams and instantaneous sentiment feedback.',
    img: 'img/projects/project3.webp',
    chips: ['Preprint', 'Real-time NLP'],
    tags: ['NLP', 'TF-IDF', 'Flask', 'JavaScript'],
    bullets: [
      'Built a natural language classification engine using TF-IDF n-gram vectorization and Naive Bayes modeling to detect email communication tones.',
      'Implemented a RESTful Flask API providing instantaneous tone scoring (Formal, Friendly, Aggressive) to the client application.',
      'Deployed live on Render with an interactive preview interface delivering real-time sentiment feedback as users type.',
    ],
    live: 'https://mood2mail.onrender.com/',
    github: 'https://github.com/Mayank149/Mood2Mail',
  },
  {
    id: 'visual-search',
    title: 'Visual Search Engine',
    badge: 'Vision',
    category: 'cv',
    summary:
      'End-to-end visual similarity search engine using ResNet50 deep feature embeddings and FAISS nearest-neighbor indexing.',
    img: 'img/projects/project14.webp',
    chips: ['ResNet50', 'FAISS'],
    tags: ['PyTorch', 'ResNet50', 'FAISS', 'Flask'],
    bullets: [
      'Implemented an end-to-end visual similarity search engine using a pre-trained ResNet50 CNN in PyTorch for deep feature representation.',
      'Utilized FAISS vector indexing to perform fast nearest-neighbor similarity searches across large image datasets.',
      'Constructed an interactive Flask web service supporting real-time image upload, feature vector extraction, and candidate retrieval.',
    ],
    github: 'https://github.com/Mayank149/Visual-Search-Engine',
  },
  {
    id: 'pdf-rag',
    title: 'PDF Question Answering (RAG)',
    badge: 'RAG',
    category: 'rag',
    summary:
      'Low-latency PDF question answering pipeline using Sentence Transformers, FAISS similarity search, and Gemini guardrails.',
    img: 'img/projects/project13.webp',
    chips: ['Gemini API', 'FAISS'],
    tags: ['Gemini', 'FAISS', 'Sentence Transformers', 'Flask'],
    bullets: [
      'Built an end-to-end PDF question answering pipeline using Sentence Transformers embeddings and a FAISS vector index for low-latency similarity search.',
      'Integrated Gemini API with structured prompt engineering and safety guardrails to enforce context grounding and mitigate hallucinations.',
      'Developed an interactive web interface with Flask for dynamic PDF ingestion, chunking, and document querying.',
    ],
    github: 'https://github.com/Mayank149/PDF-Question-Answering-RAG-System',
  },
  {
    id: 'complaint-triage',
    title: 'AI Complaint Triage System',
    badge: 'ML',
    category: 'nlp',
    summary:
      'Automated complaint routing with TF-IDF, hybrid credibility scoring, and centralized audit dashboard.',
    img: 'img/projects/project15.webp',
    tags: ['Scikit-learn', 'TF-IDF', 'Flask', 'Database'],
    bullets: [
      'Developed an automated complaint triage system using TF-IDF vectorization and Logistic Regression to predict target departments and urgency levels.',
      'Formulated a hybrid credibility scoring algorithm with dynamic follow-up question generation to validate incoming claims.',
      'Engineered a centralized admin dashboard with persistent database storage for auditing, ticket assignment, and oversight.',
    ],
    github:
      'https://github.com/Mayank149/AI-Complaint-Triage-and-Routing-System-with-Hybrid-Credibility-Scoring-and-Feedback-Learning',
  },
  {
    id: 'dyslexia-ai',
    title: 'Dyslexia AI Assistant',
    badge: 'Transformer',
    category: 'nlp',
    summary:
      'Assistive text simplification pipeline powered by a fine-tuned T5 Transformer with accessible typography.',
    img: 'img/projects/project12.webp',
    tags: ['T5 Transformer', 'Flask', 'NLP'],
    bullets: [
      'Deployed an assistive text simplification pipeline powered by a fine-tuned T5 Transformer sequence-to-sequence model.',
      'Automated the syntactic restructuring of dense, complex passages into simplified sentences while preserving factual nuance.',
      'Built an accessible Flask web interface designed with dyslexia-friendly typographic formatting and contrast controls.',
    ],
    github: 'https://github.com/Mayank149/Dyslexia-AI-Assistant',
  },
  {
    id: 'asl-signs',
    title: 'ASL Hand Signs Predictor',
    badge: 'Vision',
    category: 'cv',
    summary:
      'Real-time American Sign Language recognition using deep CNNs, OpenCV, and MediaPipe hand landmarks.',
    img: 'img/projects/project11.webp',
    tags: ['TensorFlow', 'MediaPipe', 'OpenCV', 'CNN'],
    bullets: [
      'Trained a deep CNN on American Sign Language datasets utilizing GPU acceleration in Google Colab with data augmentation.',
      'Integrated MediaPipe and OpenCV pipelines for real-time hand landmark detection and region-of-interest segmentation.',
      'Implemented low-latency webcam stream processing to deliver continuous real-time sign language prediction.',
    ],
    github: 'https://github.com/Mayank149/ASL_Hand_sign_recognizer',
  },
  {
    id: 'biasxray',
    title: 'BiasX-Ray',
    badge: 'Live',
    isLive: true,
    category: 'nlp',
    summary:
      'Real-time NLP engine scanning text for gender-coded bias and microaggressions with inclusive phrasing suggestions.',
    img: 'img/projects/project1.webp',
    tags: ['spaCy', 'NLTK', 'Flask', 'JavaScript'],
    bullets: [
      'Engineered a real-time NLP text analysis engine using spaCy and NLTK to scan communications for gender-coded bias and microaggressions.',
      'Implemented a rule-augmented recommendation system proposing inclusive, respectful phrasing alternatives.',
      'Deployed full-stack application live on Render featuring asynchronous API communication and visual inline highlights.',
    ],
    live: 'https://biasx.onrender.com',
    github: 'https://github.com/Mayank149/BiasX',
  },
  {
    id: 'digidetect',
    title: 'DigiDetect',
    badge: 'CNN',
    category: 'cv',
    summary:
      'Handwritten digit classifier with real-time HTML5 canvas drawing and softmax probability distributions.',
    img: 'img/projects/project9.webp',
    tags: ['TensorFlow', 'CNN', 'Flask'],
    bullets: [
      'Architected and trained a Convolutional Neural Network (CNN) in TensorFlow/Keras for robust handwritten digit classification.',
      'Supported dual input streams with real-time HTML5 Canvas drawing and image file uploads with server-side grayscale normalization.',
      'Engineered a Flask backend serving low-latency inference along with full softmax probability distributions.',
    ],
    github: 'https://lnkd.in/g53-Pq3c',
  },
  {
    id: 'stylenet',
    title: 'StyleNet',
    badge: 'CNN',
    category: 'cv',
    summary:
      'Deep CNN trained on Fashion MNIST achieving ~91% test accuracy with drag-and-drop Flask inference.',
    img: 'img/projects/project10.webp',
    tags: ['TensorFlow', 'CNN', 'Flask'],
    bullets: [
      'Designed and trained a deep CNN on the Fashion MNIST benchmark dataset, achieving ~91% test classification accuracy.',
      'Implemented server-side image preprocessing pipelines for 28x28 grayscale normalization and tensor reshaping.',
      'Deployed as an interactive Flask application enabling drag-and-drop image uploads with immediate categorical predictions.',
    ],
    github: 'https://lnkd.in/gvrTxBQ9',
  },
  {
    id: 'music-genre',
    title: 'Music Genre Classifier',
    badge: 'Audio ML',
    category: 'nlp',
    summary:
      'Audio signal processing pipeline using Librosa MFCCs and spectral features served via Flask REST API.',
    img: 'img/projects/project6.webp',
    tags: ['Librosa', 'Python', 'Flask API'],
    bullets: [
      'Developed an audio signal processing pipeline leveraging Librosa to extract MFCCs, spectral roll-off, and chroma features.',
      'Built a modular Flask REST API handling multiformat audio uploads (MP3, WAV) with configured CORS headers.',
      'Optimized audio feature extraction pipelines ensuring compatibility across runtime environments.',
    ],
    github: 'https://github.com/Mayank149/Music-genre-Classification-Backend-',
  },
  {
    id: 'fake-job',
    title: 'Fake Job Detector',
    badge: 'Live',
    isLive: true,
    category: 'nlp',
    summary:
      'Supervised Logistic Regression classifier detecting fraudulent job postings, deployed live on Render.',
    img: 'img/projects/project4.webp',
    tags: ['Scikit-learn', 'Flask', 'NLP'],
    bullets: [
      'Trained a supervised Logistic Regression classifier on labeled job posting datasets to identify fraudulent postings.',
      'Executed text preprocessing including tokenization, stop-word filtering, and term frequency feature extraction.',
      'Deployed full-stack web application live on Render utilizing a Flask backend and vanilla JavaScript interface.',
    ],
    live: 'https://fake-job-postings.onrender.com/',
    github: 'https://github.com/Mayank149/Fake-job-postings',
  },
  {
    id: 'car-mileage',
    title: 'Car Mileage Predictor',
    badge: 'Live',
    isLive: true,
    category: 'nlp',
    summary:
      'Predictive regression pipeline with feature engineering and Grid Search tuning for vehicle efficiency.',
    img: 'img/projects/project5.webp',
    tags: ['Linear Regression', 'Grid Search', 'Flask'],
    bullets: [
      'Constructed a predictive regression pipeline featuring domain-specific feature engineering and Grid Search parameter tuning.',
      'Evaluated multi-attribute automotive specifications to compute calibrated vehicle fuel efficiency metrics.',
      'Deployed live on Render with an intuitive form interface and Flask REST backend.',
    ],
    live: 'https://mileage-predictor.onrender.com/',
    github: 'https://github.com/Mayank149/Mileage_Predictor',
  },
  {
    id: 'movie-rec',
    title: 'Movie Recommender',
    badge: 'ML',
    category: 'nlp',
    summary:
      'Content-based recommendation engine utilizing cosine similarity matrices across movie metadata.',
    img: 'img/projects/project7.webp',
    tags: ['Python', 'Cosine Similarity', 'Data Analysis'],
    bullets: [
      'Architected a content-based recommendation algorithm utilizing cosine similarity matrices across movie titles, genres, and metadata.',
      'Built data transformation pipelines in Python to process movie datasets and return ranked high-affinity recommendations.',
    ],
    github: 'https://github.com/Mayank149/Movie-Recommendation-System/tree/main',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'rag-agents',
    title: 'RAG & Agentic AI',
    subtitle: 'LLM pipelines, retrieval & orchestration',
    icon: 'brain',
    skills: [
      'LangChain',
      'LangGraph',
      'RAG',
      'FAISS',
      'ChromaDB',
      'Gemini API',
      'Sentence Transformers',
      'Fine Tuning',
    ],
  },
  {
    id: 'ml-dl',
    title: 'ML & Deep Learning',
    subtitle: 'Training, vision & evaluation',
    icon: 'cpu',
    skills: [
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'Neural Networks',
      'CNNs',
      'Computer Vision',
      'NLP',
      'Model Evaluation',
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Core engineering & DSA',
    icon: 'code',
    skills: ['Python', 'C++', 'C', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'HTML / CSS'],
  },
  {
    id: 'backend-mlops',
    title: 'Backend & MLOps',
    subtitle: 'APIs, containers & tracking',
    icon: 'server',
    skills: ['FastAPI', 'Flask', 'REST APIs', 'Docker', 'MLFlow', 'Git & GitHub', 'MLOps'],
  },
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    title: 'Mood2Mail: Real-Time Email Tone Analyzer (Preprint)',
    date: 'July 18, 2025',
    type: 'Research Preprint',
    summary:
      'Preprint describing Mood2Mail, a lightweight real-time email tone analyzer using TF-IDF with Logistic Regression and Naive Bayes.',
    img: 'img/blog/blog3.webp',
    primaryUrl: 'https://zenodo.org/records/16102315',
    primaryLabel: 'Read Paper',
    secondaryUrl: 'https://github.com/Mayank149/Mood2Mail',
    secondaryLabel: 'GitHub',
  },
  {
    title: 'Google Veo 3 and the Death of Reality',
    date: 'May 29, 2025',
    type: 'Medium Essay',
    summary:
      "Analysis of Google's Veo 3 AI video generation model and its implications for creativity, reality, and content creation.",
    img: 'img/blog/blog2.webp',
    primaryUrl:
      'https://medium.com/@bansalmayank1414/google-veo-3-and-the-death-of-reality-or-the-rebirth-of-creativity-1754b0569d97',
    primaryLabel: 'Read on Medium',
  },
  {
    title: 'AI in Fiction and in Reality',
    date: 'April 27, 2025',
    type: 'Medium Essay',
    summary:
      'Exploring how science fiction shapes our understanding of AI versus the reality of modern deployed machine learning systems.',
    img: 'img/blog/blog1.webp',
    primaryUrl:
      'https://medium.com/@bansalmayank1414/ai-in-fiction-and-in-reality-7545bb4fdf63',
    primaryLabel: 'Read on Medium',
  },
];

export const CERTIFICATES = Array.from(
  { length: 9 },
  (_, i) => `img/certificates/certificate${i + 1}.webp`
);
