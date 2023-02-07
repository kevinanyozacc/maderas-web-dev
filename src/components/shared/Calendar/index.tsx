import React, { useEffect, useState } from 'react'

import Modal from '../Modal'
import moment, { Moment } from 'moment'

import { IconChevronRight, IconChevronLeft, IconCalendar } from '@icons'

import styles from './calendar.module.css'

interface Props {
  value?: Moment
  isOpen?: boolean
  onClose?: () => void
  onClear?: () => void
  onChange?: (date: Moment) => void
}

interface InnerDate {
  year: number
  month: number
  day: number | null
}

const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

const genCalendar = (month: number, year: number) => {
  const date = moment(new Date(year, month, 1))
  const dayOfWeekStart = date.day() === 0 ? 6 : date.day() - 1

  const days: string[] = Array(dayOfWeekStart).fill(null)

  for (let day = 0; day < date.daysInMonth(); day++) {
    days.push(String(day + 1))
  }

  return days
}

const initialState: InnerDate = {
  year: moment().year(),
  month: moment().month(),
  day: null
}

const Calendar = ({
  isOpen,
  value = moment(),
  onClose,
  onClear,
  onChange
}: Props) => {
  const [date, setDate] = useState<InnerDate>(initialState)
  const [daysOfMonth, setDaysOfMonth] = useState<string[]>([])

  useEffect(() => {
    if (value) {
      const year = value.year()
      const month = value.month()
      const day = null

      setDate({ year, month, day })
    }

    const days = genCalendar(date.month, date.year)
    setDaysOfMonth(days)
  }, [])

  const decrementMonth = () => {
    const { month, year, ...rest } = date

    let newYear = year
    let newMonthNumber = month

    if (newMonthNumber === 0) {
      newYear -= 1
      newMonthNumber = 12
    }

    newMonthNumber -= 1

    const payload = {
      ...rest,
      day: null,
      year: newYear,
      month: newMonthNumber
    }

    const days = genCalendar(payload.month, payload.year)

    setDate(payload)
    setDaysOfMonth(days)
  }

  const incrementMonth = () => {
    const { month, year, ...rest } = date

    let newYear = year
    let newMonthNumber = month
    if (newMonthNumber === 11) {
      newYear += 1
      newMonthNumber = -1
    }
    newMonthNumber += 1

    const payload = {
      ...rest,
      day: null,
      year: newYear,
      month: newMonthNumber
    }

    const days = genCalendar(payload.month, payload.year)

    setDate(payload)
    setDaysOfMonth(days)
  }

  const handleSelect = (day: number) =>
    setDate((prevDate) => ({ ...prevDate, day }))

  const handleSubmit = () => {
    const { year, month, day } = date

    onChange?.(moment(new Date(year, month, day ?? 1)))
    onClose?.()
  }

  const clear = () => {
    onClose?.()
    onClear?.()
    setDate(initialState)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.calendar}>
        {/* HEADER */}
        <div className={styles.header}>
          <IconCalendar />
        </div>
        {/* BODY */}
        <div className={styles.body}>
          {/* MONTHS */}
          <div className={styles.monthSelector}>
            <button
              onClick={decrementMonth}
              className="btn-icon btn-ghost-primary"
            >
              <IconChevronLeft />
            </button>
            <p>
              {monthNames[date.month]} {date.year}
            </p>
            <button
              onClick={incrementMonth}
              className="btn-icon btn-ghost-primary"
            >
              <IconChevronRight />
            </button>
          </div>
          {/* DAYS */}
          <div className={styles.days}>
            {dayNames.map((name) => (
              <div key={`dayName-${name}`}>
                <span>{name}</span>
              </div>
            ))}
            {daysOfMonth.map((number, i) => {
              if (typeof number === 'object') {
                return <div key={`dayEmpty-${i}`} />
              }
              return (
                <button
                  key={`dayNumber-${i}`}
                  onClick={() => handleSelect(+number)}
                  className={
                    date?.day === +number
                      ? styles.dayNumber_active
                      : styles.dayNumber_inactive
                  }
                >
                  {number}
                </button>
              )
            })}
          </div>
          {/* BUTTONS */}
          <div className={styles.buttons}>
            <button className="btn btn-ghost-red" onClick={clear}>
              Limpiar
            </button>
            <button
              disabled={!date.day}
              onClick={handleSubmit}
              className="btn btn-solid-primary"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Calendar
