import { Link } from "react-router-dom";

const menuItems = [
  { path: "/", label: "홈" },
  { path: "/about", label: "회사 정보" },
  { path: "/leadership", label: "임원 소개" },
  { path: "/board", label: "업무 게시판" },
  { path: "/our-services", label: "제공 기술" },
  { path: "/contact", label: "문의하기" },
];

const MenuItem = ({ path, label, onClick }) => {
  return (
    <li>
      <Link
        to={path}
        className="hover:text-blue-600 transition duration-300"
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
};

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:ml-12 lg:mr-8">
          <a href="/">ABC Company</a>
        </h1>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-8 text-lg">
            {menuItems.map((item) => (
              <MenuItem key={item.path} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
