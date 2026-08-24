import { Box, Container, Typography } from '@mui/material';

const EFFECTIVE_DATE = 'August 24, 2026';
const CONTACT_EMAIL = 'support@emalout.com';

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

const SECTIONS = [
    {
        title: '1. Introduction',
        body:
            `This Privacy Policy explains how emalout ("we", "us", or "our") collects, uses, and protects your ` +
            `information when you use our mobile application (the "App"). This policy is effective as of ${EFFECTIVE_DATE}.`,
    },
    {
        title: '2. Information We Collect',
        body:
            'When you log in to the App, we collect the following information:\n\n' +
            '• Your name\n' +
            '• Your phone number\n' +
            '• Your username\n\n' +
            'We do not collect this information through a separate sign-up process — it is collected as part of logging in.',
    },
    {
        title: '3. How We Use Your Information',
        body:
            'We use the information we collect to:\n\n' +
            '• Authenticate you and give you access to the App\n' +
            '• Identify you within the App (e.g. display your name and username)\n' +
            '• Contact you regarding your account when necessary',
    },
    {
        title: '4. Data Sharing',
        body:
            'We do not sell your personal information. We do not share your name, phone number, or username with ' +
            'third parties, except where required by law.',
    },
    {
        title: '5. Data Retention & Security',
        body:
            'We retain your information for as long as your account remains active, and take reasonable measures to ' +
            'protect it from unauthorized access, alteration, or disclosure.',
    },
    {
        title: '6. Your Rights',
        body:
            'You may request access to, correction of, or deletion of your personal information at any time by ' +
            `contacting us at ${CONTACT_EMAIL}.`,
    },
    {
        title: '7. Changes to This Policy',
        body:
            'We may update this Privacy Policy from time to time. Any changes will be reflected by an updated ' +
            '"effective" date at the top of this page.',
    },
    {
        title: '8. Contact Us',
        body: `If you have any questions about this Privacy Policy, please contact us at ${CONTACT_EMAIL}.`,
    },
];

export default function PrivacyPolicy() {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: COLORS.bg, color: COLORS.text }}>
            <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Privacy Policy
                </Typography>
                <Typography sx={{ color: COLORS.textMuted, mb: 4 }}>
                    Effective: {EFFECTIVE_DATE}
                </Typography>

                {SECTIONS.map((section) => (
                    <Box key={section.title} sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                            {section.title}
                        </Typography>
                        <Typography sx={{ color: COLORS.textMuted, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                            {section.body}
                        </Typography>
                    </Box>
                ))}
            </Container>
        </Box>
    );
}
