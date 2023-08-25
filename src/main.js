import data from "../data.json";

const jobList = document.getElementById("list");

const jobs = data.map((job) => {
  const li = document.createElement("li");

  const logo = document.createElement("img");
  logo.src = job.logo;

  li.append(logo);

  return li;
});

jobList.append(...jobs);

function makeTag(role, level, languages) {
  function createItem(name) {
    const item = document.createElement("li");
    item.className = "rounded-lg bg-teal-100 px-2";

    const span = document.createElement("span");
    span.className = "align-text-top";
    span.textContent = name;

    item.append(span);

    return item;
  }

  const ul = document.createElement("ul");

  const roleItem = createItem(role);
  const levelItem = createItem(level);
  const languageItems = languages.map((l) => createItem(l));

  ul.append(roleItem, levelItem, ...languageItems);
  return ul;
}
