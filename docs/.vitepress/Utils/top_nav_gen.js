import path from "path";
import fs from "fs";

const check_have_file = (cat_name, base = "docs") =>
  fs.readdirSync(path.resolve(base, cat_name)).length > 0;

const gen_top_nav_deep_0 = (cat_name = "articles", base = "docs") =>
  fs
    .readdirSync(path.resolve(base, cat_name), { withFileTypes: true })
    .filter((f) => f.isDirectory())
    .map((f) => {
      return {
        text: f.name.replace(/^\d*\_/gim, ""),
        link: check_have_file(path.join(cat_name, f.name))
          ? path.join("/", cat_name, f.name, "/")
          : "/",
      };
    });

const gen_top_nav = (deep = 0, cat_name = "articles", base = "docs") =>
  fs
    .readdirSync(path.resolve(base, cat_name), {
      withFileTypes: true,
    })
    .map((cat) => {
      const regex = /^\d*\_/gim;
      if (!cat.isDirectory()) {
        return {
          text: path.basename(cat.name, ".md").replace(regex, ""),
          link: path.join(
            cat_name,
            `${path.basename(cat.name, path.extname(cat.name))}.html`,
          ),
        };
      }
      const items = gen_top_nav(deep + 1, path.join(cat_name, cat.name));
      const nav = {
        text: cat.name.replace(regex, ""),
      };
      if (items.length > 0) {
        items.sort((a, b) => (a.text === "index" ? -1 : 0));
        items.forEach((item) => {
          if (item.text === "index") {
            item.text = "README";
          }
        });
        if (deep > 0) {
          nav.link = items[0].link;
        }
        nav.items = items.filter(
          (item) => item.items !== undefined || item.text === "README",
        );
      } else {
        nav.link = "/";
      }
      return nav;
    });

export default gen_top_nav_deep_0;
