import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Button from "@/components/ui/button/Button";
import CountUp from "@/components/ui/Countup";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";


const STATS = [
  { end: 2400, label: "Active Job Listings" },
  { end: 800, label: "Verified Companies" },
  { end: 200, label: "Candidates Hired" },
];

export default function JobSeekerRegister() {
  return (
    <>
      <section>
        <div className="container section-padding">
          <div className="grid grid-cols-2 gap-8 shadow-lg rounded-3xl">
            <div className="py-10 px-8.5 bg-primary-blue rounded-tl-3xl rounded-bl-3xl flex flex-col items-center justify-center gap-10">
              <div className="flex items-center justify-center">
                <Image
                  src={"/assets/jobseekerlogin.png"}
                  alt="Job seeker login"
                  height={250}
                  width={300}
                  loading="eager"
                />
              </div>
              <div className="flex items-center flex-col gap-10">
                <div className="flex flex-col gap-1.5 pb-10 text-center border-b border-b-white/20 ">
                  <h2 className="text-xl font-bold line-height-sm font-manrope text-white">
                    Where Talent Meets Opportunity
                  </h2>
                  <p className="text-xs font-regular font-inter line-height-sm text-white ">
                    Connecting skilled people with companies worth joining.
                    Verified employers, easy in-platform applications, and a
                    straightforward job search experience.
                  </p>
                </div>
                <ul className="flex items-center gap-7">
                  {STATS.map((stat) => (
                    <li
                      className="flex flex-col items-center gap-0.5 "
                      key={stat.label}
                    >
                      <h2 className="text-lg-xl font-black text-white line-height-xl font-inter">
                        {/* {stats.end} */}
                        <CountUp end={stat.end} suffix="+" />
                      </h2>
                      <p className="text-sm font-regular line-height-sm text-white font-inter">
                        {stat.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="py-8 px-8.5 bg-white rounded-tr-3xl rounded-br-3xl flex flex-col gap-7">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1.5 items-center text-center">
                  <h1 className="text-xl font-bold font-manrope line-height-sm text-primary-blue">
                    Start Your Learning Journey
                  </h1>
                  <p className="text-xs font-regular line-height-sm text-subtext-gray3">
                    Join thousands of job seekers already transforming their
                    careers with Broadway Jobs.
                  </p>
                </div>
                <div className="flex flex-col gap-7">
                  <RegisterForm />
                  <div className="flex items-center justify-around gap-2">
                    <div className="h-[1px] w-full bg-[#dee2e6]"></div>
                    <p>OR</p>
                    <div className="h-[1px] w-full bg-[#dee2e6]"></div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button variant="neutral">
                      <Icon icon={"material-icon-theme:google"} />
                      Google
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
