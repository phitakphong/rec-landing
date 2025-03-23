"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar, NavbarBrand, Nav, NavItem, NavbarText, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarToggler } from "reactstrap";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname, useRouter } from "next/navigation";

import { useTranslation } from "react-i18next";

// import { useRouter } from "next/navigation";

export default function CustomNavbar() {
  const { t } = useTranslation(["nav"]);
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleNavbar = () => setIsOpen(!isOpen);

  const dropdownRef = useRef<HTMLDivElement | null>(null); // ใช้ useRef เพื่ออ้างอิงไปยัง div ของ dropdown

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState); // Toggle dropdown state
  };

  const closeDropdown = () => {
    setDropdownOpen(false); // Close the dropdown
  };

  // ตรวจจับการคลิกภายนอกเมนู dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const href = (event.target as any).href;

      if (href && href.toString().endsWith("our-product-1")) {
        router.push("/our-product-1");
      } else if (href && href.toString().endsWith("our-product-2")) {
        router.push("/our-product-2");
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goRegisterCompany = () => {
    router.push("/register-company");
  };

  return (
    <>
      <div className="d-none d-xl-block">
        <Navbar expand="sm" className="navbar-custom ">
          <NavbarBrand href="/home">
            <div style={{ position: "relative", width: "92px", height: "49.971px" }}>
              <Image src="/logo.svg" alt="green2" fill priority />
            </div>
          </NavbarBrand>
          <Nav navbar>
            <NavItem className="my-auto">
              <Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>
                {t("M_1")}
              </Link>
            </NavItem>

            {/* Dropdown Menu */}

            <NavItem className="my-auto">
              <div className="dropdown" ref={dropdownRef}>
                <button className={`nav-link dropdown-toggle ${dropdownOpen || ["/our-product-1", "/our-product-2"].includes(pathname) ? "active" : ""}`} onClick={toggleDropdown}>
                  {t("M_2")}
                </button>

                {dropdownOpen && (
                  <ul className="dropdown-menu show">
                    <li>
                      <a
                        href="/our-product-1"
                        className={`dropdown-item ${pathname === "/our-product-1" ? "fw-bold txt-purple" : ""}`}
                        onClick={(e) => {
                          e.preventDefault(); // หยุดไม่ให้ <a> ทำงานทันที
                          closeDropdown(); // ปิดเมนู
                          router.push("/our-product-1"); // แล้วค่อยเปลี่ยน route
                        }}
                      >
                        {t("M_2_1")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="/our-product-2"
                        className={`dropdown-item ${pathname === "/our-product-2" ? "fw-bold txt-purple" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          closeDropdown();
                          router.push("/our-product-2");
                        }}
                      >
                        {t("M_2_2")}
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </NavItem>

            {/* Other NavItems */}
            <NavItem className="my-auto">
              <Link href="/register" className={`nav-link ${pathname === "/register" ? "active" : ""}`}>
                {t("M_8")}
              </Link>
            </NavItem>
            <NavItem className="my-auto">
              <Link href="/rec-calc" className={`nav-link ${pathname.includes("/rec-calc") ? "active" : ""}`}>
                {t("M_3")}
              </Link>
            </NavItem>
            <NavItem className="my-auto">
              <Link href="/news" className={`nav-link ${pathname.includes("/news") ? "active" : ""}`}>
                {t("M_4")}
              </Link>
            </NavItem>
            <NavItem className="my-auto">
              <Link href="/faq" className={`nav-link ${pathname.includes("/faq") ? "active" : ""}`}>
                {t("M_5")}
              </Link>
            </NavItem>
            <NavItem className="my-auto">
              <Link href="/contactus" className={`nav-link ${pathname.includes("/contactus") ? "active" : ""}`}>
                {t("M_9")}
              </Link>
            </NavItem>
            <NavItem className="my-auto">
              <LanguageSwitcher />
            </NavItem>
            <NavItem className="my-auto">
              <div style={{ borderLeft: "2px solid #1E1F4B4D", height: "30px" }} />
            </NavItem>
            <NavItem className="my-auto">
              <Button outline color="border" style={{ width: 100, height: 48 }} onClick={() => goRegisterCompany()}>
                {t("M_6")}
              </Button>
            </NavItem>
            <NavItem className="my-auto">
              <Button color="border" className="bg-primary-gradient" style={{ width: 100, height: 48 }}>
                {t("M_7")}
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
      <div className="d-block d-xl-none">
        <Navbar className="navbar-custom nav-item-mobile">
          <NavbarBrand href="/home">
            <Image src="/logo.svg" alt="Logo" width={150} height={50} priority />
          </NavbarBrand>
          <div className="d-flex flex-fill justify-content-end">
            <LanguageSwitcher />
            <NavbarToggler onClick={toggleNavbar}>{isOpen ? <i className="bi bi-x-lg fs-4"></i> : <i className="bi bi-list fs-4"></i>}</NavbarToggler>
          </div>

          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            style={{
              transform: isOpen ? "translateY(0)" : "translateY(-100%)", // Slide in and out effect
              opacity: isOpen ? 1 : 0, // Fade in and out
              visibility: isOpen ? "visible" : "hidden", // Handle visibility during collapse
              transition: "transform 0.3s ease-out, opacity 0.3s ease-out, visibility 0s linear 0.3s", // Smooth transition
            }}
          >
            <Nav className="me-auto" navbar>
              <NavItem className="">
                <Link href="/about" className={`py-0 nav-link ${pathname === "/about" ? "active" : ""}`}>
                  {t("M_1")}
                </Link>
              </NavItem>

              {/* Dropdown Menu */}
              <NavItem className="">
                <div className="dropdown" ref={dropdownRef}>
                  <button
                    className={`p-0 nav-link dropdown-toggle ${dropdownOpen ? "active" : ""}`}
                    onClick={toggleDropdown} // Toggle dropdown state on button click
                  >
                    {t("M_2")}
                  </button>
                  {/* Show dropdown menu when dropdownOpen is true */}
                  {dropdownOpen && (
                    <ul className="dropdown-menu" style={{ display: "block" }}>
                      <li>
                        <Link href="/our-product-1" legacyBehavior passHref>
                          <a
                            className={`dropdown-item ${pathname === "/our-product-1" ? "fw-bold txt-purple" : ""}`}
                            onClick={closeDropdown} // Close the dropdown on click
                          >
                            {t("M_2_1")}
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/our-product-2" legacyBehavior passHref>
                          <a
                            className={`dropdown-item ${pathname === "/our-product-2" ? "fw-bold txt-purple" : ""}`}
                            onClick={closeDropdown} // Close the dropdown on click
                          >
                            {t("M_2_2")}
                          </a>
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </NavItem>

              {/* Other NavItems */}
              <NavItem className="">
                <Link href="/register" className={`py-0 nav-link ${pathname === "/register" ? "active" : ""}`}>
                  {t("M_8")}
                </Link>
              </NavItem>
              <NavItem className="">
                <Link href="/rec-calc" className={`py-0 nav-link ${pathname.includes("/rec-calc") ? "active" : ""}`}>
                  {t("M_3")}
                </Link>
              </NavItem>
              <NavItem className="">
                <Link href="/news" className={`py-0 nav-link ${pathname.includes("/news") ? "active" : ""}`}>
                  {t("M_4")}
                </Link>
              </NavItem>
              <NavItem className="">
                <Link href="/faq" className={`py-0 nav-link ${pathname.includes("/faq") ? "active" : ""}`}>
                  {t("M_5")}
                </Link>
              </NavItem>
              <NavItem className="">
                <Link href="/contactus" className={`py-0 nav-link ${pathname.includes("/contactus") ? "active" : ""}`}>
                  {t("M_9")}
                </Link>
              </NavItem>
            </Nav>

            <NavbarText>
              <div className="d-flex mt-3">
                <Button outline color="border" style={{ width: 100, height: 48 }} onClick={() => goRegisterCompany()}>
                  {t("M_6")}
                </Button>
                <div>&emsp;</div>
                <Button color="border" className="bg-primary-gradient" style={{ width: 100, height: 48 }}>
                  {t("M_7")}
                </Button>
              </div>
            </NavbarText>
          </div>
        </Navbar>
      </div>
    </>
  );
}
