function generateRandomID(length) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
}
function calculateAge(birthdate, currentDate) {
    const birthdateObj = new Date(birthdate)
    const currentDateObj = currentDate ? new Date(currentDate) : new Date()

    const yearsDiff = currentDateObj.getFullYear() - birthdateObj.getFullYear()
    const birthdateMonth = birthdateObj.getMonth()
    const currentDateMonth = currentDateObj.getMonth()

    if (
        currentDateMonth < birthdateMonth ||
        (currentDateMonth === birthdateMonth && currentDateObj.getDate() < birthdateObj.getDate())
    ) {
        return yearsDiff - 1
    } else {
        return yearsDiff
    }
}
function convertGender(gender, language) {
    if (language === 'vi') {
        if (gender === 'MALE') {
            return 'ÔNG'
        } else if (gender === 'FEMALE') {
            return 'BÀ'
        } else {
            return ''
        }
    } else if (language === 'en') {
        if (gender === 'MALE') {
            return 'MR.'
        } else if (gender === 'FEMALE') {
            return 'MRS.'
        } else {
            return ''
        }
    } else {
        return ''
    }
}
function changeStatus(status, language) {
    const statusTexts = {
        en: {
            ACT: 'Paid',
            PEN: 'Request Sent',
            DEL: 'Refunded'
        },
        vi: {
            ACT: 'Đã thanh toán',
            PEN: 'Đã gửi yêu cầu',
            DEL: 'Đã hoàn tiền'
        }
    }

    if (statusTexts[language] && statusTexts[language][status]) {
        return statusTexts[language][status]
    }

    return status // Giữ nguyên trạng thái nếu không tìm thấy phiên bản ngôn ngữ
}
function changeStatusAdmin(status, vi) {
    const statusTexts = {
        vi: {
            ACT: 'Hoạt động',
            PEN: 'Tạm ngưng',
            DEL: 'Đã xóa'
        }
    }

    if (statusTexts[vi] && statusTexts[vi][status]) {
        return statusTexts[vi][status]
    }

    return status // Giữ nguyên trạng thái nếu không tìm thấy phiên bản ngôn ngữ
}
const getAcronym = (name) => {
    if (name) {
        const acronym = name
            .split(/\s/)
            .reduce((response, word) => (response += word.slice(0, 1)), '')
            .toUpperCase()

        return acronym.slice(0, name.length)
    }
    return ''
}
export { generateRandomID, calculateAge, convertGender, changeStatus, getAcronym, changeStatusAdmin }
