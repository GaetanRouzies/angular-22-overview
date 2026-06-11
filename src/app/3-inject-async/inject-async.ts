import { Component, injectAsync, onIdle, signal } from '@angular/core'
import { Product } from './product.model'

@Component({
  selector: 'app-inject-async',
  templateUrl: './inject-async.html',
})
export class InjectAsync {
  private readonly products: Product[] = [
    { id: 1, name: 'Espresso', price: 2.5 },
    { id: 2, name: 'Cappuccino', price: 3.5 },
    { id: 3, name: 'Croissant', price: 2.0 },
  ]

  asyncPdfGeneratorService = injectAsync(
    () => import('./pdf-generator-service').then((module) => module.PdfGeneratorService),
    { prefetch: onIdle },
  )

  asyncCsvExporterService = injectAsync(() =>
    import('./csv-exporter-service').then((module) => module.CsvExporterService),
  )

  invoice = signal<string>('')
  csv = signal<string>('')

  async generateInvoice() {
    const pdfGeneratorService = await this.asyncPdfGeneratorService()
    this.invoice.set(pdfGeneratorService.generateInvoice(this.products))
  }

  async exportCsv() {
    const csvExporterService = await this.asyncCsvExporterService()
    this.csv.set(csvExporterService.toCsv(this.products))
  }
}
