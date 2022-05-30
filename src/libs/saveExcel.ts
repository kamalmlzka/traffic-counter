import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { ColumnType, RowType } from '@/types/ExcelJsType';

export default async function saveExcel(columns: ColumnType[], rows: RowType[]) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  worksheet.columns = columns;

  worksheet.getRow(1).font = { bold: true };

  rows.forEach((item) => worksheet.addRow(item));
  const buf = await workbook.xlsx.writeBuffer();

  saveAs(new Blob([buf]), 'traffic-count-data.xlsx');
}
