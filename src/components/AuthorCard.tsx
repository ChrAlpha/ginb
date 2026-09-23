import { memo } from "react";
import { site, github, social } from "/_config";
import { Avatar } from "@primer/react";
import { LinkIcon, MarkGithubIcon } from "@primer/octicons-react";

export const Author = memo(() => {
  return (
    <div className="vcard-details">
      <div className="position-relative d-inline-block mt-5 mt-md-n5" style={{ zIndex: 4 }}>
        <Avatar
          src={`https://github.com/${github.owner}.png`}
          alt="Avatar"
          size={296}
          square={false}
          className="width-full border color-bg-default"
          style={{ height: "auto" }}
        />
      </div>
      <div className="vcard-names-container">
        <h1 className="vcard-names py-3">
          <span className="p-name vcard-fullname d-block overflow-hidden f3 text-bold">
            {site.title}
          </span>
          <span className="p-nickname vcard-username d-block color-fg-muted f3 text-normal">
            {github.owner}
          </span>
        </h1>
      </div>
      <div className="p-note user-profile-bio mb-3 color-fg-default f4">
        {site.description}
      </div>
      <ul className="vcard-details list-style-none">
        <li className="vcard-detail pt-1">
          <a
            href={`https://github.com/${github.owner}`}
            target="_blank"
            className="Link--secondary d-flex flex-items-center"
          >
            <MarkGithubIcon size={16} className="mr-2 color-fg-muted" />
            <span className="color-fg-muted">
              @
              {github.owner}
            </span>
          </a>
        </li>
        {social && social.map(link => (
          <li key={link.name} className="vcard-detail pt-1">
            <a
              href={link.url}
              target="_blank"
              className="Link--secondary d-flex flex-items-center"
            >
              <LinkIcon size={16} className="mr-2 color-fg-muted" />
              <span className="color-fg-muted">{link.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});

const AuthorCard = () => {
  return (
    <div className="h-card">
      <Author />
    </div>
  );
};

export default memo(AuthorCard);
