export function Header() {
    return (
        <header className="bg-dark text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <h1>Varinder Singh</h1>
                <nav className="navigationHeader">
                    <a href="#about" className="text-white me-3">About</a>
                    <a href="#projects" className="text-white me-3">Projects</a>
                    <a href="#experience" className="text-white me-3">Experience</a>
                    <a href="#skills" className="text-white me-3">Skills</a>
                    {/* <a href="#contact" className="text-white">Contact</a> */}
                </nav>
            </div>
        </header>
    );
};

export function Hero() {
    return (
        <section className="bg-primary text-white text-center py-5">
            <div className="container">
                <h2 className="display-4">Creative Full Stack Developer</h2>
                <p className="lead">Passionate about building impactful web solutions.</p>
                <a href="#projects" className="btn btn-light btn-lg mt-3">View My Work</a>
            </div>
        </section>
    );
}

export function About() {
    return (
        <section id="about" className="py-5">
            <div className="container">
                <h2>About Me</h2>
                <p>I am a Full Stack Developer with over 3 years of experience specializing in React, Node.js, and PHP. Currently exploring 3D architectural design and gaming content creation.</p>
            </div>
        </section>
    );
}


export function Projects() {
    return (
        <section id="projects" className="bg-light py-5">
            <div className="container">
                <h2>Projects</h2>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Subscription Platform</h3>
                                <p className="card-text">A platform for community managers with subscription features using React and Node.js.</p>
                                <a href="#" className="btn btn-primary">View on GitHub</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Zoom Integration App</h3>
                                <p className="card-text">Integrated Zoom API with React and Node.js for seamless meeting experiences.</p>
                                <a href="#" className="btn btn-primary">View on GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function Experience() {
    return (
        <section id="experience" className="py-5">
              <div className="container">
                <h2>Experience</h2>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Subscription Platform</h3>
                                <p className="card-text">A platform for community managers with subscription features using React and Node.js.</p>
                                <a href="#" className="btn btn-primary">View on GitHub</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Zoom Integration App</h3>
                                <p className="card-text">Integrated Zoom API with React and Node.js for seamless meeting experiences.</p>
                                <a href="#" className="btn btn-primary">View on GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export function Skills() {
    return (
        <section id="skills" className="bg-light py-5">
            <div className="container">
                <h2>Skills</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Frontend: React, React Native, Vite</li>
                    <li className="list-group-item">Backend: Node.js, Sequelize, PHP</li>
                    <li className="list-group-item">Tools: Zoom SDK, Memory Optimization</li>
                    <li className="list-group-item">Other: 3D Architecture Design</li>
                </ul>
            </div>
        </section>
    );
}

export function Contact() {
    return (
        <section id="contact" className="py-5">
            <div className="container">
                <h2>Contact Me</h2>
                <form className="formContactUs">
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Your Email" required />
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send</button>
                </form>
            </div>
        </section>
    );
}

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white py-3">
            <div className="container text-center">
                <p>&copy; {currentYear} Varinder Singh</p>
                <div className="footContainer">
                    <a target="_blank" href="https://www.linkedin.com/in/varinder-singh-b5231a1b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-white me-3">LinkedIn</a>
                    <a target="_blank" href="https://github.com/royVarinder" className="text-white me-3">GitHub</a>
                    {/* <a href="https://youtube.com" className="text-white">YouTube</a> */}
                </div>
            </div>
        </footer>
    );
}