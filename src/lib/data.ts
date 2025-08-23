
export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  link: string;
  liveLink?: string;
  image: string;
  details?: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  content: string;
}

export const homeData = {
  name: "Hi, I'm Lalit Kumar Sengar",
  tagline: "Hi, I'm Lalit Kumar Sengar — a passionate full-stack developer with a knack for building scalable, real-world applications. I love turning ideas into clean, efficient code and have hands-on experience with React, Node.js, Firebase, and modern web technologies.",
};

export const aboutData = {
  text: [
    "Hello! I'm Jane, a passionate full-stack developer with a love for creating beautiful and functional web applications. My journey into the world of code began with a fascination for how things work on the internet, which quickly evolved into a full-fledged career.",
    "With a background in computer science, I have a strong foundation in both front-end and back-end technologies. I specialize in the MERN stack (MongoDB, Express, React, Node.js) but I'm always eager to learn new technologies and expand my skillset. I've had the pleasure of working on a variety of projects, from small business websites to large-scale enterprise applications.",
    "I believe in writing clean, maintainable, and efficient code. I'm a firm believer in the power of collaboration and enjoy working in teams to bring ideas to life. When I'm not coding, you can find me exploring the great outdoors, experimenting with new recipes in the kitchen, or getting lost in a good book."
  ],
  image: "https://placehold.co/600x800.png",
};

export const projectsData: Project[] = [
  {
    id: 'project-1',
    name: 'Food Share',
    description: 'A web application that helps connect people with surplus food to those in need, reducing food waste and helping the community.',
    tech: ['React', 'Node.js', 'Firebase', 'Express'],
    link: '/projects/food-share',
    liveLink: 'https://food-share-waste-reduction.vercel.app/',
    image: "/foodshare1.png",
    details: `
🍲 Food Share & Reduction Web App

🔹 **Project Overview**

The Food Share & Reduction Web App is designed to tackle one of the biggest global challenges—food waste. Every year, tons of edible food are discarded while millions of people remain hungry. This platform bridges the gap by enabling individuals, restaurants, and communities to share surplus food, reduce waste, and help those in need through a simple, accessible web interface.

🔹 **Key Features**

- **📦 Food Sharing**: Users can donate or request surplus food within their community.
- **🛒 Smart Tracking**: Helps track food expiry dates to reduce household wastage.
- **🏪 Restaurant & Store Integration**: Partner businesses can list unsold but fresh items at discounted prices.
- **🌍 Community Impact**: Builds local networks to ensure food reaches people instead of landfills.
- **🔔 Real-time Alerts**: Notifications for nearby available food donations or discounted offers.

🔹 **Tech Stack**

- **Frontend**: React.js (modern, responsive UI)
- **Backend**: Node.js + Express.js (secure & scalable APIs)
- **Database**: Firebase (real-time storage & authentication)
- **Additional**: Cloud functions for notifications & geolocation services

🔹 **Impact**

- **♻️ Reduced food waste** by creating an easy donation and redistribution channel.
- **👥 Strengthened local communities** through a food-sharing culture.
- **🍱 Supported sustainability goals** by saving meals that would otherwise be wasted.

🔹 **My Role**

I contributed to:
- Designing a clean and user-friendly web interface
- Backend API development & Firebase integration
- Building features like expiry tracking, donation posting, and real-time alerts

👉 This project reflects my passion for tech-driven social good, sustainability, and building impactful solutions accessible to everyone through the web.
`
  },
  {
    id: 'project-2',
    name: 'Second Project',
    description: 'A description of your second project. You can update this with details about your work.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: '#',
    image: "https://placehold.co/600x400.png",
  },
];

export const postsData: Post[] = [];
