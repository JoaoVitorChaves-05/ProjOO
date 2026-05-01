import {
    Report_Finance,
    Report_Inventory,
    Report_Sales,
    Visitor,
} from "./interfaces";
import { Report } from "./interfaces";

class HtmlVisitor implements Visitor {
    visitSales(report: Report_Sales): string {
        return `<h1>${report.title}</h1>\n<ul>${report.content
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>`;
    }

    visitInventory(report: Report_Inventory): string {
        return `<h1>${report.title}</h1>\n<table>${report.content
            .map((item) => `<tr><td>${item}</td></tr>`)
            .join("")}</table>`;
    }

    visitFinance(report: Report_Finance): string {
        return `<h1>${report.title}</h1>\n<pre>${report.content.join("\n")}</pre>`;
    }
}

class PdfVisitor implements Visitor {
    visitSales(report: Report_Sales): string {
        return `PDF::SALES\n${report.title}\n${report.content.join("\n")}`;
    }

    visitInventory(report: Report_Inventory): string {
        return `PDF::INVENTORY\n${report.title}\n${report.content.join("\n")}`;
    }

    visitFinance(report: Report_Finance): string {
        return `PDF::FINANCE\n${report.title}\n${report.content.join("\n")}`;
    }
}

class ExcelVisitor implements Visitor {
    visitSales(report: Report_Sales): string {
        return `EXCEL::SALES\n${report.title}\n${report.content.join(",")}`;
    }

    visitInventory(report: Report_Inventory): string {
        return `EXCEL::INVENTORY\n${report.title}\n${report.content.join(",")}`;
    }

    visitFinance(report: Report_Finance): string {
        return `EXCEL::FINANCE\n${report.title}\n${report.content.join(",")}`;
    }
}

class SalesReport extends Report implements Report_Sales {
    constructor(title: string) {
        super(title);
    }

    public accept(visitor: Visitor): string {
        return visitor.visitSales(this);
    }
}

class InventoryReport extends Report implements Report_Inventory {
    constructor(title: string) {
        super(title);
    }

    public accept(visitor: Visitor): string {
        return visitor.visitInventory(this);
    }
}

class FinanceReport extends Report implements Report_Finance {
    constructor(title: string) {
        super(title);
    }

    public accept(visitor: Visitor): string {
        return visitor.visitFinance(this);
    }
}

export {
    HtmlVisitor,
    PdfVisitor,
    ExcelVisitor,
    SalesReport,
    InventoryReport,
    FinanceReport,
};