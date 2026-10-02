import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function JobCard() {
  return (
    <>
      <div className="bg-white rounded-lg py-4 px-3.5 shadow-sm border-subtext-light/10  flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="relative h-10 w-14 rounded-sm border border-[#aeaeb243]">
              {/* <Image
                src="/https://broadwayinfosys.com/uploads/ourplacementpartner/1748512169.png"
                alt="Company Logo"
                fill
                sizes="56px"
                className="object-contain p-1"
              /> */}
              <img
                src="https://broadwayinfosys.com/uploads/ourclients/1751449542.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <h3 className="text-vxs font-bold font-manrope line-height-2xl text-text-heading">
              Graphics Designer & Video Editor{" "}
            </h3>
            <Link
              href={""}
              className="uppercase text-primary-blue font-semibold line-height-3xl text-vvxs"
            >
              broadway infosys
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <ul className="pb-5 border-b border-subtext-gray2/30 flex items-center gap-5">
            <li className="py-1 flex items-center gap-1 text-vxs font-semibold line-height-2xl text-subtext-light font-manrope">
              <Icon icon="bx:briefcase" />
              <p>Job</p>
            </li>
            <li className="py-1 flex items-center gap-1 text-vxs font-semibold line-height-2xl text-subtext-light font-manrope">
              <Icon icon="ant-design:clock-circle-outlined" />
              <p>10 days left</p>
            </li>
          </ul>
          <div className="flex items-center gap-2 justify-between">
            <Link
              href={""}
              className="text-vxs font-medium line-height-sm  text-primary-blue font-inter flex items-center gap-1"
            >
              <span>View Role</span>
              <span className="text-xs ">
                <Icon icon="material-symbols:arrow-right-alt" />
              </span>
            </Link>
            <button className="text-md text-subtext-light cursor-pointer">
              <Icon icon="mdi:bookmark-outline" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}