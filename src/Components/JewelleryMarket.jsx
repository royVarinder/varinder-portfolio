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
// Solene — a dummy fine-jewellery storefront (static, no backend).
// All product art below is hand-drawn SVG, not photography, so the page
// renders identically offline and never depends on a broken image URL.
// ---------------------------------------------------------------------------

const FONT_DISPLAY = "'Fraunces', Georgia, 'Times New Roman', serif";
const FONT_UI = "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif";

const C = {
    ink: '#12140F',
    inkSoft: '#1B1E17',
    inkLine: 'rgba(184,146,90,0.18)',
    ivory: '#F6F1E7',
    ivorySoft: '#EEE6D3',
    ivoryLine: 'rgba(18,20,15,0.12)',
    gold: '#B8925A',
    goldBright: '#D9B888',
    emerald: '#274633',
    rosewood: '#7A3F33',
    onDark: '#F3EFE4',
    onDarkMuted: 'rgba(243,239,228,0.66)',
    onLight: '#1C1911',
    onLightMuted: 'rgba(28,25,17,0.6)',
};

const TONES = {
    emerald: 'linear-gradient(150deg, #24422F 0%, #12211A 100%)',
    sapphire: 'linear-gradient(150deg, #202E40 0%, #101822 100%)',
    gold: 'linear-gradient(150deg, #4A3A1E 0%, #241B0E 100%)',
    rosewood: 'linear-gradient(150deg, #48261F 0%, #201211 100%)',
    ink: 'linear-gradient(150deg, #23241D 0%, #12140F 100%)',
};

const CATEGORIES = ['Rings', 'Necklaces', 'Earrings', 'Bracelets'];

const PRODUCTS = [
    { id: 1, name: 'Solene Signet', category: 'Rings', metal: '18k gold vermeil', price: 480, icon: 'ring', tone: 'emerald' },
    { id: 2, name: 'Meridian Hoops', category: 'Earrings', metal: 'Sterling silver', price: 210, icon: 'earring', tone: 'sapphire' },
    { id: 3, name: 'Verdant Collar', category: 'Necklaces', metal: '14k gold, emerald', price: 620, icon: 'necklace', tone: 'gold' },
    { id: 4, name: 'Ember Cuff', category: 'Bracelets', metal: 'Rose gold plate', price: 340, icon: 'bracelet', tone: 'rosewood' },
    { id: 5, name: 'Halo Pendant', category: 'Necklaces', metal: '18k gold, diamond', price: 275, icon: 'necklace', tone: 'ink' },
    { id: 6, name: 'Aurora Studs', category: 'Earrings', metal: 'Sterling silver, opal', price: 165, icon: 'earring', tone: 'emerald' },
    { id: 7, name: 'Solene Eternity', category: 'Rings', metal: 'Platinum finish', price: 540, icon: 'ring', tone: 'sapphire' },
    { id: 8, name: 'Tidal Bangle', category: 'Bracelets', metal: '14k gold vermeil', price: 295, icon: 'bracelet', tone: 'gold' },
];

const VALUE_PROPS = [
    { title: 'Responsibly sourced stones', body: 'Every gem is traced to its mine and cut by partners we audit each year.' },
    { title: 'Set by hand in Vancouver', body: 'Our bench jewellers finish each piece in-house, not on a factory line.' },
    { title: 'Free resizing, always', body: 'Rings can be resized once a year at no cost, for as long as you own them.' },
    { title: 'Insured, signature delivery', body: 'Every order ships insured and needs a signature on arrival.' },
];

// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const sweep = keyframes`
  from { transform: translateX(-140%) rotate(14deg); }
  to { transform: translateX(140%) rotate(14deg); }
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
// Line-art product icons (stroke only, inherits currentColor)
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

    if (icon === 'ring') {
        return (
            <svg {...common}>
                <circle cx="32" cy="41" r="13" />
                <path d="M32 11 L41 23 L32 30 L23 23 Z" />
                <path d="M23 23 H41" />
            </svg>
        );
    }
    if (icon === 'necklace') {
        return (
            <svg {...common}>
                <path d="M12 14 C12 36 52 36 52 14" />
                <path d="M32 33 L25 46 L32 55 L39 46 Z" />
            </svg>
        );
    }
    if (icon === 'earring') {
        return (
            <svg {...common}>
                <circle cx="32" cy="16" r="3.2" fill="currentColor" stroke="none" />
                <path d="M32 19 V24" />
                <circle cx="32" cy="38" r="15" />
            </svg>
        );
    }
    return (
        <svg {...common}>
            <path d="M47 22 A17 17 0 1 1 17 22" />
            <circle cx="47" cy="22" r="2.6" fill="currentColor" stroke="none" />
            <circle cx="17" cy="22" r="2.6" fill="currentColor" stroke="none" />
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
    '&:hover': { backgroundColor: 'rgba(243,239,228,0.08)' },
    '&:active': { transform: 'scale(0.82)', backgroundColor: 'rgba(243,239,228,0.14)' },
});

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function JewelleryHeader({ cartCount, onCartOpen, searchQuery, onSearchChange }) {
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
                backgroundColor: 'rgba(18,20,15,0.92)',
                backdropFilter: 'blur(10px)',
                borderBottom: `1px solid ${C.inkLine}`,
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
                        fontSize: '1.5rem',
                        letterSpacing: '0.01em',
                        color: C.onDark,
                        textDecoration: 'none',
                        flexShrink: 0,
                        transition: 'opacity 0.15s ease, transform 0.15s ease',
                        '&:active': { opacity: 0.65, transform: 'scale(0.97)' },
                    }}
                >
                    Solene
                </Typography>

                <Box
                    component="nav"
                    sx={{ display: { xs: 'none', md: 'flex' }, gap: 3.5, ml: 2 }}
                >
                    {CATEGORIES.map((c) => (
                        <NavLink key={c} onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}>
                            {c}
                        </NavLink>
                    ))}
                    <NavLink onClick={() => document.getElementById('atelier')?.scrollIntoView({ behavior: 'smooth' })}>
                        The atelier
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
                            placeholder="Search pieces"
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
                    <IconBtn
                        aria-label="Toggle search"
                        onClick={() => setSearchOpen((v) => !v)}
                    >
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
                                    minWidth: 180,
                                    backgroundColor: C.inkSoft,
                                    border: `1px solid ${C.inkLine}`,
                                    py: 1,
                                    animation: `${riseIn} 0.18s ease`,
                                }}
                            >
                                {['Sign in', 'Create account', 'Wishlist'].map((t) => (
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
                                            '&:hover': { backgroundColor: 'rgba(243,239,228,0.06)' },
                                            '&:active': { backgroundColor: 'rgba(243,239,228,0.14)' },
                                        }}
                                    >
                                        {t}
                                    </Box>
                                ))}
                                <Divider sx={{ my: 0.5, borderColor: C.inkLine }} />
                                <Typography sx={{ px: 2, py: 0.5, fontFamily: FONT_UI, fontSize: '0.72rem', color: C.onDarkMuted }}>
                                    Demo account menu
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <IconBtn aria-label={`Bag, ${cartCount} items`} onClick={onCartOpen}>
                        <Badge
                            badgeContent={cartCount}
                            invisible={cartCount === 0}
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: C.gold,
                                    color: C.ink,
                                    fontFamily: FONT_UI,
                                    fontWeight: 600,
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
                <Box sx={{ width: 260, height: '100%', backgroundColor: C.ink, color: C.onDark, p: 3 }}>
                    <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: '1.3rem', mb: 3 }}>Solene</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        {[...CATEGORIES, 'The atelier'].map((c) => (
                            <Box
                                key={c}
                                component="button"
                                onClick={() => {
                                    setMenuOpen(false);
                                    const id = c === 'The atelier' ? 'atelier' : 'new-arrivals';
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
        <Box
            component="section"
            sx={{
                backgroundColor: C.ink,
                color: C.onDark,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
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
                        sx={{
                            fontFamily: FONT_UI,
                            fontSize: '0.85rem',
                            color: C.goldBright,
                            mb: 2,
                            animation: `${riseIn} 0.6s ease both`,
                        }}
                    >
                        The autumn edit is here
                    </Typography>
                    <Typography
                        component="h1"
                        sx={{
                            fontFamily: FONT_DISPLAY,
                            fontWeight: 400,
                            fontSize: { xs: '2.4rem', sm: '3.1rem', md: '3.8rem' },
                            lineHeight: 1.08,
                            maxWidth: 620,
                            animation: `${riseIn} 0.6s ease 0.08s both`,
                        }}
                    >
                        Jewellery for the moments you&rsquo;ll tell twice.
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
                        Each ring, chain and stud is set by hand in our Vancouver atelier —
                        responsibly sourced stones, resized for free, for as long as you own it.
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            mt: 5,
                            animation: `${riseIn} 0.6s ease 0.24s both`,
                        }}
                    >
                        <Button
                            onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}
                            endIcon={<ArrowRightAltRoundedIcon />}
                            sx={{
                                fontFamily: FONT_UI,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                backgroundColor: C.gold,
                                color: C.ink,
                                px: 3,
                                py: 1.2,
                                borderRadius: 0,
                                transition: 'background-color 0.2s ease, transform 0.15s ease',
                                '&:hover': { backgroundColor: C.goldBright },
                                '&:active': { backgroundColor: C.goldBright, transform: 'scale(0.97)' },
                            }}
                        >
                            Shop the edit
                        </Button>
                        <Button
                            onClick={() => document.getElementById('atelier')?.scrollIntoView({ behavior: 'smooth' })}
                            sx={{
                                fontFamily: FONT_UI,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                color: C.onDark,
                                px: 3,
                                py: 1.2,
                                borderRadius: 0,
                                border: `1px solid ${C.inkLine}`,
                                transition: 'border-color 0.2s ease, background-color 0.2s ease, transform 0.15s ease',
                                '&:hover': { borderColor: C.gold, backgroundColor: 'rgba(184,146,90,0.06)' },
                                '&:active': { borderColor: C.gold, backgroundColor: 'rgba(184,146,90,0.12)', transform: 'scale(0.97)' },
                            }}
                        >
                            Book a private fitting
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: 'relative',
                        height: { xs: 280, md: 420 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: `${riseIn} 0.7s ease 0.1s both`,
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: { xs: 200, md: 260 },
                            height: { xs: 200, md: 260 },
                            transform: 'rotate(45deg)',
                            background: 'linear-gradient(145deg, #2E4C38 0%, #16241A 55%, #0E1611 100%)',
                            border: `1px solid ${C.gold}`,
                            overflow: 'hidden',
                            boxShadow: '0 40px 80px rgba(0,0,0,0.45)',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: '18%',
                                border: `1px solid rgba(217,184,136,0.5)`,
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '40%',
                                height: '220%',
                                background: 'linear-gradient(90deg, transparent, rgba(217,184,136,0.35), transparent)',
                                animation: `${sweep} 1.6s ease 0.9s 1`,
                            }}
                        />
                    </Box>
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
        { name: 'Rings', icon: 'ring', tone: 'emerald' },
        { name: 'Necklaces', icon: 'necklace', tone: 'gold' },
        { name: 'Earrings', icon: 'earring', tone: 'sapphire' },
        { name: 'Bracelets', icon: 'bracelet', tone: 'rosewood' },
    ];
    return (
        <Box component="section" ref={ref} sx={{ backgroundColor: C.ivory, py: { xs: 6, md: 8 } }}>
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
                                borderRadius: '50%',
                                background: TONES[item.tone],
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: C.goldBright,
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
// Editorial banner
// ---------------------------------------------------------------------------

function EditorialBanner() {
    const [ref, inView] = useInView(0.3);
    return (
        <Box
            id="atelier"
            component="section"
            ref={ref}
            sx={{ backgroundColor: C.ivorySoft, py: { xs: 8, md: 11 } }}
        >
            <Box
                sx={{
                    maxWidth: 820,
                    mx: 'auto',
                    px: { xs: 3, md: 5 },
                    textAlign: 'center',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
            >
                <Typography
                    sx={{
                        fontFamily: FONT_DISPLAY,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        lineHeight: 1.5,
                        color: C.onLight,
                    }}
                >
                    Each piece is set by hand in our Vancouver workshop, one stone at a time,
                    by jewellers who sign the inside of every band they finish.
                </Typography>
                <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.88rem', color: C.onLightMuted, mt: 3 }}>
                    The Solene workshop
                </Typography>
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
                    border: `1px solid ${C.inkLine}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: C.goldBright,
                    overflow: 'hidden',
                    transition: 'transform 0.35s ease',
                    '&:hover': { transform: 'scale(1.015)' },
                }}
            >
                {inView && <ProductArt icon={product.icon} size={76} />}
            </Box>
            <Box sx={{ pt: 2 }}>
                <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: '1.15rem', color: C.onLight }}>
                    {product.name}
                </Typography>
                <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.82rem', color: C.onLightMuted, mt: 0.4 }}>
                    {product.category} · {product.metal}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.4 }}>
                    <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.92rem', color: C.onLight, fontWeight: 500 }}>
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
                            color: C.emerald,
                            borderBottom: `1px solid ${C.emerald}`,
                            pb: '2px',
                            transition: 'color 0.2s ease, border-color 0.2s ease, transform 0.15s ease',
                            '&:hover': { color: C.rosewood, borderColor: C.rosewood },
                            '&:active': { color: C.rosewood, borderColor: C.rosewood, transform: 'scale(0.93)' },
                        }}
                    >
                        Add to bag
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
        <Box id="new-arrivals" component="section" sx={{ backgroundColor: C.ivory, py: { xs: 8, md: 10 } }}>
            <Box sx={{ maxWidth: 1360, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        gap: 3,
                        mb: 5,
                    }}
                >
                    <Typography
                        component="h2"
                        sx={{ fontFamily: FONT_DISPLAY, fontSize: { xs: '1.8rem', md: '2.3rem' }, color: C.onLight }}
                    >
                        New arrivals
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
                                    borderBottom: activeCategory === c ? `1px solid ${C.gold}` : '1px solid transparent',
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
                        Nothing matches &ldquo;{searchQuery}&rdquo; yet — try another search or browse all pieces.
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(2, 1fr)',
                                sm: 'repeat(3, 1fr)',
                                md: 'repeat(4, 1fr)',
                            },
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
        <Box component="section" ref={ref} sx={{ backgroundColor: C.ink, color: C.onDark, py: { xs: 8, md: 10 } }}>
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
                            borderTop: `1px solid ${C.gold}`,
                            pt: 2.5,
                        }}
                    >
                        <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: '1.1rem', mb: 1 }}>
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
        <Box
            component="section"
            sx={{
                background: 'linear-gradient(120deg, #274633 0%, #12211A 100%)',
                py: { xs: 8, md: 9 },
            }}
        >
            <Box sx={{ maxWidth: 640, mx: 'auto', px: 3, textAlign: 'center' }}>
                <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: { xs: '1.6rem', md: '2rem' }, color: C.onDark }}>
                    Be first to know
                </Typography>
                <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.92rem', color: C.onDarkMuted, mt: 1.5, mb: 4 }}>
                    New drops, restocks and workshop notes — a few emails a season, nothing more.
                </Typography>

                {subscribed ? (
                    <Typography sx={{ fontFamily: FONT_UI, color: C.goldBright, fontSize: '0.95rem' }}>
                        You&rsquo;re on the list.
                    </Typography>
                ) : (
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', justifyContent: 'center', gap: 0, maxWidth: 420, mx: 'auto' }}
                    >
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
                                backgroundColor: 'rgba(243,239,228,0.08)',
                                border: `1px solid ${C.inkLine}`,
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
                                textTransform: 'none',
                                fontSize: '0.88rem',
                                backgroundColor: C.gold,
                                color: C.ink,
                                borderRadius: 0,
                                px: 3,
                                flexShrink: 0,
                                transition: 'background-color 0.2s ease, transform 0.15s ease',
                                '&:hover': { backgroundColor: C.goldBright },
                                '&:active': { backgroundColor: C.goldBright, transform: 'scale(0.96)' },
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
        { title: 'Help', links: ['Shipping', 'Returns', 'Ring sizing', 'Care guide'] },
        { title: 'About', links: ['Our story', 'The atelier', 'Sustainability'] },
    ];
    return (
        <Box component="footer" sx={{ backgroundColor: C.ink, color: C.onDark, pt: { xs: 7, md: 9 }, pb: 4 }}>
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
                    <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: '1.4rem', mb: 2 }}>Solene</Typography>
                    <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.85rem', color: C.onDarkMuted, lineHeight: 1.7 }}>
                        Fine jewellery, set by hand in Vancouver. This page is a static demo
                        storefront built to preview the design — no orders are processed.
                    </Typography>
                </Box>
                {columns.map((col) => (
                    <Box key={col.title}>
                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.85rem', color: C.onDark, mb: 2, fontWeight: 500 }}>
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
            <Divider sx={{ borderColor: C.inkLine, maxWidth: 1360, mx: 'auto' }} />
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
                    © 2026 Solene. Demo storefront for portfolio preview only.
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
            <Box sx={{ width: { xs: 300, sm: 360 }, height: '100%', backgroundColor: C.ivory, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, borderBottom: `1px solid ${C.ivoryLine}` }}>
                    <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: '1.3rem', color: C.onLight }}>
                        Your bag
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        aria-label="Close bag"
                        sx={{
                            transition: 'transform 0.15s ease, background-color 0.2s ease',
                            '&:active': { transform: 'scale(0.82)' },
                        }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>

                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
                    {items.length === 0 ? (
                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.9rem', color: C.onLightMuted }}>
                            Your bag is empty. Add a piece from the new arrivals to see it here.
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
                                            color: C.goldBright,
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
                                            '&:hover': { color: C.rosewood },
                                            '&:active': { transform: 'scale(0.8)', color: C.rosewood },
                                        }}
                                    >
                                        <CloseRoundedIcon fontSize="small" />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>

                <Box sx={{ p: 3, borderTop: `1px solid ${C.ivoryLine}` }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.9rem', color: C.onLight }}>Subtotal</Typography>
                        <Typography sx={{ fontFamily: FONT_UI, fontSize: '0.9rem', color: C.onLight, fontWeight: 500 }}>
                            ${subtotal}
                        </Typography>
                    </Box>
                    <Button
                        fullWidth
                        disabled={items.length === 0}
                        sx={{
                            fontFamily: FONT_UI,
                            textTransform: 'none',
                            backgroundColor: C.ink,
                            color: C.onDark,
                            borderRadius: 0,
                            py: 1.3,
                            transition: 'background-color 0.2s ease, transform 0.15s ease',
                            '&:hover': { backgroundColor: C.inkSoft },
                            '&:active': { backgroundColor: C.inkSoft, transform: 'scale(0.98)' },
                            '&.Mui-disabled': { backgroundColor: C.ivoryLine, color: C.onLightMuted },
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

export default function JewelleryMarket() {
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
        setToast(`${product.name} added to your bag`);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(''), 2200);
    }, []);

    const handleRemove = useCallback((id) => {
        setCartItems((prev) => prev.filter((it) => it.id !== id));
    }, []);

    const handleCategorySelect = useCallback((category) => {
        setActiveCategory(category);
        document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const cartCount = cartItems.reduce((sum, it) => sum + it.qty, 0);

    return (
        <Box
            id="top"
            className="jewellery-page"
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
                .jewellery-page button,
                .jewellery-page a,
                .jewellery-page input {
                    outline: none;
                }
                .jewellery-page button:focus-visible,
                .jewellery-page a:focus-visible,
                .jewellery-page input:focus-visible {
                    outline: 2px solid ${C.gold};
                    outline-offset: 2px;
                }
            `}</style>
            <JewelleryHeader
                cartCount={cartCount}
                onCartOpen={() => setCartOpen(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            <Hero />
            <CategoryStrip onSelect={handleCategorySelect} />
            <EditorialBanner />
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
                    backgroundColor: C.ink,
                    color: C.onDark,
                    fontFamily: FONT_UI,
                    fontSize: '0.85rem',
                    px: 2.5,
                    py: 1.2,
                    border: `1px solid ${C.inkLine}`,
                    zIndex: 40,
                }}
            >
                {toast}
            </Box>
        </Box>
    );
}
