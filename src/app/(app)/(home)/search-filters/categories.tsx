import { Category } from "@/payload-types";

import { CategoryDropdown } from "@/app/(app)/(home)/search-filters/category-dropdown";

interface Props {
  data: any;
}

export const Categories = ({ data }: Props) => {
  const dataArray = data.docs as Category[];
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {dataArray.map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
