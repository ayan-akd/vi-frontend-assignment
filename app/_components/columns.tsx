"use client";

import { Badge } from "@/components/ui/badge";
import { type ColumnDef, Row } from "@tanstack/react-table";
import { labels, priorities, statuses } from "../_constants/metadata";
import { type Task } from "../_constants/schema";
import { CheckboxIcon, BoxIcon } from "@radix-ui/react-icons";

export const columns: Array<ColumnDef<Task>> = [
    {
        accessorKey: "checkBox",
        header: ({ column }) => (
            <span>
                <CheckboxIcon></CheckboxIcon>
            </span>
        ),
        cell: ({ row }) => {
            return(
                <div className="w-4">
                <input type="checkbox" 
                checked={row.getIsSelected()} 
                onChange={row.getToggleSelectedHandler()} 
                ></input>
            </div>
            )
        },
    },
    {
        accessorKey: "id",
        header: ({ column }) => <span>Task</span>,
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "title",
        header: ({ column }) => <span>Title</span>,
        cell: ({ row }) => {
            const label = labels.find((label) => label.value === row.original.label);

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-[400px] truncate font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => <span>Status</span>,
        cell: ({ row }) => {
            const status = statuses.find((status) => status.value === row.getValue("status"));

            if (!status) {
                return null;
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{status.label}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => <span>Priority</span>,
        cell: ({ row }) => {
            const priority = priorities.find(
                (priority) => priority.value === row.getValue("priority"),
            );

            if (!priority) {
                return null;
            }

            return (
                <div className="flex items-center">
                    {priority.icon && (
                        <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{priority.label}</span>
                </div>
            );
        },
    },
];
