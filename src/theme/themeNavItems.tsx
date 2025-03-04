import FeedIcon from "@mui/icons-material/Feed";

interface NavItem {
  text: string;
  icon: React.ReactNode;
  href: string;
}

export const themeNavItems: NavItem[] = [
  {
    text: "Default Theme",
    icon: <FeedIcon />,
    href: "/theme/default",
  },
];
