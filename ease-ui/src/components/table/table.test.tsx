import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from "./table";

interface Resource {
  id: string;
  name: string;
  status: string;
  region: string;
}

const rows: Resource[] = [
  { id: "r1", name: "web", status: "running", region: "us-east-1" },
  { id: "r2", name: "api", status: "stopped", region: "eu-west-1" },
  { id: "r3", name: "db", status: "running", region: "us-east-1" },
];

const columns = [
  {
    id: "name",
    header: "Name",
    cell: (r: Resource) => r.name,
    sortAccessor: (r: Resource) => r.name,
  },
  { id: "status", header: "Status", cell: (r: Resource) => r.status },
  { id: "region", header: "Region", cell: (r: Resource) => r.region },
];

describe("Table (composable)", () => {
  it("renders semantic table parts", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>web</TableCell>
            <TableCell>running</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(screen.getByRole("cell", { name: "web" })).toBeInTheDocument();
  });
});

describe("DataTable", () => {
  it("renders header and rows from a column definition", () => {
    render(<DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />);
    const table = screen.getByRole("table");
    const headers = within(table)
      .getAllByRole("columnheader")
      .map((h) => h.textContent?.replace(/[↕▲▼]/g, "").trim());
    expect(headers).toEqual(["Name", "Status", "Region"]);
    expect(within(table).getAllByRole("row").length).toBe(4); // header + 3
  });

  it("sorts by a sortable column and toggles direction", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />);
    const nameHeader = screen.getByRole("columnheader", { name: /Name/ });
    await user.click(nameHeader);
    // ascending: api, db, web
    const first = screen.getByRole("row", { name: /api/ });
    expect(first).toBeInTheDocument();
    await user.click(nameHeader);
    // descending: web, db, api
    const table = screen.getByRole("table");
    const firstRow = within(table).getAllByRole("row")[1];
    const firstCell = firstRow?.querySelector("td");
    expect(firstCell?.textContent).toBe("web");
  });

  it("supports row selection with a select-all header (uncontrolled)", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.id}
        selectable
      />,
    );
    const selectAll = screen.getByRole("checkbox", { name: "Select all rows" });
    await user.click(selectAll);
    const rowChecks = screen
      .getAllByRole("checkbox")
      .filter((c) => c.getAttribute("aria-label")?.startsWith("Select row"));
    expect(rowChecks).toHaveLength(3);
    for (const c of rowChecks) expect(c).toBeChecked();
    expect(selectAll).toBeChecked();
    await user.click(selectAll);
    expect(selectAll).not.toBeChecked();
  });

  it("shows the empty state when there are no rows", () => {
    render(
      <DataTable
        columns={columns}
        rows={[]}
        rowKey={(r) => r.id}
        empty={<div>No resources found.</div>}
      />,
    );
    expect(screen.getByText("No resources found.")).toBeInTheDocument();
  });

  it("renders skeleton rows while loading", () => {
    render(
      <DataTable columns={columns} rows={[]} rowKey={(r) => r.id} loading />,
    );
    const skeletons = document.querySelectorAll('[data-ease="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
