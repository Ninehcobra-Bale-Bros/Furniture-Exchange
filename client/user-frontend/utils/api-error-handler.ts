/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { ToastService } from '@/services/toast.service'
import { removeCookieFromClient } from '@/types/cookie'

interface ApiError {
  status: number
  data?: {
    title?: string
    message?: string
  }
}

export const handleApiError = (error: unknown): void => {
  const toastService = new ToastService()

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const { status, data } = error as ApiError

    switch (status) {
      case 400:
        toastService.error(data?.title || 'Yêu cầu không hợp lệ: Thông tin bạn cung cấp không hợp lệ.')
        break
      case 401:
        removeCookieFromClient('access-token')
        toastService.warning(data?.title || 'Lỗi xác thực: Vui lòng đăng nhập lại.')

        break
      case 403:
        toastService.error(data?.title || 'Bị cấm: Bạn không có quyền truy cập vào tài nguyên này.')
        break
      case 404:
        toastService.error(data?.title || 'Không tìm thấy: Không tìm thấy tài nguyên được yêu cầu.')
        break
      case 409:
        toastService.error(data?.title || 'Bạn không có quyền thực  hiện hành động này.')
        break
      case 500:
        toastService.error(data?.title || 'Lỗi máy chủ nội bộ: Có lỗi xảy ra ở phía chúng tôi. Vui lòng thử lại sau.')
        break
      default:
        toastService.error(`Đã xảy ra lỗi không mong muốn. Trạng thái: ${status}`)
    }
  } else {
    toastService.error('Đã xảy ra lỗi không xác định. Vui lòng thử lại.')
  }

  console.error('API Error:', error)
}
