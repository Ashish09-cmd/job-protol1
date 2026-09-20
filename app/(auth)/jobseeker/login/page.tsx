import Button from "@/components/ui/button";
import CountUp from "@/components/ui/Countup";
import Image from "next/image"

const STATS = [
  { end: 2400, label: "Active Job Listings" },
  { end: 800, label: "Verified Companies" },
  { end: 200, label: "Candidates Hired" },
];

export default function JobSeekerLogin(){
    return (
      <>
        <section>
          <div className="container section-padding">
            <div className="grid grid-cols-2 gap-8">
              <div className="py-10 px-8.5 bg-primary-blue rounded-tl-3xl rounded-bl-3xl flex flex-col gap-10">
                <div className="flex items-center justify-center">
                  <Image
                    src={"/assets/jobseekerlogin.png"}
                    alt="Job seeker login"
                    height={197}
                    width={212}
                    loading="eager"
                  />
                </div>
                <div className="flex items-center flex-col gap-10">
                  <div className="flex flex-col gap-1.5 pb-10 text-center border-b border-b-white ">
                    <h1 className="text-xl font-bold line-height-sm font-manrope text-white">
                      Where Talent Meets Opportunity
                    </h1>
                    <p className="text-xs font-regular font-inter line-height-sm text-white ">
                      Connecting skilled people with companies worth joining.
                      Verified employers, easy in-platform applications, and a
                      straightforward job search experience.
                    </p>
                  </div>
                  <ul className="flex items-center gap-7">
                    {STATS.map((stats) => (
                      <li
                        className="flex flex-col items-center gap-0.5 "
                        key={stats.label}
                      >
                        <h2 className="text-lg-xl font-black text-white line-height-xl font-inter">
                          {/* {stats.end} */}
                          <CountUp end={stats.end} suffix="+" />
                        </h2>
                        <p className="text-sm font-regular line-height-sm text-white font-inter">
                          {stats.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="py-8 px-8.5 bg-white border rounded-tr-3xl rounded-br-3xl flex flex-col gap-7">
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap 1 5 items-center text-center">
                    <h2 className="text-xl font-bold font-manrope line-height-sm text-primary-blue">
                      Welcome Back
                    </h2>
                    <p className="text-xs font-regular line-height-sm text-subtext-gray3">
                      Log in to continue your job search on Broadway Jobs.
                    </p>
                  </div>
                  <div className="flex flex-col gap-8 pb-8 ">
                    <div></div>
                    <div className="">
                      <Button
                        type="submit"
                        fullWidth
                      >
                        Log in
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