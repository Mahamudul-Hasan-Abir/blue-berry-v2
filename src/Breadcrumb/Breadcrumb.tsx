/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export default function BreadCrumb() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    setPreviousPath(sessionStorage.getItem("currentPath") || null);
    sessionStorage.setItem("currentPath", pathname);
  }, [pathname]);

  useEffect(() => {
    if (pathname) {
      const linkPath = pathname.split("/").filter(Boolean);

      const pathArray = linkPath.map((path, i) => {
        return {
          name: decodeURIComponent(path.replace(/-/g, " ")),
          path: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      // Add home breadcrumb
      pathArray.unshift({ name: "home", path: "/" });

      setBreadcrumbs(pathArray);
    }
  }, [pathname]);

  if (!breadcrumbs) {
    return null;
  }

  const currentPage =
    breadcrumbs[breadcrumbs.length - 1]?.name || "Current Page";

  return (
    <section className="section-breadcrumb mb-[50px] max-[1199px]:mb-[35px] border-b-[1px] border-t-[1px] border-solid border-[#eee] bg-[#f8f8fb]">
      <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
        <div className="flex flex-wrap w-full">
          <div className="w-full px-[12px]">
            <div className="flex flex-wrap w-full bb-breadcrumb-inner m-[0] py-[20px] items-center">
              <div className="min-[768px]:w-[50%] min-[576px]:w-full w-full px-[12px]">
                <h2 className="bb-breadcrumb-title font-quicksand tracking-[0.03rem] leading-[1.2] text-[16px] font-bold text-[#3d4750] max-[767px]:text-center max-[767px]:mb-[10px]">
                  {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
                </h2>
              </div>
              <div className="min-[768px]:w-[50%] min-[576px]:w-full w-full px-[12px]">
                <ul className="bb-breadcrumb-list mx-[-5px] flex justify-end max-[767px]:justify-center">
                  {breadcrumbs.map((breadcrumb, i) => (
                    <Fragment key={breadcrumb.path}>
                      <li
                        className={`bb-breadcrumb-item text-[14px] font-normal px-[5px] ${
                          i === breadcrumbs.length - 1 ? "active" : ""
                        }`}
                      >
                        {i === breadcrumbs.length - 1 ? (
                          <span className="font-Poppins text-[#686e7d] text-[14px] leading-[28px] font-normal tracking-[0.03rem]">
                            {breadcrumb.name === "home"
                              ? "Home"
                              : breadcrumb.name}
                          </span>
                        ) : (
                          <Link
                            href={breadcrumb.path}
                            className="font-Poppins text-[14px] leading-[28px] tracking-[0.03rem] font-semibold text-[#686e7d] hover:text-[#3d4750]"
                          >
                            {breadcrumb.name === "home"
                              ? "Home"
                              : breadcrumb.name}
                          </Link>
                        )}
                      </li>
                      {i < breadcrumbs.length - 1 && (
                        <li className="text-[14px] font-normal px-[5px]">
                          {/* <i className="ri-arrow-right-double-fill text-[14px] font-semibold leading-[28px] text-[#686e7d]"></i> */}
                          <ChevronsRight className="text-[14px] font-semibold leading-[28px] text-[#686e7d] mt-[2px]"></ChevronsRight>
                        </li>
                      )}
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
