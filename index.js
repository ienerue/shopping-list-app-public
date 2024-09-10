import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://add-to-cart-app-817ef-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

addButton.addEventListener("click", () => {
    push(shoppingListInDB, inputField.value);
    inputField.value = "";
});

onValue(shoppingListInDB, snapshot => {
    if (snapshot.exists()) {
        const itemsArray = Object.entries(snapshot.val());
        clearShoppingList();
        for (const item of itemsArray) {
            addItemToShoppingList(item);
        }   
    } else {
        clearShoppingList();
    }
})

const clearShoppingList = () => shoppingList.innerHTML = "";

const addItemToShoppingList = item => {
    const itemID = item[0];
    const itemValue = item[1];
    
    const newItem = document.createElement("li");
    newItem.textContent = itemValue;
    newItem.addEventListener("click", () => {
        const exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        remove(exactLocationOfItemInDB);
    })
    shoppingList.append(newItem);
}