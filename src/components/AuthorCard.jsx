import { memo } from "react";
import siteConfig from "/_config";
import Image from "next/image";

export const Author = memo(() => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-min w-full flex-row items-center gap-4 md:flex-col">
        <div className="w-24 shrink-0 rounded-full md:w-2/3">
          <Image
            className="rounded-full"
            src={`https://github.com/${siteConfig.username}.png`}
            width={192}
            height={192}
            alt="Avatar"
          />
        </div>
        <div>
          <h2 className="w-full font-light">{siteConfig.username}</h2>
          <div className="w-full flex-initial text-sm text-black/60 dark:text-white/60">
            {siteConfig.description}
          </div>
        </div>
      </div>
      {siteConfig.social && (
        <ul className="flex list-none flex-col gap-2 text-sm">
          {Object.keys(siteConfig.social).map(key => (
            <li key={key}>
              <a
                href={siteConfig.social[key]}
                target="_blank"
                className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
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

const AuthorCard = () => {
  return (
    <aside className="md:sticky md:top-16">
      <Author />
    </aside>
  );
};

export default memo(AuthorCard);
