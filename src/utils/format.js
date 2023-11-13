import moment from 'moment'
function formatCurrency(amount, locale = 'it-IT', currency = 'VND') {
    return amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}
function formatDate(dateString) {
    const formattedDate = moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD')
    return formattedDate
}
function formatDateString(dateString) {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`

    return formattedDate
}
function formatTime(dateString) {
    const date = new Date(dateString)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`

    return formattedTime
}
function calculateTimeDifference(time1, time2, lang) {
    const [hours1, minutes1] = time1.split(':').map(Number)
    const [hours2, minutes2] = time2.split(':').map(Number)

    const totalMinutes1 = hours1 * 60 + minutes1
    const totalMinutes2 = hours2 * 60 + minutes2

    const differenceMinutes = totalMinutes2 - totalMinutes1

    const hours = Math.floor(differenceMinutes / 60)
    const minutes = differenceMinutes % 60
    if (lang === 'en') {
        return `${hours} hour ${minutes} minute`
    } else {
        return `${hours} giờ ${minutes} phút`
    }
}

function removeDiacritics(text, language) {
    if (language === 'en') {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    } else {
        return text
    }
}
function convertToJSON(obj) {
    const jsonString = JSON.stringify(obj)
    return jsonString
}
function convertString(array) {
    // Sử dụng phương thức join() để nối các số lại thành chuỗi mới
    const newString = array.join('')

    return newString
}
const formatTimeHHMM = (time) => {
    return moment(time).format('HH:mm DD/MM/YYYY')
}

export {
    formatCurrency,
    formatDate,
    removeDiacritics,
    convertToJSON,
    convertString,
    formatDateString,
    formatTime,
    calculateTimeDifference,
    formatTimeHHMM
}
