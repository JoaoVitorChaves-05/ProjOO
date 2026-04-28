interface Report_HTML extends Report {
}

interface Report_PDF extends Report {
}

interface Report_Excel extends Report {
}

interface Visitor {
    visitHTML(report: Report_HTML): void;
    visitPDF(report: Report_PDF): void;
    visitExcel(report: Report_Excel): void;
}

abstract class Report {
    public title: string;
    public content: string[];
    private date: Date;

    constructor(title: string) {
        this.title = title;
        this.content = [];
        this.date = new Date();
    }

    abstract accept(visitor: Visitor): void;
}

abstract class ReportType implements Report {
    public title: string;
    public content: string[]
    private date: Date;

    constructor(title: string) {
        this.title = title;
        this.content = [];
        this.date = new Date();
    }
}

export type { Visitor, Report_HTML, Report_PDF, Report_Excel };
export { Report };