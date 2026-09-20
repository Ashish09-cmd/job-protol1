import Image from "next/image"
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
                    <li className="flex flex-col items-center gap-0.5 ">
                      <h2 className="text-lg-xl font-black text-white line-height-xl font-inter">
                        2,400+
                      </h2>
                      <p className="text-sm font-regular line-height-sm text-white font-inter">
                        Active Job Listings
                      </p>
                    </li>
                    <li className="flex flex-col items-center gap-0.5 ">
                      <h2 className="text-lg-xl font-black text-white line-height-xl font-inter">
                        800+
                      </h2>
                      <p className="text-sm font-regular line-height-sm text-white font-inter">
                        Verified Companies   
                      </p>
                    </li>
                    
                    <li className="flex flex-col items-center gap-0.5 ">
                      <h2 className="text-lg-xl font-black text-white line-height-xl font-inter">
                        200+
                      </h2>
                      <p className="text-sm font-regular line-height-sm text-white font-inter">
                        Candidates Hired
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </section>
      </>
    );
}