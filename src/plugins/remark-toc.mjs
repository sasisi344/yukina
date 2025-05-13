import { toc } from "mdast-util-toc";
import { slug } from "github-slugger";

function simplifyTOC(ast) {
  if (!ast || !ast.children) return [];

  function traverse(node) {
    if (node.type === "list") {
      return node.children.map(traverse).filter(Boolean);
    }

    if (node.type === "listItem") {
      const paragraph = node.children.find(
        (child) => child.type === "paragraph",
      );
      if (!paragraph) return null;
      const link = paragraph.children.find((child) => child.type === "link");
      if (!link) return null;
      const text = link.children.find((child) => child.type === "text");
      if (!text) return null;
      return {
        title: text.value,
        slug: slug(text.value),
        children: node.children
          .filter((child) => child.type === "list")
          .flatMap(traverse),
      };
    }
    return null;
  }
  return traverse(ast) || [];
}

export function remarkTOC() {
  return (tree, { data }) => {
    const tocAST = toc(tree, { heading: null, maxDepth: 2 });
    data.astro.frontmatter.toc = simplifyTOC(tocAST.map);
  };
}
