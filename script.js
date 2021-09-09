var listItemsArray = [];
var editId;
//linking properties
var todoListContainer = document.querySelector(".items-list");
var addItemInput = document.querySelector(".add-item-input");
var addItemButton = document.querySelector(".add-item-button");
var clearItems = document.querySelector(".clear-item");
//FUNCTIONS
//provides HTML for a list item using name and id
var generateHTML = function (itemName, id) {
    var html = "\n  <li class=\"list-item\" data-item-no=\"" + id + "\">\n              <p>" + itemName + "</p>\n              <div class=\"buttons-container\">\n                <div class=\"edit-button\">\n                  <img\n                    src=\"./imgs/edit-icon.svg\"\n                    alt=\"\"\n                    class=\"edit-button-img\"\n                  />\n                </div>\n                <div class=\"delete-button\">\n                  <img\n                    src=\"./imgs/delete-icon.svg\"\n                    alt=\"\"\n                    class=\"delete-button-img\"\n                  />\n                </div>\n              </div>\n            </li>\n    ";
    return html;
};
//adds HTML for the element to be inserted
var insertHtml = function (id, itemName) {
    todoListContainer.insertAdjacentHTML("beforeend", generateHTML(itemName, id));
    addItemInput.value = "";
};
//inserts a single element to the list
var insertElement = function (id, itemName) {
    listItemsArray.push({ itemName: itemName, itemId: id });
    insertHtml(id, itemName);
};
//displays all the items in the list
var render = function () {
    todoListContainer.innerHTML = "";
    listItemsArray.forEach(function (item) {
        insertHtml(item.itemId, item.itemName);
    });
};
//creates a random id
var generateId = function () {
    return Math.random().toString(36).substr(2, 9);
};
//returns index of listItem based on id
var getIndex = function (id) {
    for (var i = 0; i < listItemsArray.length; i++) {
        if (listItemsArray[i].itemId === id) {
            return i;
        }
    }
    return -1;
};
var deleteElement = function (id) {
    var index = getIndex(id);
    listItemsArray.splice(index, 1);
    render();
};
//manipulates the edit bar depending upon add/edit
var changeEditBar = function (value, buttonTitle) {
    addItemButton.textContent = buttonTitle;
    addItemInput.value = value;
};
//changes the element based on id and input from the edit bar
var editElement = function (id) {
    var index = getIndex(id);
    var itemName = listItemsArray[index].itemName;
    changeEditBar(itemName, "Edit");
    editId = index;
};
//EVENT LISTENERS
addItemButton.addEventListener("click", function (e) {
    var inputValue = addItemInput.value;
    if (!inputValue)
        return;
    var targetElement = e.target;
    if (targetElement.textContent === "Edit") {
        //Edit events
        listItemsArray[editId].itemName = inputValue;
        render();
        changeEditBar("", "Submit");
    }
    else {
        var id = generateId();
        insertElement(id, inputValue);
    }
});
todoListContainer.addEventListener("click", function (e) {
    var targetElement = e.target;
    var buttonClicked = targetElement.closest("div");
    var listItem = targetElement.closest(".list-item");
    var itemId = listItem.dataset.itemNo;
    switch (buttonClicked.className) {
        case "edit-button":
            editElement(itemId);
            break;
        case "delete-button":
            deleteElement(itemId);
            break;
    }
});
clearItems.addEventListener("click", function () {
    listItemsArray = [];
    render();
});
