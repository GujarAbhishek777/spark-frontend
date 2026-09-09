export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const MOCK_USERS = [
  {
    _id: "user_mock_101",
    firstName: "Aarav",
    lastName: "Sharma",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    age: 26,
    gender: "male",
    about: "Senior Full-Stack Engineer at a Bengaluru fintech startup. Passionate about React, microservices, scalable distributed systems, and filter coffee ☕️.",
    skills: ["React", "Node.js", "TypeScript", "System Design", "AWS"]
  },
  {
    _id: "user_mock_102",
    firstName: "Ananya",
    lastName: "Iyer",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    age: 24,
    gender: "female",
    about: "AI & ML Engineer working on LLM applications and RAG pipelines in Bengaluru. Computer vision nerd & Hindustani classical music enthusiast 🎶.",
    skills: ["Python", "PyTorch", "LangChain", "FastAPI", "Docker"]
  },
  {
    _id: "user_mock_103",
    firstName: "Rohan",
    lastName: "Mehta",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    age: 28,
    gender: "male",
    about: "Cloud Architect & DevOps practitioner based in Pune. Automating cloud pipelines, Kubernetes management, and Western Ghats weekend road trips 🛣️.",
    skills: ["Kubernetes", "Docker", "Terraform", "Go", "AWS"]
  },
  {
    _id: "user_mock_104",
    firstName: "Priya",
    lastName: "Patel",
    photoUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80",
    age: 25,
    gender: "female",
    about: "Product Designer & UI/UX Specialist in Hyderabad. Turning complex product specifications into delightful design systems & smooth animations ✨.",
    skills: ["Figma", "Design Systems", "UI/UX", "Tailwind CSS", "Prototyping"]
  },
  {
    _id: "user_mock_105",
    firstName: "Vikram",
    lastName: "Deshmukh",
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    age: 29,
    gender: "male",
    about: "Backend Lead & High-Performance Rust enthusiast in Mumbai. Deep diving into database internals, low-latency WebSockets, and distributed queues 🦀.",
    skills: ["Rust", "PostgreSQL", "Redis", "Kafka", "Node.js"]
  },
  {
    _id: "user_mock_106",
    firstName: "Kavya",
    lastName: "Nair",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    age: 27,
    gender: "female",
    about: "Frontend Architect obsessed with web performance and modern React. Passionate about open-source contribution and South Indian filter chai ☕.",
    skills: ["React", "Next.js", "Redux Toolkit", "GraphQL", "Performance"]
  },
  {
    _id: "user_mock_107",
    firstName: "Kabir",
    lastName: "Verma",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    age: 25,
    gender: "male",
    about: "Cybersecurity Specialist & Ethical Hacker based in Gurgaon. Analyzing smart contract vulnerabilities, Web3 security, and CTF challenges 🛡️.",
    skills: ["Cybersecurity", "Go", "Ethical Hacking", "Linux", "Solidity"]
  }
];

export const MOCK_REQUESTS = [
  {
    _id: "req_mock_201",
    status: "interested",
    fromUserId: {
      _id: "user_mock_201",
      firstName: "Maya",
      lastName: "Malhotra",
      photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      age: 23,
      gender: "female",
      about: "Frontend wizard building Next.js apps in Delhi. Looking for tech collaborators for open-source AI projects!",
      skills: ["React", "Next.js", "Tailwind CSS"]
    }
  },
  {
    _id: "req_mock_202",
    status: "interested",
    fromUserId: {
      _id: "user_mock_202",
      firstName: "Siddharth",
      lastName: "Joshi",
      photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
      age: 28,
      gender: "male",
      about: "Data Engineer & Big Data specialist in Bengaluru. Building real-time streaming architectures & data lakes.",
      skills: ["Python", "Apache Spark", "SQL", "Airflow"]
    }
  }
];

export const MOCK_CONNECTIONS = [
  {
    _id: "user_mock_301",
    firstName: "Sneha",
    lastName: "Reddy",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    age: 26,
    gender: "female",
    about: "Data Scientist turning complex data into actionable machine learning models & business insights 📊.",
    skills: ["Python", "SQL", "Pandas", "Machine Learning"]
  }
];
