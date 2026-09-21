import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { keyframes } from '@emotion/react';
import { GitHub, LinkedIn, Email, WhatsApp, Instagram } from '@mui/icons-material';
import { SUMMARY, OBJECTIVE, experiences, projects, techStack, skillCategories } from '../Config';

// ---------------------------------------------------------------------------
// Shared palette / building blocks for the dark "glow" theme
// ---------------------------------------------------------------------------

const COLORS = {
    bg: '#0f0518',
    bgAlt: '#160a26',
    panel: 'rgba(255,255,255,0.04)',
    panelBorder: 'rgba(168,85,247,0.25)',
    accent: '#a855f7',
    accentSoft: '#c084fc',
    text: '#f5f3f7',
    textMuted: 'rgba(245,243,247,0.65)',
};

const GlowSection = styled(Box)({
    backgroundColor: COLORS.bg,
    color: COLORS.text,
});

const GlowCard = styled(Box)(({ theme }) => ({
    background: COLORS.panel,
    border: `1px solid ${COLORS.panelBorder}`,
    borderRadius: '16px',
    padding: '24px',
    backdropFilter: 'blur(6px)',
    height: '100%',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 30px rgba(168,85,247,0.25)`,
    },
    [theme.breakpoints.down('sm')]: {
        padding: '16px',
    },
}));

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export function NewHeader() {
    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                backgroundColor: 'rgba(15,5,24,0.85)',
                backdropFilter: 'blur(8px)',
                borderBottom: `1px solid ${COLORS.panelBorder}`,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, gap: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '1.05rem', sm: '1.25rem' },
                            background: `linear-gradient(90deg, ${COLORS.text}, ${COLORS.accentSoft})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Varinder Singh
                    </Typography>
                    <Button
                        href="mailto:varinder2good@gmail.com"
                        variant="contained"
                        sx={{
                            background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentSoft})`,
                            color: '#fff',
                            textTransform: 'none',
                            borderRadius: '999px',
                            px: { xs: 2, sm: 3 },
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                        }}
                    >
                        Hire Me
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Hero (typed headline)
// ---------------------------------------------------------------------------

const ROLES = ['Frontend Developer.', 'Full Stack Developer.', 'MERN Stack Developer.', 'Team Lead.'];

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

function useTypedText(strings, typeSpeed = 70, deleteSpeed = 35, pause = 1400) {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = strings[index % strings.length];
        let timeout;

        if (!deleting && text === current) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && text === '') {
            setDeleting(false);
            setIndex((i) => i + 1);
        } else {
            timeout = setTimeout(() => {
                setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
            }, deleting ? deleteSpeed : typeSpeed);
        }

        return () => clearTimeout(timeout);
    }, [text, deleting, index, strings, typeSpeed, deleteSpeed, pause]);

    return text;
}

export function NewHero() {
    const typed = useTypedText(ROLES);

    return (
        <GlowSection sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="md">
                <Typography sx={{ color: COLORS.textMuted, mb: 1 }}>
                    Hello! I Am <Box component="span" sx={{ color: COLORS.accentSoft }}>Varinder Singh</Box>
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        lineHeight: 1.2,
                        fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                    }}
                >
                    A Frontend / Full Stack Developer who builds{' '}
                    <Box component="span" sx={{ color: COLORS.accent }}>impactful</Box> software.
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        color: COLORS.textMuted,
                        mb: 3,
                        minHeight: { xs: '3.2em', sm: '2.2em' },
                        fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.5rem' },
                    }}
                >
                    I&apos;m a {typed}
                    <Box component="span" sx={{ animation: `${blink} 1s step-end infinite`, ml: 0.5 }}>|</Box>
                </Typography>

                {/* <Typography sx={{ color: COLORS.textMuted, mb: 1 }}>
                    Currently, I&apos;m a Full Stack Developer at{' '}
                    <Box component="span" sx={{ color: COLORS.accentSoft, fontWeight: 600 }}>UnleashX</Box>.
                </Typography> */}

                <Typography sx={{ color: COLORS.textMuted, maxWidth: 640, mb: 4 }}>
                    {SUMMARY}
                </Typography>

                <Button
                    href="https://wa.me/+917009650062"
                    target="_blank"
                    variant="contained"
                    size="large"
                    sx={{
                        background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentSoft})`,
                        borderRadius: '999px',
                        textTransform: 'none',
                        px: 4,
                    }}
                >
                    Contact Me
                </Button>
            </Container>
        </GlowSection>
    );
}

// ---------------------------------------------------------------------------
// Work Experience
// ---------------------------------------------------------------------------

export function NewExperience() {
    return (
        <GlowSection sx={{ py: { xs: 6, md: 10 } }} id="experience">
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                    Work Experience
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 3,
                    }}
                >
                    {experiences.map((experience, index) => (
                        <Box key={index}>
                            <GlowCard>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {experience.title}
                                </Typography>
                                <Typography sx={{ color: COLORS.accentSoft, mb: 1 }}>
                                    {experience.company} &middot; {experience.duration}
                                </Typography>
                                <Typography sx={{ color: COLORS.textMuted }}>
                                    {experience.description}
                                </Typography>
                            </GlowCard>
                        </Box>
                    ))}
                </Box>
            </Container>
        </GlowSection>
    );
}

