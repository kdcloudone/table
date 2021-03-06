import React from 'react'
import { Table, TableProps } from '../../base'
import { CellProps } from '../../interfaces'
import buildCrossTable from './buildCrossTable'
import { ROW_KEY } from './constants'
import { CrossTableLeftMetaColumn, LeftCrossTreeNode, TopCrossTreeNode } from './interfaces'

export interface CrossTableProps extends Omit<TableProps, 'dataSource' | 'columns' | 'primaryKey'> {
  BaseTableComponent?: any
  baseTableRef?: React.Ref<Table>
  leftTree: LeftCrossTreeNode[]
  topTree: TopCrossTreeNode[]

  leftTotalNode?: LeftCrossTreeNode
  topTotalNode?: TopCrossTreeNode
  leftMetaColumns?: CrossTableLeftMetaColumn[]

  getValue(leftNode: LeftCrossTreeNode, topNode: TopCrossTreeNode, leftDepth: number, topDepth: number): any
  render?(
    value: any,
    leftNode: LeftCrossTreeNode,
    topNode: TopCrossTreeNode,
    leftDepth: number,
    topDepth: number,
  ): React.ReactNode
  getCellProps?(
    value: any,
    leftNode: LeftCrossTreeNode,
    topNode: TopCrossTreeNode,
    leftDepth: number,
    topDepth: number,
  ): CellProps
}

export default (function CrossTable({
  BaseTableComponent = Table,
  leftTree,
  leftTotalNode,
  topTree,
  topTotalNode,
  getValue,
  getCellProps,
  leftMetaColumns,
  render,
  baseTableRef,
  ...others
}: CrossTableProps) {
  const { dataSource, columns } = buildCrossTable({
    leftTree,
    topTree,
    leftTotalNode,
    topTotalNode,
    getValue,
    getCellProps,
    render,
    leftMetaColumns,
  })

  return (
    <BaseTableComponent ref={baseTableRef} {...others} primaryKey={ROW_KEY} dataSource={dataSource} columns={columns} />
  )
})
