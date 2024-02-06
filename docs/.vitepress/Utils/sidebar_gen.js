import path from "path";
import fs from "fs";

const sidebar_traversal = (
  sidebar_array,
  cat_name = "articles/00_CTFs",
  base = "docs",
) => {
  fs.readdirSync(path.resolve(base, cat_name), { withFileTypes: true })
    .sort((a, b) => (a.name.match(/^index.md$/i) ? -1 : 0))
    .forEach((f) => {
      const index_regex = /^index.md$/gim;
      const name_regex = /^\d+\_/gim;
      if (f.isFile()) {
        sidebar_array[0].items.push({
          text: f.name.match(index_regex)
            ? f.name.replace(index_regex, `${sidebar_array[0].text} README`)
            : path
                .basename(f.name, path.extname(f.name))
                .replace(name_regex, ""),
          link: path.join(
            "/",
            cat_name,
            `${path.basename(f.name, path.extname(f.name))}.html`,
          ),
        });
      } else {
        sidebar_array.push(
          ...sidebar_traversal(
            [
              {
                text: f.name.replace(/\d+\_/i, ""),
                collapsed: false,
                items: [],
              },
            ],
            path.join(cat_name, f.name),
          ),
        );
      }
    });
  return sidebar_array.filter((sidebar) => sidebar.items.length > 0);
};

const gen_sidebar = (
  sidebar_object = {},
  cat_name = "articles",
  base = "docs",
) => {
  fs.readdirSync(path.resolve(base, cat_name), {
    withFileTypes: true,
  })
    .filter((cat) => cat.isDirectory())
    .forEach((cat) => {
      sidebar_object[path.join("/", cat_name, cat.name)] = sidebar_traversal(
        [
          {
            text: cat.name.replace(/^.*\_/i, ""),
            collapsed: false,
            items: [],
          },
        ],
        path.join(cat_name, cat.name),
      );
    });
  return sidebar_object;
};

export default gen_sidebar;
