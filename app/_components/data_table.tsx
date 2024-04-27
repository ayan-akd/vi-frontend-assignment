"use client";
import cx from "clsx";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({});
    console.log(rowSelection);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            rowSelection: rowSelection,
        },
        onRowSelectionChange: setRowSelection,
        enableRowSelection: true,
        enableMultiRowSelection: false,
    });

    // TASK : Make first 2 columns (i.e. checkbox and task id) sticky
    // TASK : Make header columns resizable

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table className="data-table">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className={cx(
                                                "px-4 py-3 border border-gray-500 sticky z-20 top-0 ",
                                                header.id === "checkBox" &&
                                                    "sticky left-0 z-40 bg-white",
                                                header.id === "id" &&
                                                    "sticky left-12 z-30 bg-white",
                                            )}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={cx(
                                        "group hover:bg-gray-200",
                                        row.getIsSelected() && "bg-gray-200 !important",
                                    )}
                                    style={{
                                        backgroundColor: row.getIsSelected()
                                            ? "rgb(229 231 235 / var(--tw-bg-opacity))"
                                            : "inherit",
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cx(
                                                "px-4 py-1 whitespace-nowrap border border-gray-500",
                                                cell.column.id === "checkBox" &&
                                                    (row.getIsSelected()
                                                        ? "sticky left-0 z-20 bg-gray-200"
                                                        : "sticky left-0 z-20 bg-white"),
                                                cell.column.id === "id" &&
                                                    (row.getIsSelected()
                                                        ? "sticky left-12 z-10 bg-gray-200"
                                                        : "sticky left-12 z-10 bg-white"),
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
