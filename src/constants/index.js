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
  spotify,
  island,
  beaesthetic,
  mern,
  react,
  next,
  tail,
  codesnap,
  zelda,
  aman,
  pghatge,
  psakhre,
  thinktank,
  altair,
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
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "React.js",
    icon: react,
  },
  {
    title: "Next.js",
    icon: next,
  },
  {
    title: "MERN Stack",
    icon: mern,
  },
  {
    title: "Tailwind CSS",
    icon: tail,
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
    date: "Aug 2023 - Dec 2024",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Software Development Intern",
    company_name: "Altair Engineering",
    icon: altair,
    iconBg: "#383E56",
    date: "Jan 2025 - Present",
    points: [
      "Contributed to the development of internal dashboards and web tools using React.js, Tailwind CSS, and RESTful APIs.",
      "Collaborated closely with design and backend teams to create intuitive UI/UX interfaces that support engineering workflows.",
      "Implemented real-time data visualization features and enhanced component performance for large-scale data handling.",
      "Ensured code quality and maintainability by following industry best practices and conducting thorough testing and debugging.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Varad is a talented and dedicated web developer. His positive attitude, dedication and expert skills made our website a great success!",
    name: "Prathamesh Sakhare",
    designation: "Lead",
    company: "GDSC RIT'23",
    image: psakhre,
  },
  {
    testimonial:
      "Varad's web development skills are outstanding. He built a responsive, efficient site that exceeded our expectations. Highly recommend!",
    name: "A K Pathan",
    designation: "CEO",
    company: "Bubble Byte",
    image: aman,
  },
  {
    testimonial:
      "Varad's a problem-solving whiz! Super efficient and always delivering top-notch results. Highly recommend him for any web-development work!",
    name: "Prathamesh Ghatge",
    designation: "Founder",
    company: "A Flat Undesign",
    image: pghatge,
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
        color: "yellow-text-gradient",
      },
      {
        name: "Stripe",
        color: "red-text-gradient",
      },
    ],
    image: spotify,
    source_code_link: "https://spotify-2-o.vercel.app/",
  },
  {
    name: "Think Tank India",
    description:
      "Explore innovation with Think Tank India, a modern blog-style platform designed to showcase projects with a sleek, contemporary design.",
    tags: [
      {
        name: "Next.js",
        color: "white-text-gradient",
      },
      {
        name: "Prisma",
        color: "green-text-gradient",
      },
      {
        name: "Shadcn",
        color: "pink-text-gradient",
      },
    ],
    image: thinktank,
    source_code_link: "http://thinktankindia.vercel.app/",
  },
  {
    name: "Snikrz",
    description:
      "Ultimate sneaker shopping destination with our MERN-based full-stack e-commerce website, offering a seamless blend of style and technology for all your footwear needs.",
    tags: [
      {
        name: "MERN",
        color: "light-pink-text-gradient",
      },
      {
        name: "MongoDB",
        color: "green-golden-text-gradient",
      },
      {
        name: "Stripe",
        color: "yellow-text-gradient",
      },
    ],
    image: snikrz,
    source_code_link: "http://snikrz.web.app/",
  },
  {
    name: "BeAesthetic (Freelance)",
    description:
      "A freelance project done by me for a client. It is a full-stack fitness event website with a beautiful UI/UX design and smooth animations.",
    tags: [
      {
        name: "React.js",
        color: "white-text-gradient",
      },
      {
        name: "Razorpay",
        color: "gray-text-gradient",
      },
      {
        name: "Framer-motion",
        color: "red-text-gradient",
      },
    ],
    image: beaesthetic,
    source_code_link: "https://www.beaesthetic.co.in/",
  },
  {
    name: "CodeSnap",
    description:
      "Streamline your coding experience with CodeSnap, a Next.js-based snippet generator that seamlessly integrates functionality and efficiency for all your development needs.",
    tags: [
      {
        name: "Next.js",
        color: "gray-text-gradient",
      },
      {
        name: "Shadcn",
        color: "white-text-gradient",
      },
      {
        name: "UI/UX",
        color: "light-pink-text-gradient ",
      },
    ],
    image: codesnap,
    source_code_link: "https://codesnap.web.app/",
  },
  {
    name: "3D Portfolio",
    description:
      "Developed an immersive 3D portfolio island website, providing a visually stunning and interactive platform to showcase my projects and creative work.",
    tags: [
      {
        name: "Three.js",
        color: "red-text-gradient",
      },
      {
        name: "React.js",
        color: "light-pink-text-gradient",
      },
      {
        name: "Framer-motion",
        color: "orange-text-gradient",
      },
    ],
    image: island,
    source_code_link: "https://varad-dev-island.vercel.app/",
  },
];

export { services, technologies, experiences, testimonials, projects };
