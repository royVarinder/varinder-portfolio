import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { keyframes } from '@emotion/react';
import { GitHub, LinkedIn, Email, WhatsApp, Instagram } from '@mui/icons-material';
import { SUMMARY, OBJECTIVE, experiences, projects, techStack } from '../Config';

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

const ROLES = ['Full Stack Developer.', 'MERN Stack Developer.', 'Team Lead.'];

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
                    A Full Stack Developer who builds{' '}
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

                <Typography sx={{ color: COLORS.textMuted, mb: 1 }}>
                    Currently, I&apos;m a Full Stack Developer at{' '}
                    <Box component="span" sx={{ color: COLORS.accentSoft, fontWeight: 600 }}>UnleashX</Box>.
                </Typography>

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
// Tech Orbit
// ---------------------------------------------------------------------------

const orbitRotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const counterRotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 30px rgba(168,85,247,0.5); }
  50% { box-shadow: 0 0 55px rgba(168,85,247,0.85); }
`;

const ORBIT_DURATION = '28s';

const ORBIT_PRESETS = {
    xs: { size: 220, radius: 85, icon: 34, badge: 64, badgeFont: '1.1rem', iconGlyph: 16 },
    sm: { size: 280, radius: 115, icon: 38, badge: 74, badgeFont: '1.25rem', iconGlyph: 18 },
    md: { size: 340, radius: 155, icon: 42, badge: 84, badgeFont: '1.4rem', iconGlyph: 20 },
};

export function NewTechOrbit() {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const preset = isXs ? ORBIT_PRESETS.xs : isSm ? ORBIT_PRESETS.sm : ORBIT_PRESETS.md;

    return (
        <GlowSection sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="md">
                <Typography align="center" sx={{ color: COLORS.textMuted, mb: 1 }}>
                    {OBJECTIVE}
                </Typography>

                <Box
                    sx={{
                        position: 'relative',
                        width: preset.size,
                        height: preset.size,
                        mx: 'auto',
                        mt: 6,
                    }}
                >
                    {/* central glowing badge */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: preset.badge,
                            height: preset.badge,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentSoft})`,
                            animation: `${pulse} 3s ease-in-out infinite`,
                            zIndex: 2,
                        }}
                    >
                        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: preset.badgeFont }}>VS</Typography>
                    </Box>

                    {/* orbit ring, decorative */}
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            border: `1px dashed ${COLORS.panelBorder}`,
                        }}
                    />

                    {/* rotating icon ring */}
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            animation: `${orbitRotate} ${ORBIT_DURATION} linear infinite`,
                        }}
                    >
                        {techStack.map(({ name, Icon }, index) => {
                            const angle = (360 / techStack.length) * index;
                            return (
                                <Box
                                    key={name}
                                    title={name}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${preset.radius}px) rotate(${-angle}deg)`,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: preset.icon,
                                            height: preset.icon,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: COLORS.panel,
                                            border: `1px solid ${COLORS.panelBorder}`,
                                            animation: `${counterRotate} ${ORBIT_DURATION} linear infinite`,
                                        }}
                                    >
                                        <Icon size={preset.iconGlyph} color={COLORS.accentSoft} />
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
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
                                <Button
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
                                </Button>
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
