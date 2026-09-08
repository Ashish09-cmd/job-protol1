"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
// import { useGlobal } from "@/app/context/GlobalContext";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
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

const HIDDEN_PREFIXES = ["/login", "/register", "/employer-zone"];

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

  const pathname = usePathname();
  const hideAuthActions = HIDDEN_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

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
            <div className="flex items-center gap-9">
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
                  <ul className="flex items-center gap-4">
                    <li className="text-sm font-regular">Find Jobs</li>
                    <li className="relative dropdown-menu">
                      <button
                        onMouseEnter={() => setIsCoursesDropdownOpen(true)}
                        className="flex items-center font-regular gap-1 px-4 py-3 text-sm font-inter text-text-subtext cursor-pointer hover:bg-[#F2F6FC] duration-100 rounded-lg"
                      >
                        Job Categories
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
                    </li>
                    <li>Training</li>
                    {/* Desktop Search */}
                    {/* <div ref={searchRef} className="relative">
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
                    </div> */}
                  </ul>
                </div>
              </div>
            </div>

            {!hideAuthActions && (
            <div className="flex items-center gap-6">
              <ul className="pe-8 border-e-[0.5px] border-toogle flex items-center gap-6">
                <li>
                  <Link
                    href={"login"}
                    className="py-2 px-4 text-primary-blue cursor-pointer rounded-md border border-primary-blue focus:outline-0 text-xs font-regular line-height-sm "
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/register"}
                    className="py-2 px-4 bg-primary-blue text-white cursor-pointer rounded-md focus:outline-0 text-xs font-regular line-height-sm "
                  >
                    Register
                  </Link>
                </li>
              </ul>
              <div className="">
                <Link
                  href={"/employer-zone"}
                  className="flex items-center gap-1.6 text-sm line-height-sm text-subtext-primary-color"
                >
                  <span>For Company</span>
                  <span className="text-md">
                    <Icon icon={"uil:angle-right"}></Icon>
                  </span>
                </Link>
              </div>
            </div>
              )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
