"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
// import { useGlobal } from "@/app/context/GlobalContext";
import { siteConfig } from "@/config/site";
// import { siteConfig } from "";

interface Course {
  id: string;
  title: string;
  slug: string;
  permalink: string;
  image: string;
}

interface SubCategory {
  id: number;
  name: string;
  slug?: string;
  permalink?: string;
  courses: string[];
  rawCourses?: Course[];
}

interface Category {
  id: number;
  name: string;
  slug?: string;
  subcategories: SubCategory[];
  isSingleCourse?: boolean;
}

interface SearchSuggestion {
  title: string;
  slug: string;
  permalink: string;
  images: string;
}

/**
 * STATIC SAMPLE DATA
 * Replace/extend this with whatever categories, subcategories, and
 * courses you want to ship in a static build. Each subcategory acts
 * as a "course" entry here, mirroring the shape the original API
 * response produced after mapping.
 */
const STATIC_CATEGORIES: Category[] = [
  {
    id: 0,
    name: "Coding for Kids",
    slug: "/coding-for-kids",
    subcategories: [
      {
        id: 0,
        name: "Beginner Coding for Kids",
        slug: "beginner-coding-for-kids",
        permalink: "/courses/beginner-coding-for-kids",
        courses: ["Beginner Coding for Kids"],
      },
      {
        id: 1,
        name: "Intermediate Coding for Kids",
        slug: "intermediate-coding-for-kids",
        permalink: "/courses/intermediate-coding-for-kids",
        courses: ["Intermediate Coding for Kids"],
      },
      {
        id: 2,
        name: "Advanced Coding for Kids",
        slug: "advanced-coding-for-kids",
        permalink: "/courses/advanced-coding-for-kids",
        courses: ["Advanced Coding for Kids"],
      },
    ],
    isSingleCourse: false,
  },
  {
    id: 1,
    name: "Robotics",
    slug: "/robotics",
    subcategories: [
      {
        id: 0,
        name: "Intro to Robotics",
        slug: "intro-to-robotics",
        permalink: "/courses/intro-to-robotics",
        courses: ["Intro to Robotics"],
      },
      {
        id: 1,
        name: "Advanced Robotics",
        slug: "advanced-robotics",
        permalink: "/courses/advanced-robotics",
        courses: ["Advanced Robotics"],
      },
    ],
    isSingleCourse: false,
  },
  {
    id: 2,
    name: "Math Enrichment",
    slug: "/math-enrichment",
    subcategories: [
      {
        id: 0,
        name: "Math Enrichment",
        slug: "math-enrichment",
        permalink: "/courses/math-enrichment",
        courses: ["Math Enrichment"],
      },
    ],
    isSingleCourse: true,
  },
];

/** Flattened list used to power the static search-suggestion dropdown. */
const STATIC_SEARCH_INDEX: SearchSuggestion[] = STATIC_CATEGORIES.flatMap(
  (cat) =>
    cat.subcategories.map((sub) => ({
      title: sub.name,
      slug: sub.slug || "",
      permalink: sub.permalink || "#",
      images: "/default.jpg",
    })),
);

