import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, Card, CardContent, CardMedia, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';
import { PROFILE_IMAGE, experiences, projects, skills } from '../Config';
import { Typography, Grid, Container } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

import { GitHub, LinkedIn, Twitter, Email, WhatsApp, Instagram } from '@mui/icons-material';


export function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {isMobile && (
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Welcome
                </Typography>
                {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {/* <Button color="inherit">Home</Button> */}
                        {/* <Button color="inherit">About</Button> */}
                        {/* <Button color="inherit">Projects</Button> */}
                        {/* <Button color="inherit">Contact</Button> */}
                    </Box>
                )}
                <Button href='mailto:varinder2good@gmail.com' variant="contained" color="secondary" sx={{ marginLeft: isMobile ? 0 : '16px' }}>
                    Hire Me
                </Button>
            </Toolbar>
        </AppBar>
    );
};


const StyledImage = styled('img')({
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
});
export function Hero() {
    return (
        <Box
            sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                <Grid container alignItems="center" spacing={4}>
                    {/* Left Content */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" component="h1" gutterBottom>
                            Hi, I'm Varinder Singh
                        </Typography>
                        <Typography variant="h5" component="p" gutterBottom>
                            Full Stack Developer | Creative Designer | Tech Enthusiast
                        </Typography>
                        <Typography variant="body1" paragraph>
                            I craft modern, responsive websites and applications that bring your ideas to life. Let’s build something amazing together.
                        </Typography>
                        <Box sx={{ mt: 4 }}>
                        
                            <Button variant="contained" color="secondary" href='https://wa.me/+917009650062' target='_blank' size="large">
                                Contact Me
                            </Button>
                        </Box>
                    </Grid>

                    {/* Right Image */}
                    <Grid item xs={12} md={6}>
                        <StyledImage
                            src={PROFILE_IMAGE}
                            alt="Portfolio illustration"
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}


const StyledAvatar = styled(Avatar)({
    width: '200px',
    height: '200px',
    margin: '0 auto',
    borderRadius: '50%',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
});

export function About() {
    return (
        <Box
            sx={{
                py: 8,
                backgroundColor: 'background.default',
                color: 'text.primary',
            }}
            id="about"
        >
            <Container maxWidth="lg">



                <Grid container spacing={4} alignItems="center">
                    {/* Profile Image */}
                    <Grid item xs={12} md={4}>
                        <StyledAvatar
                            src="https://via.placeholder.com/200"
                            alt="Your Name"
                        />
                    </Grid>

                    {/* About Content */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" component="h2" align="" gutterBottom>
                            About Me
                        </Typography>
                        <Typography variant="body1" paragraph>
                            A brief introduction about myself, my background, and what I love to do.
                        </Typography>
                        <Typography variant="h6" component="p" gutterBottom>
                            Hi, I'm Varinder Singh!
                        </Typography>
                        <Typography variant="body1" paragraph>
                            I am a passionate full-stack developer with a knack for designing and building user-friendly web and mobile applications. My journey in the tech world started [X years] ago, and since then, I have honed my skills in [key skills or technologies].
                        </Typography>
                        <Typography variant="body1" paragraph>
                            When I’m not coding, you can find me exploring [your hobbies, e.g., "gaming, traveling, or photography"]. I’m constantly looking for new challenges and opportunities to grow both personally and professionally.
                        </Typography>
                        <Typography variant="body1">
                            Let’s connect and create something amazing together!
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}


export function Projects() {
    return (
        <Box sx={{ py: 3, backgroundColor: 'background.default' }} id="projects">
            <Container maxWidth="lg">
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Projects
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    Here are some of the projects I've worked on recently. Click on a project to learn more.
                </Typography>

                <Grid container spacing={4}>
                    {projects.map((project, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={project.image}
                                    alt={project.title}
                                    style={{ objectFit: 'contain' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        {project.title}
                                    </Typography>
                                    {/* <Typography variant="body2" color="text.secondary">
                                        {project.description}
                                    </Typography> */}
                                </CardContent>
                                <Box sx={{ p: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        href={project.link}
                                        target="_blank"
                                    >
                                        View Project
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export function Experience() {
    return (
        <Box
            sx={{
                // py: 8,
                backgroundColor: 'background.paper',
                color: 'text.primary',
            }}
            id="experience"
        >
            <Container maxWidth="lg">
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Experience
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    A summary of my professional journey and the roles I have undertaken.
                </Typography>

                <Timeline position="alternate">
                    {experiences.map((experience, index) => (
                        <TimelineItem key={index}>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                {index < experiences.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {experience.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                    {experience.company} - {experience.duration}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {experience.description}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </Container>
        </Box>
    );
}


export function Skills() {
    return (
        <Box
            sx={{
                // py: 8,
                backgroundColor: 'background.default',
                color: 'text.primary',
            }}
            id="skills"
        >
            <Container maxWidth="lg">
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Skills
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    Here are some of the technologies and tools I excel at.
                </Typography>

                <Grid container spacing={4}>
                    {skills.map((skill, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Typography variant="h6" gutterBottom>
                                {skill.name}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={skill.proficiency}
                                sx={{ height: 10, borderRadius: 5, mb: 2 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                {skill.proficiency}% Proficiency
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
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
        <Box
            component="footer"
            sx={{
                py: 4,
                mt: 4,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    {/* About Section */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            About Me
                        </Typography>
                        <Typography variant="body2">
                            I am a passionate developer with experience in creating dynamic web and mobile applications. Let’s build something great together!
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    {/* <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Typography variant="body2">
                            <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
                        </Typography>
                        <Typography variant="body2">
                            <a href="#projects" style={{ color: 'inherit', textDecoration: 'none' }}>Projects</a>
                        </Typography>
                    </Grid> */}

                    {/* Social Media */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Follow Me
                        </Typography>
                        <Box>
                            <IconButton
                                color="inherit"
                                component="a"
                                href="https://github.com/royVarinder"
                                target="_blank"
                            >
                                <GitHub />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                component="a"
                                href="https://www.linkedin.com/in/varinder-singh-b5231a1b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                target="_blank"
                            >
                                <LinkedIn />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                component="a"
                                href="https://wa.me/+917009650062"
                                target="_blank"
                            >
                                <WhatsApp />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                component="a"
                                href="https://www.instagram.com/main_varinder/"
                                target="_blank"
                            >
                                <Instagram />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                component="a"
                                href="mailto:varinder2good@gmail.com"
                            >
                                <Email />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Box mt={4} textAlign="center">
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} Varinder Singh. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}