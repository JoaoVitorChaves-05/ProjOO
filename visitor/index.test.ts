import {
  ExcelVisitor,
  FinanceReport,
  HtmlVisitor,
  InventoryReport,
  PdfVisitor,
  SalesReport,
} from './index';

describe('Visitor - conversoes de relatorio', () => {
  test('deve converter SalesReport para HTML, PDF e Excel', () => {
    const report = new SalesReport('Relatorio de Vendas');
    report.content.push('Venda A');
    report.content.push('Venda B');

    const html = report.accept(new HtmlVisitor());
    const pdf = report.accept(new PdfVisitor());
    const excel = report.accept(new ExcelVisitor());

    expect(html).toBe(
      '<h1>Relatorio de Vendas</h1>\n<ul><li>Venda A</li><li>Venda B</li></ul>'
    );
    expect(pdf).toBe('PDF::SALES\nRelatorio de Vendas\nVenda A\nVenda B');
    expect(excel).toBe('EXCEL::SALES\nRelatorio de Vendas\nVenda A,Venda B');
  });

  test('deve converter InventoryReport para HTML, PDF e Excel', () => {
    const report = new InventoryReport('Relatorio de Estoque');
    report.content.push('Item 01');
    report.content.push('Item 02');

    const html = report.accept(new HtmlVisitor());
    const pdf = report.accept(new PdfVisitor());
    const excel = report.accept(new ExcelVisitor());

    expect(html).toBe(
      '<h1>Relatorio de Estoque</h1>\n<table><tr><td>Item 01</td></tr><tr><td>Item 02</td></tr></table>'
    );
    expect(pdf).toBe('PDF::INVENTORY\nRelatorio de Estoque\nItem 01\nItem 02');
    expect(excel).toBe('EXCEL::INVENTORY\nRelatorio de Estoque\nItem 01,Item 02');
  });

  test('deve converter FinanceReport para HTML, PDF e Excel', () => {
    const report = new FinanceReport('Relatorio Financeiro');
    report.content.push('Receita: 1000');
    report.content.push('Despesa: 500');

    const html = report.accept(new HtmlVisitor());
    const pdf = report.accept(new PdfVisitor());
    const excel = report.accept(new ExcelVisitor());

    expect(html).toBe(
      '<h1>Relatorio Financeiro</h1>\n<pre>Receita: 1000\nDespesa: 500</pre>'
    );
    expect(pdf).toBe('PDF::FINANCE\nRelatorio Financeiro\nReceita: 1000\nDespesa: 500');
    expect(excel).toBe(
      'EXCEL::FINANCE\nRelatorio Financeiro\nReceita: 1000,Despesa: 500'
    );
  });
});
