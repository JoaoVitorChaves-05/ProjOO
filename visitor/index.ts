import { Report_Excel, Report_HTML, Report_PDF, Visitor } from "./interfaces";
import { Report } from "./interfaces";

class ReportVisitor implements Visitor {
    visit(report: Report_HTML): void {
        console.log(`Visiting HTML report: ${report.title}`);
    }

    visit(report: Report_Excel): void {
        console.log(`Visiting Excel report: ${report.title}`);
    }

    visit(report: Report_PDF): void {
        console.log(`Visiting PDF report: ${report.title}`);
    }
}

class ReportExcel extends Report implements Report_Excel {
    constructor(title: string) {
        super(title);
    }

    public accept(visitor: Visitor): void {
        visitor.visit(this);
    }
}


class ReportPDF extends Report implements Report_PDF {
    constructor(title: string) {
        super(title);
    }

    public accept(visitor: Visitor): void {
        visitor.visit(this);
    }
}


class ReportHTML extends Report implements Report_HTML {
    constructor(title: string) {
        super(title);
    }

    public accept(visitor: Visitor): void {
        visitor.visit(this);
    }
}