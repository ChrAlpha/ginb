import { memo } from "react";
import { site, github, social } from "/_config";
import Image from "next/image";

export const Author = memo(() => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-min w-full flex-row items-center gap-4 md:flex-col">
        <div className="w-24 shrink-0 rounded-full md:w-2/3">
          <Image
            className="rounded-full"
            src={`https://github.com/${github.owner}.png`}
            width={192}
            height={192}
            alt="Avatar"
          />
        </div>
        <div>
          <h2 className="w-full font-light">{github.owner}</h2>
          <div className="w-full flex-initial text-sm text-black/60 dark:text-white/60">
            {site.description}
          </div>
        </div>
      </div>
      {social && social.length > 0 && (
        <ul className="flex list-none flex-col gap-2 text-sm">
          {social.map(link => (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
              >
                {link.name}
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