const STATIC_FOOTER_SECTIONS = [
  {
    sections: [
      {
        title: "Company",
        menus: [
          { title: "About Us", url: "/about", target: "_self" },
          { title: "Careers", url: "/careers", target: "_self" },
          { title: "Contact", url: "/contact", target: "_self" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Resources",
        menus: [
          { title: "Blog", url: "/blog", target: "_self" },
          { title: "FAQ", url: "/faq", target: "_self" },
        ],
      },
    ],
  },
];

const Header = () => {
//   const { contact_information } = useGlobal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubCategory, setActiveSubCategory] = useState(0);
  const [currentView, setCurrentView] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const isClickingSuggestion = useRef(false);

  // Static data — no fetch, no loading state needed.
  const CourseCategoryData: Category[] = STATIC_CATEGORIES;

  // Client-side filter over the static search index (replaces the debounced API call).
  const suggestions: SearchSuggestion[] = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length < 1) return [];
    return STATIC_SEARCH_INDEX.filter((item) =>
      item.title.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  useEffect(() => {
    setShowSuggestions(
      searchQuery.trim().length >= 1 && suggestions.length > 0,
    );
  }, [searchQuery, suggestions.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isClickingSuggestion.current) return;
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setCurrentView("categories");
      setSelectedCategory(null);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLeftMenu = () => setIsLeftMenuOpen(!isLeftMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleCategoryClick = (index: number) => {
    setSelectedCategory(index);
    setCurrentView("subcategories");
  };

  const handleGoBack = () => {
    if (currentView === "courses") {
      setCurrentView("subcategories");
    } else if (currentView === "subcategories") {
      setCurrentView("categories");
      setSelectedCategory(null);
    }
  };

  useEffect(() => {
    const lockScroll = isMenuOpen || isLeftMenuOpen || isSearchOpen;
    if (lockScroll) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen, isLeftMenuOpen, isSearchOpen]);

  return (
    <>
      <header
        className={`hidden lg:block ${isSticky ? "sticky-header" : ""} border-b border-[#0000001A]`}
      >
        <div
          className={`container ${isSticky ? "py-5" : "py-5"}`}
          onMouseLeave={() => setIsCoursesDropdownOpen(false)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <Link href={"/"} className="logo cursor-pointer">
                  <img
                    src={`/${siteConfig.header_logo}`}
                    alt={`${siteConfig.header_logo_alt}`}
                    loading="eager"
                  />
                </Link>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative dropdown-menu">
                      <button
                        onMouseEnter={() => setIsCoursesDropdownOpen(true)}
                        className="flex items-center font-bold gap-1 px-4 py-3 text-sm font-baloo2 text-text-subtext cursor-pointer hover:bg-[#F2F6FC] duration-100 rounded-lg"
                      >
                        All Courses
                        <Icon
                          icon="meteor-icons:angle-down"
                          className="text-text-subtext"
                        />
                      </button>
                      <div
                        className={`bg-white shadow-2xl rounded-md absolute top-17.5 z-30 -left-40 transition-opacity duration-200 ${
                          isCoursesDropdownOpen
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        } ${
                          CourseCategoryData[activeCategory]?.subcategories
                            ?.length > 1
                            ? "w-200"
                            : "w-100"
                        }`}
                        onMouseLeave={() => setIsCoursesDropdownOpen(false)}
                      >
                        <div
                          className={`grid ${
                            CourseCategoryData[activeCategory]?.subcategories
                              ?.length > 1
                              ? "grid-cols-2"
                              : "grid-cols-1"
                          }`}
                        >
                          <div>
                            <div className="flex flex-col gap-4">
                              <ul className="flex flex-col gap-2 p-6">
                                {CourseCategoryData.map((category) => (
                                  <li key={category.id}>
                                    <Link
                                      href={`${category.slug}`}
                                      onMouseEnter={() => {
                                        setActiveCategory(category.id);
                                        setActiveSubCategory(0);
                                      }}
                                      onClick={() =>
                                        setIsCoursesDropdownOpen(false)
                                      }
                                      className={`flex items-center justify-between cursor-pointer w-full text-left px-2 py-1 rounded text-sm font-regular text-gray-text-body hover:bg-[#F2F6FC] ${
                                        activeCategory === category.id
                                          ? "bg-[#F2F6FC]"
                                          : ""
                                      }`}
                                    >
                                      <span>{category.name}</span>
                                      {category.subcategories?.length > 1 && (
                                        <Icon
                                          icon="meteor-icons:angle-right"
                                          className="text-gray-700 text-xs"
                                        />
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              <div className="ps-6 pt-6 pr-6 pb-4 border-blue-50 border-t">
                                <Link
                                  href={"/courses"}
                                  onClick={() =>
                                    setIsCoursesDropdownOpen(false)
                                  }
                                  className="flex items-center justify-center gap-2 bg-darkblue-800 text-white font-regular py-2.5 px-6 rounded-lg"
                                >
                                  <p className="text-[#F6F6F9] text-xs font-medium line-height-sm">
                                    Explore All Courses
                                  </p>
                                  <Icon
                                    icon="material-symbols:arrow-right-alt-rounded"
                                    className="text-sm"
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>

                          {CourseCategoryData[activeCategory]?.subcategories
                            ?.length > 1 && (
                            <div className="p-6 bg-[#F2F6FC] shadow-sm">
                              <ul className="flex flex-col gap-2">
                                {CourseCategoryData[
                                  activeCategory
                                ]?.subcategories.map((subcategory, index) => (
                                  <li key={index}>
                                    <Link href={`${subcategory.permalink}`}>
                                      <button
                                        onMouseEnter={() =>
                                          setActiveSubCategory(index)
                                        }
                                        onClick={() =>
                                          setIsCoursesDropdownOpen(false)
                                        }
                                        className={`flex items-center cursor-pointer justify-between w-full text-left px-2 py-1 rounded text-sm font-regular text-gray-text-body hover:bg-white hover:text-main-color ${
                                          activeSubCategory === index
                                            ? "bg-[#F2F6FC]"
                                            : ""
                                        }`}
                                      >
                                        <span>{subcategory.name}</span>
                                      </button>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Search */}
                    <div ref={searchRef} className="relative">
                      <form
                        action="/courses/search"
                        method="GET"
                        className="flex items-center relative rounded-[38px] border-1 border-[#DADADC] px-4 py-3 justify-between"
                      >
                        <input
                          type="text"
                          name="q"
                          placeholder="What do you want to learn today?"
                          id="searchInput"
                          className="text-sm border-none focus:outline-0 w-full placeholder:text-black/25"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() =>
                            searchQuery.length >= 2 && setShowSuggestions(true)
                          }
                        />
                        <div className="searchIcon" id="search-icon"></div>
                        <Icon
                          icon="ri:search-line"
                          className="absolute right-4 text-gray-400 text-lg cursor-pointer"
                        />
                      </form>

                      {showSuggestions && suggestions.length > 0 && (
                        <div
                          className="absolute top-full -left-20 right-0 bg-white border border-gray-200 mt-5 shadow-2xl z-50 w-140 max-h-90 overflow-y-auto"
                          onMouseDown={() =>
                            (isClickingSuggestion.current = true)
                          }
                          onMouseUp={() =>
                            (isClickingSuggestion.current = false)
                          }
                        >
                          {suggestions.map((course, index) => (
                            <Link
                              key={index}
                              href={`${course.permalink}`}
                              className="flex items-center gap-4 p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                              onClick={() => setShowSuggestions(false)}
                            >
                              <div className="w-25">
                                <div className="h-15">
                                  <img
                                    src={course.images}
                                    alt={course.title}
                                    className="h-full w-full object-cover rounded"
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium mb-1 font-geologica text-gray-900">
                                  {course.title}
                                </h4>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-end font-bold font-baloo2 text-xs line-height-xs text-text-body">
                Inquiry Hotline:
                  <a href="">
                    
                  </a>
              </div>
              <div>
                <Link
                  href={"/inquiry"}
                  className="flex items-center gap-2 bg-darkblue-800 text-white font-regular py-3.5 px-6 rounded-lg"
                >
                  Send Inquiry
                  <Icon icon="material-symbols:arrow-right-alt"></Icon>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`lg:hidden bg-white border-b border-[#DADADC] py-4 px-4 ${isSticky ? "sticky-header" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={toggleLeftMenu}
                className="flex cursor-pointer items-center gap-1 py-3"
              >
                <Icon
                  icon="ic:baseline-menu"
                  className="text-text-subtext text-[28px]"
                />
              </button>
            </div>
            <div>
              <Link href={"/"}>
                <img
                  src={`/${siteConfig.header_logo}`}
                  alt={`${siteConfig.header_logo_alt}`}
                  className="h-8.5 w-auto"
                  loading="eager"
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleMenu}
              className="flex items-center font-bold gap-1 px-4 py-3 text-sm font-baloo2 text-text-subtext cursor-pointer hover:bg-[#F2F6FC] duration-100 rounded-lg"
            >
              All Courses
              <Icon
                icon="meteor-icons:angle-down"
                className="text-text-subtext"
              />
            </button>
            <button className="cursor-pointer" onClick={toggleSearch}>
              <Icon
                icon="ri:search-line"
                className="text-lg text-text-subtext"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Left Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-99999 transition-transform duration-300 ${
          isLeftMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-4/5`}
      >
        <div className="p-4">
          <button onClick={toggleLeftMenu} className="mb-4">
            ✕
          </button>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col col-span-4 gap-2">
              {STATIC_FOOTER_SECTIONS[0].sections.map((section, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-text-heading font-baloo2 line-height-lg">
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {section.menus.map((menu, menuIndex) => (
                      <li key={menuIndex}>
                        <Link
                          href={menu.url}
                          target={menu.target}
                          className="text-sm font-medium mb-1 font-geologica text-gray-900"
                        >
                          {menu.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-col col-span-3 gap-6">
              {STATIC_FOOTER_SECTIONS[1].sections.map((section, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="text-lg text-text-heading font-bold font-baloo2 line-height-lg">
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {section.menus.map((menu, menuIndex) => (
                      <li key={menuIndex}>
                        <Link
                          href={menu.url}
                          target={menu.target}
                          className="text-sm font-medium mb-1 font-geologica text-gray-900"
                        >
                          {menu.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Offcanvas Courses */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-99999 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } w-4/5 md:w-2/5`}
      >
        <div className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            {currentView !== "categories" && (
              <button
                onClick={handleGoBack}
                className="flex mb-2 items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Icon icon="meteor-icons:angle-left" className="text-lg" />
                Go Back
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="text-end flex justify-end"
              aria-label="Close popup"
            >
              <Icon icon="uil:multiply" className="text-xl text-gray-700" />
            </button>
          </div>

          <div>
            {currentView === "categories" && (
              <>
                <h5 className="text-md font-semibold text-gray-text-title mb-2 font-poppins">
                  Explore Courses
                </h5>
                <ul className="flex flex-col gap-2">
                  {CourseCategoryData.map((category, index) => {
                    const courseCount = category.subcategories?.length || 0;
                    const firstCourse = category.subcategories?.[0];

                    return (
                      <li key={index}>
                        {courseCount > 1 ? (
                          <button
                            onClick={() => handleCategoryClick(index)}
                            className="flex items-center justify-between w-full text-left px-2 py-2 rounded text-sm text-gray-text-body text-text-subtext font-medium hover:bg-gray-100"
                          >
                            <span>{category.name}</span>
                            <Icon
                              icon="meteor-icons:angle-right"
                              className="text-gray-700 text-xs"
                            />
                          </button>
                        ) : courseCount === 1 ? (
                          <Link
                            href={firstCourse?.permalink || "#"}
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full px-2 py-2 rounded text-sm text-gray-text-body text-text-subtext font-medium hover:bg-gray-100"
                          >
                            {category.name}
                          </Link>
                        ) : (
                          <span className="block w-full px-2 py-2 text-sm text-gray-400">
                            {category.name}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {currentView === "subcategories" &&
              selectedCategory !== null &&
              CourseCategoryData[selectedCategory] && (
                <>
                  <h5 className="text-md font-semibold text-gray-text-title mb-2 font-poppins">
                    {CourseCategoryData[selectedCategory].name}
                  </h5>
                  <ul className="flex flex-col gap-2">
                    {CourseCategoryData[selectedCategory].subcategories.map(
                      (subcategory, index) => (
                        <li key={index}>
                          <Link
                            href={subcategory.permalink || "#"}
                            onClick={() => toggleMenu()}
                            className="block w-full px-2 py-2 rounded text-sm text-gray-text-body text-text-subtext font-medium hover:bg-gray-100"
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </>
              )}
          </div>
        </div>
      </div>

      {/* Offcanvas Search */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-9999 transition-transform duration-300 ${
          isSearchOpen ? "-translate-x-0" : "translate-x-full"
        } w-4/5 md:w-2/5`}
      >
        <div className="p-4">
          <button onClick={toggleSearch} className="mb-4">
            ✕
          </button>
          <div ref={searchRef} className="relative">
            <form action="/courses/search" method="GET">
              <input
                type="text"
                name="q"
                placeholder="Search courses..."
                id="searchInputMobile"
                className="w-full border p-3 border-[#DADADC] rounded mb-4 focus:outline-none text-sm placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() =>
                  searchQuery.length >= 2 && setShowSuggestions(true)
                }
              />
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div
                className="pb-6 border-b border-gray-200"
                onMouseDown={() => (isClickingSuggestion.current = true)}
                onMouseUp={() => (isClickingSuggestion.current = false)}
              >
                {suggestions.map((course, index) => (
                  <Link
                    key={index}
                    href={`${course.permalink}`}
                    className="flex items-center gap-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => setShowSuggestions(false)}
                  >
                    <div className="w-15">
                      <div className="h-10">
                        <img
                          src={course.images}
                          alt={course.title}
                          className="h-full w-full object-cover rounded"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-1 font-geologica text-gray-900">
                        {course.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <h5 className="font-semibold mb-2 mt-3">Popular Searches</h5>
          <ul className="flex flex-col gap-2 text-sm">
            <li>Beginner Coding for Kids</li>
            <li>Intermediate Coding for Kids</li>
            <li>Advanced Coding for Kids</li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {(isMenuOpen || isLeftMenuOpen || isSearchOpen) && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-80 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsLeftMenuOpen(false);
            setIsSearchOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default Header;
