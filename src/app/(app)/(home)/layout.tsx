import { Category } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";

import { Footer } from "@/app/(app)/(home)/footer";
import { Navbar } from "@/app/(app)/(home)/navbar";
import { SearchFilters } from "@/app/(app)/(home)/search-filters";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, // Populate subcategories, subcategories.[0] will be a type of "Category"
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  console.log(data, formattedData);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={data} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
