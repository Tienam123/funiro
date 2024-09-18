export const removeClasses = (arrElements,className) => {
    for (const arrElement of arrElements) {
        arrElement.classList.remove(className)
    }
}