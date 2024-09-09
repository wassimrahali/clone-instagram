import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { smallNavItemsDevices } from "@/config";



const BottomBar = () => {
  const pathname = usePathname();

  return (
    <div className="block md:hidden fixed bottom-0 z-50 w-full -translate-x-1/2 bg-slate-900 rounded-t-2xl border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {smallNavItemsDevices.map((item) => (
          <React.Fragment key={item.name}>
            <Link href={item.href} passHref>
              <button
                type="button"
                className={`inline-flex flex-col items-center justify-center p-4 ${
                  pathname === item.href
                    ? "text-purple-700 dark:text-blue-500"
                    : "text-white dark:text-gray-400"
                } hover:bg-gray-50 dark:hover:bg-gray-800 group`}
                aria-label={item.tooltip}
              >
                {item.icon}
                <span className="sr-only">{item.tooltip}</span>
              </button>
            </Link>
            <div
              role="tooltip"
              className={`absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700`}
              data-tooltip-target={`tooltip-${item.name.toLowerCase()}`}
            >
              {item.tooltip}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
