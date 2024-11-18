import { z } from 'zod';

const TableCellSchema = z.object({
    TableCell: z.string().describe("The content of the table cell"),
    className: z.string().optional().describe("Optional CSS class for styling"),
});

const TableHeadSchema = z.object({
    TableHead: z.string().describe("The content of the table header cell"),
    className: z.string().optional().describe("Optional CSS class for styling"),
});

const TableRowSchema = z.object({
    TableRow: z
        .array(TableCellSchema)
        .describe("An array of table cells representing a table row"),
});

export const TableStructureSchema = z.object({
    TableCaption: z.string().describe("The caption of the table"),
    TableHeader: z
        .array(TableHeadSchema)
        .describe("An array of table header cells"),
    TableBody: z
        .array(TableRowSchema)
        .describe("An array of table rows in the table body"),
});

// export const TableSchema = z.object({
//     Table: TableStructureSchema.describe("The main table object containing all table data"),
// });

export const TableSchema = z.object({
    preText: z.string().describe("All the paragraphs before the table"),
    Table: TableStructureSchema.describe("The main table object containing all table data"),
    postText: z.string().describe("Everything after the table"),
});
