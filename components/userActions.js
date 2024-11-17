import "../css/userActions.css"
import { actionButton } from "./actionButton"
import edit from "../assets/edit.svg"
import trash from "../assets/trash.svg"
import { formComp } from "./formComp"
import { deleteUser } from "../utils/deleteUser"
import { init } from "../main"

export const usersActions = () => {
	const actionsContainer = document.createElement("div")
	actionsContainer.classList.add("actions-container")

	const buttonOne = actionButton(edit, "warning-btn", buttonOneFn)
	const buttonTwo = actionButton(trash, "danger-btn", buttonTwoFn)

	actionsContainer.appendChild(buttonOne)
	actionsContainer.appendChild(buttonTwo)

	return actionsContainer
}

function buttonOneFn(e) {
    const selectedCard = e.target.parentElement.parentElement
    const userId = selectedCard.getAttribute("userId")
    const firstName = selectedCard.getAttribute("firstName")
    const lastName = selectedCard.getAttribute("lastName")
    document.querySelector(".modal-overlay").classList.toggle("show")
    document.querySelector(".modal-container").innerHTML = ""

    let modalTitle = document.querySelector(".modal-title")
    if (!modalTitle) {
        modalTitle = document.createElement("h2")
        modalTitle.classList.add("modal-title")
        document.querySelector(".modal-container").appendChild(modalTitle)
    }
    modalTitle.innerText = "Edit user"
    document
        .querySelector(".modal-container")
        .appendChild(formComp(firstName, lastName, userId))
}

function buttonTwoFn(e) {
    const selectedCard = e.target.parentElement.parentElement
    const userId = selectedCard.getAttribute("userId")
    document.querySelector(".modal-overlay").classList.toggle("show")
    document.querySelector(".modal-container").innerHTML = ""

    let modalTitle = document.querySelector(".modal-title")
    if (!modalTitle) {
        modalTitle = document.createElement("h2")
        modalTitle.classList.add("modal-title")
        document.querySelector(".modal-container").appendChild(modalTitle)
    }
    modalTitle.innerText = "Warning !"
    document.querySelector(".modal-container").innerText =
        "Confirm delete user? You sure ?"

    const confirmBtn = document.createElement("button")
    confirmBtn.style.backgroundColor = "#d5384f"
    confirmBtn.innerText = "Confirm"
    confirmBtn.addEventListener("click", async () => {
        const response = await deleteUser(userId)
        if (response.message === "User deleted !") {
            init()
        }
    })
    document.querySelector(".modal-container").appendChild(confirmBtn)
}