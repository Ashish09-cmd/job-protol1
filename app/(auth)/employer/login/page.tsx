import LoginForm from "@/components/auth/LoginForm";
import Button from "@/components/ui/button/Button";
import CountUp from "@/components/ui/Countup";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function CompanyLogin() {
  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto py-8 lg:py-12 ">
          <div className="grid grid-cols-2 gap-8 shadow-lg rounded-3xl">
            <div className="py-10 px-8.5 bg-primary-blue rounded-tl-3xl items-center justify-center rounded-bl-3xl flex flex-col gap-10">
              <div className="flex items-center justify-center">
                <Image
                  src={"/assets/employerLogin.png"}
                  alt="Job seeker login"
                  height={197}
                  width={212}
                  loading="eager"
                />
              </div>
              <div className="flex items-center flex-col gap-10">
                <div className="flex flex-col gap-1.5 text-center ">
                  <h2 className="text-xl font-bold line-height-sm font-manrope text-white">
                    Connect With Candidates Who Fit.
                  </h2>
                  <p className="text-xs font-regular font-inter line-height-sm text-white ">
                    Post jobs, review verified candidates, and hire with
                    confidence . All in one platform built to make recruitment
                    simple, transparent, and fast.
                  </p>
                </div>
              </div>
            </div>
            <div className="py-8 px-8.5 bg-white rounded-tr-3xl rounded-br-3xl flex flex-col gap-7">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1.5 items-center text-center">
                  <h1 className="text-xl font-bold font-manrope line-height-sm text-primary-blue">
                    Welcome Back
                  </h1>
                  <p className="text-xs font-regular line-height-sm text-subtext-gray3">
                    Login with your registered Email & Password.
                  </p>
                </div>
                <div className="flex flex-col gap-7">
                  <LoginForm />
                  <div className="flex items-center justify-around gap-2">
                    <div className="h-px w-full bg-[#dee2e6]"></div>
                    <p className="text-xs font-medium line-height-sm text-subtext-primary-color ">
                      OR
                    </p>
                    <div className="h-px w-full bg-[#dee2e6]"></div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button variant="neutral">
                      <Icon icon={"material-icon-theme:google"} />
                      Google
                    </Button>
                    <div className="flex items-center gap-1 justify-center">
                      <p className="text-xs font-medium font-inter text-subtext-gray1 line-height-sm ">
                        Don't have an account?
                      </p>
                      <Link
                        href={"/employer/register"}
                        className="underline text-primary-blue text-xs line-height-sm font-manrope"
                      >
                        Register Company
                      </Link>
                    </div>
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
