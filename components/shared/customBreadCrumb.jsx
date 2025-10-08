import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function CustomBreadcrumb({ data = [],textColor="text-black" }) {
  return (
    <Breadcrumb className={textColor}>
      <BreadcrumbList>
        {data.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.link ? (
              <BreadcrumbLink asChild>
                <Link href={item.link}>{item.title}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className={textColor}>{item.title}</BreadcrumbPage>
            )}

            {index < data.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
