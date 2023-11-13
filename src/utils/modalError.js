import { Modal } from 'antd'
import './utils.css'
function showErrorModal(title, content, okText) {
    Modal.error({
        title: title,
        content: content,
        okText: okText,
        okButtonProps: { className: 'custom-ok-button' }
    })
}
function showWaringModal(title, content, okText) {
    Modal.warning({
        title: title,
        content: content,
        okText: okText,
        okButtonProps: { className: 'custom-ok-button' },
        centered: true
    })
}
function showInfoModal(title, content, okText) {
    Modal.info({
        title: title,
        content: content,
        okText: okText,
        okButtonProps: { className: 'custom-ok-button' }
    })
}
function showSuccessModal(title, content, okText) {
    Modal.success({
        title: title,
        content: content,
        okText: okText,
        okButtonProps: { className: 'custom-ok-button' }
    })
}
export { showErrorModal, showWaringModal, showInfoModal, showSuccessModal }