// ---------------------------------------------------------------------------
// Tech Stack
// ---------------------------------------------------------------------------

export function NewTechOrbit() {
    return (
        <GlowSection sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="md">
                <Typography align="center" sx={{ color: COLORS.textMuted, mb: 1 }}>
                    {OBJECTIVE}
                </Typography>

                <Typography align="center" variant="h4" sx={{ fontWeight: 700, mt: 1, mb: { xs: 4, md: 6 } }}>
                    Tech Stack
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: { xs: 2, sm: 2.5, md: 3 },
                    }}
                >
                    {techStack.map(({ name, Icon }) => (
                        <Box
                            key={name}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1.25,
                                py: { xs: 3, sm: 3.5 },
                                px: 2,
                                borderRadius: '16px',
                                background: COLORS.panel,
                                border: `1px solid ${COLORS.panelBorder}`,
                                backdropFilter: 'blur(6px)',
                                textAlign: 'center',
                                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: `0 8px 30px rgba(168,85,247,0.25)`,
                                    borderColor: COLORS.accent,
                                },
                            }}
                        >
                            <Icon size={32} color={COLORS.accentSoft} />
                            <Typography sx={{ color: COLORS.text, fontWeight: 600, fontSize: '0.9rem' }}>
                                {name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </GlowSection>
    );
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export function NewSkills() {
    return (
        <GlowSection sx={{ py: { xs: 6, md: 10 } }} id="skills">
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                    Skills
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 3,
                    }}
                >
                    {skillCategories.map(({ category, items }) => (
                        <GlowCard key={category}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 700, color: COLORS.accentSoft, mb: 2 }}
                            >
                                {category}
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
                                {items.map(({ name, Icon }) => (
                                    <Box
                                        key={name}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.75,
                                            py: 0.75,
                                            px: 1.5,
                                            borderRadius: '999px',
                                            background: 'rgba(168,85,247,0.08)',
                                            border: `1px solid ${COLORS.panelBorder}`,
                                        }}
                                    >
                                        {Icon && <Icon size={15} color={COLORS.accentSoft} />}
                                        <Typography sx={{ color: COLORS.text, fontSize: '0.85rem' }}>
                                            {name}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </GlowCard>
                    ))}
                </Box>
            </Container>
        </GlowSection>
    );
}

// ---------------------------------------------------------------------------
// Featured Projects
// ---------------------------------------------------------------------------

export function NewProjects() {
    return (
        <GlowSection sx={{ py: { xs: 6, md: 10 } }} id="projects">
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                    Featured Projects
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                        gap: 3,
                    }}
                >
                    {projects.map((project, index) => (
                        <Box key={index}>
                            <GlowCard sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Box
                                    component="img"
                                    src={project.image}
                                    alt={project.title}
                                    sx={{ width: '100%', maxHeight: 120, objectFit: 'contain', mb: 2 }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                    {project.title}
                                </Typography>
                                {project.link && <Button
                                    href={project.link}
                                    target="_blank"
                                    variant="outlined"
                                    sx={{
                                        mt: 'auto',
                                        borderRadius: '999px',
                                        textTransform: 'none',
                                        color: COLORS.accentSoft,
                                        borderColor: COLORS.accent,
                                        '&:hover': { borderColor: COLORS.accentSoft, background: 'rgba(168,85,247,0.1)' },
                                    }}
                                >
                                    View Project
                                </Button>}
                            </GlowCard>
                        </Box>
                    ))}
                </Box>
            </Container>
        </GlowSection>
    );
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

const SOCIAL_LINKS = [
    { Icon: GitHub, href: 'https://github.com/royVarinder' },
    { Icon: LinkedIn, href: 'https://www.linkedin.com/in/varinder-singh-b5231a1b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { Icon: WhatsApp, href: 'https://wa.me/+917009650062' },
    { Icon: Instagram, href: 'https://www.instagram.com/main_varinder/' },
    { Icon: Email, href: 'mailto:varinder2good@gmail.com' },
];

export function NewContact() {
    return (
        <GlowSection sx={{ py: { xs: 6, md: 10 } }} id="contact">
            <Container maxWidth="md">
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                    Contact
                </Typography>
                <Typography sx={{ color: COLORS.textMuted, mb: 3, maxWidth: 560 }}>
                    {OBJECTIVE} Have a project in mind? Let&apos;s connect.
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    <Box component="a" href="mailto:varinder2good@gmail.com" sx={{ color: COLORS.accentSoft, textDecoration: 'none' }}>
                        varinder2good@gmail.com
                    </Box>
                </Typography>
                <Box>
                    {SOCIAL_LINKS.map(({ Icon, href }, index) => (
                        <IconButton key={index} component="a" href={href} target="_blank" sx={{ color: COLORS.text }}>
                            <Icon />
                        </IconButton>
                    ))}
                </Box>
            </Container>
        </GlowSection>
    );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export function NewFooter() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                backgroundColor: COLORS.bgAlt,
                borderTop: `1px solid ${COLORS.panelBorder}`,
                textAlign: 'center',
            }}
        >
            <Typography variant="body2" sx={{ color: COLORS.textMuted }}>
                &copy; {new Date().getFullYear()} Varinder Singh. All rights reserved.
            </Typography>
        </Box>
    );
}
