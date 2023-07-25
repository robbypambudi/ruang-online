import { IconType } from 'react-icons';
import { AiFillInstagram } from 'react-icons/ai';
import { FaLinkedinIn, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { RiLineFill } from 'react-icons/ri';

type Event = {
  name: string;
  href: string;
  color: string;
  hover: string;
};

type QuickLink = {
  name: string;
  href: string;
};

type Social = {
  name: string;
  href: string;
  icon: IconType;
};

export const quickLinks: QuickLink[] = [
  {
    name: 'Contact',
    href: '#contact',
  },
  {
    name: 'Masuk',
    href: '/login',
  },
  {
    name: 'Daftar',
    href: '/register',
  },
];

export const socials: Social[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/geosentric.its',
    icon: FaTwitter,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/geosentric.its',
    icon: AiFillInstagram,
  },
  {
    name: 'Youtube',
    href: 'https://www.youtube.com/@geosentricits',
    icon: FaYoutube,
  },
  {
    name: 'Linkedin',
    href: 'https://www.linkedin.com/company/geosentricits',
    icon: FaLinkedinIn,
  },
  {
    name: 'Tiktok',
    href: 'https://www.tiktok.com/@geosentric.its',
    icon: FaTiktok,
  },
  {
    name: 'Line',
    href: '/',
    icon: RiLineFill,
  },
];

export const events: Event[] = [
  {
    name: 'Geolympic',
    href: '/geolympic',
    color: 'text-white',
    hover: 'hover:brightness-90',
  },
  {
    name: 'Geopost',
    href: '/geopost',
    color: 'text-white',
    hover: 'hover:brightness-90',
  },
];
