import { useEffect, useRef, useState, useCallback } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    InputBase,
    Drawer,
    Badge,
    Divider,
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

// ---------------------------------------------------------------------------
// Furrow Supply Co. — a dummy agricultural tools & equipment storefront
// (static, no backend). All artwork is hand-drawn SVG, not photography, so
// the page renders identically offline and never depends on a broken image.
// ---------------------------------------------------------------------------

const FONT_DISPLAY = "'Archivo', 'Arial Narrow', sans-serif";
const FONT_UI = "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif";

const C = {
    soil: '#211A12',
    soilSoft: '#2B2116',
    soilLine: 'rgba(184,92,46,0.22)',
    wheat: '#F3ECD8',
    wheatSoft: '#EAE0C4',
    wheatLine: 'rgba(33,26,18,0.14)',
    rust: '#B85C2E',
    rustBright: '#D57443',
    olive: '#4B5328',
    steel: '#5B6259',
    onDark: '#F3ECD8',
    onDarkMuted: 'rgba(243,236,216,0.68)',
    onLight: '#221A12',
    onLightMuted: 'rgba(34,26,18,0.6)',
};

const TONES = {
    olive: 'linear-gradient(150deg, #4B5328 0%, #262A14 100%)',
    rust: 'linear-gradient(150deg, #A6512A 0%, #4E2513 100%)',
    steel: 'linear-gradient(150deg, #545B4F 0%, #272B24 100%)',
    soil: 'linear-gradient(150deg, #3A2E1E 0%, #1C160E 100%)',
    wheatDark: 'linear-gradient(150deg, #6B5A31 0%, #362C16 100%)',
};

const CATEGORIES = ['Tractors', 'Hand Tools', 'Irrigation', 'Harvesting'];

const PRODUCTS = [
    { id: 1, name: 'Row Crop Cultivator', category: 'Tractors', material: '3-point hitch, hardened steel', price: 1240, icon: 'tractor', tone: 'olive' },
    { id: 2, name: 'Forged Field Hoe', category: 'Hand Tools', material: 'Drop-forged steel, ash handle', price: 48, icon: 'tool', tone: 'rust' },
    { id: 3, name: 'Drip Line Starter Kit', category: 'Irrigation', material: '100ft line, 20 emitters', price: 96, icon: 'drop', tone: 'steel' },
    { id: 4, name: 'Steel Tine Rake', category: 'Hand Tools', material: 'Forged steel, hardwood handle', price: 39, icon: 'tool', tone: 'soil' },
    { id: 5, name: 'Compact Disc Harrow', category: 'Tractors', material: '16-blade, notched steel', price: 2150, icon: 'tractor', tone: 'rust' },
    { id: 6, name: 'Grain Auger, 8in', category: 'Harvesting', material: 'Galvanized steel, 21ft', price: 1680, icon: 'sickle', tone: 'olive' },
    { id: 7, name: 'Oscillating Sprinkler', category: 'Irrigation', material: 'Cast base, brass nozzle', price: 64, icon: 'drop', tone: 'wheatDark' },
    { id: 8, name: 'Post Hole Digger', category: 'Hand Tools', material: 'Forged jaws, fibreglass shaft', price: 55, icon: 'tool', tone: 'steel' },
];

const VALUE_PROPS = [
    { title: 'Field-tested before it ships', body: 'Every tool runs a full season on our own test plots before it reaches the catalog.' },
    { title: 'Parts stocked for 20 years', body: 'Replacement parts stay in stock long after the original model is retired.' },
    { title: 'Free freight over $500', body: 'Heavy implements ship free to any registered farm address in the network.' },
    { title: '48-state dealer network', body: 'Local dealers handle setup, service and warranty claims near you.' },
];

// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const sweep = keyframes`
  from { transform: translateX(-140%); }
  to { transform: translateX(140%); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  35% { transform: scale(1.35); }
  100% { transform: scale(1); }
`;

function useInView(threshold = 0.2) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return undefined;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, inView];
}

// ---------------------------------------------------------------------------
// Line-art tool icons (stroke only, inherits currentColor)
// ---------------------------------------------------------------------------

function ProductArt({ icon, size = 64 }) {
    const common = {
        width: size,
        height: size,
        viewBox: '0 0 64 64',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.4,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    };

    if (icon === 'tractor') {
        return (
            <svg {...common}>
                <circle cx="20" cy="46" r="12" />
                <circle cx="46" cy="50" r="7" />
                <path d="M14 34 H38 L46 44" />
                <path d="M14 34 V22 H28" />
                <path d="M28 22 L34 34" />
            </svg>
        );
    }
    if (icon === 'tool') {
        return (
            <svg {...common}>
                <path d="M32 8 V32" />
                <ellipse cx="32" cy="8" rx="6" ry="3" />
                <path d="M20 32 H44 L38 52 Q32 58 26 52 Z" />
            </svg>
        );
    }
    if (icon === 'drop') {
        return (
            <svg {...common}>
                <path d="M32 10 C41 25 47 34 47 42 A15 15 0 1 1 17 42 C17 34 23 25 32 10 Z" />
                <path d="M10 18 C14 16 14 12 12 8" />
                <path d="M54 18 C50 16 50 12 52 8" />
            </svg>
        );
    }
    return (
        <svg {...common}>
            <path d="M42 10 A20 20 0 1 0 46 42" />
            <path d="M46 42 L54 50" />
            <circle cx="46" cy="42" r="2.2" fill="currentColor" stroke="none" />
        </svg>
    );
}

function FurrowArt() {
    const rows = [40, 78, 116, 154, 192, 230];
    return (
        <svg width="100%" height="100%" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="furrowSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3A2E1E" />
                    <stop offset="100%" stopColor="#1A140D" />
                </linearGradient>
            </defs>
            <rect width="320" height="280" fill="url(#furrowSky)" />
            <circle cx="250" cy="52" r="30" fill="none" stroke={C.rustBright} strokeWidth="1.4" opacity="0.55" />
            {rows.map((y, i) => (
                <path
                    key={y}
                    d={`M-10 ${y} Q80 ${y - 16} 160 ${y} T330 ${y}`}
                    fill="none"
                    stroke={C.wheatSoft}
                    strokeWidth="1.4"
                    opacity={0.28 + i * 0.09}
                />
            ))}
        </svg>
    );
}

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

const NavLink = styled('button')({
    background: 'none',
    border: 'none',
    padding: 0,
    font: 'inherit',
    fontFamily: FONT_UI,
    fontSize: '0.92rem',
    color: C.onDark,
    cursor: 'pointer',
    opacity: 0.82,
    transition: 'opacity 0.2s ease, transform 0.15s ease',
    '&:hover': { opacity: 1 },
    '&:active': { opacity: 0.55, transform: 'scale(0.95)' },
});

const IconBtn = styled(IconButton)({
    color: C.onDark,
    transition: 'transform 0.15s ease, background-color 0.2s ease',
    '&:hover': { backgroundColor: 'rgba(243,236,216,0.08)' },
    '&:active': { transform: 'scale(0.82)', backgroundColor: 'rgba(243,236,216,0.14)' },
});

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function AgroHeader({ cartCount, onCartOpen, searchQuery, onSearchChange }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <Box
            component="header"
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 30,
                backgroundColor: 'rgba(33,26,18,0.94)',
                backdropFilter: 'blur(10px)',
                borderBottom: `1px solid ${C.soilLine}`,
            }}
        >
            <Box
                sx={{
                    maxWidth: 1360,
                    mx: 'auto',
                    px: { xs: 2.5, md: 5 },
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                }}
            >
                <IconBtn
                    aria-label="Open menu"
                    onClick={() => setMenuOpen(true)}
                    sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                >
                    <MenuRoundedIcon />
                </IconBtn>

                <Typography
                    component="a"
                    href="#top"
                    sx={{
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 800,
                        fontSize: '1.35rem',
                        letterSpacing: '-0.01em',
                        color: C.onDark,
                        textDecoration: 'none',
                        flexShrink: 0,
                        transition: 'opacity 0.15s ease, transform 0.15s ease',
                        '&:active': { opacity: 0.65, transform: 'scale(0.97)' },
                    }}
                >
                    Furrow Supply Co.
                </Typography>

                <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 3.5, ml: 2 }}>
                    {CATEGORIES.map((c) => (
                        <NavLink key={c} onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
                            {c}
                        </NavLink>
                    ))}
                    <NavLink onClick={() => document.getElementById('dealers')?.scrollIntoView({ behavior: 'smooth' })}>
                        Dealers
                    </NavLink>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: searchOpen ? { xs: 140, sm: 200 } : 0,
                            overflow: 'hidden',
                            transition: 'width 0.28s ease',
                        }}
                    >
                        <InputBase
                            autoFocus={searchOpen}
                            placeholder="Search equipment"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            sx={{
                                fontFamily: FONT_UI,
                                fontSize: '0.88rem',
                                color: C.onDark,
                                '& input::placeholder': { color: C.onDarkMuted, opacity: 1 },
                            }}
                        />
                    </Box>
                    <IconBtn aria-label="Toggle search" onClick={() => setSearchOpen((v) => !v)}>
                        {searchOpen ? <CloseRoundedIcon fontSize="small" /> : <SearchRoundedIcon fontSize="small" />}
                    </IconBtn>

                    <Box sx={{ position: 'relative' }}>
                        <IconBtn aria-label="Account" onClick={() => setProfileOpen((v) => !v)}>
                            <PersonOutlineRoundedIcon fontSize="small" />
                        </IconBtn>
                        {profileOpen && (
                            <Box
                                onMouseLeave={() => setProfileOpen(false)}
                                sx={{
                                    position: 'absolute',
                                    top: '110%',
                                    right: 0,
                                    minWidth: 190,
                                    backgroundColor: C.soilSoft,
                                    border: `1px solid ${C.soilLine}`,
                                    py: 1,
                                    animation: `${riseIn} 0.18s ease`,
                                }}
                            >
                                {['Sign in', 'Create dealer account', 'Order history'].map((t) => (
                                    <Box
                                        key={t}
                                        component="a"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                        sx={{
                                            display: 'block',
                                            px: 2,
                                            py: 1,
                                            fontFamily: FONT_UI,
                                            fontSize: '0.85rem',
                                            color: C.onDark,
                                            textDecoration: 'none',
                                            transition: 'background-color 0.15s ease',
                                            '&:hover': { backgroundColor: 'rgba(243,236,216,0.06)' },
                                            '&:active': { backgroundColor: 'rgba(243,236,216,0.14)' },
                                        }}
                                    >
                                        {t}
                                    </Box>
                                ))}
                                <Divider sx={{ my: 0.5, borderColor: C.soilLine }} />
                                <Typography sx={{ px: 2, py: 0.5, fontFamily: FONT_UI, fontSize: '0.72rem', color: C.onDarkMuted }}>
                                    Demo account menu
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <IconBtn aria-label={`Cart, ${cartCount} items`} onClick={onCartOpen}>
                        <Badge
                            badgeContent={cartCount}
                            invisible={cartCount === 0}
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: C.rust,
                                    color: C.onDark,
                                    fontFamily: FONT_UI,
                                    fontWeight: 700,
                                    animation: cartCount > 0 ? `${pulse} 0.4s ease` : 'none',
                                },
                            }}
                        >
                            <ShoppingBagOutlinedIcon fontSize="small" />
                        </Badge>
                    </IconBtn>
                </Box>
            </Box>

            <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
                <Box sx={{ width: 260, height: '100%', backgroundColor: C.soil, color: C.onDark, p: 3 }}>
                    <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: '1.2rem', mb: 3 }}>
                        Furrow Supply Co.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        {[...CATEGORIES, 'Dealers'].map((c) => (
                            <Box
                                key={c}
                                component="button"
                                onClick={() => {
                                    setMenuOpen(false);
                                    const id = c === 'Dealers' ? 'dealers' : 'catalog';
                                    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 200);
                                }}
                                sx={{
                                    background: 'none',
                                    border: 'none',
                                    p: 0,
                                    textAlign: 'left',
                                    fontFamily: FONT_UI,
                                    fontSize: '1rem',
                                    color: C.onDark,
                                    cursor: 'pointer',
                                    transition: 'opacity 0.15s ease, transform 0.15s ease',
                                    '&:hover': { opacity: 0.75 },
                                    '&:active': { opacity: 0.55, transform: 'scale(0.97)' },
                                }}
                            >
                                {c}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
    return (
        <Box component="section" sx={{ backgroundColor: C.soil, color: C.onDark, position: 'relative', overflow: 'hidden' }}>
            <Box
                sx={{
                    maxWidth: 1360,
                    mx: 'auto',
                    px: { xs: 2.5, md: 5 },
                    py: { xs: 8, md: 12 },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
                    gap: { xs: 6, md: 4 },
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography
                        component="p"
                        sx={{ fontFamily: FONT_UI, fontSize: '0.85rem', color: C.rustBright, mb: 2, animation: `${riseIn} 0.6s ease both` }}
                    >
                        Spring catalog now shipping
                    </Typography>
                    <Typography
                        component="h1"
                        sx={{
                            fontFamily: FONT_DISPLAY,
                            fontWeight: 800,
                            fontSize: { xs: '2.4rem', sm: '3rem', md: '3.6rem' },
                            lineHeight: 1.05,
                            letterSpacing: '-0.01em',
                            maxWidth: 600,
                            animation: `${riseIn} 0.6s ease 0.08s both`,
                        }}
                    >
                        Built for the ground you work.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: FONT_UI,
                            fontSize: '1.02rem',
                            color: C.onDarkMuted,
                            maxWidth: 460,
                            mt: 3,
                            lineHeight: 1.7,
                            animation: `${riseIn} 0.6s ease 0.16s both`,
                        }}
                    >
                        Tractors, hand tools and irrigation gear tested on our own plots
                        before they ship — with parts stocked for twenty years after.
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 5, animation: `${riseIn} 0.6s ease 0.24s both` }}>
                        <Button
                            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                            endIcon={<ArrowRightAltRoundedIcon />}
                            sx={{
                                fontFamily: FONT_UI,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                backgroundColor: C.rust,
                                color: C.onDark,
                                px: 3,
                                py: 1.2,
                                borderRadius: 0,
                                transition: 'background-color 0.2s ease, transform 0.15s ease',
                                '&:hover': { backgroundColor: C.rustBright },
                                '&:active': { backgroundColor: C.rustBright, transform: 'scale(0.97)' },
                            }}
                        >
                            Shop the catalog
                        </Button>
                        <Button
                            onClick={() => document.getElementById('dealers')?.scrollIntoView({ behavior: 'smooth' })}
                            sx={{
                                fontFamily: FONT_UI,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                color: C.onDark,
                                px: 3,
                                py: 1.2,
                                borderRadius: 0,
                                border: `1px solid ${C.soilLine}`,
                                transition: 'border-color 0.2s ease, background-color 0.2s ease, transform 0.15s ease',
                                '&:hover': { borderColor: C.rust, backgroundColor: 'rgba(184,92,46,0.08)' },
                                '&:active': { borderColor: C.rust, backgroundColor: 'rgba(184,92,46,0.14)', transform: 'scale(0.97)' },
                            }}
                        >
                            Find a dealer
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: 'relative',
                        height: { xs: 260, md: 380 },
                        border: `1px solid ${C.rustBright}`,
                        overflow: 'hidden',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                        animation: `${riseIn} 0.7s ease 0.1s both`,
                    }}
                >
                    <FurrowArt />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '35%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(213,116,67,0.28), transparent)',
                            animation: `${sweep} 1.8s ease 0.9s 1`,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Category strip
// ---------------------------------------------------------------------------

function CategoryStrip({ onSelect }) {
    const [ref, inView] = useInView(0.3);
    const items = [
        { name: 'Tractors', icon: 'tractor', tone: 'olive' },
        { name: 'Hand Tools', icon: 'tool', tone: 'rust' },
        { name: 'Irrigation', icon: 'drop', tone: 'steel' },
        { name: 'Harvesting', icon: 'sickle', tone: 'wheatDark' },
    ];
    return (
        <Box component="section" ref={ref} sx={{ backgroundColor: C.wheat, py: { xs: 6, md: 8 } }}>
            <Box
                sx={{
                    maxWidth: 1360,
                    mx: 'auto',
                    px: { xs: 2.5, md: 5 },
                    display: 'flex',
                    gap: { xs: 3, md: 6 },
                    justifyContent: { xs: 'flex-start', md: 'center' },
                    overflowX: 'auto',
                }}
            >
                {items.map((item, i) => (
                    <Box
                        key={item.name}
                        component="button"
                        onClick={() => onSelect(item.name)}
                        sx={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 1.5,
                            flexShrink: 0,
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(14px)',
                            transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s, filter 0.15s ease`,
                            '&:active': { filter: 'brightness(0.82)' },
                        }}
                    >
                        <Box
                            sx={{
                                width: 84,
                                height: 84,
                                background: TONES[item.tone],
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: C.wheatSoft,
                            }}
                        >
                            <ProductArt icon={item.icon} size={34} />
                        </Box>
                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.88rem', color: C.onLight }}>
                            {item.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Credibility strip
// ---------------------------------------------------------------------------

function CredibilityStrip() {
    const [ref, inView] = useInView(0.3);
    const stats = [
        { value: '20 yr', label: 'parts availability guarantee' },
        { value: '48', label: 'states with dealer coverage' },
        { value: '6,200+', label: 'tools sold this season' },
    ];
    return (
        <Box
            id="dealers"
            component="section"
            ref={ref}
            sx={{ backgroundColor: C.wheatSoft, py: { xs: 7, md: 9 } }}
        >
            <Box
                sx={{
                    maxWidth: 1360,
                    mx: 'auto',
                    px: { xs: 2.5, md: 5 },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                    gap: 4,
                    textAlign: 'center',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
            >
                {stats.map((s) => (
                    <Box key={s.label}>
                        <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: { xs: '2.2rem', md: '2.8rem' }, color: C.onLight }}>
                            {s.value}
                        </Typography>
                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.88rem', color: C.onLightMuted, mt: 0.5 }}>
                            {s.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Product card + grid
// ---------------------------------------------------------------------------

function ProductCard({ product, onAdd, index }) {
    const [ref, inView] = useInView(0.15);
    return (
        <Box
            ref={ref}
            sx={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(18px)',
                transition: `opacity 0.5s ease ${Math.min(index, 6) * 0.06}s, transform 0.5s ease ${Math.min(index, 6) * 0.06}s`,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    aspectRatio: '4 / 5',
                    background: TONES[product.tone],
                    border: `1px solid ${C.soilLine}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: C.wheatSoft,
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease',
                    '&:hover': { transform: 'scale(1.015)' },
                }}
            >
                {inView && <ProductArt icon={product.icon} size={76} />}
            </Box>
            <Box sx={{ pt: 2 }}>
                <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '1.05rem', color: C.onLight }}>
                    {product.name}
                </Typography>
                <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.82rem', color: C.onLightMuted, mt: 0.4 }}>
                    {product.category} · {product.material}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.4 }}>
                    <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.92rem', color: C.onLight, fontWeight: 600 }}>
                        ${product.price}
                    </Typography>
                    <Box
                        component="button"
                        onClick={() => onAdd(product)}
                        sx={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: FONT_UI,
                            fontSize: '0.82rem',
                            color: C.olive,
                            borderBottom: `1px solid ${C.olive}`,
                            pb: '2px',
                            transition: 'color 0.2s ease, border-color 0.2s ease, transform 0.15s ease',
                            '&:hover': { color: C.rust, borderColor: C.rust },
                            '&:active': { color: C.rust, borderColor: C.rust, transform: 'scale(0.93)' },
                        }}
                    >
                        Add to cart
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

function ProductSection({ activeCategory, onCategoryChange, searchQuery, onAdd }) {
    const filtered = PRODUCTS.filter((p) => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <Box id="catalog" component="section" sx={{ backgroundColor: C.wheat, py: { xs: 8, md: 10 } }}>
            <Box sx={{ maxWidth: 1360, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 3, mb: 5 }}>
                    <Typography
                        component="h2"
                        sx={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: { xs: '1.7rem', md: '2.2rem' }, color: C.onLight }}
                    >
                        This season&rsquo;s equipment
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        {['All', ...CATEGORIES].map((c) => (
                            <Box
                                key={c}
                                component="button"
                                onClick={() => onCategoryChange(c)}
                                sx={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: FONT_UI,
                                    fontSize: '0.88rem',
                                    color: activeCategory === c ? C.onLight : C.onLightMuted,
                                    borderBottom: activeCategory === c ? `1px solid ${C.rust}` : '1px solid transparent',
                                    pb: '4px',
                                    transition: 'opacity 0.15s ease, transform 0.15s ease',
                                    '&:hover': { opacity: 0.75 },
                                    '&:active': { opacity: 0.55, transform: 'scale(0.94)' },
                                }}
                            >
                                {c}
                            </Box>
                        ))}
                    </Box>
                </Box>

                {filtered.length === 0 ? (
                    <Typography sx={{ fontFamily: FONT_UI, color: C.onLightMuted, py: 6 }}>
                        Nothing matches &ldquo;{searchQuery}&rdquo; yet — try another search or browse the full catalog.
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
                            gap: { xs: 3, md: 4 },
                        }}
                    >
                        {filtered.map((p, i) => (
                            <ProductCard key={p.id} product={p} onAdd={onAdd} index={i} />
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Value props
// ---------------------------------------------------------------------------

function ValueProps() {
    const [ref, inView] = useInView(0.2);
    return (
        <Box component="section" ref={ref} sx={{ backgroundColor: C.soil, color: C.onDark, py: { xs: 8, md: 10 } }}>
            <Box
                sx={{
                    maxWidth: 1360,
                    mx: 'auto',
                    px: { xs: 2.5, md: 5 },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: 5,
                }}
            >
                {VALUE_PROPS.map((v, i) => (
                    <Box
                        key={v.title}
                        sx={{
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(14px)',
                            transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                            borderTop: `1px solid ${C.rust}`,
                            pt: 2.5,
                        }}
                    >
                        <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '1.05rem', mb: 1 }}>
                            {v.title}
                        </Typography>
                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.88rem', color: C.onDarkMuted, lineHeight: 1.6 }}>
                            {v.body}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Newsletter
// ---------------------------------------------------------------------------

function Newsletter() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubscribed(true);
    };

    return (
        <Box component="section" sx={{ background: 'linear-gradient(120deg, #4B5328 0%, #262A14 100%)', py: { xs: 8, md: 9 } }}>
            <Box sx={{ maxWidth: 640, mx: 'auto', px: 3, textAlign: 'center' }}>
                <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.9rem' }, color: C.onDark }}>
                    Get season alerts
                </Typography>
                <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.92rem', color: C.onDarkMuted, mt: 1.5, mb: 4 }}>
                    New equipment, restocks and dealer events — a few emails a season, nothing more.
                </Typography>

                {subscribed ? (
                    <Typography sx={{ fontFamily: FONT_UI, color: C.rustBright, fontSize: '0.95rem' }}>
                        You&rsquo;re on the list.
                    </Typography>
                ) : (
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', gap: 0, maxWidth: 420, mx: 'auto' }}>
                        <InputBase
                            type="email"
                            required
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                flexGrow: 1,
                                fontFamily: FONT_UI,
                                fontSize: '0.9rem',
                                color: C.onDark,
                                backgroundColor: 'rgba(243,236,216,0.08)',
                                border: `1px solid ${C.soilLine}`,
                                borderRight: 'none',
                                px: 2,
                                py: 1,
                                '& input::placeholder': { color: C.onDarkMuted, opacity: 1 },
                            }}
                        />
                        <Button
                            type="submit"
                            sx={{
                                fontFamily: FONT_UI,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '0.88rem',
                                backgroundColor: C.rust,
                                color: C.onDark,
                                borderRadius: 0,
                                px: 3,
                                flexShrink: 0,
                                transition: 'background-color 0.2s ease, transform 0.15s ease',
                                '&:hover': { backgroundColor: C.rustBright },
                                '&:active': { backgroundColor: C.rustBright, transform: 'scale(0.96)' },
                            }}
                        >
                            Subscribe
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function Footer() {
    const columns = [
        { title: 'Shop', links: CATEGORIES },
        { title: 'Support', links: ['Warranty', 'Parts & service', 'Financing', 'Shipping'] },
        { title: 'Company', links: ['Our story', 'Dealers', 'Sustainability'] },
    ];
    return (
        <Box component="footer" sx={{ backgroundColor: C.soil, color: C.onDark, pt: { xs: 7, md: 9 }, pb: 4 }}>
            <Box
                sx={{
                    maxWidth: 1360,
                    mx: 'auto',
                    px: { xs: 2.5, md: 5 },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1.4fr repeat(3, 1fr)' },
                    gap: 5,
                    pb: 6,
                }}
            >
                <Box sx={{ maxWidth: 320 }}>
                    <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: '1.3rem', mb: 2 }}>
                        Furrow Supply Co.
                    </Typography>
                    <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.85rem', color: C.onDarkMuted, lineHeight: 1.7 }}>
                        Farm tools and equipment, field-tested before they ship. This page is
                        a static demo storefront built to preview the design — no orders are processed.
                    </Typography>
                </Box>
                {columns.map((col) => (
                    <Box key={col.title}>
                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.85rem', color: C.onDark, mb: 2, fontWeight: 600 }}>
                            {col.title}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                            {col.links.map((l) => (
                                <Box
                                    key={l}
                                    component="a"
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    sx={{
                                        fontFamily: FONT_UI,
                                        fontSize: '0.85rem',
                                        color: C.onDarkMuted,
                                        textDecoration: 'none',
                                        transition: 'color 0.15s ease, opacity 0.15s ease',
                                        '&:hover': { color: C.onDark },
                                        '&:active': { opacity: 0.6 },
                                    }}
                                >
                                    {l}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Divider sx={{ borderColor: C.soilLine, maxWidth: 1360, mx: 'auto' }} />
            <Box
                sx={{
                    maxWidth: 1360,
                    mx: 'auto',
                    px: { xs: 2.5, md: 5 },
                    pt: 3,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: 1,
                }}
            >
                <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.78rem', color: C.onDarkMuted }}>
                    © 2026 Furrow Supply Co. Demo storefront for portfolio preview only.
                </Typography>
                <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.78rem', color: C.onDarkMuted }}>
                    Built by Varinder Singh
                </Typography>
            </Box>
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Cart drawer
// ---------------------------------------------------------------------------

function CartDrawer({ open, onClose, items, onRemove }) {
    const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: { xs: 300, sm: 360 }, height: '100%', backgroundColor: C.wheat, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, borderBottom: `1px solid ${C.wheatLine}` }}>
                    <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: '1.2rem', color: C.onLight }}>
                        Your cart
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        aria-label="Close cart"
                        sx={{ transition: 'transform 0.15s ease, background-color 0.2s ease', '&:active': { transform: 'scale(0.82)' } }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>

                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
                    {items.length === 0 ? (
                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.9rem', color: C.onLightMuted }}>
                            Your cart is empty. Add equipment from the catalog to see it here.
                        </Typography>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            {items.map((it) => (
                                <Box key={it.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Box
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            flexShrink: 0,
                                            background: TONES[it.tone],
                                            color: C.wheatSoft,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ProductArt icon={it.icon} size={28} />
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.9rem', color: C.onLight }}>
                                            {it.name}
                                        </Typography>
                                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.78rem', color: C.onLightMuted }}>
                                            Qty {it.qty} · ${it.price}
                                        </Typography>
                                    </Box>
                                    <Box
                                        component="button"
                                        onClick={() => onRemove(it.id)}
                                        aria-label={`Remove ${it.name}`}
                                        sx={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: C.onLightMuted,
                                            transition: 'transform 0.15s ease, color 0.15s ease',
                                            '&:hover': { color: C.rust },
                                            '&:active': { transform: 'scale(0.8)', color: C.rust },
                                        }}
                                    >
                                        <CloseRoundedIcon fontSize="small" />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>

                <Box sx={{ p: 3, borderTop: `1px solid ${C.wheatLine}` }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.9rem', color: C.onLight }}>Subtotal</Typography>
                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.9rem', color: C.onLight, fontWeight: 600 }}>
                            ${subtotal}
                        </Typography>
                    </Box>
                    <Button
                        fullWidth
                        disabled={items.length === 0}
                        sx={{
                            fontFamily: FONT_UI,
                            fontWeight: 600,
                            textTransform: 'none',
                            backgroundColor: C.soil,
                            color: C.onDark,
                            borderRadius: 0,
                            py: 1.3,
                            transition: 'background-color 0.2s ease, transform 0.15s ease',
                            '&:hover': { backgroundColor: C.soilSoft },
                            '&:active': { backgroundColor: C.soilSoft, transform: 'scale(0.98)' },
                            '&.Mui-disabled': { backgroundColor: C.wheatLine, color: C.onLightMuted },
                        }}
                    >
                        Checkout (demo only)
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AgroIndustries() {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState('');
    const toastTimer = useRef(null);

    const handleAdd = useCallback((product) => {
        setCartItems((prev) => {
            const existing = prev.find((it) => it.id === product.id);
            if (existing) {
                return prev.map((it) => (it.id === product.id ? { ...it, qty: it.qty + 1 } : it));
            }
            return [...prev, { ...product, qty: 1 }];
        });
        setToast(`${product.name} added to your cart`);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(''), 2200);
    }, []);

    const handleRemove = useCallback((id) => {
        setCartItems((prev) => prev.filter((it) => it.id !== id));
    }, []);

    const handleCategorySelect = useCallback((category) => {
        setActiveCategory(category);
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const cartCount = cartItems.reduce((sum, it) => sum + it.qty, 0);

    return (
        <Box
            id="top"
            className="agro-page"
            sx={{
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                fontFamily: FONT_UI,
            }}
        >
            <style>{`
                .agro-page button,
                .agro-page a,
                .agro-page input {
                    outline: none;
                }
                .agro-page button:focus-visible,
                .agro-page a:focus-visible,
                .agro-page input:focus-visible {
                    outline: 2px solid ${C.rust};
                    outline-offset: 2px;
                }
            `}</style>
            <AgroHeader
                cartCount={cartCount}
                onCartOpen={() => setCartOpen(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            <Hero />
            <CategoryStrip onSelect={handleCategorySelect} />
            <CredibilityStrip />
            <ProductSection
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                searchQuery={searchQuery}
                onAdd={handleAdd}
            />
            <ValueProps />
            <Newsletter />
            <Footer />

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onRemove={handleRemove} />

            <Box
                role="status"
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    left: '50%',
                    transform: `translateX(-50%) translateY(${toast ? '0' : '12px'})`,
                    opacity: toast ? 1 : 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                    backgroundColor: C.soil,
                    color: C.onDark,
                    fontFamily: FONT_UI,
                    fontSize: '0.85rem',
                    px: 2.5,
                    py: 1.2,
                    border: `1px solid ${C.soilLine}`,
                    zIndex: 40,
                }}
            >
                {toast}
            </Box>
        </Box>
    );
}
