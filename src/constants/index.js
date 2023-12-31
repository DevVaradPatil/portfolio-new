import {
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    bb,
    nalanda,
    gericht,
    threejs,
    freelancer,
    bblogo,
    plantsnap,
    organizify,
    snikrz,
    threads,
    spotify
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "projects",
      title: "Projects"
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Next.js",
      icon: "https://sourabhportfolio.vercel.app/_next/static/media/nextjs.78e10107.svg",
    },
    {
      title: "React.js",
      icon: "https://sourabhportfolio.vercel.app/_next/static/media/reactjs.1aa78cde.svg",
    },
    {
      title: "Tailwind CSS",
      icon: "https://sourabhportfolio.vercel.app/_next/static/media/tailwindcss.d5e64ee8.svg",
    },
    {
      title: "HTML/CSS/JS",
      icon: "https://sourabhportfolio.vercel.app/_next/static/media/htmlcss.84be4743.svg",
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "React.js Developer",
      company_name: "Bubble Byte",
      icon: bblogo,
      iconBg: "#383E56",
      date: "Aug 2022 - Aug 2023",
      points: [
        "Developed and maintained responsive and user-friendly websites using modern web technologies, such as HTML5, CSS3, and JavaScript.",
        "Collaborated with cross-functional teams to design and implement front-end solutions that aligned with project requirements and business goals.",
        "Utilized frameworks and libraries like React.js, Angular, or Vue.js to build interactive and dynamic user interfaces, enhancing user experience and engagement.",
        "Implemented responsive web design principles to ensure seamless functionality and visual consistency across different devices and screen sizes.",
      ],
    },
    {
      title: "FullStack Web Developer",
      company_name: "Freelancer",
      icon: freelancer,
      iconBg: "#383E56",
      date: "Aug 2023 - Present",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Varad proved me wrong.",
      name: "Asha Patel",
      designation: "CEO",
      company: "TechWiz Solutions",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Varad does.",
      name: "Rohit Jadhav",
      designation: "Creative Director",
      company: "DigitalXcel",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "Incredible design, seamless functionality! Highly recommend. Varad is just phenomenal!",
      name: "A K Pathan",
      designation: "CEO",
      company: "Bubble Byte",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Spotify 2.O",
      description:
        "Experience a personalized music journey on my Spotify clone website, featuring seamless user authentication for a secure and customized musical exploration",
      tags: [
        {
          name: "Next.js",
          color: "white-text-gradient",
        },
        {
          name: "Supabase",
          color: "orange-text-gradient",
        },
        {
          name: "Stripe",
          color: "green-text-gradient",
        },
      ],
      image: spotify,
      source_code_link: "https://spotify-2-o.vercel.app/",
    },
    {
      name: "Snikrz",
      description:
        "Ultimate sneaker shopping destination with our MERN-based full-stack e-commerce website, offering a seamless blend of style and technology for all your footwear needs.",
      tags: [
        {
          name: "MERN",
          color: "white-text-gradient",
        },
        {
          name: "MongoDB",
          color: "orange-text-gradient",
        },
        {
          name: "Stripe",
          color: "pink-text-gradient",
        },
      ],
      image: snikrz,
      source_code_link: "http://snikrz.web.app/",
    },
    {
      name: "Threads",
      description:
        "Threads your new social media hub! A dynamic full stack web platform for sharing ideas and connecting white like-minded individuals and stay productive",
      tags: [
        {
          name: "nextjs",
          color: "white-text-gradient",
        },
        {
          name: "MongoDB",
          color: "green-text-gradient",
        },
        {
          name: "clerk",
          color: "orange-text-gradient",
        },
      ],
      image: threads,
      source_code_link: "https://threads-app-sooty.vercel.app/",
    },
    {
      name: "Organizify",
      description:
        "Your all-in-one task organizer powered by Next.js and OpenAI. Experience seamless task management with drag-and-drop ease, and enjoy quick summaries of your to-dos.",
      tags: [
        {
          name: "nextjs",
          color: "orange-text-gradient",
        },
        {
          name: "appwrite",
          color: "pink-text-gradient",
        },
        {
          name: "clerk",
          color: "white-text-gradient",
        },
      ],
      image: organizify,
      source_code_link: "https://organizify-by-varad-ass8e66kb-devvaradpatil.vercel.app/",
    },
    {
      name: "PlantSnap",
      description:
        "Your ultimate plant identification companion! Simply snap a photo of any plant, and let us instantly identify it for you. Explore the fascinating world of flora at your fingertips.",
      tags: [
        {
          name: "react",
          color: "white-text-gradient",
        },
        {
          name: "mongodb",
          color: "pink-text-gradient",
        },
        {
          name: "API",
          color: "green-text-gradient",
        },
      ],
      image: plantsnap,
      source_code_link: "https://plantsnap.web.app/",
    },
    {
      name: "Gericht Restaurant",
      description:
        "Gericht Restaurant Website, which has the most elegant design with a beautiful UI that will make any viewer drool just by the looks of it made with ReactJS ",
      tags: [
        {
          name: "react",
          color: "black-text-gradient",
        },
        {
          name: "mongodb",
          color: "orange-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: gericht,
      source_code_link: "https://gericht-restaurant-by-varad.web.app/",
    },
    {
      name: "Bubble Byte",
      description:
        "A Website for Bubble Byte an innovative EdTech startup that is revolutionizing the way students learn and engage with technology and have fun at the same time. ",
      tags: [
        {
          name: "react",
          color: "orange-text-gradient",
        },
        {
          name: "restapi",
          color: "orange-text-gradient",
        },
        {
          name: "scss",
          color: "black-text-gradient",
        },
      ],
      image: bb,
      source_code_link: "https://bubblebyte.in/",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };