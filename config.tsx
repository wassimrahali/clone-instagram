import { usePathname } from 'next/navigation';
import { Bell, Bookmark, Briefcase, CircleFadingPlus, Home, ImagePlusIcon, Settings, User, Users } from 'lucide-react';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname === nav;
  }

  return [
    {
      name: 'Home',
      href: '/home',
      icon: <Home size={20} />,
      active: isNavItemActive(pathname, '/'),
      position: 'top',
    },
    {
      name: 'Create Post',
      href: '/create-post',
      icon: <ImagePlusIcon size={20} />, // Replace with an appropriate icon for creating a post
      active: isNavItemActive(pathname, '/create-post'),
      position: 'top',
    },
    {
      name: 'Saved',
      href: '/saved',
      icon: <Bookmark size={20} />, // Use a bookmark or similar icon
      active: isNavItemActive(pathname, '/saved'),
      position: 'top',
    },
    {
      name: 'People',
      href: '/all-users',
      icon: <Users size={20} />, // Use a users or similar icon
      active: isNavItemActive(pathname, '/all-users'),
      position: 'top',
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: <User size={20} />,
      active: isNavItemActive(pathname, '/profile'),
      position: 'top',
    },
    {
      name: 'Explore',
      href: '/explore',
      icon: <Bell size={20} />,
      active: isNavItemActive(pathname, '/explore'),
      position: 'top',
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: <Briefcase size={20} />,
      active: isNavItemActive(pathname, '/projects'),
      position: 'top',
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: <Settings size={20} />,
      active: isNavItemActive(pathname, '/settings'),
      position: 'bottom',
    },
  ];
};


export const smallNavItemsDevices = [
  {
    name: "Home",
    href: "/home",
    icon: <Home size={20} />,
    tooltip: "Home",
  },
  {
    name: "Create Post",
    href: "/create-post",
    icon: <CircleFadingPlus size={20} />,
    tooltip: "New post",
  },
  {
    name: "Saved",
    href: "/saved",
    icon: <Bookmark size={20} />,
    tooltip: "Bookmark",
  },
  {
    name: "Explore",
    href: "/explore",
    icon: <Bell size={20} />,
    tooltip: "Explore",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <User size={20} />,
    tooltip: "Profile",
  },
];