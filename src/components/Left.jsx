import { memo } from "react";
import siteConfig from "/_config";
import Image from "next/image";

export const Author = memo(() => {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-min w-full flex flex-row md:flex-col gap-4 items-center">
        <div className="w-24 md:w-full rounded-full flex-shrink-0">
          <Image
            className="rounded-full"
            src={`https://github.com/${siteConfig.username}.png`}
            width={288}
            height={288}
            alt="Avatar"
          />
        </div>
        <div>
          <h2 className="w-full font-light">{siteConfig.username}</h2>
          <div className="flex-initial w-full text-sm text-black/60 dark:text-white/60">
            {siteConfig.description}
          </div>
        </div>
      </div>
      {siteConfig.social && (
        <ul className="flex flex-col list-none text-sm gap-2">
          {Object.keys(siteConfig.social).map((key) => (
            <li key={key}>
              <a
                href={siteConfig.social[key]}
                target="_blank"
                className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
              >
                {key}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

const Left = () => {
  return (
    <aside className="md:sticky md:top-16">
      <Author />
    </aside>
  );
};

export default memo(Left);
