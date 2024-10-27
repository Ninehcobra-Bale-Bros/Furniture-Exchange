/* eslint-disable @typescript-eslint/no-unsafe-return */
'use client'
import React, { useState } from 'react'
import { Table, Button, Input, Modal, Form, DatePicker } from 'antd'
import { useGetAllUserShipmentQuery } from '@/services/delivery.service'

interface Employee {
  id: number
  Name: string
  Position: string
  Email: string
  Mobile: number
  DateOfJoining: Date
  Salary: number
  Projects: number
  imagePath: string
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    Name: 'Johnathan Deo',
    Position: 'Seo Expert',
    Email: 'r@gmail.com',
    Mobile: 9786838,
    DateOfJoining: new Date('01-2-2020'),
    Salary: 12000,
    Projects: 10,
    imagePath: 'assets/images/profile/user-2.jpg'
  }
  // Add other employees...
]

export default function Page(): React.ReactNode {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [filter, setFilter] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const { data: userShipments, isError, isSuccess } = useGetAllUserShipmentQuery()

  const filteredEmployees = employees.filter((employee) => employee.Name.toLowerCase().includes(filter.toLowerCase()))

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'Name', key: 'Name' },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    { title: 'Mobile', dataIndex: 'Mobile', key: 'Mobile' },
    {
      title: 'Date of Joining',
      dataIndex: 'DateOfJoining',
      key: 'DateOfJoining',
      render: (date: Date): string => date.toDateString()
    },
    { title: 'Salary', dataIndex: 'Salary', key: 'Salary' },
    { title: 'Projects', dataIndex: 'Projects', key: 'Projects' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Employee): React.ReactNode => (
        <span>
          <Button onClick={() => setEmployees(employees.filter((emp) => emp.id !== record.id))}>Delete</Button>
        </span>
      )
    }
  ]

  return (
    <div className={`container pt-2`}>
      <div
        className='cardWithShadow d-flex  align-items-center p-3 py-4 rounded mb-3'
        style={{ backgroundColor: '#ECF2FF' }}
      >
        <div>Quản lý đơn hàng</div>
      </div>
      <Table dataSource={filteredEmployees} columns={columns} rowKey='id' />
    </div>
  )
}
