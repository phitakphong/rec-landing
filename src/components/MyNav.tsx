"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar, NavbarBrand, Nav, NavItem, NavbarText, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarToggler } from "reactstrap";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname } from "next/navigation";

import { useTranslation } from "react-i18next";
import { useState } from "react";

// import { useRouter } from "next/navigation";

export default function CustomNavbar() {
  const { t } = useTranslation(["nav"]);
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="d-none d-xl-block">
        <Navbar expand="sm" className="navbar-custom">
          <NavbarBrand href="/home">
            <Image src="/logo.svg" alt="Logo" width={150} height={50} priority />
          </NavbarBrand>
          <Nav className="me-auto" navbar>
            <NavItem className="mx-2">
              <Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>
                {t("M_1")}
              </Link>
            </NavItem>

            {/* Dropdown Menu */}
            <NavItem className="mx-2">
              <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav caret className={`nav-link ${["/our-product-1", "/our-product-2"].indexOf(pathname) >= 0 ? "active" : ""}`}>
                  {t("M_2")}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <Link href="/our-product-1" className={`dropdown-item ${pathname === "/our-product-1" ? "fw-bold txt-purple" : ""}`}>
                      {t("M_2_1")}
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href="/our-product-2" className={`dropdown-item ${pathname === "/our-product-2" ? "fw-bold txt-purple" : ""}`}>
                      {t("M_2_2")}
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>

            {/* Other NavItems */}
            <NavItem className="mx-2">
              <Link href="/register" className={`nav-link ${pathname.includes("/register") ? "active" : ""}`}>
                {t("M_8")}
              </Link>
            </NavItem>
            <NavItem className="mx-2">
              <Link href="/rec-calc" className={`nav-link ${pathname.includes("/rec-calc") ? "active" : ""}`}>
                {t("M_3")}
              </Link>
            </NavItem>
            <NavItem className="mx-2">
              <Link href="/news" className={`nav-link ${pathname.includes("/news") ? "active" : ""}`}>
                {t("M_4")}
              </Link>
            </NavItem>
            <NavItem className="mx-2">
              <Link href="/faq" className={`nav-link ${pathname.includes("/faq") ? "active" : ""}`}>
                {t("M_5")}
              </Link>
            </NavItem>
            <NavItem className="mx-2">
              <Link href="/contactus" className={`nav-link ${pathname.includes("/contactus") ? "active" : ""}`}>
                {t("M_9")}
              </Link>
            </NavItem>
          </Nav>

          <NavbarText>
            <LanguageSwitcher />
          </NavbarText>
          <NavbarText className="mx-1">
            <div style={{ borderLeft: "2px solid #1E1F4B4D", height: "30px" }} />
          </NavbarText>
          <NavbarText className="ms-3">
            <Button outline color="primary" style={{ width: 140, height: 50 }}>
              {t("M_6")}
            </Button>
          </NavbarText>
          <NavbarText className="ms-3">
            <Button color="primary" className="bg-primary-gradient" style={{ width: 140 }}>
              {t("M_7")}
            </Button>
          </NavbarText>
        </Navbar>
      </div>
      <div className="d-block d-xl-none">
        <Navbar className="navbar-custom">
          <NavbarBrand href="/home">
            <Image src="/logo.svg" alt="Logo" width={150} height={50} priority />
          </NavbarBrand>
          <div className="d-flex">
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
              <NavItem className="mx-2">
                <Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>
                  {t("M_1")}
                </Link>
              </NavItem>

              {/* Dropdown Menu */}
              <NavItem className="mx-2">
                <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle nav caret className={`nav-link ${["/our-product-1", "/our-product-2"].indexOf(pathname) >= 0 ? "active" : ""}`}>
                    {t("M_2")}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link href="/our-product-1" className={`dropdown-item dropdown-item-warp ${pathname === "/our-product-1" ? "fw-bold txt-purple" : ""}`}>
                        {t("M_2_1")}
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/our-product-2" className={`dropdown-item dropdown-item-warp ${pathname === "/our-product-2" ? "fw-bold txt-purple" : ""}`}>
                        {t("M_2_2")}
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>

              {/* Other NavItems */}
              <NavItem className="mx-2">
                <Link href="/register" className={`nav-link ${pathname.includes("/register") ? "active" : ""}`}>
                  {t("M_8")}
                </Link>
              </NavItem>
              <NavItem className="mx-2">
                <Link href="/rec-calc" className={`nav-link ${pathname.includes("/rec-calc") ? "active" : ""}`}>
                  {t("M_3")}
                </Link>
              </NavItem>
              <NavItem className="mx-2">
                <Link href="/news" className={`nav-link ${pathname.includes("/news") ? "active" : ""}`}>
                  {t("M_4")}
                </Link>
              </NavItem>
              <NavItem className="mx-2">
                <Link href="/faq" className={`nav-link ${pathname.includes("/faq") ? "active" : ""}`}>
                  {t("M_5")}
                </Link>
              </NavItem>
              <NavItem className="mx-2">
                <Link href="/contactus" className={`nav-link ${pathname.includes("/contactus") ? "active" : ""}`}>
                  {t("M_9")}
                </Link>
              </NavItem>
            </Nav>

            <NavbarText>
              <div className="d-flex">
                <Button outline color="primary" style={{ width: 140, height: 50 }}>
                  {t("M_6")}
                </Button>
                <div>&emsp;</div>
                <Button color="primary" className="bg-primary-gradient" style={{ width: 140 }}>
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
