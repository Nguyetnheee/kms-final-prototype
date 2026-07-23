import "./globals.css";

export const metadata = {
  title: "UAV Knowledge System",
  description: "Hệ thống quản trị tri thức UAV",
};

export default function RootLayout({ children }) {
  return <html lang="vi"><body>{children}</body></html>;
}
