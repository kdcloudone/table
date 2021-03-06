import React, { CSSProperties, ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { isElementInEventPath, keepWithinBounds } from '../../../utils/'

const FilterPanelStyle = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 450px;
  min-width: 160px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(154,154,154,.5);
  cursor: default;

  .popup-header {
    display: flex;
    background-color: #ebedf1;

    .popup-header-icon {
      color:#666;
      background-color: #fff;
      padding: 6px 16px 6px 16px;
      display: inline-block;
      border-right: 1px solid transparent;
      border-left: 1px solid transparent;
      border-top: 1px solid transparent;
      border-top-right-radius: 2px;
      border-top-left-radius: 2px;
    }
  }

  .popup-body {
    display: flex;
  }
`

const useWindowEvents = (func, evens) => {
  React.useEffect(() => {
    evens.forEach(event => window.addEventListener(event, func, true))
    return () => evens.forEach(event => window.removeEventListener(event, func, true))
  }, [evens, func])
}

interface PositionType {
  x:number;
  y:number;
}
export interface FilterPanel {
  onClose: () => any
  position: PositionType
  style?: CSSProperties
  filterIcon:ReactNode
  children?: ReactNode
}

function FilterPanel ({ style, children, position, filterIcon, onClose }) {
  const [perfectPosition, setPerfectPosition] = useState(position)
  const [visible, setVisible] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const isContainPanel = (e) => {
    return isElementInEventPath(ref.current, e)
  }
  useEffect(() => {
    setPerfectPosition(keepWithinBounds(document.body, ref.current, position.x, position.y, true))
    setVisible(true)
  }, [position])
  useWindowEvents((e) => !isContainPanel(e) && onClose(), ['mousedown'])
  return (
    <FilterPanelStyle
      style={{
        ...style,
        left: visible ? perfectPosition.x : 0,
        top: visible ? perfectPosition.y : 0,
        opacity: visible ? 1 : 0
      }}
      ref={ref}
    >
      <div className={'popup-header'}>
        <span className={'popup-header-icon'}>
          {
            filterIcon || <svg
              width={14}
              height={14}
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="filter"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3
              31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5
              48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z"
              ></path>
            </svg>
          }
        </span>
      </div>
      <div className="popup-body">
        {children}
      </div>
    </FilterPanelStyle>
  )
}

export default FilterPanel
