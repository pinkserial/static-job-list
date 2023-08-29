import data from "../data.json";

let filters = [];

function filteredItems(filter, list) {
  return list.reduce((acc, cur) => {
    const tags = [cur.role, cur.level, ...cur.languages, ...cur.tools];
    if (tags.includes(filter)) {
      return [...acc, cur];
    }
    return acc;
  }, []);
}

function addFilter(filter) {
  if (filters.includes(filter)) {
    return;
  }

  filters = [...filters, filter];
  renderFilters();

  let list = [...data];
  for (const filter of filters) {
    list = filteredItems(filter, list);
  }

  renderjobList(list);
}

function removeFilter(filter) {
  filters = filters.filter((f) => f !== filter);
  renderFilters();

  let list = [...data];
  for (const filter of filters) {
    list = filteredItems(filter, list);
  }

  renderjobList(list);
}

const clearBtn = document.getElementById("clear");

clearBtn.onclick = clearFilters;

function clearFilters() {
  filters = [];
  renderFilters();
  renderjobList(data);
}

function renderFilters() {
  const filterElem = document.getElementById("filters");

  if (filters.length == 0) {
    filterElem.classList.add("invisible");
    return;
  }

  filterElem.classList.remove("invisible");

  const ul = filterElem.firstElementChild;

  for (const item of [...ul.children]) {
    item.remove();
  }

  for (const filter of filters) {
    const li = document.createElement("li");
    li.className = "flex overflow-hidden rounded-lg bg-teal-100 text-teal-600";

    const span = document.createElement("span");
    span.className = "px-2 pt-1";
    span.textContent = filter;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "bg-teal-600 px-2 hover:bg-black";

    const icon = document.createElement("img");
    icon.src = "images/icon-remove.svg";
    icon.alt = "";

    removeButton.append(icon);

    removeButton.onclick = function () {
      removeFilter(filter);
    };

    li.append(span, removeButton);
    ul.append(li);
  }
}

function renderjobList(list) {
  const jobList = document.getElementById("list");

  for (const child of [...jobList.children]) {
    child.remove();
  }

  const jobs = list.map((job) => {
    const li = document.createElement("li");
    li.className =
      "flex items-center gap-5 rounded-lg border-l-4 border-l-teal-600 bg-white p-5 shadow-md";

    const logo = document.createElement("img");
    logo.src = job.logo;
    logo.alt = "";

    const contents = makeContents(job);
    const tags = makeTags(job);

    li.append(logo, contents, tags);

    return li;
  });

  jobList.append(...jobs);
}

function makeContents({ company, position, new: isNew, featured, ...rest }) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-1 flex-col";

  const itemsContainerElem = document.createElement("div");
  itemsContainerElem.className = "flex items-center gap-3 font-bold";

  const companyElem = document.createElement("p");
  companyElem.className = "text-teal-600";
  companyElem.textContent = company;

  const postTags = document.createElement("ul");
  postTags.className = "flex gap-1 text-sm text-white";

  if (isNew) {
    const tagItem = document.createElement("li");
    tagItem.className = "rounded-xl bg-teal-600 px-2 py-1";

    const tagContent = document.createElement("span");
    tagContent.textContent = "new!";
    tagContent.className = "align-text-top uppercase";

    tagItem.append(tagContent);
    postTags.append(tagItem);
  }

  if (featured) {
    const tagItem = document.createElement("li");
    tagItem.className = "rounded-xl bg-black px-2 py-1";

    const tagContent = document.createElement("span");
    tagContent.textContent = "featured";
    tagContent.className = "align-text-top uppercase";

    tagItem.append(tagContent);
    postTags.append(tagItem);
  }

  itemsContainerElem.append(companyElem, postTags);

  const positionElem = document.createElement("h2");
  positionElem.className =
    "my-1 flex flex-1 items-center text-lg font-bold hover:text-teal-600 cursor-pointer self-start";
  positionElem.textContent = position;

  const postInfoElem = makePostInfo(rest);

  wrapper.append(itemsContainerElem, positionElem, postInfoElem);
  return wrapper;
}

function makePostInfo({ postedAt, contract, location }) {
  const ul = document.createElement("ul");
  ul.className =
    "flex list-inside list-disc gap-3 text-xs text-slate-500 marker:text-slate-500";

  const postedAtItem = document.createElement("li");
  postedAtItem.className = "first:list-none";
  postedAtItem.textContent = postedAt;

  const contractItem = document.createElement("li");
  contractItem.textContent = contract;

  const locationItem = document.createElement("li");
  locationItem.textContent = location;

  ul.append(postedAtItem, contractItem, locationItem);

  return ul;
}

function makeTags({ role, level, languages, tools }) {
  function createItem(name) {
    const item = document.createElement("li");
    item.className =
      "rounded-lg bg-teal-100 px-2 hover:bg-teal-600 hover:text-white cursor-pointer";

    const span = document.createElement("span");
    span.className = "align-text-top";
    span.textContent = name;

    item.append(span);
    item.onclick = () => {
      addFilter(item.firstChild.textContent);
    };

    return item;
  }

  const ul = document.createElement("ul");
  ul.className =
    "flex flex-wrap items-center gap-3 text-sm font-bold text-teal-600";

  const roleItem = createItem(role);
  const levelItem = createItem(level);
  const languageItems = languages.map((l) => createItem(l));
  const toolsItems = tools.map((t) => createItem(t));

  ul.append(roleItem, levelItem, ...languageItems, ...toolsItems);
  return ul;
}

clearFilters();
