export const useLocalStorage = (key: string) => {
    const getItem = () => {
        try{
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : undefined
        }catch(err){
            console.error(err)
        }
    }

    const setItem = (value: unknown) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(error)
        }
    }

    const removeItem = () => {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.error(error)
        }
    }

    return { getItem, setItem, removeItem }
}