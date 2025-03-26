import { InlineCode, Tag } from "@/once-ui/components";
import { title } from "process";

const person = {
  firstName: "Mohd Nasar",
  lastName: "Siddiqui",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Junior UG , IIT Kanpur CSE",
  avatar: "/images/gallery/Avatar.jpg",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Hindi"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/mohd-nasar/",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mohd-nasar-a2284a25a/",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:snasar@iitk.ac.in",
  },
  {
    name: "Codeforces",
    icon: "codeforces",
    link: "https://codeforces.com/profile/nasar986",
  },
  {
    name: "Leetcode", 
    icon: "leetcode",
    link: "https://leetcode.com/nasarsidd986/",
  }
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>B.Tech CSE at IIT Kanpur</>,
  subline: (
    <>
      I'm Mohd Nasar Siddiqui, a B.tech CSE undergrad at  <InlineCode>IIT Kanpur</InlineCode>, where I craft intuitive
      <br /> solutions for the problems I create.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am a Computer Science and Engineering student at IIT Kanpur with expertise in machine learning and full-stack web development. I have worked on ML models for political data prediction and LSTM-based text classification.

        In web development, I led the backend architecture for a platform connecting IIT Kanpur students with professors, using React.js, Node.js, Express.js, and MongoDB. I have also worked with PostgreSQL, Sequelize ORM, and Agile methodologies.

        As a WorldQuant BRAIN Research Consultant and GDSC mentee in App Development (Flutter), I am passionate about solving complex problems and building scalable solutions
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "WorldQuant LLC",
        timeframe: "2024 - Present",
        role: "Reasearch Consultant",
        achievements: [
          <>
            Developed & backtested 2,000+ quantitative trading alphas using Brain platform,
            leveraging statistical arbitrage, factor modeling, & ML to identify profitable market inefficiencies across global equity & markets
          </>,
          <>
            Optimized trading strategies using advanced techniques such as regression analysis, time-series forecasting,
            analyzing stocks, achieving improved Sharpe ratios, reduced drawdowns, & enhanced risk-adjusted returns.

          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          
        ],
      },
      {
        company: "Outlier.ai",
        timeframe: "2024 - Present",
        role: "Consultant",
        achievements: [
          <>
            Enhanced ML model performance through prompt engineering, fine-tuning responses for improved accuracy and relevance.
          </>,
          <>
          Designed and optimized LLM-based workflows, refining prompts to align with business objectives and maximize model efficiency.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Indian Institute of Technology, Kanpur",
        description: <>B.Tech in Computer Science and Engineering</>,
      },
      {
        name: "Ewing Christian Public School, Allahabad",
        description: <>CBSE class XII</>,
      },
      {
        name: "Ewing Christian Public School, Allahabad",
        description: <>CBSE class X</>,
      }
    ],
  },
  achievements: { // optional: leave the array empty if you don't want to display achievements    
    display: true,
    title: "Achievements",  
    items: [
      "Qualifited Jee Advanced 2022",
      "Qualified Jee Mains 2022",
      "Ranked Specialist in codeforces achieving maximum rating 1443",
      "Solved over 250 problems on leetcode",
      "Qualified Internationl Quant Championship 2024 with rank of 345 globally",
      "Secured 81% in CBSE class XII",
      "Secured 87.4% in CBSE class X",
    ]
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Blog & AI Assistant",
  title: "Writing about design, tech, and AI insights",
  description: `Read ${person.name}'s latest articles or chat with our AI assistant`,
  welcomeMessage: "Hello! I'm your AI assistant. How can I help you today?",
  emptyState: {
    title: "No active conversation",
    description: "Start a new chat or select a previous one from the sidebar"
  },
  disclaimer: "AI responses may contain inaccuracies. Verify important information.",
  apiEndpoint: "https://idk.com/api/chat",
  features: {
    chat: true,
    search: false,
    images: false
  },
  ui: {
    showSidebar: true,
    defaultView: "chat" // 'chat' | 'blog'
  },
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
  posts: {
    perPage: 10,
    defaultRange: [1, 3],
    extendedRange: [4],
    columns: "2"
  }
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  skills: [
    {
      image:{
        src: "/images/skills/devops.webp",
        alt:"skill-img",
        width:16,
        height:9
      },
      title: "DevOps",
      Tags: [
        "Git/Github",
        "Jenkins",
        "Docker",
        "Azure",
        "Google Cloud",
        "SQL and noSQL",
        "AWS",
        "Postman"
      ]
     },
     {
      image:{
        src: "/images/skills/ml.webp",
        alt:"skill-img",
        width:16,
        height:9
      },
      title: "Machine Learning / AI",
      Tags: [
        "Fine-tuning ",
        "RAG",
        "GANs",
        "Classification & Regression ",
        "DNNs",
        "CNNs",
        "RNNs",
        "Generative AI"
      ]
     },
     {
      image:{
        src: "/images/skills/webdev.webp",
        alt:"skill-img",
        width:16,
        height:9
      },
      title: "Web Development",
      Tags: [
        "HTML5 & CSS3",
        "JavaScript (ES6+)",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "FastAPI",
        "Django",
        "RESTful API Development"
      ]
     },
     {
      image:{
        src: "/images/skills/dbms.webp",
        alt:"skill-img",
        width:16,
        height:9
      },
      title: "Database Managment",
      Tags: [
        "Query Optimization",
        "Indexing Strategies",
        "Schema Design",
        "Normalization",
        "PostGres & MongoDB",
        "SQL"
      ]
     },
     {
      image:{
        src: "/images/skills/plang.webp",
        alt:"skill-img",
        width:16,
        height:9
      },
      title: "Programming Languages",
      Tags: ["C/C++","Python","JavaScript","Dart","Bash"]
     },
     {
      image:{
        src: "/images/skills/appdev.webp",
        alt:"skills img",
        width:16,
        height:9
      },
      title: "App Development",
      Tags: ["Dart","Flutter","Cross Platfrom Application Development"]
     },
     {
      image:{
        src: "/images/skills/cybersec.webp",
        alt:"skill-img",
        width:16,
        height:9
      },
      title: "CyberSecurity",
      Tags: [
        "NIDS",
        "HIDS",
        "Zeek/Bro",
        "Snort",
        "Wazuh",
        "Cuckoo Sandbox"
      ]
     },
    
  ],
  projects: [
    {
      "title": "ProfInfo Central",
      "description": [
        <>
          Built a full-stack platform for IIT Kanpur students to apply for professor-led projects.
        </>,
        <>
          Used React.js, Node.js, MongoDB, and Postman for API testing.
        </>
      ],
      "Tags": ["React.js", "Node.js", "MongoDB", "Postman"],
      "images": [{ "src": "/images/projects/profinfo.webp", "alt": "Project image", "width": 16, "height": 9 }]
    },
    {
      "title": "ML Emoticon Classifier",
      "description": [
        <>
          Developed models using LSTM, RNN, and SVM for emoticon classification.
        </>,
        <>
          Achieved 98%+ accuracy with PCA, OneHotEncoding, and ResNet50.
        </>
      ],
      "Tags": ["Python", "TensorFlow", "LSTM", "RNN"],
      "images": [{ "src": "/images/projects/ml.webp", "alt": "Project image", "width": 16, "height": 9 }]
    },
    {
      "title": "App Dev Track | GDSC IITK",
      "description": [
        <>
          Built cross-platform mobile apps like CartApp and QuoteApp using Flutter.
        </>,
        <>
          Achieved 90% test coverage with Flutter Driver.
        </>
      ],
      "Tags": ["Flutter", "Dart", "Mobile Development"],
      "images": [{ "src": "/images/projects/app_dev.webp", "alt": "Project image", "width": 16, "height": 9 }]
    },
    {
      "title": "Network Intrusion Detection",
      "description": [
        <>
          Built a classifier for network intrusion detection using CICFlowMeter.
        </>,
        <>
          Used KNN and Neural Networks, achieving a 0.99 F1 score.
        </>
      ],
      "Tags": ["Python", "KNN", "Neural Networks"],
      "images": [{ "src": "/images/projects/nids.webp", "alt": "Project image", "width": 16, "height": 9 }]
    },
    {
      "title": "Operating Systems Project",
      "description": [
        <>
          Implemented system calls, semaphores, and scheduling policies.
        </>,
        <>
          Designed Round Robin and Unix Scheduler.
        </>
      ],
      "Tags": ["C", "Operating Systems", "Scheduling"],
      "images": [{ "src": "/images/projects/os_project.webp", "alt": "Project image", "width": 16, "height": 9 }]
    },
    {
      "title": "Car Rentals (OOP in C++)",
      "description": [
        <>
          Developed a car rental system using OOP principles in C++.
        </>,
        <>
          Applied encapsulation, inheritance, and polymorphism.
        </>
      ],
      "Tags": ["C++", "OOP", "Software Design"],
      "images": [{ "src": "/images/projects/car_rentals.webp", "alt": "Project image", "width": 16, "height": 9 }]
    }
  ],
  coursework: [
    {
      title: "Data Structures and Algorithms",
      description: "Learned about data structures and algorithms, including arrays, linked lists, stacks, queues, trees, graphs, and sorting and searching algorithms.",
    },
    {
      title: "Operating Systems",
      description: "Learned about operating system concepts, including processes, threads, CPU scheduling, memory management, file systems, and I/O systems.",
    },
    {
      title: "Database Management Systems",
      description: "Learned about database management systems, including relational database design, SQL, normalization, indexing, and transactions.",
    },
    {
      title: "Object-Oriented Programming",
      description: "Learned about object-oriented programming concepts, including classes, objects, inheritance, polymorphism, and encapsulation.",
    },
    {
      title: "Computer Networks",
      description: "Learned about computer networks, including the OSI model, TCP/IP, routing, switching, and network security.",
    },
    {
      title: "Machine Learning",
      description: "Learned about machine learning concepts, including supervised learning, unsupervised learning, reinforcement learning, and neural networks.",
    },
  ], 
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
