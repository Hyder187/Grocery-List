type listItem = {
  itemName: string;
  itemId: string;
};

let listItemsArray: listItem[] = [];
let editId: number;

//linking properties
const todoListContainer: HTMLElement = document.querySelector(".items-list");
const addItemInput: HTMLInputElement =
  document.querySelector(".add-item-input");
const addItemButton: HTMLElement = document.querySelector(".add-item-button");
const clearItems: HTMLElement = document.querySelector(".clear-item");

//FUNCTIONS

//provides HTML for a list item using name and id
const generateHTML = (itemName: string, id: string): string => {
  const html: string = `
  <li class="list-item" data-item-no="${id}">
              <p>${itemName}</p>
              <div class="buttons-container">
                <div class="edit-button">
                  <img
                    src="./imgs/edit-icon.svg"
                    alt=""
                    class="edit-button-img"
                  />
                </div>
                <div class="delete-button">
                  <img
                    src="./imgs/delete-icon.svg"
                    alt=""
                    class="delete-button-img"
                  />
                </div>
              </div>
            </li>
    `;

  return html;
};

//adds HTML for the element to be inserted
const insertHtml = (id: string, itemName: string): void => {
  todoListContainer.insertAdjacentHTML("beforeend", generateHTML(itemName, id));
  addItemInput.value = "";
};

//inserts a single element to the list
const insertElement = (id: string, itemName: string): void => {
  listItemsArray.push({ itemName: itemName, itemId: id });
  insertHtml(id, itemName);
};

//displays all the items in the list
const render = (): void => {
  todoListContainer.innerHTML = "";
  listItemsArray.forEach((item: listItem): void => {
    insertHtml(item.itemId, item.itemName);
  });
};

//creates a random id
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

//returns index of listItem based on id
const getIndex = (id: string): number => {
  for (let i: number = 0; i < listItemsArray.length; i++) {
    if (listItemsArray[i].itemId === id) {
      return i;
    }
  }
  return -1;
};

const deleteElement = (id: string): void => {
  const index = getIndex(id);
  listItemsArray.splice(index, 1);
  render();
};

//manipulates the edit bar depending upon add/edit
const changeEditBar = (value: string, buttonTitle: string) => {
  addItemButton.textContent = buttonTitle;
  addItemInput.value = value;
};

//changes the element based on id and input from the edit bar
const editElement = (id: string): void => {
  const index = getIndex(id);
  const itemName = listItemsArray[index].itemName;
  changeEditBar(itemName, "Edit");

  editId = index;
};

//EVENT LISTENERS

addItemButton.addEventListener("click", (e: Event) => {
  const inputValue = addItemInput.value;
  if (!inputValue) return;

  const targetElement: HTMLElement = e.target as HTMLElement;

  if (targetElement.textContent === "Edit") {
    //Edit events
    listItemsArray[editId].itemName = inputValue;
    render();
    changeEditBar("", "Submit");
  } else {
    const id = generateId();
    insertElement(id, inputValue);
  }
});

todoListContainer.addEventListener("click", (e: Event) => {
  const targetElement: HTMLElement = e.target as unknown as HTMLElement;
  const buttonClicked: HTMLElement = targetElement.closest("div");
  const listItem: HTMLElement = targetElement.closest(".list-item");
  const itemId: string = listItem.dataset.itemNo;

  switch (buttonClicked.className) {
    case "edit-button":
      editElement(itemId);
      break;
    case "delete-button":
      deleteElement(itemId);
      break;
  }
});

clearItems.addEventListener("click", () => {
  listItemsArray = [];
  render();
});
