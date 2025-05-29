import Link from "next/link";

import { Category } from "@/payload-types";

interface Props {
  category: Category; //TODO: Change this
  isOpen: boolean;
  position: { top: number; left: number };
}

export const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories?.docs?.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div
      className="fixed z-100"
      style={{ top: position.top, left: position.left }}
    >
      {/* Invisible bridge to maintain hover */}
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -transale-x-[2px] -transale-y-[2px]"
      >
        <div>
          {category.subcategories?.docs?.map(
            (subcategory: string | Category) => (
              <Link
                key={(subcategory as Category).slug}
                href="/"
                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
              >
                {(subcategory as Category).name}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};
