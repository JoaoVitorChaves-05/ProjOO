interface Report_Sales extends Report {
}

interface Report_Inventory extends Report {
}

interface Report_Finance extends Report {
}

interface Visitor {
    visitSales(report: Report_Sales): string;
    visitInventory(report: Report_Inventory): string;
    visitFinance(report: Report_Finance): string;
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

    abstract accept(visitor: Visitor): string;
}

export type { Visitor, Report_Sales, Report_Inventory, Report_Finance };
export { Report };