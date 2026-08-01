import safePharmacyLogo from "./assets/safePharmacy.svg"
import unleashxLogo from "./assets/appLogoSVG.79310300.svg"

import jyotiDham from "./assets/jyotidham.png"
import DentistreeLogo from "./assets/dentistree.png"
import nightButterFliesLogo from "./assets/nightButtonflieslogo.png"
import peaceArchLogo from "./assets/peaceArchLogo.png"
import tecdemyLogo from "./assets/tecdemy.png"
import ourFairFieldLogo from "./assets/ourfairfieldLogo.png"
import businessOptimaLogo from "./assets/businessOptimaLogo.png"
import profileImage from "./assets/profile2.jpg"
import { FaReact, FaNodeJs, FaWordpress, FaGithub, FaBitbucket, FaBootstrap, FaHtml5, FaMagento } from "react-icons/fa"
import { SiMongodb, SiMysql, SiPostman } from "react-icons/si"

export const PROFILE_IMAGE = profileImage;

export const SUMMARY = "Experienced Full Stack Developer with 5+ years of hands-on experience in building scalable web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js). Strong background in frontend and backend development, REST APIs, database design, and deployment. Proven ability to lead small teams, deliver client projects, and work with international clients.";

export const OBJECTIVE = "I'm currently looking to join a cross-functional team that values impactful software solutions, where I can grow into a leadership role while continuously learning.";

export const projects = [
    {
        title: 'UnleashX',
        // description: 'E-Commerce website for medicines',
        image: unleashxLogo,
        link: 'https://unleashx.ai/',
    },
    {
        title: 'SafePharmacy',
        // description: 'E-Commerce website for medicines',
        image: safePharmacyLogo,
        link: 'https://safepharmacy.in/',
    },
    {
        title: 'JyotiDham',
        // description: 'A full-stack e-commerce application with user authentication, product management, and payment integration.',
        image: jyotiDham,
        link: 'https://jyotidham.ca/',
    },
    {
        title: 'Dentistree',
        // description: 'A real-time chat app built with Node.js, Socket.IO, and React for seamless communication.',
        image: DentistreeLogo,
        link: 'https://dentistree.ca/',
    },
    {
        title: 'Night Butterflies',
        // description: 'A task management tool to organize daily activities, built using React and Redux.',
        image: nightButterFliesLogo,
        link: 'https://nightbutterflies.com/',
    },
    {
        title: 'Peace Arch Duty Free',
        // description: 'A task management tool to organize daily activities, built using React and Redux.',
        image: peaceArchLogo,
        link: 'https://peacearchdutyfree.com/',
    },
    {
        title: 'Tecdemy',
        // description: 'A task management tool to organize daily activities, built using React and Redux.',
        image: tecdemyLogo,
        link: 'https://alpha.tecdemy.com/',
    },
    {
        title: 'OurFair Field',
        // description: 'A task management tool to organize daily activities, built using React and Redux.',
        image: ourFairFieldLogo,
        link: 'https://ourfairfield.com/',
    },
    {
        title: 'Business Optima',
        // description: 'A task management tool to organize daily activities, built using React and Redux.',
        image: businessOptimaLogo,
        link: 'https://businessoptima.com/',
    },
];


export const experiences = [
    {
        title: 'SDE-2 (Full Stack Developer)',
        company: 'UnleashX',
        duration: 'Jan 2025 - Present',
        description: 'Building an AI-based web app with AI Agent and automation workflows.',
    },
    {
        title: 'Full Stack Developer / Team Lead',
        company: 'Business Optima',
        duration: '2024 - 2025',
        description: 'Led a small team building Tecdemy, an education platform.',
    },
    {
        title: 'MERN Stack Developer',
        company: 'NetQuall Technologies',
        duration: '2023 - 2025',
        description: 'Built modules for BirdDog, a CRM application.',
    },
    {
        title: 'React Developer',
        company: 'Speedum Technologies',
        duration: 'June 2021 - Oct 2023',
        description: 'Built dashboards and admin panels for HealthVault, a healthcare product.',
    },
];

export const techStack = [
    { name: 'ReactJS', Icon: FaReact },
    { name: 'NodeJS', Icon: FaNodeJs },
    { name: 'MongoDB', Icon: SiMongodb },
    { name: 'MySQL', Icon: SiMysql },
    { name: 'HTML & CSS', Icon: FaHtml5 },
    { name: 'WordPress', Icon: FaWordpress },
    { name: 'Magento', Icon: FaMagento },
    { name: 'GitHub', Icon: FaGithub },
    { name: 'Bitbucket', Icon: FaBitbucket },
    { name: 'Postman', Icon: SiPostman },
    { name: 'Bootstrap', Icon: FaBootstrap },
];


export const skills = [
    { name: 'ReactJS', proficiency: 90 },
    { name: 'NodeJS', proficiency: 80 },
    { name: 'MongoDB', proficiency: 50 },
    { name: 'MySQL', proficiency: 80 },
    { name: 'HTML & CSS', proficiency: 95 },
    // { name: 'PHP', proficiency: 60 },
    // { name: 'JQuery', proficiency: 50 },
    { name: 'WordPress', proficiency: 70 },
    { name: 'Magento', proficiency: 60 },
    { name: 'GitHub', proficiency: 90 },
    { name: 'Bitbucket', proficiency: 60 },
    { name: 'Postman', proficiency: 90 },
    { name: 'Bootstrap', proficiency: 80 },
    { name: 'Team Leader', proficiency: 60 },

];