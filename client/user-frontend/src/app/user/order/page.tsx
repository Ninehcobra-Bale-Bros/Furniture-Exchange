/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Table, Button, Spin } from 'antd'
import { useConfirmUserShipmentMutation, useGetAllUserShipmentQuery } from '@/services/delivery.service'
import { IShipment } from '@/types/delivery'
import { ToastService } from '@/services/toast.service'
import { handleApiError } from '../../../../utils/api-error-handler'

export default function Page(): React.ReactNode {
  const { data: shipments, isLoading, isError, refetch } = useGetAllUserShipmentQuery()

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
  }

  const toastService = useMemo<ToastService>(() => {
    return new ToastService()
  }, [])

  const [confirmShipment, { isSuccess: isConfirmSuccess, isError: isConfirmError }] = useConfirmUserShipmentMutation()

  useEffect(() => {
    if (isConfirmSuccess) {
      refetch()
      toastService.success('Xác nhận thành công')
    }
    if (isConfirmError) {
      handleApiError(isConfirmError)
    }
  }, [isConfirmSuccess, isConfirmError])

  const getStatusStyle = (status: string): React.CSSProperties => {
    switch (status) {
      case 'pending':
        return { color: 'orange' }
      case 'delivering':
        return { color: 'blue' }
      case 'delivered':
        return { color: 'green' }
      case 'returned':
        return { color: 'red' }
      default:
        return {}
    }
  }

  const translateStatus = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'Đang chờ xử lý'
      case 'delivering':
        return 'Đang giao hàng'
      case 'delivered':
        return 'Đã giao hàng'
      case 'returned':
        return 'Đã trả lại'
      default:
        return status
    }
  }

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id' },
    { title: 'Tên sản phẩm', dataIndex: ['product', 'name'], key: 'productName' },
    { title: 'Số lượng ', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Giá',
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number) => <div style={{ fontWeight: 500 }}>{formatCurrency(value)}</div>
    },
    {
      title: 'Phí ship',
      dataIndex: 'shipping_fee',
      key: 'shippingFee',
      render: (value: number) => <div style={{ fontWeight: 500 }}>{formatCurrency(value)}</div>
    },
    {
      title: 'Tổng giá',
      dataIndex: 'total_after_delivery',
      key: 'total_after_delivery',
      render: (value: number) => <div style={{ fontWeight: 500 }}>{formatCurrency(value)}</div>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <span style={getStatusStyle(status)}>{translateStatus(status)}</span>
    },
    {
      title: 'Tình trạng',
      key: 'action',
      render: (_: any, record: IShipment): React.ReactNode => (
        <span>
          <Button
            disabled={record.other_confirmed}
            type='primary'
            onClick={() => confirmShipment({ id: record.id.toString() })}
          >
            {record.other_confirmed ? 'Đã xác nhận' : 'Xác nhận'}
          </Button>
        </span>
      )
    }
  ]

  if (isLoading)
    return (
      <div className='vh-100 w-100 d-flex align-items-center justify-content-center'>
        <Spin size='large'></Spin>
      </div>
    )
  if (isError) return <div>Error loading shipments</div>

  return (
    <div className={`container pt-2`}>
      <div
        className='cardWithShadow d-flex align-items-center p-3 py-4 rounded mb-3'
        style={{ backgroundColor: '#ECF2FF' }}
      >
        <div>Quản lý đơn hàng</div>
      </div>
      <Table dataSource={shipments} columns={columns} rowKey='id' />
    </div>
  )
}
